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

function pinIcon(background, label) {
  return L.divIcon({
    className: "",
    iconSize: [34, 44],
    iconAnchor: [17, 42],
    popupAnchor: [0, -36],
    html: `
      <div style="position:relative;width:34px;height:44px">
        <div style="position:absolute;left:50%;top:0;transform:translateX(-50%);width:30px;height:30px;border-radius:50% 50% 50% 0;transform:translateX(-50%) rotate(-45deg);background:${background};border:2px solid #fff;box-shadow:0 6px 14px rgba(7,22,38,.28)"></div>
        <div style="position:absolute;left:50%;top:6px;transform:translateX(-50%);font-size:11px;font-weight:800;color:#fff">${label}</div>
      </div>`,
  });
}

/**
 * Peta pemilih lokasi. Leaflet dimuat hanya di browser (dynamic ssr:false)
 * supaya tidak menyentuh `window` saat render server.
 */
export default function OngkirMap({ destination, route, onPick }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const destMarkerRef = useRef(null);
  const routeLineRef = useRef(null);
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

    L.marker([OUTLET.lat, OUTLET.lng], { icon: pinIcon("#0E5AA4", "H") })
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
        icon: pinIcon("#FF6B4A", "T"),
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

  // Garis rute.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (routeLineRef.current) {
      map.removeLayer(routeLineRef.current);
      routeLineRef.current = null;
    }

    if (!route || route.length < 2) return;

    const latLngs = route.map(([lng, lat]) => [lat, lng]);
    routeLineRef.current = L.polyline(latLngs, {
      color: "#0E5AA4",
      weight: 5,
      opacity: 0.85,
      lineCap: "round",
    }).addTo(map);

    map.fitBounds(routeLineRef.current.getBounds(), {
      padding: [36, 36],
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
        .leaflet-popup-content-wrapper {
          border-radius: 14px;
        }
      `}</style>
      <div
        ref={containerRef}
        className="h-[300px] w-full sm:h-[420px]"
        aria-label="Peta pemilih lokasi antar jemput"
      />
    </>
  );
}
