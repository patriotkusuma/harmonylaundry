import { logger } from "../../logger";

export default async function getOrderLog(kodePesan) {
  try {
    const url = `https://go.harmonylaundry.my.id/api/get-pesanan-log?kode_pesan=${kodePesan}`;

    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NjkwMTcxODgsInVzZXJfaWQiOjZ9.L8vuUJpsBx1Vz_D-5lZWHiJOiomoqFL3mNwyj6cz0Us"; // jangan hardcode kalau production

    const res = await fetch(url, {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-PUBLIC-KEY": token
      },
    });

    logger.info("Order Log Fetched");

    const json = await res.json();
    return json;
  } catch (err) {
    logger.error(err);
    return { data: [], status: 500 };
  }
}
