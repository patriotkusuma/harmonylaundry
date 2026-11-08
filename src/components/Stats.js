'use client'
import React from 'react'
import { LuAward, LuSmile, LuSparkles, LuTruck } from 'react-icons/lu'

const startDate = new Date('2023-09-23')
const currentDate = new Date()
const yearsOfExperience = Math.max(
  1,
  Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 365.25))
)

const stats = [
  {
    value: '1.500',
    suffix: '+',
    label: 'Pelanggan puas',
    sublabel: 'Mahasiswa, kos & keluarga',
    icon: LuSmile,
    accent: 'text-brand-300',
  },
  {
    value: '5',
    suffix: ' km',
    label: 'Gratis antar-jemput',
    sublabel: 'Jarak antar-jemput dari outlet',
    icon: LuTruck,
    accent: 'text-citrus-300',
  },
  {
    value: `${yearsOfExperience}`,
    suffix: ' thn+',
    label: 'Pengalaman',
    sublabel: 'Standar kebersihan konsisten',
    icon: LuAward,
    accent: 'text-lilac-300',
  },
  {
    value: '99',
    suffix: '%',
    label: 'Tingkat kepuasan',
    sublabel: 'Garansi cuci ulang gratis',
    icon: LuSparkles,
    accent: 'text-coral-300',
  },
]

function Stats() {
  return (
    <section className="relative z-20 px-4 pt-8 sm:px-6 lg:px-8">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 px-5 py-8 shadow-lift sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-citrus-400/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-linegrid opacity-[0.07]" />

          <div className="relative grid grid-cols-2 gap-y-8 lg:grid-cols-4">
            {stats.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className={`flex flex-col items-center px-2 text-center lg:items-start lg:px-6 lg:text-left ${
                    i === 0 ? '' : 'border-white/10 max-lg:border-l lg:border-l'
                  }`}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-xl bg-white/10 ${item.accent}`}
                    >
                      <Icon className="text-base" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink-300">
                      {item.label}
                    </span>
                  </div>
                  <div className="font-display text-3xl font-extrabold leading-none text-cream-50 sm:text-4xl">
                    {item.value}
                    <span className={item.accent}>{item.suffix}</span>
                  </div>
                  <div className="mt-2 text-[11px] font-medium leading-snug text-ink-300">
                    {item.sublabel}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats
