/**
 * Satu order yang sedang menunggu di suatu tahap.
 */
export interface AntrianItem {
  order_id: number;
  kode_pesan: string;
  customer: string;
  tahap: "cuci" | "drying" | "setrika" | "selesai";
  sejak: string;
  menunggu_jam: number;
  jumlah_rfid: number;
  butuh_antar: boolean;
  posisi: number;
}

/**
 * Ringkasan satu tahap pengerjaan.
 */
export interface RingkasanTahap {
  tahap: AntrianItem["tahap"];
  jumlah_order: number;
  jumlah_rfid: number;
  item: AntrianItem[];
}

/**
 * Data ringkasan antrian seluruh tahap.
 */
export interface AntrianData {
  dihitung_pada: string;
  total_order: number;
  tahap: RingkasanTahap[];
  menunggu_antar: number;
}
