import React from 'react'
import Link from 'next/link'
import { PiInstagramLogo, PiTiktokLogo, PiWhatsappLogo } from 'react-icons/pi'
import { LuArrowUpRight, LuClock, LuMapPin, LuPhone } from 'react-icons/lu'

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/layanan', label: 'Layanan & harga' },
  { href: '/#cara-kerja', label: 'Cara kerja' },
  { href: '/pesan', label: 'Booking antar jemput' },
  { href: '/lacak', label: 'Lacak pesanan' },
  { href: '/blog', label: 'Blog & tips' },
]

const services = [
  { label: 'Cuci setrika reguler', dot: 'bg-brand-400' },
  { label: 'Cuci express 1 hari', dot: 'bg-citrus-400' },
  { label: 'Cuci kering lipat', dot: 'bg-brand-400' },
  { label: 'Bed cover & selimut', dot: 'bg-brand-400' },
  { label: 'Treatment cuci sepatu', dot: 'bg-lilac-400' },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full overflow-hidden bg-ink-900 text-ink-300">
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-citrus-400/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-linegrid opacity-[0.05]" />

      <div className="container-page relative z-10 pb-10 pt-16">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cream-50 p-1.5 shadow-md transition-transform duration-300 group-hover:-rotate-6">
                <img src="/img/logo.png" alt="Logo Harmony Laundry" className="h-full w-full object-contain" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-extrabold tracking-tight text-cream-50">
                  Harmony <span className="text-brand-300">Laundry</span>
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400">
                  Laundry kiloan &amp; satuan · Jogja
                </span>
              </span>
            </Link>

            <p className="mt-1 max-w-sm text-sm leading-relaxed text-ink-300">
              Laundry kiloan, satuan, bed cover, dan cuci sepatu di DIY. Dijemput kotor, kembali
              bersih, wangi, dan rapi—tanpa kamu perlu keluar rumah.
            </p>

            <div className="mt-2 flex items-center gap-2.5">
              {[
                {
                  href: 'https://wa.me/62895363324517',
                  label: 'WhatsApp CS',
                  icon: PiWhatsappLogo,
                  hover: 'hover:border-emerald-500 hover:bg-emerald-600',
                },
                {
                  href: 'https://www.instagram.com/harmonylaundry.my.id/',
                  label: 'Instagram',
                  icon: PiInstagramLogo,
                  hover: 'hover:border-pink-500 hover:bg-pink-600',
                },
                {
                  href: 'https://www.tiktok.com/@harmonylaundry',
                  label: 'TikTok',
                  icon: PiTiktokLogo,
                  hover: 'hover:border-brand-500 hover:bg-brand-600',
                },
              ].map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-ink-300 transition-all duration-200 hover:text-white ${social.hover}`}
                  >
                    <Icon className="text-xl" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Navigasi */}
          <div className="flex flex-col gap-3 lg:col-span-2">
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-cream-50">
              Navigasi
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-300 transition-colors hover:text-brand-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div className="flex flex-col gap-3 lg:col-span-2">
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-cream-50">
              Layanan
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium">
              {services.map((service) => (
                <li key={service.label} className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${service.dot}`} />
                  {service.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div className="flex flex-col gap-3 lg:col-span-3">
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-cream-50">
              Hubungi kami
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <p className="flex items-start gap-2.5">
                <LuMapPin className="mt-0.5 shrink-0 text-base text-brand-300" />
                <span>Jln. Candi Gebang, Karangasem, Condongcatur, Sleman, DIY</span>
              </p>
              <a
                href="https://wa.me/62895363324517"
                className="flex items-center gap-2.5 transition-colors hover:text-emerald-300"
              >
                <LuPhone className="shrink-0 text-base text-emerald-300" />
                0895-3633-24517
              </a>
              <p className="flex items-center gap-2.5">
                <LuClock className="shrink-0 text-base text-citrus-300" />
                08.00–21.00 WIB · buka tiap hari
              </p>
            </div>

            <Link
              href="/pesan"
              className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-cream-50 px-4 py-2.5 text-xs font-extrabold text-ink-900 transition-all hover:-translate-y-0.5 hover:bg-brand-300"
            >
              Booking sekarang
              <LuArrowUpRight className="text-sm" />
            </Link>
          </div>
        </div>

        {/* Big wordmark */}
        <div className="pointer-events-none select-none overflow-hidden pt-6">
          <div className="font-display text-[17vw] font-extrabold leading-[0.8] tracking-tighter text-white/[0.04]">
            HARMONY
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-ink-400 sm:flex-row">
          <p>© {currentYear} Harmony Laundry Yogyakarta. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Antar jemput aktif di Jogja</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
