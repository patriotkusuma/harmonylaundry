const API_BASE = "https://go.harmonylaundry.my.id/api/public";

const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjkwNzYyNDAsInVzZXJfaWQiOjN9.La1NahBxsZU_dDoycZhhCrzn52u-1DDFrzLxQS4yX94";

/**
 * Ambil posisi antrian satu pesanan pada tahap yang sedang berjalan.
 *
 * Hanya berisi angka (posisi ke berapa, total di tahap, jam menunggu),
 * tanpa daftar order lain.
 *
 * @param {string} kodePesan - kode pesanan, contoh "HRMN-1794832996"
 * @param {number} [hari=7] - batas umur order dalam hari
 * @returns {Promise<import("./types").AntrianPosisi | null>}
 */
export async function getPosisiAntrian(kodePesan, hari = 7) {
  try {
    const res = await fetch(
      `${API_BASE}/antrian/${encodeURIComponent(kodePesan)}?hari=${hari}`,
      {
        headers: {
          "X-PUBLIC-KEY": PUBLIC_KEY,
          Accept: "application/json",
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return null;

    const json = await res.json();
    return json?.data ?? null;
  } catch {
    // Antrian bersifat informasi tambahan: kalau gagal, halaman tetap jalan.
    return null;
  }
}
