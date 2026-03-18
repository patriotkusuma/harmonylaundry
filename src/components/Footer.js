import React from 'react'
import { PiInstagramLogo, PiTiktokLogo, PiWhatsappLogo } from 'react-icons/pi'
import { RiMapPinLine, RiMailLine } from 'react-icons/ri'

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 border-t-4 border-blue-600 relative overflow-hidden text-slate-300">
        {/* Background Overlay Decor */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-blue-900/10 -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        
        <div className="max-w-screen-xl mx-auto px-4 xl:px-0 pt-20 pb-10 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                
                {/* Brand Column */}
                <div className="flex flex-col gap-y-6">
                    <div className="inline-flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-xl p-1 shadow-lg flex items-center justify-center">
                            <img src="/img/logo.png" alt="Harmony Logo" className="h-full w-auto object-contain" />
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-wide">
                            Harmony Laundry
                        </h3>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-sm">
                        Kami adalah solusi terpercaya untuk urusan kebersihan pakaian Anda di Yogyakarta. Bersih, rapi, wangi tahan lama, serta bebas repot dengan layanan antar-jemput gratis.
                    </p>
                    {/* Social Media */}
                    <div className="flex items-center gap-x-4 mt-2">
                        <a href="https://www.tiktok.com/@harmonylaundry"
                           target="_blank" rel="noopener noreferrer"
                           className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white hover:-translate-y-1 transition-all duration-300"
                           aria-label="Tiktok"
                        >
                            <PiTiktokLogo className="text-xl" />
                        </a>
                        <a href="https://www.instagram.com/harmonylaundry.my.id/"
                           target="_blank" rel="noopener noreferrer"
                           className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
                           aria-label="Instagram"
                        >
                            <PiInstagramLogo className="text-xl" />
                        </a>
                        <a href="https://wa.me/62895363324517"
                           target="_blank" rel="noopener noreferrer"
                           className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-green-500 hover:text-white hover:-translate-y-1 transition-all duration-300"
                           aria-label="WhatsApp"
                        >
                            <PiWhatsappLogo className="text-xl" />
                        </a>
                    </div>
                </div>

                {/* Quick Links Column */}
                <div className="flex flex-col gap-y-6 lg:ml-8">
                    <h4 className="text-white font-bold text-lg">Tautan Cepat</h4>
                    <ul className="flex flex-col gap-y-3 text-sm font-medium">
                        <li>
                            <a href="/" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all duration-300">Beranda</a>
                        </li>
                        <li>
                            <a href="/pesan" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all duration-300">Pesan Layanan</a>
                        </li>
                        <li>
                            <a href="/blog" className="hover:text-blue-400 hover:translate-x-1 inline-block transition-all duration-300">Blog Artikel</a>
                        </li>
                    </ul>
                </div>

                {/* Services Column */}
                <div className="flex flex-col gap-y-6">
                    <h4 className="text-white font-bold text-lg">Layanan Kami</h4>
                    <ul className="flex flex-col gap-y-3 text-sm font-medium">
                        <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            Cuci & Setrika Reguler
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            Cuci & Setrika Express (1 Hari)
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            Cuci Kering Lipat
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            Setrika Saja
                        </li>
                    </ul>
                </div>

                {/* Contact Info Column */}
                <div className="flex flex-col gap-y-6">
                    <h4 className="text-white font-bold text-lg">Hubungi Kami</h4>
                    <div className="flex flex-col gap-y-4 text-sm mt-1">
                        <div className="flex items-start gap-3">
                            <RiMapPinLine className="text-xl text-blue-500 shrink-0 mt-0.5" />
                            <p className="text-slate-400 leading-relaxed">
                                Jln. Candi Gebang, Karangasem, Condongcatur, Depok, Sleman, DI Yogyakarta
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <PiWhatsappLogo className="text-xl text-blue-500 shrink-0" />
                            <a href="https://wa.me/62895363324517" className="text-slate-400 hover:text-white transition-colors duration-300">
                                0895-3633-24517
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <RiMailLine className="text-xl text-blue-500 shrink-0" />
                            <a href="mailto:harmonylaundry6@gmail.com" className="text-slate-400 hover:text-white transition-colors duration-300">
                                harmonylaundry6@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Credit Banner */}
            <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs lg:text-sm text-slate-500">
                <p>&copy; {currentYear} Harmony Laundry. Memecahkan Masalah Kebersihan Anda.</p>
                <p>Designed with <span className="text-red-500">♥</span> in Yogyakarta</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer