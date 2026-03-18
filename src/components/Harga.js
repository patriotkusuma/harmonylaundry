'use client'
import React from 'react'
import { Element } from 'react-scroll'
import { FaCheckCircle } from 'react-icons/fa'

function Harga() {
  const packages = [
    {
      title: 'Regular',
      price: '4.000',
      unit: '/ Kg',
      color: 'teal',
      img: '/img/paket/kiloan.png',
      features: [
        'Setrika Rp 4.000',
        'Cuci Lipat Rp 4.000',
        'Cuci Setrika Rp 5.000',
        'Pengerjaan 2 Hari',
        'Gratis Pickup & Delivery *'
      ]
    },
    {
      title: 'Express',
      price: '5.000',
      unit: '/ Kg',
      color: 'green',
      badge: 'Paling Laris',
      img: '/img/paket/dry-clean.png',
      features: [
        'Setrika Rp 5.000',
        'Cuci Lipat Rp 5.000',
        'Cuci Setrika Rp 7.000',
        'Pengerjaan 1 Hari',
        'Gratis Pickup & Delivery *'
      ]
    },
    {
      title: 'Satuan',
      price: '3.000',
      unit: '/ Pcs',
      color: 'yellow',
      img: '/img/paket/satuan.png',
      features: [
        'Selimut & Bed Cover',
        'Boneka',
        'Jas & Gaun',
        'Karpet',
        'dan Lainnya'
      ]
    },
    {
      title: 'Sepatu',
      price: '20.000',
      unit: '/ Pasang',
      color: 'blue',
      img: '/img/paket/sepatu.png',
      features: [
        'Fast Clean Rp 20.000',
        'Deep Clean Rp 30rb - 40rb',
        'Special Treatment',
        'Pengerjaan 1 - 3 Hari',
        'Gratis Pickup & Delivery'
      ]
    }
  ];

  // Utility to handle dynamic tailwind colors cleanly
  const getColorClasses = (color) => {
    switch(color) {
        case 'teal': return { text: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200', btn: 'bg-teal-600 hover:bg-teal-700', check: 'text-teal-500' };
        case 'green': return { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', btn: 'bg-emerald-600 hover:bg-emerald-700', check: 'text-emerald-500' };
        case 'yellow': return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', btn: 'bg-amber-600 hover:bg-amber-700', check: 'text-amber-500' };
        case 'blue': return { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', btn: 'bg-blue-600 hover:bg-blue-700', check: 'text-blue-500' };
        default: return { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', btn: 'bg-blue-600 hover:bg-blue-700', check: 'text-blue-500' };
    }
  };

  return (
    <Element name="hero3" className="w-full py-24 relative overflow-hidden bg-white">
        {/* Decorative Background */}
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-screen-xl mx-auto px-4 xl:px-0 relative z-10">
            {/* Section Header */}
            <div className="flex flex-col items-center mb-16 text-center">
                <span className="px-5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                    Katalog Harga
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
                    Pilihan Paket <span className="text-blue-600">Terbaik</span>
                </h2>
                <p className="mt-4 text-slate-600 text-lg max-w-2xl">
                    Harga transparan, terjangkau, dan disesuaikan dengan kebutuhan Anda sehari-hari. 
                </p>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {packages.map((pkg, index) => {
                    const colors = getColorClasses(pkg.color);
                    
                    return (
                        <div key={index} className={`group relative bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-2 flex flex-col`}>
                            
                            {/* Popular Badge */}
                            {pkg.badge && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                    {pkg.badge}
                                </div>
                            )}

                            {/* Header Card */}
                            <div className="text-center mb-6">
                                <h3 className={`font-extrabold text-xl mb-2 ${colors.text} uppercase tracking-wider`}>{pkg.title}</h3>
                                <p className="text-slate-500 text-sm mb-2">Mulai dari</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-lg font-bold text-slate-400">Rp</span>
                                    <span className="text-4xl font-black text-slate-800 tracking-tight">{pkg.price}</span>
                                    <span className="text-sm font-medium text-slate-500">{pkg.unit}</span>
                                </div>
                            </div>

                            {/* Image Section */}
                            <div className={`w-32 h-32 mx-auto mb-8 rounded-full ${colors.bg} p-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                                <img src={pkg.img} alt={pkg.title} className="w-full h-full object-contain" />
                            </div>

                            {/* Features List */}
                            <ul className="flex flex-col gap-y-3 mb-8 flex-grow">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <FaCheckCircle className={`text-lg mt-0.5 shrink-0 ${colors.check}`} />
                                        <span className="text-slate-600 text-sm font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Action Button */}
                            <a 
                                href="https://wa.me/62895363324517" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`mt-auto w-full py-3.5 rounded-xl text-center text-white font-bold transition-all duration-300 shadow-md hover:shadow-lg ${colors.btn}`}
                            >
                                Pesan Sekarang
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    </Element>
  )
}

export default Harga