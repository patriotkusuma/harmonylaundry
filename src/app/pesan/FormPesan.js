'use client'
import React, { useState, useEffect } from 'react'
import { FaWhatsapp, FaTshirt, FaMapMarkerAlt, FaClock, FaUser } from 'react-icons/fa'

function FormPesan() {
    const [isValid, setIsValid] = useState(false);

    const [formData, setFormData] = useState({
        'nama': '',
        'paket': '',
        'layanan': '',
        'alamat': '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    // Check if form is valid whenever formData changes
    useEffect(() => {
        const checkValid = formData.nama.trim() !== '' && 
                           formData.paket !== '' && 
                           formData.layanan !== '' && 
                           formData.alamat.trim() !== '';
        setIsValid(checkValid);
    }, [formData]);

    const submit = () => {
        if (!isValid) return;

        let number = "62895363324517";

        var message = encodeURI("Hallo kak! Bisa Tolong Pickup ? ") + '%0a%0a'
        message += encodeURI(`Atas Nama : *${formData.nama}* `) + '%0a'
        message += encodeURI(`Paket : *${formData.paket}* `) + '%0a'
        message += encodeURI(`Layanan : *${formData.layanan}*`) + '%0a'
        message += encodeURI(`Alamat : *${formData.alamat}*`) + '%0a%0a'
        message += encodeURI(`Terima Kasih`)

        let url = `https://wa.me/${number}?text=${message}&app_absent=0`
        window.open(url, '_blank')
    }

  return (
    <div className="w-full max-w-[480px] mx-auto z-10 px-2 sm:px-0"> 
        <div className="bg-slate-900/40 backdrop-blur-2xl shadow-2xl shadow-black/30 rounded-[2.5rem] overflow-hidden border border-white/10">
            
            {/* Header section */}
            <div className="p-8 text-center border-b border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-wide">
                        Mulai Pesanan 🧺
                    </h1>
                    <p className="text-blue-200/60 text-sm sm:text-base font-light">
                        Lengkapi data di bawah, kurir kami segera meluncur ke lokasimu!
                    </p>
                </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col gap-y-6">
                {/* Nama Lengkap */}
                <div className="flex flex-col gap-y-2">
                    <label className="text-blue-50 font-semibold text-sm flex items-center gap-2">
                        <FaUser className="text-blue-400" />
                        Nama Lengkap <span className="text-red-400">*</span>
                    </label>
                    <input
                        className="bg-white/5 border border-white/10 text-white text-sm rounded-2xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 block w-full p-4 transition-all duration-300 placeholder:text-white/20 outline-none hover:bg-white/10"
                        type="text"
                        placeholder="Contoh: Budi Santoso"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                    />
                </div>  

                {/* Pilih Paket */}
                <div className="flex flex-col gap-y-2">
                    <label className="text-blue-50 font-semibold text-sm flex items-center gap-2">
                        <FaClock className="text-blue-400" />
                        Pilih Paket Kecepatan <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <select
                            className="bg-white/5 border border-white/10 text-white text-sm rounded-2xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 block w-full p-4 appearance-none cursor-pointer transition-all duration-300 outline-none hover:bg-white/10 [&>option]:bg-slate-800"
                            name="paket"
                            value={formData.paket}
                            onChange={handleChange}
                        >
                            <option value="" disabled>-- Pilih Paket --</option>
                            <option value="Regular 2 Hari">Regular 2 Hari</option>
                            <option value="Express 1 Hari">Express 1 Hari</option>
                            <option value="Kilat 6 Jam">Kilat 6 Jam</option>
                            <option value="Kilat 4 Jam">Kilat 4 Jam</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-white/40">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>  

                {/* Pilih Layanan */}
                <div className="flex flex-col gap-y-2">
                    <label className="text-blue-50 font-semibold text-sm flex items-center gap-2">
                        <FaTshirt className="text-blue-400" />
                        Jenis Layanan <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <select
                            className="bg-white/5 border border-white/10 text-white text-sm rounded-2xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 block w-full p-4 appearance-none cursor-pointer transition-all duration-300 outline-none hover:bg-white/10 [&>option]:bg-slate-800"
                            name="layanan"
                            value={formData.layanan}
                            onChange={handleChange}
                        >
                            <option value="" disabled>-- Pilih Jenis Layanan --</option>
                            <option value="Cuci Setrika">Cuci & Setrika (Paling Populer)</option>
                            <option value="Cuci Lipat">Cuci Lipat Aja</option>
                            <option value="Setrika">Hanya Setrika</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-white/40">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>  

                {/* Alamat */}
                <div className="flex flex-col gap-y-2">
                    <label className="text-blue-50 font-semibold text-sm flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-400" />
                        Detail Alamat Pickup <span className="text-red-400">*</span>
                    </label>
                    <textarea
                        className="bg-white/5 border border-white/10 text-white text-sm rounded-2xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 block w-full p-4 transition-all duration-300 placeholder:text-white/20 outline-none hover:bg-white/10"
                        name="alamat"
                        value={formData.alamat}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Contoh: Jl. Merdeka No 12, Kost Biru Kamar 5. Patokan deket Indomaret."
                    ></textarea>
                </div> 

                {/* Info Text */}
                {!isValid && (
                    <div className="mt-1 text-sm text-blue-200/80 flex items-start gap-2 bg-blue-900/30 border border-blue-500/20 p-4 rounded-xl">
                        <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>Lengkapi form bertanda bintang (*) untuk melanjutkan order.</span>
                    </div>
                )}

                {/* Button Submit */}
                <button 
                    onClick={submit} 
                    disabled={!isValid}
                    type="button" 
                    className={`mt-2 flex items-center justify-center gap-x-3 py-4 w-full rounded-2xl font-bold text-lg transition-all duration-500 ease-out border overflow-hidden relative group
                        ${isValid 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400/50 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-1' 
                            : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed shadow-none'
                        }`}
                >
                    {/* Shine effect for active button */}
                    {isValid && <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />}

                    <FaWhatsapp className={`text-2xl relative z-10 ${isValid && "animate-pulse"}`} />
                    <span className="relative z-10">Kirim ke WhatsApp</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default FormPesan