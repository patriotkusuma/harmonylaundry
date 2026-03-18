'use client'
import React, { useEffect } from 'react'
import Aos from 'aos'

const features = [
  {
    icon: '🚗',
    title: 'Antar Jemput Gratis',
    desc: 'Kami jemput dan antar cucian Anda langsung ke pintu rumah, gratis untuk jarak hingga 5 km.',
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: '⚡',
    title: 'Proses Cepat & Tepat',
    desc: 'Paket express selesai dalam 1 hari. Paket reguler selesai 2 hari kerja. Tidak ada keterlambatan.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    icon: '✨',
    title: 'Bersih, Wangi & Rapi',
    desc: 'Menggunakan detergen premium dan pewangi terbaik agar pakaian Anda bersih sempurna dan wangi tahan lama.',
    color: 'from-purple-500 to-indigo-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
  {
    icon: '🔒',
    title: 'Pakaian Aman & Terjaga',
    desc: 'Setiap cucian dicatat dan dikemas rapi. Keamanan dan kerapian pakaian Anda adalah prioritas kami.',
    color: 'from-orange-500 to-rose-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
  },
  {
    icon: '💧',
    title: 'Setrika Profesional',
    desc: 'Layanan setrika dengan teknik profesional menghasilkan tampilan pakaian yang licin dan rapi sepanjang hari.',
    color: 'from-cyan-500 to-sky-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-100',
  },
  {
    icon: '📦',
    title: 'Berbagai Layanan',
    desc: 'Cuci kiloan, satuan, sepatu, selimut, bed cover — semua tersedia dalam satu tempat yang terpercaya.',
    color: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
  },
]

function Features() {
  useEffect(() => {
    Aos.init({ duration: 600, once: true })
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-screen-xl mx-auto px-4 xl:px-0">
        {/* Heading */}
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-bold px-4 py-1 rounded-full uppercase tracking-widest mb-3">
            Mengapa Kami?
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">
            Keunggulan Harmony Laundry
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg">
            Dipercaya oleh ribuan pelanggan di Yogyakarta untuk menjaga kebersihan dan kesegaran pakaian setiap hari.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className={`rounded-2xl border ${feat.border} ${feat.bg} p-6 flex gap-4 items-start hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Icon bubble */}
              <div className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-2xl shadow-md`}>
                {feat.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1">{feat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
