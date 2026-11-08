'use client'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import {
  LuArrowRight,
  LuArrowUpRight,
  LuLayers,
  LuShieldCheck,
  LuShirt,
  LuSparkles,
  LuTruck,
  LuZap,
} from 'react-icons/lu'

const features = [
  {
    icon: LuTruck,
    title: 'Antar jemput gratis',
    desc: 'Cucian kotor dijemput di depan kos atau rumah dan diantar kembali rapi. Gratis hingga 5 km di Jogja.',
    badge: 'Paling disukai',
    tone: 'dark',
    span: 'sm:col-span-2 lg:col-span-2',
    iconTone: 'bg-white/10 text-brand-300',
  },
  {
    icon: LuZap,
    title: 'Express 1 hari',
    desc: 'Butuh mendesak? Paket express siap dalam 24 jam.',
    badge: 'Super cepat',
    tone: 'white',
    span: '',
    iconTone: 'bg-citrus-100 text-citrus-500',
  },
  {
    icon: LuSparkles,
    title: 'Wangi tahan lama',
    desc: 'Detergen premium dan softener floral yang lembut di kulit.',
    badge: 'Premium scent',
    tone: 'white',
    span: '',
    iconTone: 'bg-lilac-200 text-lilac-500',
  },
  {
    icon: LuShieldCheck,
    title: 'Higienis 1 mesin 1 klien',
    desc: 'Pakaianmu tidak pernah dicampur dengan cucian orang lain. Privasi dan kebersihan terjamin 100%.',
    badge: 'Anti campur',
    tone: 'brand',
    span: 'sm:col-span-2 lg:col-span-2',
    iconTone: 'bg-white text-brand-700',
  },
  {
    icon: LuShirt,
    title: 'Setrika uap rapi',
    desc: 'Bebas kusut tanpa merusak sablon atau bordir.',
    badge: 'Rapi sempurna',
    tone: 'white',
    span: '',
    iconTone: 'bg-sky-50 text-sky-600',
  },
  {
    icon: LuLayers,
    title: 'Layanan serba ada',
    desc: 'Kiloan, satuan, jas, bed cover, karpet, boneka, sampai sepatu.',
    badge: 'All in one',
    tone: 'white',
    span: '',
    iconTone: 'bg-coral-300/40 text-coral-600',
  },
]

function FeatureCard({ feat, i }) {
  const Icon = feat.icon
  const dark = feat.tone === 'dark'
  const blue = feat.tone === 'brand'

  return (
    <article
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card sm:p-7 ${
        dark
          ? 'border-ink-900 bg-ink-900'
          : blue
            ? 'border-brand-700/20 bg-brand-100/70'
            : 'border-ink-900/10 bg-white'
      } ${feat.span}`}
    >
      {dark && (
        <>
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 right-10 h-40 w-40 rounded-full bg-citrus-400/10 blur-2xl" />
        </>
      )}

      <div className="relative">
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className={`grid h-12 w-12 place-items-center rounded-2xl text-xl ${feat.iconTone}`}>
            <Icon />
          </span>
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] ${
              dark ? 'bg-white/10 text-brand-200' : 'bg-ink-900/5 text-ink-500'
            }`}
          >
            {feat.badge}
          </span>
        </div>

        <h3
          className={`font-display text-xl font-extrabold leading-tight tracking-tight ${
            dark ? 'text-cream-50' : 'text-ink-900'
          }`}
        >
          {feat.title}
        </h3>
        <p
          className={`mt-2 max-w-md text-sm leading-relaxed ${
            dark ? 'text-ink-300' : 'text-ink-500'
          }`}
        >
          {feat.desc}
        </p>

        {dark && (
          <div className="mt-5 flex flex-wrap gap-2">
            {['Jemput harian', 'Nota digital', 'Bayar QRIS'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold text-cream-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        className={`relative mt-6 flex items-center gap-1.5 border-t pt-4 text-[11px] font-bold uppercase tracking-[0.12em] ${
          dark ? 'border-white/10 text-brand-300' : 'border-ink-900/10 text-brand-700'
        }`}
      >
        Standar mutu terjamin
        <LuArrowUpRight className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </article>
  )
}

function Features() {
  return (
    <section className="relative overflow-hidden bg-cream-50 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-30 mask-fade-b" />

      <div className="container-page relative z-10">
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-citrus-400" />
              Keunggulan kami
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
              Kenapa orang Jogja <span className="text-brand-700">pilih Harmony?</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-500">
            Standar kebersihan hotel dengan harga mahasiswa. Prosesnya simpel, hasilnya konsisten.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat, i) => (
            <FeatureCard key={i} feat={feat} i={i} />
          ))}

          {/* CTA tile */}
          <article
            className="flex flex-col justify-between rounded-[1.75rem] border border-ink-900/10 bg-citrus-200 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-sticker sm:col-span-2 sm:p-7 lg:col-span-1"
          >
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink-900 text-citrus-300">
                <FaWhatsapp className="text-xl" />
              </span>
              <h3 className="mt-5 font-display text-xl font-extrabold leading-tight text-ink-900">
                Masih bingung pilih paket?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Tanya langsung ke tim kami. Dibantu pilih yang paling pas dan hemat.
              </p>
            </div>
            <a
              href="https://wa.me/62895363324517"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-extrabold text-ink-900 underline decoration-ink-900/30 decoration-2 underline-offset-4 hover:decoration-ink-900"
            >
              Chat sekarang
              <LuArrowRight className="text-base" />
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Features
