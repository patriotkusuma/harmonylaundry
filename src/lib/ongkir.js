/**
 * Aturan ongkir Harmony Laundry.
 *
 * - 5 km pertama gratis.
 * - Selebihnya Rp 5.000 per km (hanya km setelah 5 km yang dihitung).
 * - Jarak yang dipakai adalah jarak tempuh jalan (OpenStreetMap/OSRM),
 *   bukan garis lurus.
 */

export const OUTLET = {
  name: "Harmony Laundry Yogyakarta",
  address: "Jl. Candi Gebang, Ngaglik, Sleman, Yogyakarta",
  lat: -7.750328,
  lng: 110.4116637,
};

export const FREE_RADIUS_KM = 5;
export const RATE_PER_KM = 5000;

/**
 * hitungOngkir mengubah jarak (meter) menjadi rincian biaya.
 *
 * Jarak tagihan dibulatkan ke atas per 0,1 km supaya angka yang tampil di
 * layar selalu sama dengan perkaliannya (mis. 7,6 km - 5 km = 2,6 km).
 * Km yang ditagih hanya bagian di atas 5 km.
 */
export function hitungOngkir(distanceMeters) {
  const mentahKm = Math.max(0, Number(distanceMeters) || 0) / 1000;
  const distanceKm = Math.ceil(Number((mentahKm * 10).toFixed(4))) / 10;
  const chargeableKm = Number(
    Math.max(0, distanceKm - FREE_RADIUS_KM).toFixed(1)
  );
  const biaya = Math.round(chargeableKm * RATE_PER_KM);

  return {
    mentahKm,
    distanceKm,
    chargeableKm,
    biaya,
    gratis: biaya <= 0,
  };
}

/** Jarak garis lurus (haversine), dipakai hanya sebagai perkiraan cadangan. */
export function jarakGarisLurusMeters(a, b) {
  const R = 6371000;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
}

export function formatKm(km) {
  return Number(km || 0).toLocaleString("id-ID", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
}

export function formatRupiah(value) {
  return Number(value || 0).toLocaleString("id-ID");
}
