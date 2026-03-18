import qrisStaticToDynamic from "@misterdevs/qris-static-to-dynamic";

/**
 * Convert QRIS static payload -> dynamic payload with amount
 * @param {object} params
 * @param {string} params.qrisStatic
 * @param {number} params.amount
 */
export function createQrisDynamic({ qrisStatic, amount }) {
  if (!qrisStatic) throw new Error("QRIS static payload kosong");
  if (!amount || amount <= 0) throw new Error("Amount tidak valid");

  // output: payload QRIS dinamis + CRC sudah benar
  return qrisStaticToDynamic(qrisStatic, amount);
}
