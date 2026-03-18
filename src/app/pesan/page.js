import React from 'react'
import FormPesan from './FormPesan'
import { FaCheckCircle, FaStar, FaTruck, FaClock } from 'react-icons/fa'

export const metadata = {
  title: "Pesan Laundry Antar Jemput Jogja (Gratis 5 KM) | Harmony Laundry",
  description: "Malas nyuci? Pesan layanan Harmony Laundry sekarang! Pakaian dijemput kotor, kembali bersih & wangi. Nikmati layanan gratis antar jemput s/d 5 km di wilayah Jogja dan sekitarnya.",
  keywords: [
    "Laundry antar jemput Jogja", 
    "Laundry Jogja gratis ongkir", 
    "Pesan laundry online Jogja", 
    "Laundry terdekat 5 km", 
    "Harmony Laundry antar jemput", 
    "Laundry express Jogja"
  ],
  alternates: {
    canonical: "https://harmonylaundrys.com/pesan",
  },
};

function Pesan() {
  return (
    <div className="w-full min-h-screen pt-28 pb-16 px-4 bg-slate-900 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 flex items-center relative overflow-hidden">
        {/* Animated Background Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl mix-blend-screen animate-blob pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl mix-blend-screen animate-blob animation-delay-2000 pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl mix-blend-screen animate-blob animation-delay-4000 pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

        {/* Floating Glass Bubbles */}
        <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full border border-white/10 bg-white/5 backdrop-blur-lg animate-blob pointer-events-none"></div>
        <div className="absolute top-[60%] right-[15%] w-48 h-48 rounded-full border border-white/10 bg-white/5 backdrop-blur-md animate-blob animation-delay-4000 pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[30%] w-24 h-24 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-blob animation-delay-2000 pointer-events-none"></div>
        <div className="absolute top-[10%] right-[40%] w-16 h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl animate-bounce pointer-events-none" style={{animationDuration: '5s'}}></div>

        <div className="max-w-screen-xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 my-4">
            
            {/* Left Column: Trust Signals & Copywriting */}
            <div className="flex flex-col gap-y-8 animate-fade-in-up md:px-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-sm font-bold px-4 py-1.5 rounded-full mb-6">
                  <span className="text-yellow-400 flex items-center gap-1"><FaStar className="inline" /> 4.9/5</span> dari 1.500+ Pelanggan
                </div>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                  Biar Kami Yang Urus <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-300">Cucianmu!</span>
                </h1>
                <p className="text-lg text-blue-100/90 leading-relaxed max-w-lg font-light">
                  Waktumu terlalu berharga untuk mencuci. Serahkan pada ahlinya—pakaian dijemput kotor, kembali dalam keadaan bersih, wangi, dan rapi siap pakai.
                </p>
              </div>

              {/* Benefits Checklist */}
              <div className="flex flex-col gap-y-5 mt-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-sm flex items-center justify-center text-blue-300 shrink-0 transform transition hover:scale-105 hover:bg-white/20">
                    <FaTruck className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Gratis Antar Jemput</h3>
                    <p className="text-blue-200/80 text-sm mt-1">Maksimal jarak 5 km dari outlet kami. Pesan langsung dari rumah.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-sm flex items-center justify-center text-green-400 shrink-0 transform transition hover:scale-105 hover:bg-white/20">
                    <FaCheckCircle className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Higienis & Anti Luntur</h3>
                    <p className="text-blue-200/80 text-sm mt-1">1 Mesin 1 Pelanggan. Pakaian dicuci tanpa dicampur dengan order lain.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-sm flex items-center justify-center text-orange-400 shrink-0 transform transition hover:scale-105 hover:bg-white/20">
                    <FaClock className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Tepat Waktu & Beragam</h3>
                    <p className="text-blue-200/80 text-sm mt-1">Pilih dari layanan Kilat 4 Jam hingga Reguler, cuci kiloan sampai satuan.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Form */}
            <div className="w-full flex justify-center lg:justify-end animate-fade-in-up md:delay-100">
                <FormPesan/>
            </div>

        </div>
    </div>
  )
}

export default Pesan