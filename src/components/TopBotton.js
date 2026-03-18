'use client'
import React, { useState, useEffect } from 'react'
import { BiArrowToTop } from 'react-icons/bi'
import { FaWhatsapp } from 'react-icons/fa'
import { animateScroll as scroll } from 'react-scroll'

function TopBotton() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollTop = () => {
        scroll.scrollToTop()
    }

    return (
        <div className="fixed right-4 bottom-4 md:right-8 md:bottom-8 z-50 flex flex-col items-end gap-3 pointer-events-none">
            
            {/* Target for portals (e.g. Floating QRIS button) to stack correctly */}
            <div id="floating-button-portal" className="flex flex-col items-end gap-3 pointer-events-none empty:hidden" />

            {/* Back to top - Only visible when scrolled down */}
            <button 
                onClick={scrollTop} 
                className={`p-3 rounded-full cursor-pointer hover:bg-blue-700 transition-all duration-500 ease-in-out shadow-lg bg-blue-600 border border-blue-500 text-white ring-4 ring-white/50 pointer-events-auto
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                aria-label="Kembali ke atas"
            >
                <BiArrowToTop className="text-xl" />
            </button>

            {/* Floating WhatsApp - Always visible & pulsing */}
            <a 
                href="https://wa.me/62895363324517" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative flex items-center justify-center p-3.5 md:p-4 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] group pointer-events-auto"
                aria-label="Chat WhatsApp"
            >
                <FaWhatsapp className="text-3xl md:text-4xl" />
                
                {/* Ping Animation Ring */}
                <span className="absolute w-full h-full rounded-full bg-green-400 opacity-30 animate-ping" />

                {/* Tooltip on hover (desktop only) */}
                <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-bold px-3 py-1.5 rounded-xl shadow-xl opacity-0 scale-95 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap hidden md:block">
                    Pesan via WA
                    {/* Tooltip triangle tail */}
                    <svg className="absolute top-1/2 -mt-2 -right-2 w-4 h-4 text-white" fill="currentColor" viewBox="0 0 8 8"><path d="M0 0l8 4-8 4z" /></svg>
                </span>
            </a>
        </div>
    )
}

export default TopBotton