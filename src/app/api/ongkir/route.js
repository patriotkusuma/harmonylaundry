import { OUTLET, jarakGarisLurusMeters } from "@/lib/ongkir";

export const dynamic = "force-dynamic";

const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";
const USER_AGENT = "HarmonyLaundry-Ongkir/1.0 (https://harmonylaundrys.com)";

/**
 * GET /api/ongkir?lat=..&lng=..
 *
 * Menghitung jarak tempuh dari outlet ke titik tujuan memakai OSRM
 * (data OpenStreetMap). Bila OSRM tidak bisa dihubungi, dipakai perkiraan
 * garis lurus x 1,3 dan ditandai `source: "estimasi"` agar UI bisa jujur.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    Math.abs(lat) > 90 ||
    Math.abs(lng) > 180
  ) {
    return Response.json({ error: "Koordinat tidak valid" }, { status: 400 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const url =
      `${OSRM_URL}/${OUTLET.lng},${OUTLET.lat};${lng},${lat}` +
      "?overview=full&geometries=geojson&steps=false";

    const res = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
      headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
    });

    if (!res.ok) throw new Error(`OSRM membalas ${res.status}`);

    const data = await res.json();
    const route = data?.routes?.[0];
    if (data?.code !== "Ok" || !route) throw new Error("Rute tidak ditemukan");

    return Response.json({
      source: "osrm",
      distance_m: route.distance,
      duration_s: route.duration,
      geometry: route.geometry?.coordinates ?? [],
    });
  } catch (err) {
    const straight = jarakGarisLurusMeters(OUTLET, { lat, lng });

    return Response.json({
      source: "estimasi",
      distance_m: Math.round(straight * 1.3),
      duration_s: null,
      geometry: [],
      warning: "Rute jalan tidak tersedia, jarak hanya perkiraan.",
    });
  } finally {
    clearTimeout(timer);
  }
}
