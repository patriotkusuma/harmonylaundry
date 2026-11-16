const API_BASE = "https://go.harmonylaundry.my.id/api/public";

const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjkwNzYyNDAsInVzZXJfaWQiOjN9.La1NahBxsZU_dDoycZhhCrzn52u-1DDFrzLxQS4yX94";

/**
 * Ambil ringkasan antrian pengerjaan per tahap.
 * @param {number} [hari=7] - batas hari data order (default 7).
 * @returns {Promise<{status: boolean, data: import("./types").AntrianData}>}
 */
export async function getAntrian(hari = 7) {
  const res = await fetch(`${API_BASE}/antrian?hari=${hari}`, {
    headers: {
      "X-PUBLIC-KEY": PUBLIC_KEY,
      Accept: "application/json",
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Gagal mengambil antrian: ${res.status}`);
  }

  return res.json();
}
