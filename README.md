# Harmony Laundry - Website Antar Jemput Laundry Yogyakarta

[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg?style=flat&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?style=flat&logo=react)](https://reactjs.org/)

Website resmi **Harmony Laundry**, penyedia layanan laundry kiloan dan satuan di Daerah Istimewa Yogyakarta dengan fitur unggulan antar-jemput gratis (maksimal 5 km).

## 📸 Screenshots

| Landing Page | Booking Page (Glassmorphism) |
| :---: | :---: |
| ![Landing Page](public/screenshots/landing.png) | ![Booking Page](public/screenshots/pesan.png) |

## 🚀 Fitur Utama

- **Modern & Premium UI**: Desain menggunakan konsep *Dark Glassmorphism* yang elegan dan responsif.
- **Micro-Animations**: Efek visual yang dinamis dengan latar belakang bubble kaca blur dan animasi blob kustom.
- **Booking Online**: Form pemesanan yang mudah untuk layanan antar-jemput.
- **Blog System**: Sistem blog terintegrasi menggunakan Markdown untuk optimasi konten.
- **SEO Optimized**: Sudah dilengkapi dengan sitemap dinamis, robots.txt, metadata lengkap, dan canonical URL untuk setiap halaman.
- **PWA Ready**: Dukungan manifest untuk pengalaman aplikasi di perangkat mobile.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: AOS (Animate On Scroll) & Custom CSS Animations
- **Icons**: React Icons
- **Logging**: Winston
- **Data Fetching**: Axios

## 📂 Struktur Proyek

- `src/app`: Definisi rute dan halaman utama (App Router).
- `src/components`: Komponen UI yang reusable (Hero, Features, Contact, dll).
- `src/assets`: Aset gambar dan file statis lainnya.
- `src/lib`: Logic dan utilitas bantuan.
- `src/posts`: Konten tulisan blog dalam format Markdown.

## 🏁 Memulai

### Prasyarat
- Node.js versi terbaru
- npm atau yarn

### Instalasi
1. Clone repository:
   ```bash
   git clone https://github.com/patriotkusuma/harmonylaundry.git
   ```
2. Masuk ke direktori:
   ```bash
   cd harmonylaundry
   ```
3. Install dependensi:
   ```bash
   npm install
   ```

### Pengembangan
Jalankan server pengembangan:
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### Production
Build aplikasi untuk production:
```bash
npm run build
npm start
```

## 📄 Lisensi
Proyek ini bersifat privat/komersial untuk Harmony Laundry.

---
Dikembangkan dengan ❤️ oleh **Harmony Laundry Team**
