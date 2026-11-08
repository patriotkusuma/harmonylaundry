'use client'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { LuArrowUpRight, LuClock, LuMail, LuMapPin, LuNavigation } from 'react-icons/lu'
import { Element } from 'react-scroll'

const cards = [
  {
    as: 'a',
    href: 'https://wa.me/62895363324517',
    icon: FaWhatsapp,
    title: 'WhatsApp CS',
    desc: 'Respon cepat untuk pemesanan antar jemput.',
    value: '0895-3633-24517',
    iconTone: 'bg-emerald-100 text-emerald-700',
    hover: 'hover:border-emerald-600/30',
  },
  {
    as: 'div',
    icon: LuClock,
    title: 'Jam buka',
    desc: 'Buka setiap hari, termasuk hari libur.',
    value: 'Senin–Minggu · 08.00–21.00 WIB',
    iconTone: 'bg-citrus-100 text-citrus-500',
    hover: 'hover:border-citrus-400/40',
  },
  {
    as: 'a',
    href: 'https://maps.app.goo.gl/x15aaXr2xAsF2PBd7',
    icon: LuMapPin,
    title: 'Alamat outlet',
    desc: 'Jln. Candi Gebang, Karangasem, Condongcatur, Sleman, DIY.',
    value: 'Petunjuk arah di Google Maps',
    iconTone: 'bg-brand-100 text-brand-700',
    hover: 'hover:border-brand-600/30',
    arrow: LuNavigation,
  },
  {
    as: 'a',
    href: 'mailto:harmonylaundry6@gmail.com',
    icon: LuMail,
    title: 'Email resmi',
    desc: 'Untuk pertanyaan kemitraan atau korporat.',
    value: 'harmonylaundry6@gmail.com',
    iconTone: 'bg-lilac-200 text-lilac-500',
    hover: 'hover:border-lilac-400/50',
  },
]

function Contact() {
  return (
    <Element name="hero4" id="kontak" className="relative w-full overflow-hidden bg-cream-100 py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-citrus-200/40 blur-3xl" />

      <div className="container-page relative z-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
            Lokasi &amp; kontak
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
            Mampir, chat, atau <span className="text-brand-700">jemput sekarang.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500">
            Punya pertanyaan soal cucian khusus atau kerja sama? Tim kami siap membantu dengan cepat.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          {/* Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5">
            {cards.map((card) => {
              const Icon = card.icon
              const Arrow = card.arrow
              const Tag = card.as

              return (
                <Tag
                  key={card.title}
                  href={card.href}
                  {...(card.as === 'a'
                    ? {
                        target: card.href.startsWith('http') ? '_blank' : undefined,
                        rel: card.href.startsWith('http') ? 'noopener noreferrer' : undefined,
                      }
                    : {})}
                  className={`group flex flex-col justify-between rounded-[1.5rem] border border-ink-900/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card ${card.hover}`}
                >
                  <div>
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-2xl text-xl ${card.iconTone}`}
                    >
                      <Icon />
                    </span>
                    <h3 className="mt-4 font-display text-base font-extrabold text-ink-900">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-ink-500">{card.desc}</p>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-2 border-t border-ink-900/10 pt-3 text-xs font-extrabold text-ink-800">
                    <span className="min-w-0 flex-1 leading-snug">{card.value}</span>
                    {Arrow ? (
                      <Arrow className="shrink-0 text-brand-700" />
                    ) : (
                      <LuArrowUpRight className="shrink-0 text-ink-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    )}
                  </div>
                </Tag>
              )
            })}
          </div>

          {/* Map */}
          <div className="relative lg:col-span-7">
            <div className="overflow-hidden rounded-[2rem] border-[6px] border-white bg-white shadow-lift">
              <iframe
                className="h-full min-h-[380px] w-full lg:min-h-[460px]"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d126507.89856892895!2d110.411664!3d-7.750327999999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a593473ddfbd3%3A0xec409976b4b678b5!2sHARMONY%20LAUNDRY%20YOGYAKARTA!5e0!3m2!1sid!2sid!4v1708430094277!5m2!1sid!2sid"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta lokasi Harmony Laundry Yogyakarta"
              />
            </div>

            <div className="absolute -bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-ink-900/10 bg-cream-50/95 px-4 py-3 shadow-card backdrop-blur sm:left-6 sm:right-auto">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <div>
                <p className="text-xs font-extrabold text-ink-900">Outlet sedang buka</p>
                <p className="text-[11px] font-medium text-ink-500">08.00–21.00 · Condongcatur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Element>
  )
}

export default Contact
