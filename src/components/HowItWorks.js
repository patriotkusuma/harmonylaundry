'use client'
import React, { useEffect } from 'react'
import Aos from 'aos'

const steps = [
  {
    step: '01',
    icon: '📱',
    title: 'Pesan via WhatsApp',
    desc: 'Hubungi kami lewat WhatsApp untuk menjadwalkan penjemputan. Mudah, cepat, tanpa ribet.',
    color: 'bg-blue-600',
    light: 'bg-blue-50 text-blue-700',
  },
  {
    step: '02',
    icon: '🚗',
    title: 'Kami Jemput Cucian',
    desc: 'Kurir kami datang ke lokasi Anda untuk menjemput cucian tepat waktu sesuai jadwal.',
    color: 'bg-teal-600',
    light: 'bg-teal-50 text-teal-700',
  },
  {
    step: '03',
    icon: '🫧',
    title: 'Dicuci & Disetrika',
    desc: 'Pakaian Anda kami cuci dengan detergen premium, kemudian disetrika & dikemas dengan rapi.',
    color: 'bg-purple-600',
    light: 'bg-purple-50 text-purple-700',
  },
  {
    step: '04',
    icon: '📦',
    title: 'Diantar ke Rumah',
    desc: 'Pakaian bersih, wangi, dan rapi diantarkan kembali ke pintu rumah Anda. Beres!',
    color: 'bg-orange-500',
    light: 'bg-orange-50 text-orange-700',
  },
]

function HowItWorks() {
  useEffect(() => {
    Aos.init({ duration: 600, once: true })
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 xl:px-0">
        {/* Heading */}
        <div className="text-center mb-14" data-aos="fade-up">
          <span className="inline-block bg-teal-100 text-teal-700 text-sm font-bold px-4 py-1 rounded-full uppercase tracking-widest mb-3">
            Cara Kerja
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">
            Proses Laundry yang Mudah & Praktis
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg">
            Cukup 4 langkah simpel — Anda tidak perlu keluar rumah sama sekali.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((s, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 120}
                className="flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div className={`w-24 h-24 rounded-full ${s.color} flex items-center justify-center text-4xl shadow-lg mb-5 ring-4 ring-white`}>
                  {s.icon}
                </div>

                {/* Step badge */}
                <span className={`inline-block text-xs font-extrabold px-3 py-1 rounded-full mb-3 ${s.light}`}>
                  Langkah {s.step}
                </span>

                <h3 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14" data-aos="fade-up">
          <a
            href="https://wa.me/62895363324517"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
          >
            <span>🫧</span>
            Mulai Laundry Sekarang
          </a>
          <p className="text-gray-400 text-sm mt-3">Gratis antar jemput jarak 5 km • Tanpa biaya tambahan</p>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
