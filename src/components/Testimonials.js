'use client'
import React from 'react'
import { FaGoogle, FaStar } from 'react-icons/fa'
import { LuArrowUpRight, LuCheckCircle2, LuQuote } from 'react-icons/lu'

const testimonials = [
  {
    name: 'Rina Wahyuni',
    role: 'Ibu rumah tangga, Condongcatur',
    initials: 'RW',
    color: 'bg-brand-500',
    rating: 5,
    text: 'Pelayanannya sangat memuaskan! Pakaian datang wangi lembut dan disetrika rapi sekali, on-time pula kurirnya. Sudah langganan lebih dari 2 tahun untuk keluarga.',
  },
  {
    name: 'Dika Pratama',
    role: 'Mahasiswa UGM, Depok Sleman',
    initials: 'DP',
    color: 'bg-ink-800',
    rating: 5,
    text: 'Sebagai anak kos dengan jadwal kuliah padat, Harmony Laundry jadi penyelamat! Harga ramah kantong, gratis antar jemput, dan hasilnya selalu bersih tuntas.',
  },
  {
    name: 'Sarah Fitria',
    role: 'Karyawan swasta, Gejayan',
    initials: 'SF',
    color: 'bg-coral-400',
    rating: 5,
    text: 'Treatment cuci sepatu di sini hasilnya luar biasa! Sneakers putih yang kusam kembali kinclong seperti baru. Pasti bakal balik lagi.',
  },
  {
    name: 'Budi Santoso',
    role: 'Wirausahawan, Karangasem',
    initials: 'BS',
    color: 'bg-citrus-400 text-ink-900',
    rating: 5,
    text: 'Rutin cuci kemeja dan seragam kerja di sini. Hasilnya konsisten, rapi siap gantung, dan kurirnya selalu ramah serta cepat merespons.',
  },
]

function Stars({ className = 'text-citrus-400' }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} className="text-xs" />
      ))}
    </div>
  )
}

function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="container-page relative z-10">
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-citrus-400" />
              Kata pelanggan
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
              Dipercaya <span className="text-brand-700">1.500+ pelanggan</span> di Jogja.
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-ink-900/10 bg-cream-50 px-4 py-3">
            <span className="font-display text-3xl font-extrabold text-ink-900">4.9</span>
            <div>
              <Stars />
              <p className="mt-1 text-[11px] font-semibold text-ink-500">Rating Google Maps</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Featured quote */}
          <article
            className="relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-ink-900 p-7 md:col-span-2 sm:p-9"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <Stars className="text-citrus-300" />
                <LuQuote className="text-3xl text-brand-300/60" />
              </div>
              <p className="mt-5 max-w-2xl font-display text-xl font-semibold leading-snug text-cream-50 sm:text-2xl">
                “{testimonials[0].text}”
              </p>
            </div>
            <div className="relative mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-500 text-xs font-extrabold text-white">
                {testimonials[0].initials}
              </span>
              <div>
                <div className="flex items-center gap-1 text-sm font-extrabold text-cream-50">
                  {testimonials[0].name}
                  <LuCheckCircle2 className="text-sm text-brand-300" />
                </div>
                <div className="text-[11px] font-medium text-ink-300">{testimonials[0].role}</div>
              </div>
            </div>
          </article>

          {testimonials.slice(1).map((t, i) => (
            <article
              key={t.name}
              className="card-hover flex flex-col justify-between p-6 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Stars />
                  <LuQuote className="text-2xl text-ink-300" />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-600">“{t.text}”</p>
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-ink-900/10 pt-4">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full text-xs font-extrabold ${t.color}`}
                >
                  {t.initials}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-sm font-extrabold text-ink-900">
                    <span className="truncate">{t.name}</span>
                    <LuCheckCircle2 className="shrink-0 text-sm text-brand-600" />
                  </div>
                  <div className="truncate text-[11px] font-medium text-ink-400">{t.role}</div>
                </div>
              </div>
            </article>
          ))}

          {/* Google CTA card */}
          <a
            href="https://maps.app.goo.gl/x15aaXr2xAsF2PBd7"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-[1.75rem] border border-ink-900/10 bg-citrus-200 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-sticker sm:p-7"
          >
            <div>
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white shadow-sm">
                <FaGoogle className="text-lg text-red-500" />
              </span>
              <h3 className="mt-5 font-display text-lg font-extrabold leading-tight text-ink-900">
                Sudah pernah coba Harmony?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Bagikan pengalamanmu dan bantu warga Jogja menemukan laundry yang tepat.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-extrabold text-ink-900">
              Tulis review di Google
              <LuArrowUpRight className="text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
