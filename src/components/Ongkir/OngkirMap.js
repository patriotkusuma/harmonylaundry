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

/** Pin kandidat hasil pencarian: putih bergaris coral dengan nomor. */
function candidatePinIcon(number) {
  return L.divIcon({
    className: "",
    iconSize: [32, 40],
    iconAnchor: [16, 38],
    popupAnchor: [0, -34],
    html: `
      <div style="position:relative;width:32px;height:40px;filter:drop-shadow(0 5px 10px rgba(226,78,47,.28))">
        <div style="position:absolute;left:50%;top:1px;width:28px;height:28px;border-radius:50% 50% 50% 0;transform:translateX(-50%) rotate(-45deg);background:#fff;border:2px solid #FF6B4A"></div>
        <div style="position:absolute;left:50%;top:9px;transform:translateX(-50%);font-size:12px;font-weight:800;color:#E24E2F">${number}</div>
      </div>`,
  });
}

const escapeHtml = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        ch
      ]
  );

/**
 * Peta pemilih lokasi. Leaflet dimuat hanya di browser (dynamic ssr:false)
 * supaya tidak menyentuh `window` saat render server.
 */
export default function OngkirMap({
  destination,
  route,
  summary,
  candidates,
  onConfirm,
  onPick,
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const destMarkerRef = useRef(null);
  const routeGroupRef = useRef(null);
  const candidateGroupRef = useRef(null);
  const onPickRef = useRef(onPick);
  const onConfirmRef = useRef(onConfirm);

  onPickRef.current = onPick;
  onConfirmRef.current = onConfirm;

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
    if (!map) return;

    if (!destination) {
      if (destMarkerRef.current) {
        map.removeLayer(destMarkerRef.current);
        destMarkerRef.current = null;
      }
      return;
    }

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

  // Pin kandidat hasil pencarian: semua titik tampil, dipilih dengan klik.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (candidateGroupRef.current) {
      map.removeLayer(candidateGroupRef.current);
      candidateGroupRef.current = null;
    }

    if (!candidates || candidates.length === 0) return;

    const group = L.layerGroup();
    const markers = [];

    candidates.forEach((item, index) => {
      const marker = L.marker([item.lat, item.lng], {
        icon: candidatePinIcon(index + 1),
        title: item.label || `Pilihan ${index + 1}`,
      });

      marker.bindPopup(
        `<div style="min-width:180px;line-height:1.35">
           <span style="font-size:10px;font-weight:800;color:#E24E2F">PILIHAN ${index + 1}</span>
           <strong style="display:block;margin-top:2px;font-size:12px">${escapeHtml(
             item.label || `${item.lat.toFixed(5)}, ${item.lng.toFixed(5)}`
           )}</strong>
           <button type="button" class="ongkir-pick" data-index="${index}" style="margin-top:9px;width:100%;border:0;border-radius:10px;background:#0E5AA4;color:#fff;font-weight:800;font-size:12px;padding:9px 10px;cursor:pointer">Pakai lokasi ini</button>
         </div>`,
        { closeButton: true, autoPan: true }
      );

      marker.on("popupopen", (event) => {
        const button = event.popup
          .getElement()
          ?.querySelector(".ongkir-pick");
        if (!button) return;

        button.onclick = () => onConfirmRef.current?.(candidates[index]);
      });

      marker.addTo(group);
      markers.push(marker);
    });

    group.addTo(map);
    candidateGroupRef.current = group;

    map.fitBounds(L.latLngBounds(candidates.map((c) => [c.lat, c.lng])), {
      padding: [52, 52],
      maxZoom: 15,
    });

    // Buka pin pertama supaya jelas kalau pin bisa dipilih.
    const openFirst = setTimeout(() => markers[0]?.openPopup(), 420);

    return () => {
      clearTimeout(openFirst);
    };
  }, [candidates]);

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
        .leaflet-popup-content {
          margin: 12px 14px;
        }
        .ongkir-pick:hover {
          background: #0b4a87;
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
