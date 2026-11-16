/**
 * Posisi antrian satu pesanan pada tahap yang sedang berjalan.
 *
 * Sengaja hanya berisi angka — tidak ada daftar order lain, karena customer
 * cukup tahu ada berapa order di depannya.
 */
export interface AntrianPosisi {
  tahap: "cuci" | "drying" | "setrika" | "selesai";
  /** 1 = paling depan */
  posisi: number;
  /** jumlah order di tahap ini */
  total_di_tahap: number;
  /** order yang menunggu lebih dulu */
  di_depan: number;
  menunggu_jam: number;
  /** khusus tahap selesai & pesanan minta diantar */
  menunggu_antar: boolean;
}
