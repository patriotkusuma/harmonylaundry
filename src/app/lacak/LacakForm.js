'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LuArrowRight, LuPackageSearch } from 'react-icons/lu'

function LacakForm() {
  const router = useRouter()
  const [kode, setKode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = kode.trim()

    if (!value) {
      setError('Masukkan kode pesanan terlebih dahulu, ya.')
      return
    }

    setError('')
    router.push(`/${encodeURIComponent(value)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <label
        htmlFor="kode-pesanan"
        className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-600"
      >
        <LuPackageSearch className="text-sm text-brand-600" />
        Kode pesanan
      </label>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          id="kode-pesanan"
          type="text"
          value={kode}
          onChange={(e) => {
            setKode(e.target.value)
            if (error) setError('')
          }}
          placeholder="Contoh: HL-2408-001"
          autoComplete="off"
          className="field flex-1"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'kode-error' : undefined}
        />
        <button type="submit" className="btn-brand shrink-0">
          Lacak sekarang
          <LuArrowRight className="text-base" />
        </button>
      </div>

      {error && (
        <p id="kode-error" className="mt-2 text-xs font-semibold text-coral-600" aria-live="polite">
          {error}
        </p>
      )}

      <p className="mt-3 text-[11px] leading-relaxed text-ink-400">
        Kode pesanan kamu tertera pada konfirmasi booking atau pesan WhatsApp dari admin.
      </p>
    </form>
  )
}

export default LacakForm
