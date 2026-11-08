import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import {
  LuArrowRight,
  LuBedDouble,
  LuCheck,
  LuChevronDown,
  LuFootprints,
  LuLayers,
  LuPackageSearch,
  LuShieldCheck,
  LuShirt,
  LuSparkles,
  LuTruck,
  LuWaves,
} from 'react-icons/lu'
import { formatRp, harga, packages, priceNote, waLink } from '@/data/harga'
import DaftarHarga from '@/components/DaftarHarga'

export const metadata = {
  title: 'Layanan Laundry Kiloan, Satuan & Sepatu | Harmony Laundry Yogyakarta',
  description:
    'Layanan laundry lengkap di Yogyakarta: cuci kiloan reguler & express, cuci satuan, bed cover, gorden, dan cuci sepatu. Gratis antar-jemput jarak 5 km.',
  keywords:
    'laundry kiloan jogja, laundry satuan jogja, cuci sepatu jogja, cuci bed cover, laundry antar jemput',
  alternates: {
    canonical: 'https://harmonylaundrys.com/layanan',
  },
  openGraph: {
    title: 'Layanan Laundry Lengkap | Harmony Laundry Yogyakarta',
    description:
      'Cuci kiloan, satuan, bed cover, dan sepatu dengan standar higienis 1 mesin 1 pelanggan. Gratis antar-jemput jarak 5 km.',
    url: 'https://harmonylaundrys.com/layanan',
    siteName: 'Harmony Laundry',
    type: 'website',
    images: {
      url: 'https://harmonylaundrys.com/img/logo.png',
      alt: 'Harmony Laundry Yogyakarta',
    },
  },
}

const detailLayanan = {
  reguler: 'Pakaian harian, seragam kerja, dan cucian kos dengan hasil wangi yang tahan lama.',
  express: 'Untuk pakaian yang mendesak—selesai dalam 24 jam tanpa mengurangi kerapian.',
  satuan: 'Perawatan khusus untuk bed cover, selimut, gorden, karpet, boneka, dan pakaian pesta.',
  sepatu: 'Sneakers, sepatu kerja, dan sepatu formal dibersihkan sampai ke sol dan detailnya.',
}

const layananSatuan = [
  {
    icon: LuBedDouble,
    title: 'Bed cover & selimut',
    desc: 'Dicuci dengan deterjen lembut, dikeringkan sempurna, lalu dilipat rapi.',
  },
  {
    icon: LuWaves,
    title: 'Gorden, karpet & sajadah',
    desc: 'Debu dan bau hilang, serat kain tetap aman, hasil wangi segar.',
  },
  {
    icon: LuLayers,
    title: 'Boneka & pakaian pesta',
    desc: 'Jas, gaun, dan boneka kesayangan dirawat dengan standar khusus.',
  },
  {
    icon: LuFootprints,
    title: 'Cuci sepatu',
    desc: 'Fast clean Rp ' + formatRp(harga.sepatu.fastClean) + ', deep clean mulai Rp ' + formatRp(harga.sepatu.deepCleanMin) + '.',
  },
]

const standarLaundry = [
  {
    icon: LuShieldCheck,
    title: '1 mesin 1 pelanggan',
    desc: 'Cucianmu tidak pernah dicampur dengan cucian orang lain.',
  },
  {
    icon: LuSparkles,
    title: 'Detergen & softener premium',
    desc: 'Formula lembut yang menjaga warna, serat, dan aroma pakaian.',
  },
  {
    icon: LuShirt,
    title: 'Setrika uap rapi',
    desc: 'Bebas kusut tanpa merusak sablon, bordir, atau bahan sensitif.',
  },
  {
    icon: LuCheck,
    title: 'Garansi cuci ulang',
    desc: 'Kalau hasilnya kurang bersih atau kurang rapi, kami kerjakan ulang gratis.',
  },
]

const faqs = [
  {
    q: 'Apakah benar 1 mesin 1 pelanggan?',
    a: 'Benar. Setiap pesanan dicuci di mesin terpisah agar tidak tercampur dengan cucian pelanggan lain. Ini standar kebersihan dan privasi yang kami pegang.',
  },
  {
    q: 'Berapa lama pengerjaan laundry?',
    a: 'Paket reguler selesai dalam 2 hari. Paket express selesai dalam 1 hari (24 jam). Untuk kebutuhan mendesak, tanyakan ketersediaan layanan kilat via WhatsApp.',
  },
  {
    q: 'Apakah antar-jemput benar-benar gratis?',
    a: 'Gratis untuk jarak maksimal 5 km dari outlet Condongcatur, Sleman. Di luar jarak itu, tim kami akan menginformasikan biaya tambahan terlebih dahulu.',
  },
  {
    q: 'Bisa cuci sepatu, bed cover, dan gorden?',
    a: 'Bisa. Kami melayani cuci sepatu, bed cover, selimut, gorden, karpet, sajadah, boneka, jas, dan gaun dengan perlakuan khusus sesuai bahan.',
  },
  {
    q: 'Bagaimana kalau hasil cucian kurang bersih?',
    a: 'Kami memberikan garansi cuci ulang gratis. Cukup hubungi WhatsApp kami dengan foto dan kode pesanan, tim akan membantu menyelesaikannya.',
  },
  {
    q: 'Bagaimana cara melacak pesanan?',
    a: 'Gunakan halaman Lacak Pesanan dan masukkan kode pesanan yang kamu terima saat booking. Status cucian akan langsung ditampilkan.',
  },
]

const layananJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

function LayananPage() {
  return (
    <main className="bg-cream-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(layananJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-40 mask-fade-b" />
        <div className="pointer-events-none absolute inset-0 bg-bubbles opacity-70 mask-fade-b" />
        <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-brand-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-1/3 h-96 w-96 rounded-full bg-citrus-200/40 blur-3xl" />

        <div className="container-page relative z-10">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <span className="eyebrow">
                <LuWaves className="text-brand-600" />
                Layanan laundry lengkap
              </span>
              <h1 className="mt-5 max-w-2xl font-display text-[2.5rem] font-extrabold leading-[1.02] tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-[3.6rem]">
                Semua kebutuhan <span className="marker-highlight px-1">laundry</span>, satu tempat.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-500 text-pretty sm:text-lg">
                Dari cucian harian sampai sepatu favorit. Kami jemput, cuci higienis, setrika
                rapi, lalu antar kembali ke depan pintu.
              </p>

              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a
                  href={waLink('Halo Harmony Laundry! Saya ingin pesan layanan laundry.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brand btn-lg w-full sm:w-auto"
                >
                  <FaWhatsapp className="text-xl" />
                  Pesan antar-jemput
                </a>
                <Link href="/lacak" className="btn-light btn-lg w-full sm:w-auto">
                  <LuPackageSearch className="text-base" />
                  Lacak pesanan
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {['Kiloan', 'Satuan', 'Sepatu', 'Bed cover', 'Gorden', 'Antar jemput'].map(
                  (item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-white px-3 py-1.5 text-[11px] font-bold text-ink-600"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Visual */}
            <div className="relative lg:col-span-5">
              <div className="absolute -inset-4 -rotate-2 rounded-[2.4rem] bg-brand-100/70" />
              <div className="absolute -inset-4 rotate-2 rounded-[2.4rem] border-2 border-dashed border-ink-900/10" />
              <div className="relative grid grid-cols-2 gap-3 rounded-[2rem] border-[6px] border-white bg-gradient-to-br from-brand-50 to-cream-50 p-4 shadow-lift">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="flex flex-col items-center justify-center rounded-2xl border border-ink-900/5 bg-white p-4 text-center"
                  >
                    <img
                      src={pkg.img}
                      alt={pkg.title}
                      className="h-16 w-16 object-contain"
                      loading="lazy"
                    />
                    <span className="mt-2 text-[11px] font-extrabold text-ink-800">
                      {pkg.title}
                    </span>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-ink-900/10 bg-white px-4 py-2 text-[11px] font-extrabold text-ink-800 shadow-card">
                <LuTruck className="text-brand-600" />
                Gratis antar-jemput jarak 5 km
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Paket utama */}
      <section className="border-y border-brand-100 bg-white/70 py-20 sm:py-24">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="eyebrow">
              <LuShirt className="text-brand-600" />
              Pilih paketmu
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
              Laundry sesuai <span className="text-brand-700">kebutuhanmu.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Semua paket sudah termasuk detergen, pewangi, dan gratis antar-jemput jarak 5 km.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
            {packages.map((pkg) => (
              <article
                key={pkg.id}
                id={`paket-${pkg.id}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border p-6 transition-all duration-300 hover:-translate-y-1.5 sm:p-7 ${
                  pkg.popular
                    ? 'border-ink-900 bg-ink-900 shadow-lift'
                    : 'border-ink-900/10 bg-white shadow-sm hover:border-brand-200 hover:shadow-card'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute right-5 top-5 rounded-full bg-citrus-300 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-ink-900">
                    {pkg.tag}
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl border p-2.5 ${
                        pkg.popular
                          ? 'border-white/10 bg-white/10'
                          : 'border-brand-100 bg-brand-50'
                      }`}
                    >
                      <img
                        src={pkg.img}
                        alt={pkg.title}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </span>
                    <div>
                      <h3
                        className={`font-display text-xl font-extrabold ${
                          pkg.popular ? 'text-cream-50' : 'text-ink-900'
                        }`}
                      >
                        {pkg.title}
                      </h3>
                      <p
                        className={`mt-1 text-xs leading-snug ${
                          pkg.popular ? 'text-ink-300' : 'text-ink-500'
                        }`}
                      >
                        {detailLayanan[pkg.id]}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span
                      className={`text-xs font-bold ${
                        pkg.popular ? 'text-ink-300' : 'text-ink-400'
                      }`}
                    >
                      Mulai Rp
                    </span>
                    <span
                      className={`font-display text-3xl font-extrabold tracking-tight ${
                        pkg.popular ? 'text-cream-50' : 'text-ink-900'
                      }`}
                    >
                      {pkg.price}
                    </span>
                    <span
                      className={`text-[11px] font-semibold ${
                        pkg.popular ? 'text-ink-300' : 'text-ink-500'
                      }`}
                    >
                      {pkg.unit}
                    </span>
                  </div>

                  <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {pkg.features.map((feat) => (
                      <li
                        key={feat}
                        className={`flex items-start gap-2 text-xs leading-snug ${
                          pkg.popular ? 'text-ink-300' : 'text-ink-600'
                        }`}
                      >
                        <LuCheck
                          className={`mt-0.5 shrink-0 text-sm ${
                            pkg.popular ? 'text-brand-300' : 'text-brand-700'
                          }`}
                        />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={waLink(
                    `Halo Harmony Laundry! Saya ingin pesan paket *${pkg.title}*. Mohon info penjemputannya.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs font-extrabold transition-all duration-200 ${
                    pkg.popular
                      ? 'bg-brand-400 text-ink-900 hover:bg-brand-300'
                      : 'bg-ink-900 text-cream-50 hover:bg-brand-700'
                  }`}
                >
                  <FaWhatsapp className="text-base" />
                  Pesan paket ini
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Layanan satuan */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-brand-100/70 blur-3xl" />
        <div className="container-page relative">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="eyebrow">
                <LuLayers className="text-brand-600" />
                Layanan satuan
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink-900 text-balance sm:text-4xl">
                Bukan cuma pakaian harian.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-500">
                Perlengkapan rumah dan barang kesayangan juga bisa kami rawat. Mulai dari{' '}
                <strong className="font-bold text-ink-800">
                  Rp {formatRp(harga.cuciSatuan.mulai)}/pcs
                </strong>
                , tergantung jenis dan ukuran.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Bed cover', 'Selimut', 'Gorden', 'Karpet', 'Sajadah', 'Boneka', 'Jas', 'Gaun'].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-ink-900/10 bg-white px-3 py-1.5 text-[11px] font-bold text-ink-600"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              {layananSatuan.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-ink-900/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-100">
                      <Icon className="text-lg" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-extrabold text-ink-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-ink-500">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Standar laundry */}
      <section className="border-y border-brand-100 bg-brand-50/60 py-20 sm:py-24">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="eyebrow border-brand-200 bg-white text-brand-800">
              <LuShieldCheck className="text-brand-600" />
              Standar laundry kami
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
              Higienis, rapi, dan <span className="text-brand-700">bisa diandalkan.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {standarLaundry.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl bg-white p-6 shadow-sm">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                    <Icon className="text-xl" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-extrabold text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-500">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Daftar harga */}
      <section className="py-20 sm:py-24">
        <div className="container-page">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">
              <LuSparkles className="text-brand-600" />
              Daftar harga
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink-900 text-balance sm:text-4xl">
              Transparan sejak awal.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-500">{priceNote}</p>
          </div>

          <DaftarHarga />

          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-2">
            <Link href="/#harga" className="btn-light">
              Hitung estimasi
              <LuArrowRight className="text-sm" />
            </Link>
            <Link href="/pesan" className="btn-dark">
              Booking sekarang
            </Link>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-brand-100 bg-white/70 py-20 sm:py-24">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="eyebrow">
                <LuSparkles className="text-brand-600" />
                Pertanyaan umum
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink-900 text-balance sm:text-4xl">
                Masih ada yang <span className="text-brand-700">bikin ragu?</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-500">
                Ini beberapa hal yang paling sering ditanyakan pelanggan sebelum kirim cucian
                pertama.
              </p>
              <a
                href={waLink('Halo Harmony Laundry! Saya ingin bertanya soal layanan laundry.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-light mt-6"
              >
                <FaWhatsapp className="text-base text-emerald-600" />
                Tanya via WhatsApp
              </a>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-8">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border border-ink-900/10 bg-white p-5 open:border-brand-200 open:shadow-card"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-sm font-extrabold text-ink-900 sm:text-base [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <LuChevronDown className="shrink-0 text-lg text-brand-600 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-500">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 px-6 py-10 shadow-lift sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-brand-500/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-citrus-400/10 blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="font-display text-2xl font-extrabold text-cream-50 sm:text-3xl">
                  Siap kirim cucian kotormu?
                </div>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-300">
                  Pilih layanan, tentukan alamat, dan kurir kami datang menjemput. Gratis untuk
                  jarak 5 km dari outlet Condongcatur.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
                <Link href="/pesan" className="btn-light w-full sm:w-auto">
                  Booking antar jemput
                  <LuArrowRight className="text-sm" />
                </Link>
                <a
                  href={waLink('Halo Harmony Laundry! Saya ingin pesan antar-jemput cucian.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa w-full sm:w-auto"
                >
                  <FaWhatsapp className="text-lg" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LayananPage
