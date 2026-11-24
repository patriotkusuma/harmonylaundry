"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { OUTLET } from "@/lib/ongkir";

const outletPopup = `
  <div style="font-family:inherit;line-height:1.3">
    <strong style="font-size:13px">${OUTLET.name}</strong><br/>
    <span style="font-size:11px;color:#50698A">Titik jemput &amp; antar</span>
  </div>
`;

/** Pin outlet: papan putih berlogo Harmony + ekor pin. */
function outletPinIcon() {
  return L.divIcon({
    className: "",
    iconSize: [72, 64],
    iconAnchor: [36, 62],
    popupAnchor: [0, -56],
    html: `
      <div style="position:relative;width:72px;height:64px;filter:drop-shadow(0 7px 12px rgba(7,22,38,.3))">
        <div style="position:absolute;left:50%;top:48px;transform:translateX(-50%) rotate(45deg);width:13px;height:13px;background:#fff;border-right:2px solid #0E5AA4;border-bottom:2px solid #0E5AA4;border-bottom-right-radius:3px"></div>
        <div style="position:absolute;left:0;top:0;width:72px;height:50px;box-sizing:border-box;border-radius:13px;background:#fff;border:2px solid #0E5AA4;display:flex;align-items:center;justify-content:center;overflow:hidden">
          <img src="/img/logo-pin.png" alt="Harmony Laundry" style="width:62px;height:42px;object-fit:contain" />
        </div>
      </div>`,
  });
}

/** Pin tujuan: pin coral dengan titik putih di tengah. */
function destinationPinIcon() {
  return L.divIcon({
    className: "",
    iconSize: [38, 48],
    iconAnchor: [19, 46],
    popupAnchor: [0, -40],
    html: `
      <div style="position:relative;width:38px;height:48px;filter:drop-shadow(0 6px 10px rgba(226,78,47,.35))">
        <div style="position:absolute;left:50%;top:2px;width:34px;height:34px;border-radius:50% 50% 50% 0;transform:translateX(-50%) rotate(-45deg);background:#FF6B4A;border:2px solid #fff"></div>
        <div style="position:absolute;left:50%;top:14px;transform:translateX(-50%);width:10px;height:10px;border-radius:50%;background:#fff"></div>
      </div>`,
  });
}

/**
 * Peta pemilih lokasi. Leaflet dimuat hanya di browser (dynamic ssr:false)
 * supaya tidak menyentuh `window` saat render server.
 */
export default function OngkirMap({ destination, route, summary, onPick }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const destMarkerRef = useRef(null);
  const routeGroupRef = useRef(null);
  const onPickRef = useRef(onPick);

  onPickRef.current = onPick;

  // Init peta sekali.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [OUTLET.lat, OUTLET.lng],
      zoom: 14,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.marker([OUTLET.lat, OUTLET.lng], { icon: outletPinIcon() })
      .addTo(map)
      .bindPopup(outletPopup);

    map.on("click", (event) => {
      onPickRef.current?.({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
        label: null,
      });
    });

    mapRef.current = map;

    // Container kadang baru punya ukuran setelah layout selesai.
    const resize = setTimeout(() => map.invalidateSize(), 250);

    return () => {
      clearTimeout(resize);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Marker tujuan.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !destination) return;

    if (!destMarkerRef.current) {
      destMarkerRef.current = L.marker([destination.lat, destination.lng], {
        icon: destinationPinIcon(),
        draggable: true,
      }).addTo(map);

      destMarkerRef.current.on("dragend", (event) => {
        const pos = event.target.getLatLng();
        onPickRef.current?.({ lat: pos.lat, lng: pos.lng, label: null });
      });
    } else {
      destMarkerRef.current.setLatLng([destination.lat, destination.lng]);
    }

    map.panTo([destination.lat, destination.lng], { animate: true });
  }, [destination]);

  // Garis rute: casing putih + garis biru + titik berjalan.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (routeGroupRef.current) {
      map.removeLayer(routeGroupRef.current);
      routeGroupRef.current = null;
    }

    if (!route || route.length < 2) return;

    const latLngs = route.map(([lng, lat]) => [lat, lng]);
    const group = L.layerGroup();

    L.polyline(latLngs, {
      color: "#FFFFFF",
      weight: 13,
      opacity: 0.92,
      lineCap: "round",
      lineJoin: "round",
      interactive: false,
    }).addTo(group);

    const main = L.polyline(latLngs, {
      color: "#0E5AA4",
      weight: 6.5,
      opacity: 1,
      lineCap: "round",
      lineJoin: "round",
      interactive: false,
    }).addTo(group);

    L.polyline(latLngs, {
      color: "#BEE2FA",
      weight: 2.8,
      opacity: 0.95,
      lineCap: "round",
      className: "ongkir-route-flow",
      interactive: false,
    }).addTo(group);

    group.addTo(map);
    routeGroupRef.current = group;

    map.fitBounds(main.getBounds(), {
      padding: [42, 42],
      maxZoom: 16,
    });
  }, [route]);

  return (
    <>
      <style jsx global>{`
        .leaflet-container {
          font-family: inherit;
          background: #e7f1fa;
        }
        /* Peta dibikin lebih kalem biar garis rute yang menonjol. */
        .leaflet-tile-pane {
          filter: saturate(0.72) contrast(0.96) brightness(1.04);
        }
        .leaflet-popup-content-wrapper {
          border-radius: 14px;
        }
        .leaflet-control-zoom a {
          color: #172f4b;
        }
        .ongkir-route-flow {
          stroke-dasharray: 0.1 15;
          animation: ongkir-route-flow 1.05s linear infinite;
        }
        @keyframes ongkir-route-flow {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -15.1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ongkir-route-flow {
            animation: none;
            stroke-dasharray: none;
            opacity: 0;
          }
        }
      `}</style>

      <div className="relative">
        <div
          ref={containerRef}
          className="h-[300px] w-full sm:h-[420px]"
          aria-label="Peta pemilih lokasi antar jemput"
        />

        {summary && (
          <div className="pointer-events-none absolute right-3 top-3 z-[650] flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-xs font-extrabold text-ink-800 shadow-[0_8px_24px_-12px_rgba(7,22,38,0.5)] ring-1 ring-ink-900/10 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-brand-600" />
            <span>
              {summary.distanceKm}{" "}
              <span className="font-bold text-ink-500">km</span>
            </span>
            {summary.duration && (
              <>
                <span className="text-ink-300">•</span>
                <span className="font-bold text-ink-500">{summary.duration}</span>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
