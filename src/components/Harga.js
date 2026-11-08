'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Element } from 'react-scroll'
import { FaWhatsapp } from 'react-icons/fa'
import {
  formatRp,
  packages,
  priceNote,
  priceTabs,
  serviceOptions,
  waLink,
} from '@/data/harga'
import {
  LuArrowRight,
  LuCheck,
  LuClock,
  LuFlame,
  LuMinus,
  LuPlus,
  LuShieldCheck,
  LuSparkles,
  LuTruck,
} from 'react-icons/lu'

function Harga() {
  const [selectedService, setSelectedService] = useState('cuci_setrika_reguler')
  const [weight, setWeight] = useState(5)
  const [activeTab, setActiveTab] = useState('all')

  const currentService = serviceOptions.find((s) => s.id === selectedService) || serviceOptions[0]
  const estimatedTotal = currentService.price * weight

  const getWaCalcLink = () =>
    waLink(
      `Halo Harmony Laundry! Saya ingin pesan layanan:\n\n` +
        `• Paket: ${currentService.name}\n` +
        `• Jumlah: ${weight} ${currentService.unit}\n` +
        `• Estimasi Biaya: Rp ${formatRp(estimatedTotal)}\n` +
        `• Estimasi Waktu: ${currentService.duration}\n\n` +
        `Mohon info jadwal penjemputan ke alamat saya kak. Terima kasih!`
    )

  const filteredPackages =
    activeTab === 'all' ? packages : packages.filter((p) => p.category === activeTab)

  return (
    <Element name="hero3" id="harga" className="relative w-full overflow-hidden bg-cream-100 py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-96 w-96 rounded-full bg-citrus-200/40 blur-3xl" />

      <div className="container-page relative z-10">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-citrus-400" />
            Harga laundry transparan
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
            Harga jelas, <span className="text-brand-700">tanpa kejutan.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500">
            Semua paket sudah termasuk detergen berkualitas, pewangi segar, dan gratis antar jemput
            jarak 5 km.
          </p>
        </div>

        {/* Calculator */}
        <div className="relative mb-20 overflow-hidden rounded-[2rem] border border-ink-900/10 bg-white p-5 shadow-card sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-10 top-0 h-64 w-64 rounded-full bg-brand-100/70 blur-2xl" />

          <div className="relative z-10 flex flex-col items-center gap-10 lg:flex-row lg:gap-12">
            {/* Inputs */}
            <div className="w-full lg:w-7/12">
              <span className="eyebrow">
                <LuSparkles className="text-brand-700" />
                Kalkulator estimasi
              </span>
              <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight text-ink-900 sm:text-3xl">
                Hitung perkiraan biaya cucianmu
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                Pilih layanan dan jumlahnya—simulasi biaya muncul langsung.
              </p>

              <div className="mt-6">
                <div className="field-label">
                  <LuSparkles className="text-brand-600" />
                  Pilih jenis layanan
                </div>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {serviceOptions.map((opt) => {
                    const active = selectedService === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedService(opt.id)}
                        className={`flex items-center justify-between gap-2 rounded-2xl border px-3.5 py-3 text-left text-xs font-bold transition-all ${
                          active
                            ? 'border-brand-600 bg-brand-50 text-ink-900 shadow-sm'
                            : 'border-ink-900/10 bg-white text-ink-600 hover:border-ink-900/25 hover:bg-cream-50'
                        }`}
                      >
                        <span className="min-w-0 leading-snug">{opt.name}</span>
                        <span
                          className={`shrink-0 text-[11px] font-extrabold ${
                            active ? 'text-brand-700' : 'text-ink-400'
                          }`}
                        >
                          Rp {formatRp(opt.price)}/{opt.unit}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="field-label mb-0">
                    Jumlah ({currentService.unit})
                  </span>
                  <span className="font-display text-lg font-extrabold text-brand-700">
                    {weight} {currentService.unit}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setWeight(Math.max(1, weight - 1))}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-ink-900/10 bg-cream-50 text-ink-900 transition-colors hover:bg-white"
                    aria-label="Kurangi jumlah"
                  >
                    <LuMinus />
                  </button>

                  <input
                    type="range"
                    min="1"
                    max={currentService.unit === 'kg' ? 30 : 10}
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value) || 1)}
                    className="h-2 w-full cursor-pointer accent-brand-700"
                    aria-label="Jumlah cucian"
                  />

                  <button
                    type="button"
                    onClick={() => setWeight(weight + 1)}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-ink-900/10 bg-cream-50 text-ink-900 transition-colors hover:bg-white"
                    aria-label="Tambah jumlah"
                  >
                    <LuPlus />
                  </button>
                </div>

                {currentService.unit === 'kg' && (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold text-ink-400">Pilihan cepat:</span>
                    {[3, 5, 7, 10].map((kg) => (
                      <button
                        key={kg}
                        type="button"
                        onClick={() => setWeight(kg)}
                        className={`rounded-full px-3 py-1 text-[11px] font-bold transition-colors ${
                          weight === kg
                            ? 'bg-ink-900 text-cream-50'
                            : 'bg-cream-100 text-ink-600 hover:bg-cream-200'
                        }`}
                      >
                        {kg} kg
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-ink-900 p-6 text-white shadow-lift sm:p-8 lg:w-5/12">
              <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-brand-500/25 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-citrus-400/10 blur-2xl" />

              <div className="relative">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-ink-300">
                    Ringkasan estimasi
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                    <LuTruck className="text-xs" />
                    Gratis jemput
                  </span>
                </div>

                <div className="mt-5 text-xs font-medium text-ink-300">
                  {currentService.name} · {weight} {currentService.unit}
                </div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-sm font-bold text-ink-300">Rp</span>
                  <span className="font-display text-4xl font-extrabold tracking-tight text-cream-50 sm:text-5xl">
                    {formatRp(estimatedTotal)}
                  </span>
                </div>

                <div className="mt-5 flex flex-col gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-ink-300">
                      <LuClock className="text-brand-300" /> Waktu selesai
                    </span>
                    <strong className="font-bold text-cream-50">{currentService.duration}</strong>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-ink-300">
                      <LuShieldCheck className="text-brand-300" /> Kualitas
                    </span>
                    <strong className="font-bold text-emerald-300">1 mesin 1 klien</strong>
                  </div>
                </div>
              </div>

              <a
                href={getWaCalcLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa relative mt-6 w-full"
              >
                <FaWhatsapp className="text-xl" />
                Pesan estimasi ini
                <LuArrowRight className="text-base" />
              </a>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="no-scrollbar mb-8 flex items-center gap-2 overflow-x-auto pb-1 sm:justify-center">
          {priceTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition-all sm:text-[13px] ${
                activeTab === tab.id
                  ? 'bg-ink-900 text-cream-50 shadow-sm'
                  : 'border border-ink-900/10 bg-white text-ink-600 hover:border-ink-900/25 hover:text-ink-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Package cards */}
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-4">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`group relative flex flex-col justify-between rounded-[1.75rem] border p-6 transition-all duration-300 hover:-translate-y-2 ${
                pkg.popular
                  ? 'border-ink-900 bg-ink-900 shadow-lift'
                  : 'border-ink-900/10 bg-white shadow-sm hover:border-ink-900/20 hover:shadow-card'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-citrus-300 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-ink-900 shadow-sm">
                  <LuFlame className="text-xs" />
                  {pkg.tag}
                </div>
              )}

              <div>
                <div className="pt-2 text-center">
                  <h3
                    className={`font-display text-xl font-extrabold ${
                      pkg.popular ? 'text-cream-50' : 'text-ink-900'
                    }`}
                  >
                    {pkg.title}
                  </h3>
                  <p
                    className={`mt-1 min-h-[32px] text-xs leading-snug ${
                      pkg.popular ? 'text-ink-300' : 'text-ink-500'
                    }`}
                  >
                    {pkg.subtitle}
                  </p>

                  <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span
                      className={`text-xs font-bold ${
                        pkg.popular ? 'text-ink-300' : 'text-ink-400'
                      }`}
                    >
                      Rp
                    </span>
                    <span
                      className={`font-display text-4xl font-extrabold tracking-tight ${
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
                </div>

                <div
                  className={`mx-auto my-6 grid h-20 w-20 place-items-center rounded-2xl border p-2.5 transition-transform duration-300 group-hover:scale-110 ${
                    pkg.popular
                      ? 'border-white/10 bg-white/10'
                      : 'border-ink-900/5 bg-cream-50'
                  }`}
                >
                  <img src={pkg.img} alt={pkg.title} className="h-full w-full object-contain" />
                </div>

                <ul className="flex flex-col gap-2.5">
                  {pkg.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-2.5 text-xs leading-tight ${
                        pkg.popular ? 'text-ink-300' : 'text-ink-600'
                      }`}
                    >
                      <LuCheck
                        className={`mt-0.5 shrink-0 text-sm ${
                          pkg.popular ? 'text-brand-300' : 'text-brand-700'
                        }`}
                      />
                      <span>{feat}</span>
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
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/layanan#daftar-harga" className="btn-light">
            Lihat daftar harga lengkap
            <LuArrowRight className="text-sm" />
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-ink-400">{priceNote}</p>
      </div>
    </Element>
  )
}

export default Harga
