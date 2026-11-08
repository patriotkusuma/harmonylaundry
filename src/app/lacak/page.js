import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import {
  LuArrowRight,
  LuClipboardList,
  LuDroplets,
  LuPackageCheck,
  LuShirt,
  LuTruck,
  LuWaves,
} from 'react-icons/lu'
import LacakForm from './LacakForm'
import { waLink } from '@/data/harga'

export const metadata = {
  title: 'Lacak Pesanan Laundry | Harmony Laundry Yogyakarta',
  description: 'Cek status cucianmu di Harmony Laundry Yogyakarta dengan memasukkan kode pesanan.',
  robots: {
    index: false,
    follow: true,
  },
}

const alur = [
  {
    icon: LuClipboardList,
    title: 'Masuk',
    desc: 'Pesanan diterima dan masuk antrean laundry.',
  },
  {
    icon: LuDroplets,
    title: 'Cuci',
    desc: 'Dicuci higienis di mesin terpisah.',
  },
  {
    icon: LuShirt,
    title: 'Setrika',
    desc: 'Disetrika uap dan dilipat rapi.',
  },
  {
    icon: LuPackageCheck,
    title: 'Selesai',
    desc: 'Siap diambil atau diantar kembali.',
  },
  {
    icon: LuTruck,
    title: 'Diambil',
    desc: 'Cucian kembali ke tanganmu.',
  },
]

function LacakPage() {
  return (
    <main className="relative overflow-hidden pb-20 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-40 mask-fade-b" />
      <div className="pointer-events-none absolute inset-0 bg-bubbles opacity-70 mask-fade-b" />
      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-brand-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-citrus-200/40 blur-3xl" />

      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Form */}
          <div className="lg:col-span-6">
            <span className="eyebrow">
              <LuWaves className="text-brand-600" />
              Lacak pesanan
            </span>
            <h1 className="mt-5 max-w-xl font-display text-[2.5rem] font-extrabold leading-[1.02] tracking-tight text-ink-900 text-balance sm:text-5xl">
              Cek status <span className="marker-highlight px-1">cucianmu.</span>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-500">
              Masukkan kode pesanan untuk melihat progress laundry—dari masuk antrean sampai
              kembali ke rumah.
            </p>

            <div className="mt-8 rounded-[2rem] border border-ink-900/10 bg-white p-5 shadow-card sm:p-7">
              <LacakForm />

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink-900/10 pt-4 text-[11px] font-semibold text-ink-400">
                <span>Belum punya kode pesanan?</span>
                <Link
                  href="/pesan"
                  className="inline-flex items-center gap-1 font-extrabold text-brand-700 hover:text-brand-800"
                >
                  Booking antar-jemput
                  <LuArrowRight className="text-sm" />
                </Link>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/80 p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-brand-700">
                <FaWhatsapp className="text-lg" />
              </span>
              <div className="text-xs leading-relaxed text-ink-500">
                <strong className="font-bold text-ink-800">Kode tidak ditemukan?</strong> Hubungi
                admin via{' '}
                <a
                  href={waLink('Halo Harmony Laundry! Saya ingin bertanya soal status pesanan saya.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-extrabold text-brand-700 hover:text-brand-800"
                >
                  WhatsApp
                </a>{' '}
                dengan nama dan nomor telepon yang dipakai saat booking.
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 p-6 shadow-lift sm:p-8">
              <div className="pointer-events-none absolute -right-14 -top-16 h-56 w-56 rounded-full bg-brand-500/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-citrus-400/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-300">
                      Perjalanan cucianmu
                    </div>
                    <div className="mt-1 font-display text-lg font-extrabold text-cream-50">
                      Dari kotor jadi siap pakai
                    </div>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-brand-300">
                    <LuTruck className="text-xl" />
                  </span>
                </div>

                <div className="mt-6 flex flex-col">
                  {alur.map((step, index) => {
                    const Icon = step.icon
                    const last = index === alur.length - 1

                    return (
                      <div key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
                        {!last && (
                          <span className="absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-px bg-white/10" />
                        )}
                        <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand-400/30 bg-brand-500/15 text-brand-300">
                          <Icon className="text-base" />
                        </span>
                        <div className="pt-1">
                          <div className="text-sm font-extrabold text-cream-50">{step.title}</div>
                          <div className="mt-0.5 text-xs leading-relaxed text-ink-300">
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-[11px] leading-relaxed text-ink-300">
                  Status diperbarui oleh admin setiap kali cucian berpindah tahap. Halaman detail
                  pesanan selalu menampilkan status terbaru saat kamu refresh.
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-ink-900/10 bg-white p-4">
                <div className="font-display text-xl font-extrabold text-brand-700">5 km</div>
                <div className="mt-1 text-[11px] leading-snug text-ink-500">
                  Jarak gratis antar-jemput dari outlet
                </div>
              </div>
              <div className="rounded-2xl border border-ink-900/10 bg-white p-4">
                <div className="font-display text-xl font-extrabold text-brand-700">100%</div>
                <div className="mt-1 text-[11px] leading-snug text-ink-500">
                  Garansi cuci ulang kalau kurang bersih
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LacakPage
