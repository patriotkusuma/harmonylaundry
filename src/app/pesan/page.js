import React from 'react'
import FormPesan from './FormPesan'
import { FaStar } from 'react-icons/fa'
import { LuClock, LuShieldCheck, LuSparkles, LuTruck } from 'react-icons/lu'

export const metadata = {
  title: "Pesan Antar Jemput Laundry Jogja (Gratis 5 KM) | Harmony Laundry",
  description: "Malas mencuci? Pesan layanan Harmony Laundry sekarang! Pakaian dijemput kotor, kembali bersih, wangi & rapi. Nikmati layanan gratis antar jemput s/d 5 km di wilayah Jogja dan sekitarnya.",
  keywords: [
    "Laundry antar jemput Jogja",
    "Laundry Jogja gratis ongkir",
    "Pesan laundry online Jogja",
    "Laundry terdekat 5 km",
    "Harmony Laundry antar jemput",
    "Laundry express Jogja",
  ],
  alternates: {
    canonical: "https://harmonylaundrys.com/pesan",
  },
}

const benefits = [
  {
    icon: LuTruck,
    title: 'Gratis antar jemput (max 5 km)',
    desc: 'Driver menjemput cucian langsung ke depan pintu kos, kontrakan, atau rumahmu.',
    tone: 'bg-brand-100 text-brand-700',
  },
  {
    icon: LuClock,
    title: 'Pilihan express 1 hari jadi',
    desc: 'Tersedia paket kilat saat pakaian dibutuhkan untuk acara penting atau kuliah besok.',
    tone: 'bg-citrus-100 text-citrus-500',
  },
  {
    icon: LuShieldCheck,
    title: '100% higienis, 1 mesin 1 klien',
    desc: 'Pakaianmu tidak pernah dicampur dengan cucian orang lain. Aman, wangi, anti tertukar.',
    tone: 'bg-emerald-100 text-emerald-700',
  },
]

function Pesan() {
  return (
    <div className="relative w-full overflow-hidden bg-cream-100 pb-20 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-40 mask-fade-b" />
      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-brand-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-1/2 h-96 w-96 rounded-full bg-citrus-200/40 blur-3xl" />

      <div className="container-page relative z-10 grid grid-cols-1 items-center gap-12 py-6 lg:grid-cols-12">
        {/* Copy */}
        <div className="flex flex-col gap-6 lg:col-span-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-white/80 px-3.5 py-1.5 text-xs font-bold text-ink-700 shadow-sm backdrop-blur">
              <span className="flex items-center gap-1 text-citrus-500">
                <FaStar className="text-xs" /> 4.9/5
              </span>
              <span className="text-ink-300">•</span>
              <span>1.500+ pelanggan puas di Jogja</span>
            </div>

            <h1 className="mt-5 max-w-xl font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-[3.4rem]">
              Biar kami yang urus <span className="marker-highlight px-1">cucian kotormu.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-500 text-pretty">
              Waktumu terlalu berharga untuk mencuci dan menyetrika. Serahkan pada ahlinya—dijemput
              di lokasi, kembali bersih, wangi, dan rapi siap pakai.
            </p>
          </div>

          {/* Benefits */}
          <div className="divide-y divide-ink-900/10 rounded-[1.5rem] border border-ink-900/10 bg-white/75 backdrop-blur">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="flex items-start gap-3.5 p-4 sm:p-5">
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${benefit.tone}`}>
                    <Icon className="text-xl" />
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-ink-900">{benefit.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-ink-500">{benefit.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-500">
            <LuSparkles className="mt-0.5 shrink-0 text-base text-brand-600" />
            Garansi cuci ulang gratis jika cucian kurang bersih atau kurang rapi.
          </p>
        </div>

        {/* Form */}
        <div className="flex justify-center lg:col-span-6">
          <FormPesan />
        </div>
      </div>
    </div>
  )
}

export default Pesan
