'use client'
import React, { useEffect } from 'react'
import Aos from 'aos'

const testimonials = [
  {
    name: 'Rina Wahyuni',
    role: 'Ibu Rumah Tangga',
    avatar: '👩',
    rating: 5,
    text: 'Pelayanannya sangat memuaskan! Pakaian datang wangi dan rapi, ontime pula. Sudah langganan lebih dari 2 tahun.',
  },
  {
    name: 'Dika Pratama',
    role: 'Mahasiswa UGM',
    avatar: '👨‍🎓',
    rating: 5,
    text: 'Sebagai anak kos, Harmony Laundry jadi penyelamat! Harga terjangkau, gratis antar jemput, dan hasilnya selalu bersih.',
  },
  {
    name: 'Sarah Fitria',
    role: 'Karyawan Swasta',
    avatar: '👩‍💼',
    rating: 5,
    text: 'Laundry sepatu saya hasilnya luar biasa! Sepatu yang sudah kusam jadi bersih seperti baru lagi. Recommended banget!',
  },
  {
    name: 'Budi Santoso',
    role: 'Wirausahawan',
    avatar: '👨‍💼',
    rating: 5,
    text: 'Sering nitip cuci seragam kerja di sini. Hasilnya selalu konsisten, rapi, dan tepat waktu. Tidak pernah mengecewakan.',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5 text-yellow-400 text-lg mb-3">
      {Array.from({ length: count }).map((_, i) => <span key={i}>★</span>)}
    </div>
  )
}

function Testimonials() {
  useEffect(() => {
    Aos.init({ duration: 600, once: true })
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-screen-xl mx-auto px-4 xl:px-0">
        {/* Heading */}
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="inline-block bg-yellow-100 text-yellow-700 text-sm font-bold px-4 py-1 rounded-full uppercase tracking-widest mb-3">
            Testimoni
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">
            Apa Kata Pelanggan Kami?
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-base md:text-lg">
            Kepercayaan pelanggan adalah kebanggaan terbesar kami.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <Stars count={t.rating} />
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Google Review */}
        <div className="text-center mt-12" data-aos="fade-up">
          <p className="text-gray-400 text-sm">
            Sudah mencoba? Tinggalkan ulasan Anda di{' '}
            <a href="#" className="text-blue-600 font-semibold hover:underline">Google Maps</a> ⭐
          </p>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
