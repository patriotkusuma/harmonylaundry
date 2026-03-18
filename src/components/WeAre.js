'use client'
import Aos from 'aos'
import React, { useEffect } from 'react'
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa'
import { Element } from 'react-scroll'

const startDate = new Date('2023-09-23');
const currentDate = new Date();
const yearsOfExperience = Math.max(1, Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 365.25)));

const highlights = [
  'Melayani lebih dari 1.500 pelanggan setia di Yogyakarta',
  'Proses cuci higienis menggunakan detergen ramah lingkungan',
  `Tim profesional berpengalaman lebih dari ${yearsOfExperience} tahun`,
  'Dijamin bersih atau kami cuci ulang gratis',
]

function WeAre() {
  useEffect(() => {
    Aos.init({ duration: 600, once: true })
  }, [])

  return (
    <Element name="hero2" className="pt-8 pb-20 bg-gradient-to-b from-blue-50 to-white -mt-10 relative z-10">
      <div className="max-w-screen-xl mx-auto px-4 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Image side */}
          <div data-aos="fade-right" className="relative">
            {/* Decorative background shape */}
            <div className="absolute -top-4 -left-4 w-full h-full bg-blue-200 rounded-3xl -z-10" />
            <img
              src="/img/laundry-2.jpg"
              className="rounded-3xl shadow-2xl w-full object-cover relative z-10"
              alt="Harmony Laundry - Tim Profesional"
            />

            {/* Experience badge */}
            <div className="absolute -bottom-5 -right-5 z-20 bg-blue-700 text-white rounded-2xl shadow-xl p-5 text-center">
              <div className="text-3xl font-extrabold leading-none">{yearsOfExperience}+</div>
              <div className="text-blue-200 text-xs font-semibold uppercase tracking-wider mt-1">Tahun Pengalaman</div>
            </div>
          </div>

          {/* Text side */}
          <div data-aos="fade-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-5 shadow">
              <span>🧺</span> Siapa Kami?
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-5 leading-tight">
              Harmony Laundry —{' '}
              <span className="text-blue-600">Solusi Cucian</span>{' '}
              Terpercaya Yogyakarta
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
              Kami adalah usaha laundry kiloan dan satuan yang beroperasi di Yogyakarta. Dengan pengalaman
              lebih dari {yearsOfExperience} tahun, kami berkomitmen memberikan layanan terbaik — pakaian bersih, harum, dan rapi
              diantar langsung ke pintu rumah Anda.
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-8">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm md:text-base">
                  <FaCheckCircle className="text-blue-600 text-lg shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/62895363324517"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-blue-300 hover:scale-105 transition-all duration-300"
            >
              Pesan Sekarang
              <FaArrowRight />
            </a>
          </div>
        </div>
      </div>
    </Element>
  )
}

export default WeAre