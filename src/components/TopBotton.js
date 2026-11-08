'use client'
import React, { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { LuArrowUp } from 'react-icons/lu'
import { animateScroll as scroll } from 'react-scroll'

function TopBotton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 320)
    toggleVisibility()
    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 md:bottom-8 md:right-8">
      <div id="floating-button-portal" className="pointer-events-none flex flex-col items-end gap-3 empty:hidden" />

      <button
        onClick={() => scroll.scrollToTop()}
        className={`pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-ink-900 text-cream-50 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-700 active:translate-y-0 ${
          isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0'
        }`}
        aria-label="Kembali ke atas"
      >
        <LuArrowUp className="text-xl" />
      </button>

      <a
        href="https://wa.me/62895363324517"
        target="_blank"
        rel="noopener noreferrer"
        className="group pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_18px_35px_-16px_rgba(5,150,105,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 active:translate-y-0"
        aria-label="Chat WhatsApp antar jemput"
      >
        <FaWhatsapp className="text-2xl" />
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-emerald-400 opacity-25" />

        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-ink-900 px-3 py-1.5 text-[11px] font-bold text-cream-50 opacity-0 shadow-card transition-all duration-200 group-hover:opacity-100 md:block">
          Pesan antar jemput
        </span>
      </a>
    </div>
  )
}

export default TopBotton
