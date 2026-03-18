'use client'
import React, { useEffect, useRef, useState } from 'react'

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

const startDate = new Date('2023-09-23');
const currentDate = new Date();
const yearsOfExperience = Math.max(1, Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 365.25)));

const stats = [
  { value: 1500, suffix: '+', label: 'Pelanggan Puas', icon: '😊' },
  { value: 5, suffix: ' km', label: 'Jangkauan Antar Jemput', icon: '🚗' },
  { value: yearsOfExperience, suffix: ' Tahun', label: 'Pengalaman Melayani', icon: '🏆' },
  { value: 98, suffix: '%', label: 'Tingkat Kepuasan', icon: '⭐' },
]

function StatCard({ item, triggerCount }) {
  const count = useCountUp(item.value, 1600, triggerCount)
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="text-4xl mb-3">{item.icon}</div>
      <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">
        {count.toLocaleString('id-ID')}{item.suffix}
      </div>
      <div className="text-white/80 text-sm md:text-base font-medium">{item.label}</div>
    </div>
  )
}

function Stats() {
  const ref = useRef(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    /* Wrapper yang menyatukan Stats + wave SVG agar seamless */
    <div ref={ref} className="-mt-px" style={{ backgroundColor: '#eff6ff' }}>
      {/* Stats strip */}
      <div className="py-14 bg-gradient-to-r from-blue-700 via-blue-600 to-teal-500 relative">
        {/* decorative bubbles */}
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-4 xl:px-0 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition duration-300">
                <StatCard item={item} triggerCount={triggered} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave transition to WeAre (bg-blue-50 = #eff6ff) */}
      {/* Wave transition to WeAre section - blue background, wave curves DOWN into blue-50 */}
      <div className="leading-none -mt-px bg-gradient-to-r from-blue-700 to-teal-500">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path
            d="M0 40C240 0 480 0 720 40C960 80 1200 80 1440 40V80H0V40Z"
            fill="#eff6ff"
          />
        </svg>
      </div>
    </div>
  )
}

export default Stats
