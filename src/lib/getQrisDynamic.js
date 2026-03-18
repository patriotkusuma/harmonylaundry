import { logger } from "../../logger";

export default async function getQrisDynamic(kodePesan) {
  try {
    // contoh endpoint: ganti sesuai backend kamu
    const url = `https://go.harmonylaundry.my.id/api/qris/generate?kode_pesan=${kodePesan}`;

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjkwMTcxODgsInVzZXJfaWQiOjZ9.L8vuUJpsBx1Vz_D-5lZWHiJOiomoqFL3mNwyj6cz0Us";

    const res = await fetch(url, {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();
    logger.info("QRIS Dynamic fetched");

    return json; // expected: { data: { qris_string OR qris_url }, status: 200 }
  } catch (err) {
    logger.error(err);
    return null;
  }
}
