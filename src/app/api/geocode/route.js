export const dynamic = "force-dynamic";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const USER_AGENT = "HarmonyLaundry-Ongkir/1.0 (https://harmonylaundrys.com)";

// Batasi pencarian di sekitar Yogyakarta agar hasil tidak melompat ke luar kota.
const VIEWBOX = "110.30,-7.60,110.58,-8.05";

/**
 * GET /api/geocode?q=alamat
 *
 * Proxy Nominatim (OpenStreetMap) supaya User-Agent sesuai kebijakan mereka
 * dan browser tidak kena CORS.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim();

  if (q.length < 3) {
    return Response.json({ results: [] });
  }

  const url = new URL(NOMINATIM_URL);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("q", q);
  url.searchParams.set("limit", "5");
  url.searchParams.set("countrycodes", "id");
  url.searchParams.set("addressdetails", "0");
  url.searchParams.set("accept-language", "id");
  url.searchParams.set("viewbox", VIEWBOX);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
      headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
    });

    if (!res.ok) throw new Error(`Nominatim membalas ${res.status}`);

    const data = await res.json();
    const results = (Array.isArray(data) ? data : []).map((item) => ({
      label: item.display_name,
      lat: Number(item.lat),
      lng: Number(item.lon),
    }));

    return Response.json({ results });
  } catch (err) {
    return Response.json(
      { error: "Gagal mencari alamat. Coba lagi atau klik langsung di peta." },
      { status: 502 }
    );
  } finally {
    clearTimeout(timer);
  }
}
