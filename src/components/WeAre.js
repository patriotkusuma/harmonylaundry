'use client'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { LuArrowRight, LuHeartHandshake, LuShieldCheck } from 'react-icons/lu'
import { Element } from 'react-scroll'

const startDate = new Date('2023-09-23')
const currentDate = new Date()
const yearsOfExperience = Math.max(
  1,
  Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 365.25))
)

const highlights = [
  {
    title: 'Higienis 1 mesin 1 pelanggan',
    desc: 'Cucian Anda tidak pernah dicampur dengan pakaian orang lain.',
  },
  {
    title: 'Detergen premium & wangi mewah',
    desc: 'Formula lembut yang menjaga serat kain dan aroma tahan lama.',
  },
  {
    title: 'Antar jemput tepat waktu',
    desc: 'Gratis ongkir hingga 5 km untuk kos, keluarga, dan profesional.',
  },
  {
    title: 'Garansi cuci ulang 100% gratis',
    desc: 'Kurang bersih atau kurang rapi? Kami kerjakan ulang tanpa biaya.',
  },
]

function WeAre() {
  return (
    <Element name="hero2" className="relative overflow-hidden bg-cream-100 py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl" />

      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Visual */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-4 -rotate-2 rounded-[2.5rem] bg-brand-200/70" />
              <div className="relative overflow-hidden rounded-[2rem] border-[6px] border-white bg-white shadow-lift">
                <img
                  src="/img/laundry-2.jpg"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                  alt="Tim Harmony Laundry Yogyakarta"
                />
              </div>

              <div className="absolute -bottom-5 -right-3 rotate-[3deg] rounded-2xl border border-ink-900/10 bg-citrus-300 px-4 py-3 shadow-sticker sm:-right-6">
                <div className="font-display text-2xl font-extrabold leading-none text-ink-900">
                  {yearsOfExperience}+ tahun
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-600">
                  Melayani Jogja
                </div>
              </div>

              <div className="absolute -left-2 -top-5 flex rotate-[-4deg] items-center gap-2 rounded-2xl border border-ink-900/10 bg-white px-3.5 py-2.5 shadow-card sm:-left-6">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                  <LuShieldCheck className="text-base" />
                </span>
                <span className="text-xs font-extrabold text-ink-900">100% garansi puas</span>
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="lg:col-span-7">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
              Laundry lokal Jogja
            </span>

            <h2 className="mt-5 max-w-xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-[2.9rem]">
              Laundry yang bikin hidupmu <span className="text-brand-700">lebih ringan.</span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-500 text-pretty">
              Harmony Laundry hadir untuk kamu yang sibuk kuliah, kerja, atau mengurus rumah.
              Peralatan modern, detergen pilihan, dan antar-jemput ramah—supaya kamu bisa menikmati
              pakaian bersih tanpa buang waktu.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className="group border-t border-ink-900/10 py-4 transition-colors hover:border-brand-600/40"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-xs font-extrabold text-brand-700">
                      0{i + 1}
                    </span>
                    <h3 className="text-sm font-extrabold leading-snug text-ink-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 pl-7 text-xs leading-relaxed text-ink-500">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <a
                href="https://wa.me/62895363324517"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark w-full sm:w-auto"
              >
                <FaWhatsapp className="text-lg text-brand-300" />
                Pesan penjemputan
                <LuArrowRight className="text-base" />
              </a>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-ink-500">
                <LuHeartHandshake className="text-base text-brand-700" />
                Antar-jemput gratis s/d 5 km
              </span>
            </div>
          </div>
        </div>
      </div>
    </Element>
  )
}

export default WeAre
