'use client'
import React, { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { Element } from 'react-scroll'

const floatingItems = ['👕', '👗', '🧥', '👔', '🧺', '✨', '🫧', '👟']

function FloatingBubble({ emoji, style }) {
  return (
    <div
      className="absolute text-2xl md:text-3xl select-none opacity-20 animate-bounce pointer-events-none"
      style={style}
    >
      {emoji}
    </div>
  )
}

function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Element
      name="hero1"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-teal-500 pt-20"
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-teal-400/10 translate-y-1/3 -translate-x-1/3 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-blue-300/10 -translate-x-1/2 -translate-y-1/2 blur-2xl" />

      {/* Floating emoji items */}
      {mounted && floatingItems.map((emoji, i) => (
        <FloatingBubble
          key={i}
          emoji={emoji}
          style={{
            top: `${10 + (i * 11) % 80}%`,
            left: `${(i * 13 + 5) % 95}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${2 + (i % 3)}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 xl:px-0 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text content */}
          <div className="text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-semibold mb-6">
              <span>🏆</span>
              <span>Laundry Terpercaya di Yogyakarta</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Pakaian Bersih,{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-teal-300 bg-clip-text text-transparent">
                Wangi & Rapi
              </span>{' '}
              Sampai ke Pintu Rumah
            </h1>

            <p className="text-blue-100 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Harmony Laundry hadir dengan layanan cuci kiloan, satuan, dan sepatu — lengkap dengan{' '}
              <strong className="text-white">antar jemput gratis</strong> jarak 5 km di Yogyakarta.
              Bersih, tepat waktu, tanpa ribet!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="https://wa.me/62895363324517"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold px-7 py-4 rounded-2xl shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300 text-base"
              >
                <FaWhatsapp className="text-xl" />
                Pesan via WhatsApp
              </a>
              <a
                href="/pesan"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-bold px-7 py-4 rounded-2xl transition-all duration-300 text-base"
              >
                🧾 Cek Status Pesanan
              </a>
            </div>

            {/* Quick info pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: '🚗', text: 'Gratis Antar Jemput' },
                { icon: '⚡', text: 'Express 1 Hari' },
                { icon: '✨', text: 'Detergen Premium' },
              ].map((p, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-sm px-4 py-2 rounded-full border border-white/20"
                >
                  {p.icon} {p.text}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Image card */}
          <div className="relative flex justify-center lg:justify-end order-first lg:order-last">
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-teal-400/20 rounded-3xl blur-2xl scale-110" />

            <div className="relative">
              <img
                src="/img/thumb-hero.png"
                alt="Harmony Laundry Yogyakarta"
                className="w-full max-w-md lg:max-w-lg rounded-3xl shadow-2xl border border-white/20"
              />

              {/* Floating badges on image */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <div>
                  <div className="font-extrabold text-gray-900 text-sm">4.9/5</div>
                  <div className="text-gray-400 text-xs">1500+ ulasan</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2">
                <span className="text-2xl">🚗</span>
                <div>
                  <div className="font-extrabold text-gray-900 text-sm">Antar Jemput</div>
                  <div className="text-gray-400 text-xs">Gratis s/d 5 km</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom - fill matches Stats section blue */}
      <div className="absolute bottom-0 left-0 right-0 leading-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path
            d="M0 80L48 69.3C96 58.7 192 37.3 288 32C384 26.7 480 37.3 576 48C672 58.7 768 69.3 864 69.3C960 69.3 1056 58.7 1152 48C1248 37.3 1344 26.7 1392 21.3L1440 16V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z"
            fill="#1d4ed8"
          />
        </svg>
      </div>
    </Element>
  )
}

export default Hero