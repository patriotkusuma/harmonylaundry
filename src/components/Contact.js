'use client'
import React from "react";
import { RiMapPinLine, RiMailLine } from "react-icons/ri";
import { FiClock, FiPhone } from "react-icons/fi";
import { Element } from "react-scroll";

function Contact() {
  return (
    <Element name="hero4" className="w-full bg-slate-50 py-24 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-100/40 -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-teal-100/40 translate-y-1/3 -translate-x-1/3 blur-3xl pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-4 xl:px-0 relative z-10">
            {/* Header Section */}
            <div className="flex flex-col items-center mb-16 text-center">
                <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                    Hubungi Kami
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
                    Jangan Ragu Untuk <span className="text-blue-600">Terhubung</span>
                </h2>
                <p className="mt-4 text-slate-600 text-lg max-w-2xl">
                    Ada pertanyaan seputar layanan kami? Tim Harmony Laundry siap membantu Anda dengan layanan responsif.
                </p>
            </div>

            {/* Content Section */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
                
                {/* Left: Contact Cards Grid */}
                <div className="w-full lg:w-5/12 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                    {/* Alamat */}
                    <a
                        href="https://maps.app.goo.gl/x15aaXr2xAsF2PBd7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center sm:items-start text-center sm:text-left p-6 sm:p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-100 transition-all duration-300 ease-in-out"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                            <RiMapPinLine className="text-3xl" />
                        </div>
                        <h3 className="text-slate-800 font-bold text-xl mb-2">Alamat</h3>
                        <p className="text-slate-500 text-sm leading-relaxed group-hover:text-blue-600 transition-colors">
                            Jln. Candi Gebang, Karangasem, Condongcatur, Depok, Sleman, DI Yogyakarta
                        </p>
                    </a>

                    {/* Kontak */}
                    <a
                        href="http://wa.me/62895363324517"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center sm:items-start text-center sm:text-left p-6 sm:p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-100 transition-all duration-300 ease-in-out"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-5 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                            <FiPhone className="text-3xl" />
                        </div>
                        <h3 className="text-slate-800 font-bold text-xl mb-2">WhatsApp</h3>
                        <p className="text-slate-500 text-base font-medium group-hover:text-green-600 transition-colors">
                            0895-3633-24517
                        </p>
                    </a>

                    {/* Jam Operasional */}
                    <div className="group flex flex-col items-center sm:items-start text-center sm:text-left p-6 sm:p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-100 transition-all duration-300 ease-in-out">
                        <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-5 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                            <FiClock className="text-3xl" />
                        </div>
                        <h3 className="text-slate-800 font-bold text-xl mb-2">Jam Buka</h3>
                        <div className="flex flex-col text-slate-500 text-sm gap-1 group-hover:text-orange-600 transition-colors">
                            <span className="font-semibold">Senin - Minggu</span>
                            <span>08.00 - 21.00 WIB</span>
                        </div>
                    </div>

                    {/* Email */}
                    <a
                        href="mailto:harmonylaundry6@gmail.com"
                        className="group flex flex-col items-center sm:items-start text-center sm:text-left p-6 sm:p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-100 transition-all duration-300 ease-in-out"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-5 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                            <RiMailLine className="text-3xl" />
                        </div>
                        <h3 className="text-slate-800 font-bold text-xl mb-2">Email</h3>
                        <p className="text-slate-500 text-sm break-all group-hover:text-purple-600 transition-colors">
                            harmonylaundry6@gmail.com
                        </p>
                    </a>
                </div>

                {/* Right: Map Embedded */}
                <div className="w-full lg:w-7/12 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white bg-white hover:shadow-2xl transition-shadow duration-500 min-h-[400px]">
                    <iframe 
                        className="w-full h-full min-h-[400px] grayscale-[20%] hover:grayscale-0 transition-all duration-700 pointer-events-auto" 
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d126507.89856892895!2d110.411664!3d-7.750327999999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a593473ddfbd3%3A0xec409976b4b678b5!2sHARMONY%20LAUNDRY%20YOGYAKARTA!5e0!3m2!1sid!2sid!4v1708430094277!5m2!1sid!2sid" 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

            </div>
        </div>
    </Element>
  );
}

export default Contact;
