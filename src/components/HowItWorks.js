'use client'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { LuArrowRight, LuPackageCheck, LuPhoneCall, LuSparkles, LuTruck } from 'react-icons/lu'

const steps = [
  {
    step: '01',
    icon: LuPhoneCall,
    title: 'Pesan via WhatsApp',
    desc: 'Kirim alamat dan share lokasi penjemputan. Selesai dalam hitungan detik.',
    tag: 'Mudah & cepat',
  },
  {
    step: '02',
    icon: LuTruck,
    title: 'Kurir menjemput',
    desc: 'Kurir tiba di kos atau rumahmu, menimbang cucian, dan memberi nota digital.',
    tag: 'Gratis 5 km',
  },
  {
    step: '03',
    icon: LuSparkles,
    title: 'Cuci, kering, setrika',
    desc: 'Diproses higienis 1 mesin 1 pelanggan dengan detergen wangi premium.',
    tag: 'Higienis & rapi',
  },
  {
    step: '04',
    icon: LuPackageCheck,
    title: 'Diantar kembali',
    desc: 'Pakaian wangi dan rapi dilipat siap pakai, dikirim ke depan pintumu.',
    tag: 'Beres siap pakai',
  },
]

function HowItWorks() {
  return (
    <section id="cara-kerja" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="container-page relative z-10">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
            Cara kerja
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
            Empat langkah, <span className="text-brand-700">cucian beres.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500">
            Tak perlu repot keluar saat hujan atau panas terik. Cukup santai, kami yang bereskan.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-8 hidden border-t-2 border-dashed border-ink-900/15 lg:block" />

          <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-6">
            {steps.map((item, i) => {
              const Icon = item.icon
              return (
                <li
                  key={i}
                  className="group relative text-center lg:text-left"
                >
                  <div className="mb-5 flex items-center justify-center gap-3 lg:justify-start">
                    <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-ink-900/10 bg-cream-50 text-brand-700 shadow-sm transition-all duration-300 group-hover:-rotate-6 group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="text-2xl" />
                      <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-ink-900/10 bg-ink-900 font-display text-[10px] font-extrabold text-cream-50">
                        {item.step}
                      </span>
                    </span>
                    <span className="hidden h-px flex-1 bg-ink-900/10 lg:hidden" />
                  </div>

                  <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand-700">
                    {item.tag}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-extrabold leading-tight text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.desc}</p>
                </li>
              )
            })}
          </ol>
        </div>

        {/* CTA banner */}
        <div
          className="relative mt-16 overflow-hidden rounded-[2rem] bg-ink-900 p-7 sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-citrus-400/15 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-linegrid opacity-[0.06]" />

          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="max-w-lg font-display text-2xl font-extrabold leading-tight text-cream-50 sm:text-3xl">
                Pakaian kotor menumpuk di kos?
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-300">
                Hubungi kami sekarang—kurir kami siap menjemput cucianmu hari ini juga.
              </p>
            </div>
            <a
              href="https://wa.me/62895363324517"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa group shrink-0"
            >
              <FaWhatsapp className="text-xl" />
              Chat kurir sekarang
              <LuArrowRight className="text-base transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
