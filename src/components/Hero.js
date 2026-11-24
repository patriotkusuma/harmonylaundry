'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaWhatsapp, FaStar } from 'react-icons/fa'
import {
  LuArrowRight,
  LuClock,
  LuPackageSearch,
  LuShieldCheck,
  LuSparkles,
  LuTruck,
} from 'react-icons/lu'
import { Element } from 'react-scroll'

const avatars = [
  { initials: 'RW', className: 'bg-brand-500' },
  { initials: 'DP', className: 'bg-ink-800' },
  { initials: 'SF', className: 'bg-coral-400' },
  { initials: 'BS', className: 'bg-citrus-400 text-ink-900' },
]

function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Element
      name="hero1"
      className="relative overflow-hidden bg-cream-100 pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36"
    >
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-40 mask-fade-b" />
      <div className="pointer-events-none absolute inset-0 bg-bubbles opacity-70 mask-fade-b" />
      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-brand-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-1/3 h-96 w-96 rounded-full bg-citrus-200/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-lilac-200/60 blur-3xl" />

      {mounted && (
        <>
          <div className="absolute left-[6%] top-40 hidden h-12 w-12 rounded-full border border-ink-900/10 bg-white/50 backdrop-blur-sm animate-floaty sm:block" />
          <div className="absolute right-[8%] top-28 hidden h-16 w-16 rounded-full border border-ink-900/10 bg-brand-100/60 backdrop-blur-sm animate-floaty [animation-delay:1.4s] md:block" />
          <div className="absolute bottom-24 left-[42%] hidden h-8 w-8 rounded-full border border-ink-900/10 bg-citrus-200/70 animate-floaty [animation-delay:2.2s] lg:block" />
        </>
      )}

      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
            <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-ink-900/10 bg-white/80 px-3.5 py-1.5 text-[11px] font-bold text-ink-700 shadow-sm backdrop-blur sm:text-xs">
              <span className="inline-flex h-2 w-2 rounded-full bg-brand-500" />
              <span className="text-ink-900">Laundry kiloan &amp; satuan</span>
              <span className="hidden text-ink-300 sm:inline">•</span>
              <a
                href="#cek-ongkir"
                className="group inline-flex items-center gap-1 text-brand-700 transition-colors hover:text-brand-800"
              >
                <LuTruck className="text-sm" />
                Gratis antar-jemput 5 km
                <LuArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            <h1 className="max-w-3xl font-display text-[2.6rem] font-extrabold leading-[0.98] tracking-tight text-ink-900 text-balance sm:text-6xl lg:text-[3.8rem] xl:text-[4rem]">
              Laundry bersih,
              <br />
              <span className="whitespace-nowrap">
                <span className="marker-highlight px-1">wangi &amp; rapi</span>,
              </span>
              <br />
              sampai depan pintu.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-500 text-pretty sm:text-lg">
              Laundry kiloan &amp; satuan untuk warga Jogja. Tinggal santai di rumah atau kos—kami
              jemput cucian kotormu, cuci higienis{' '}
              <strong className="font-bold text-ink-800">1 mesin 1 pelanggan</strong>, setrika rapi,
              lalu antar tepat waktu.
            </p>

            <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
              <a
                href="https://wa.me/62895363324517"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand btn-lg w-full sm:w-auto"
              >
                <FaWhatsapp className="text-xl" />
                Pesan antar-jemput
              </a>
              <a href="#harga" className="btn-light btn-lg w-full sm:w-auto">
                Lihat paket &amp; harga
                <LuArrowRight className="text-base" />
              </a>
            </div>

            <Link
              href="/lacak"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-ink-400 transition-colors hover:text-brand-700"
            >
              <LuPackageSearch className="text-sm" />
              Sudah pesan? Lacak cucianmu
              <LuArrowRight className="text-xs" />
            </Link>

            {/* Trust row */}
            <div className="mt-9 flex w-full flex-col items-center gap-4 border-t border-ink-900/10 pt-6 sm:flex-row sm:gap-5">
              <div className="flex -space-x-2.5">
                {avatars.map((a) => (
                  <span
                    key={a.initials}
                    className={`grid h-9 w-9 place-items-center rounded-full border-2 border-cream-100 text-[10px] font-extrabold text-white ${a.className}`}
                  >
                    {a.initials}
                  </span>
                ))}
                <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-cream-100 bg-white text-[10px] font-extrabold text-ink-700">
                  +1k
                </span>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center gap-1 text-citrus-500 sm:justify-start">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} className="text-xs" />
                  ))}
                  <span className="ml-1 text-xs font-extrabold text-ink-900">4.9/5</span>
                </div>
                <p className="mt-0.5 text-xs font-medium text-ink-500">
                  Dipercaya <strong className="font-bold text-ink-800">1.500+ pelanggan</strong> di
                  Sleman &amp; Yogyakarta
                </p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex justify-center lg:col-span-5">
            <div className="relative w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-5 -rotate-2 rounded-[2.6rem] bg-brand-200/60" />
              <div className="absolute -inset-5 rotate-2 rounded-[2.6rem] border-2 border-dashed border-ink-900/10" />

              <div className="relative rotate-[-1.5deg] rounded-[2.2rem] border-[6px] border-white bg-white shadow-lift transition-transform duration-500 hover:rotate-0">
                <div className="overflow-hidden rounded-[1.7rem]">
                  <img
                    src="/img/thumb-hero.png"
                    alt="Proses laundry higienis Harmony Laundry Yogyakarta"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="flex items-center px-3 py-3">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-ink-700">
                    <LuSparkles className="text-brand-600" />
                    Higienis &amp; wangi tahan lama
                  </span>
                </div>
              </div>

              {/* Sticker: free pickup */}
              <div className="absolute -left-4 -top-6 flex rotate-[-5deg] items-center gap-2.5 rounded-2xl border border-ink-900/10 bg-citrus-300 px-3.5 py-2.5 shadow-sticker sm:-left-7">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink-900 text-citrus-300">
                  <LuTruck className="text-lg" />
                </span>
                <div className="leading-tight">
                  <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-600">
                    Layanan utama
                  </div>
                  <div className="font-display text-sm font-extrabold text-ink-900">
                    Gratis antar-jemput
                  </div>
                </div>
              </div>

              {/* Card: express */}
              <div className="absolute -bottom-6 -right-3 flex rotate-[3deg] items-center gap-3 rounded-2xl border border-ink-900/10 bg-white px-4 py-3 shadow-card sm:-right-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-700">
                  <LuClock className="text-xl" />
                </span>
                <div className="leading-tight">
                  <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-400">
                    Bisa kilat
                  </div>
                  <div className="font-display text-sm font-extrabold text-ink-900">
                    Express 1 hari
                  </div>
                </div>
              </div>

              {/* Round hygienic sticker */}
              <div className="absolute -right-2 top-6 hidden h-20 w-20 rotate-12 place-items-center rounded-full border-2 border-ink-900 bg-cream-50 text-center shadow-sm lg:grid xl:-right-6">
                <div>
                  <LuShieldCheck className="mx-auto text-lg text-brand-700" />
                  <div className="mt-0.5 font-display text-[11px] font-extrabold leading-none text-ink-900">
                    1 mesin
                    <br />1 klien
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Element>
  )
}

export default Hero
