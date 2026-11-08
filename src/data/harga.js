// ─────────────────────────────────────────────────────────────
//  PUSAT DATA HARGA HARMONY LAUNDRY
// ─────────────────────────────────────────────────────────────
//  Sumber data:
//  - tabel `jenis_cucis`        → nama, harga, tipe, keterangan
//  - tabel `category_pakets`    → nama paket, deskripsi, durasi
//
//  CARA MENGUBAH HARGA:
//  1. Cari item di `katalog` di bawah.
//  2. Ubah angka pada properti `harga`.
//  3. Simpan. Semua tampilan (kartu paket, kalkulator,
//     daftar harga, dan pesan WhatsApp) ikut berubah.
//
//  CARA MENYEMBUNYIKAN ITEM:
//  - Set `tampil: false` pada item, atau
//  - Set `tampil: false` pada kategorinya.
//
//  YANG TIDAK DITAMPILKAN DI WEBSITE (biaya internal):
//  - Ongkir
//  - Charge penanganan khusus & charge daleman
//  - Extra waktu (Extra 1 hari, Extra 2 jam, Extra 12 jam, Extra helm)
//  - Plastik kemasan
//  - Extra pemutih
//  - Penanganan khusus jahit
//  - Selimut tasha (harga khusus satu pelanggan)
//  - Baris uji coba / tanpa harga layanan
// ─────────────────────────────────────────────────────────────

export const waNumber = "62895363324517";

export const waLink = (message) =>
  `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

export const formatRp = (value) => Number(value).toLocaleString("id-ID");

/** Label satuan berdasarkan kolom `tipe` di tabel jenis_cucis. */
export const satuanLabel = {
  per_kilo: "kg",
  satuan: "pcs",
  meter: "m",
  kilo_meter: "kg/m",
};

/**
 * Katalog harga yang sudah difilter dari tabel.
 * `grup` dipakai untuk tab di halaman /layanan.
 * `tipe` mengikuti kolom `tipe` pada database.
 */
export const katalog = [
  {
    id: "reguler",
    grup: "kiloan",
    nama: "Reguler",
    deskripsi: "Paket reguler 2 hari pengerjaan, masuk hari ini diambil lusa.",
    durasi: "2 hari",
    items: [
      { id: 4, nama: "Cuci + Setrika", harga: 7000, tipe: "per_kilo", ket: "Cuci, kering, dan setrika" },
      { id: 5, nama: "Cuci Lipat", harga: 5000, tipe: "per_kilo", ket: "Cuci dan lipat saja" },
      { id: 6, nama: "Setrika", harga: 5000, tipe: "per_kilo", ket: "Setrika saja" },
    ],
  },
  {
    id: "express",
    grup: "kiloan",
    nama: "Express",
    deskripsi: "Paket express 1 hari pengerjaan, masuk hari ini diambil besok.",
    durasi: "1 hari",
    items: [
      { id: 2, nama: "Cuci + Setrika", harga: 9000, tipe: "per_kilo", ket: "Cuci, kering, dan setrika" },
      { id: 1, nama: "Cuci Lipat", harga: 6000, tipe: "per_kilo", ket: "Cuci dan lipat" },
      { id: 3, nama: "Setrika", harga: 6000, tipe: "per_kilo", ket: "Setrika saja" },
    ],
  },
  {
    id: "kilat-12",
    grup: "kiloan",
    nama: "Kilat 12 Jam",
    deskripsi: "Paket kilat 12 jam pengerjaan.",
    durasi: "12 jam",
    items: [
      { id: 273, nama: "Cuci + Setrika", harga: 12000, tipe: "per_kilo", ket: "Cuci, kering, dan setrika" },
      { id: 274, nama: "Cuci Lipat", harga: 9000, tipe: "per_kilo", ket: "Cuci dan lipat" },
      { id: 275, nama: "Setrika", harga: 9000, tipe: "per_kilo", ket: "Setrika saja" },
    ],
  },
  {
    id: "kilat-6",
    grup: "kiloan",
    nama: "Kilat 6 Jam",
    deskripsi: "Paket kilat 6 jam pengerjaan.",
    durasi: "6 jam",
    items: [
      { id: 8, nama: "Cuci + Setrika", harga: 17000, tipe: "per_kilo", ket: "Cuci, kering, dan setrika" },
      { id: 253, nama: "Cuci Lipat", harga: 12000, tipe: "per_kilo", ket: "Cuci dan lipat" },
      { id: 241, nama: "Setrika", harga: 12000, tipe: "per_kilo", ket: "Setrika saja" },
    ],
  },
  {
    id: "kilat-4",
    grup: "kiloan",
    nama: "Kilat 4 Jam",
    deskripsi: "Paket kilat 4 jam pengerjaan.",
    durasi: "4 jam",
    items: [
      { id: 7, nama: "Cuci + Setrika", harga: 22000, tipe: "per_kilo", ket: "Cuci, kering, dan setrika" },
      { id: 254, nama: "Cuci Lipat", harga: 14000, tipe: "per_kilo", ket: "Cuci dan lipat" },
      { id: 242, nama: "Setrika", harga: 14000, tipe: "per_kilo", ket: "Setrika saja" },
    ],
  },
  {
    id: "satuan",
    grup: "satuan",
    nama: "Pakaian Satuan",
    deskripsi: "Perawatan pakaian harian dan pakaian khusus, dihitung per pcs.",
    durasi: "2 hari",
    items: [
      { id: 33, nama: "Kaos", harga: 10000, tipe: "satuan", ket: "Kaos oblong" },
      { id: 34, nama: "Kaos Kerah", harga: 10000, tipe: "satuan" },
      { id: 47, nama: "Kaos Dalam", harga: 3000, tipe: "satuan" },
      { id: 24, nama: "Seragam", harga: 20000, tipe: "satuan" },
      { id: 14, nama: "Mukena / Kain / Sarung", harga: 10000, tipe: "satuan" },
      { id: 15, nama: "Sapu Tangan", harga: 4000, tipe: "satuan" },
      { id: 46, nama: "Jilbab", harga: 5000, tipe: "satuan" },
      { id: 23, nama: "Piyama / Baju Tidur", harga: 10000, tipe: "satuan" },
      { id: 16, nama: "Sweater / Baju Hangat", harga: 20000, tipe: "satuan" },
      { id: 36, nama: "Jaket Biasa", harga: 20000, tipe: "satuan" },
      { id: 35, nama: "Jaket Kulit", harga: 30000, tipe: "satuan" },
      { id: 32, nama: "Rompi", harga: 10000, tipe: "satuan" },
      { id: 25, nama: "Kemeja Pendek", harga: 12000, tipe: "satuan" },
      { id: 26, nama: "Kemeja Panjang", harga: 15000, tipe: "satuan" },
      { id: 228, nama: "Kemeja", harga: 15000, tipe: "satuan" },
      { id: 17, nama: "Celana Bahan Panjang", harga: 8000, tipe: "satuan" },
      { id: 27, nama: "Celana Jeans Pendek", harga: 10000, tipe: "satuan" },
      { id: 28, nama: "Celana Jeans Panjang", harga: 15000, tipe: "satuan" },
      { id: 227, nama: "Celana Training", harga: 10000, tipe: "satuan" },
      { id: 20, nama: "Dress Pendek", harga: 20000, tipe: "satuan" },
      { id: 21, nama: "Dress Panjang", harga: 25000, tipe: "satuan" },
      { id: 19, nama: "Gaun", harga: 50000, tipe: "satuan" },
      { id: 18, nama: "Gaun Anak", harga: 25000, tipe: "satuan" },
      { id: 22, nama: "Kebaya", harga: 50000, tipe: "satuan" },
      { id: 10, nama: "Gamis", harga: 40000, tipe: "satuan" },
      { id: 11, nama: "Blouse", harga: 20000, tipe: "satuan" },
      { id: 12, nama: "Batik Lengan Panjang", harga: 20000, tipe: "satuan" },
      { id: 13, nama: "Batik Lengan Pendek", harga: 8000, tipe: "satuan" },
      { id: 29, nama: "Jas Atasan", harga: 25000, tipe: "satuan" },
      { id: 30, nama: "Setelan Jas", harga: 35000, tipe: "satuan" },
      { id: 31, nama: "Jas Dokter", harga: 15000, tipe: "satuan" },
      { id: 54, nama: "Handuk Besar", harga: 18000, tipe: "satuan" },
      { id: 55, nama: "Handuk Sedang", harga: 12000, tipe: "satuan" },
      { id: 56, nama: "Handuk Kecil", harga: 8000, tipe: "satuan" },
      { id: 57, nama: "Sarung Tangan", harga: 10000, tipe: "satuan" },
      { id: 58, nama: "Kaos Kaki / Dasi", harga: 4000, tipe: "satuan" },
      { id: 261, nama: "Topi", harga: 15000, tipe: "satuan" },
      { id: 276, nama: "Gendongan", harga: 15000, tipe: "satuan" },
      { id: 272, nama: "Rumah Kucing", harga: 55000, tipe: "satuan" },
      { id: 41, nama: "Sajadah", harga: 10000, tipe: "satuan" },
      { id: 40, nama: "Gordyn Tebal", harga: 12000, tipe: "meter" },
      { id: 207, nama: "Gordyn Tipis", harga: 8000, tipe: "meter" },
      { id: 268, nama: "Gordyn Biasa", harga: 6500, tipe: "meter" },
      { id: 256, nama: "Karpet Tebal", harga: 12000, tipe: "meter" },
      { id: 202, nama: "Karpet Tipis", harga: 10000, tipe: "meter" },
    ],
  },
  {
    id: "bed-cover",
    grup: "satuan",
    nama: "Bed Cover",
    deskripsi: "Dicuci dan dikeringkan sempurna, lalu dilipat rapi.",
    durasi: "3 hari",
    items: [
      { id: 277, nama: "Bed Cover Bayi", harga: 8000, tipe: "satuan" },
      { id: 42, nama: "Bed Cover Kecil", harga: 20000, tipe: "satuan", ket: "160 x 200 cm" },
      { id: 43, nama: "Bed Cover Sedang", harga: 25000, tipe: "satuan", ket: "180 x 200 cm" },
      { id: 44, nama: "Bed Cover Besar", harga: 30000, tipe: "satuan", ket: "200 x 200 cm lebih" },
      { id: 264, nama: "1 Set Bed Cover Kecil", harga: 32000, tipe: "satuan", ket: "Bed cover, sprei, 2 sarung bantal, 2 sarung guling" },
      { id: 265, nama: "1 Set Bed Cover Sedang", harga: 38000, tipe: "satuan" },
      { id: 45, nama: "1 Set Bed Cover Besar", harga: 45000, tipe: "satuan" },
    ],
  },
  {
    id: "selimut",
    grup: "satuan",
    nama: "Selimut",
    deskripsi: "Selimut berbagai ukuran, dicuci dengan deterjen lembut.",
    durasi: "3 hari",
    items: [
      { id: 39, nama: "Selimut Kecil", harga: 10000, tipe: "satuan" },
      { id: 9, nama: "Selimut", harga: 12000, tipe: "satuan" },
      { id: 38, nama: "Selimut Sedang", harga: 15000, tipe: "satuan" },
      { id: 37, nama: "Selimut Besar", harga: 20000, tipe: "satuan" },
    ],
  },
  {
    id: "sprei",
    grup: "satuan",
    nama: "Sprei",
    deskripsi: "Sprei bersih dan wangi, siap dipakai kembali.",
    durasi: "3 hari",
    items: [
      { id: 230, nama: "Sprei Kecil", harga: 10000, tipe: "satuan" },
      { id: 231, nama: "Sprei Sedang", harga: 14000, tipe: "satuan" },
      { id: 232, nama: "Sprei Besar", harga: 18000, tipe: "satuan" },
    ],
  },
  {
    id: "bantal",
    grup: "satuan",
    nama: "Bantal & Guling",
    deskripsi: "Bantal dan guling dicuci sampai bagian dalamnya bersih.",
    durasi: "3 hari",
    items: [
      { id: 50, nama: "Bantal / Guling Kecil", harga: 20000, tipe: "satuan", ket: "< 40 cm" },
      { id: 49, nama: "Bantal / Guling Sedang", harga: 25000, tipe: "satuan", ket: "45 - 60 cm" },
      { id: 48, nama: "Bantal / Guling Besar", harga: 30000, tipe: "satuan", ket: "> 60 cm" },
    ],
  },
  {
    id: "boneka",
    grup: "satuan",
    nama: "Boneka",
    deskripsi: "Boneka kesayangan dicuci higienis dan tetap lembut.",
    durasi: "2-3 hari",
    items: [
      { id: 53, nama: "Boneka Extra Kecil", harga: 10000, tipe: "satuan", ket: "Di bawah 20 cm" },
      { id: 247, nama: "Boneka Kecil", harga: 20000, tipe: "satuan", ket: "20 - 40 cm" },
      { id: 52, nama: "Boneka Sedang", harga: 30000, tipe: "satuan", ket: "40 - 70 cm" },
      { id: 51, nama: "Boneka Besar", harga: 40000, tipe: "satuan", ket: "70 - 100 cm" },
      { id: 246, nama: "Boneka Jumbo", harga: 60000, tipe: "satuan", ket: "Di atas 100 cm" },
    ],
  },
  {
    id: "keset",
    grup: "satuan",
    nama: "Keset",
    deskripsi: "Keset dibersihkan dari debu dan kotoran membandel.",
    durasi: "2 hari",
    items: [{ id: 243, nama: "Keset", harga: 5000, tipe: "satuan" }],
  },
  {
    id: "kasur",
    grup: "satuan",
    nama: "Kasur",
    deskripsi: "Perawatan kasur lantai dan kasur palembang.",
    durasi: "7 hari",
    items: [
      { id: 266, nama: "Kasur Palembang", harga: 16000, tipe: "meter" },
      { id: 240, nama: "Kasur Lantai Besar", harga: 47000, tipe: "satuan" },
    ],
  },
  {
    id: "sepatu",
    grup: "sepatu",
    nama: "Cuci Sepatu",
    deskripsi: "Sneakers, sepatu kerja, dan sepatu formal dibersihkan sampai detail.",
    durasi: "1-3 hari",
    items: [
      { id: 203, nama: "Fast Clean", harga: 25000, tipe: "satuan", ket: "Pembersihan cepat bagian luar" },
      { id: 204, nama: "Deep Clean - Canvas / Mesh / Nylon", harga: 35000, tipe: "satuan" },
      { id: 205, nama: "Deep Clean - Suede / Nubuck / Krit", harga: 40000, tipe: "satuan" },
      { id: 206, nama: "Deep Clean - Leather", harga: 45000, tipe: "satuan" },
    ],
  },
  {
    id: "dry-clean",
    grup: "dryclean",
    nama: "Dry Clean",
    deskripsi: "Perawatan khusus tanpa air untuk bahan dan pakaian istimewa.",
    durasi: "2 hari",
    items: [
      { id: 217, nama: "Kemeja Pendek", harga: 17000, tipe: "satuan" },
      { id: 218, nama: "Kemeja Panjang", harga: 20000, tipe: "satuan" },
      { id: 229, nama: "Kemeja", harga: 20000, tipe: "satuan" },
      { id: 211, nama: "Batik Pendek", harga: 20000, tipe: "satuan" },
      { id: 210, nama: "Batik Panjang", harga: 25000, tipe: "satuan" },
      { id: 209, nama: "Blouse", harga: 25000, tipe: "satuan" },
      { id: 214, nama: "Dress Pendek", harga: 25000, tipe: "satuan" },
      { id: 223, nama: "Jaket", harga: 25000, tipe: "satuan" },
      { id: 212, nama: "Gaun Anak", harga: 30000, tipe: "satuan" },
      { id: 215, nama: "Dress Panjang", harga: 30000, tipe: "satuan" },
      { id: 219, nama: "Jas Atasan", harga: 30000, tipe: "satuan" },
      { id: 221, nama: "Jas Dokter", harga: 20000, tipe: "satuan" },
      { id: 220, nama: "Setelan Jas", harga: 40000, tipe: "satuan" },
      { id: 222, nama: "Jaket Kulit", harga: 40000, tipe: "satuan" },
      { id: 208, nama: "Gamis", harga: 45000, tipe: "satuan" },
      { id: 213, nama: "Gaun", harga: 55000, tipe: "satuan" },
      { id: 216, nama: "Kebaya", harga: 55000, tipe: "satuan" },
    ],
  },
  {
    id: "tas",
    grup: "lainnya",
    nama: "Tas",
    deskripsi: "Tas harian, tas gunung, sampai tas kulit dirawat sesuai bahan.",
    durasi: "3 hari",
    items: [
      { id: 267, nama: "Pouch", harga: 10000, tipe: "satuan" },
      { id: 236, nama: "Tas Pinggang", harga: 15000, tipe: "satuan" },
      { id: 262, nama: "Totebag", harga: 15000, tipe: "satuan" },
      { id: 263, nama: "Sling Bag", harga: 15000, tipe: "satuan" },
      { id: 234, nama: "Tas Jinjing", harga: 20000, tipe: "satuan" },
      { id: 225, nama: "Tas Ransel", harga: 22000, tipe: "satuan" },
      { id: 233, nama: "Tas Gunung", harga: 32000, tipe: "satuan" },
      { id: 235, nama: "Tas Kulit", harga: 40000, tipe: "satuan" },
    ],
  },
  {
    id: "sandal",
    grup: "lainnya",
    nama: "Sandal",
    deskripsi: "Sandal dibersihkan sampai ke sela-sela dan sol.",
    durasi: "3 hari",
    items: [{ id: 226, nama: "Sandal", harga: 17000, tipe: "satuan" }],
  },
  {
    id: "helm",
    grup: "lainnya",
    nama: "Helm",
    deskripsi: "Bagian luar dan dalam helm dibersihkan, bebas bau.",
    durasi: "3 hari",
    items: [
      { id: 237, nama: "Fast Clean Helm", harga: 25000, tipe: "satuan" },
      { id: 238, nama: "Deep Clean Helm", harga: 35000, tipe: "satuan" },
    ],
  },
  {
    id: "koper",
    grup: "lainnya",
    nama: "Koper",
    deskripsi: "Koper berbagai ukuran dibersihkan menyeluruh.",
    durasi: "3 hari",
    items: [
      { id: 249, nama: "Koper Kecil", harga: 35000, tipe: "satuan", ket: "Di bawah 24 inch" },
      { id: 250, nama: "Koper Sedang", harga: 50000, tipe: "satuan", ket: "24 inch" },
      { id: 251, nama: "Koper Besar", harga: 70000, tipe: "satuan", ket: "28 inch" },
      { id: 252, nama: "Koper X-Tra Besar", harga: 90000, tipe: "satuan" },
    ],
  },
  {
    id: "stroller",
    grup: "lainnya",
    nama: "Stroller",
    deskripsi: "Stroller bayi dibersihkan hingga bagian kain dan rangkanya.",
    durasi: "3 hari",
    items: [
      { id: 270, nama: "Stroller S", harga: 65000, tipe: "satuan", ket: "Panjang 60-70 cm" },
      { id: 271, nama: "Stroller Besar", harga: 85000, tipe: "satuan", ket: "Panjang 80-100 cm" },
    ],
  },
  {
    id: "karpet-express",
    grup: "lainnya",
    nama: "Karpet Express",
    deskripsi: "Karpet tipis dengan pengerjaan express 1 hari.",
    durasi: "1 hari",
    items: [{ id: 257, nama: "Karpet Tipis Express", harga: 10000, tipe: "per_kilo" }],
  },
];

/** Katalog final: hanya kategori & item yang `tampil` bukan false. */
export const kategoriHarga = katalog
  .filter((kategori) => kategori.tampil !== false)
  .map((kategori) => ({
    ...kategori,
    items: kategori.items.filter((item) => item.tampil !== false),
  }))
  .filter((kategori) => kategori.items.length > 0);

/** Semua item aktif, sudah dilengkapi nama kategori, durasi, dan satuan. */
export const semuaItem = kategoriHarga.flatMap((kategori) =>
  kategori.items.map((item) => ({
    ...item,
    kategori: kategori.nama,
    durasi: kategori.durasi,
    satuan: item.satuan || satuanLabel[item.tipe] || "pcs",
  }))
);

/** Ambil harga berdasarkan id item pada tabel jenis_cucis. */
const ambilHarga = (id) => {
  for (const kategori of katalog) {
    const item = kategori.items.find((baris) => baris.id === id)
    if (item) return item.harga
  }
  return 0
};

const minHarga = (...ids) => Math.min(...ids.map(ambilHarga));
const maxHarga = (...ids) => Math.max(...ids.map(ambilHarga));

/** Ringkasan harga yang dipakai kartu paket, kalkulator, dan halaman layanan. */
export const harga = {
  kiloanReguler: {
    cuciLipat: ambilHarga(5),
    setrika: ambilHarga(6),
    cuciSetrika: ambilHarga(4),
  },
  kiloanExpress: {
    cuciLipat: ambilHarga(1),
    setrika: ambilHarga(3),
    cuciSetrika: ambilHarga(2),
  },
  kilat12: {
    cuciLipat: ambilHarga(274),
    setrika: ambilHarga(275),
    cuciSetrika: ambilHarga(273),
  },
  kilat6: {
    cuciLipat: ambilHarga(253),
    setrika: ambilHarga(241),
    cuciSetrika: ambilHarga(8),
  },
  kilat4: {
    cuciLipat: ambilHarga(254),
    setrika: ambilHarga(242),
    cuciSetrika: ambilHarga(7),
  },
  cuciSatuan: {
    mulai: minHarga(33, 34, 47, 24, 14, 15, 46, 23, 16, 36, 35, 32, 25, 26, 228, 17, 27, 28, 227, 20, 21, 19, 18, 22, 10, 11, 12, 13, 29, 30, 31, 54, 55, 56, 57, 58, 261, 276, 272, 41),
  },
  sepatu: {
    fastClean: ambilHarga(203),
    deepCleanMin: minHarga(204, 205, 206),
    deepCleanMax: maxHarga(204, 205, 206),
  },
  bedCover: {
    mulai: minHarga(42, 43, 44),
  },
  selimut: {
    mulai: minHarga(39, 9, 38, 37),
  },
};

/** Pilihan layanan pada kalkulator estimasi di beranda. */
export const serviceOptions = [
  {
    id: "cuci_setrika_reguler",
    name: "Cuci + Setrika Reguler",
    price: harga.kiloanReguler.cuciSetrika,
    unit: "kg",
    duration: "2 Hari",
    category: "kiloan",
  },
  {
    id: "cuci_setrika_express",
    name: "Cuci + Setrika Express",
    price: harga.kiloanExpress.cuciSetrika,
    unit: "kg",
    duration: "1 Hari (24 Jam)",
    category: "express",
  },
  {
    id: "cuci_setrika_kilat12",
    name: "Cuci + Setrika Kilat 12 Jam",
    price: harga.kilat12.cuciSetrika,
    unit: "kg",
    duration: "12 Jam",
    category: "express",
  },
  {
    id: "cuci_lipat_reguler",
    name: "Cuci Lipat Saja",
    price: harga.kiloanReguler.cuciLipat,
    unit: "kg",
    duration: "2 Hari",
    category: "kiloan",
  },
  {
    id: "setrika_reguler",
    name: "Setrika Rapi Saja",
    price: harga.kiloanReguler.setrika,
    unit: "kg",
    duration: "2 Hari",
    category: "kiloan",
  },
  {
    id: "sepatu_deep",
    name: "Cuci Sepatu (Deep Clean)",
    price: harga.sepatu.deepCleanMin,
    unit: "pasang",
    duration: "1-3 Hari",
    category: "sepatu",
  },
  {
    id: "bed_cover",
    name: "Bed Cover / Selimut Besar",
    price: harga.bedCover.mulai,
    unit: "pcs",
    duration: "3 Hari",
    category: "satuan",
  },
  {
    id: "dry_clean_jas",
    name: "Dry Clean Setelan Jas",
    price: ambilHarga(220),
    unit: "pcs",
    duration: "2 Hari",
    category: "dryclean",
  },
];

/** Tab filter paket di section harga beranda. */
export const priceTabs = [
  { id: "all", label: "Semua paket" },
  { id: "kiloan", label: "Kiloan reguler" },
  { id: "express", label: "Express & kilat" },
  { id: "satuan", label: "Satuan & rumah" },
  { id: "sepatu", label: "Perawatan sepatu" },
];

/** Tab filter katalog harga lengkap di halaman /layanan. */
export const grupHarga = [
  { id: "semua", label: "Semua" },
  { id: "kiloan", label: "Kiloan" },
  { id: "satuan", label: "Satuan & rumah" },
  { id: "sepatu", label: "Sepatu" },
  { id: "dryclean", label: "Dry clean" },
  { id: "lainnya", label: "Lainnya" },
];

/** Kartu paket unggulan di beranda dan /layanan. */
export const packages = [
  {
    id: "reguler",
    category: "kiloan",
    title: "Kiloan Reguler",
    subtitle: "Pilihan hemat untuk pakaian harian",
    price: formatRp(harga.kiloanReguler.cuciLipat),
    unit: "/ kg",
    tag: "Hemat bersahabat",
    popular: false,
    img: "/img/paket/kiloan.png",
    features: [
      `Cuci lipat wangi: Rp ${formatRp(harga.kiloanReguler.cuciLipat)}/kg`,
      `Setrika rapi saja: Rp ${formatRp(harga.kiloanReguler.setrika)}/kg`,
      `Cuci + setrika: Rp ${formatRp(harga.kiloanReguler.cuciSetrika)}/kg`,
      "Pengerjaan 2 hari",
      "Higienis 1 mesin 1 pelanggan",
      "Gratis antar jemput (max 5 km)",
    ],
  },
  {
    id: "express",
    category: "express",
    title: "Kiloan Express",
    subtitle: "Selesai kilat saat pakaian mendesak",
    price: formatRp(harga.kiloanExpress.cuciLipat),
    unit: "/ kg",
    tag: "Paling laris",
    popular: true,
    img: "/img/paket/dry-clean.png",
    features: [
      `Cuci lipat express: Rp ${formatRp(harga.kiloanExpress.cuciLipat)}/kg`,
      `Setrika express: Rp ${formatRp(harga.kiloanExpress.setrika)}/kg`,
      `Cuci + setrika: Rp ${formatRp(harga.kiloanExpress.cuciSetrika)}/kg`,
      "Pengerjaan 1 hari (24 jam)",
      "Detergen & softener premium",
      "Gratis antar jemput (max 5 km)",
    ],
  },
  {
    id: "satuan",
    category: "satuan",
    title: "Cuci Satuan",
    subtitle: "Perawatan khusus perlengkapan rumah",
    price: formatRp(harga.cuciSatuan.mulai),
    unit: "/ pcs",
    tag: "Perawatan khusus",
    popular: false,
    img: "/img/paket/satuan.png",
    features: [
      `Pakaian satuan mulai Rp ${formatRp(harga.cuciSatuan.mulai)}/pcs`,
      `Bed cover mulai Rp ${formatRp(harga.bedCover.mulai)}/pcs`,
      `Selimut mulai Rp ${formatRp(harga.selimut.mulai)}/pcs`,
      "Boneka, sprei, bantal & gorden",
      "Plastik pelindung rapi",
      "Gratis antar jemput (max 5 km)",
    ],
  },
  {
    id: "sepatu",
    category: "sepatu",
    title: "Shoes Care",
    subtitle: "Bersih untuk sneakers & sepatu kerja",
    price: formatRp(harga.sepatu.fastClean),
    unit: "/ pasang",
    tag: "Fresh sneakers",
    popular: false,
    img: "/img/paket/sepatu.png",
    features: [
      `Fast clean: Rp ${formatRp(harga.sepatu.fastClean)}`,
      `Deep clean: Rp ${formatRp(harga.sepatu.deepCleanMin)}–${formatRp(harga.sepatu.deepCleanMax)}`,
      "Un-yellowing sol sepatu",
      "Anti-bacterial & pewangi khusus",
      "Pengerjaan 1–3 hari",
      "Gratis antar jemput (max 5 km)",
    ],
  },
];

export const priceNote =
  "Harga diambil dari daftar resmi Harmony Laundry. Biaya tambahan seperti ongkir di luar jarak gratis, charge penanganan khusus, dan extra waktu dihitung terpisah.";
