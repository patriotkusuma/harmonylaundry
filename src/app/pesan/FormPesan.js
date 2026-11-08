'use client'
import React, { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { LuCheck, LuClock, LuMapPin, LuShirt, LuSparkles, LuTruck, LuUser } from 'react-icons/lu'

const paketOptions = [
  { value: 'Regular 2 Hari', label: 'Regular', hint: '2 hari · hemat' },
  { value: 'Express 1 Hari', label: 'Express', hint: '24 jam · populer' },
  { value: 'Kilat 6 Jam', label: 'Super kilat', hint: '6 jam selesai' },
  { value: 'Kilat 4 Jam', label: 'Flash', hint: '4 jam selesai' },
]

function FormPesan() {
  const [isValid, setIsValid] = useState(false)

  const [formData, setFormData] = useState({
    nama: '',
    paket: 'Regular 2 Hari',
    layanan: 'Cuci Setrika',
    alamat: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    const checkValid =
      formData.nama.trim() !== '' &&
      formData.paket !== '' &&
      formData.layanan !== '' &&
      formData.alamat.trim() !== ''
    setIsValid(checkValid)
  }, [formData])

  const submit = (e) => {
    e.preventDefault()
    if (!isValid) return

    const number = '62895363324517'

    let message = 'Halo Harmony Laundry! Mau booking pickup cucian antar jemput dong kak:' + '%0a%0a'
    message += `• Nama Lengkap : *${formData.nama.trim()}*` + '%0a'
    message += `• Paket Kecepatan : *${formData.paket}*` + '%0a'
    message += `• Jenis Layanan : *${formData.layanan}*` + '%0a'
    message += `• Alamat Pickup : *${formData.alamat.trim()}*` + '%0a%0a'
    message += 'Mohon info waktu penjemputan driver ke lokasi saya. Terima kasih banyak!'

    const url = `https://wa.me/${number}?text=${encodeURI(message).replace(/#/g, '%23')}`
    window.open(url, '_blank')
  }

  return (
    <div className="w-full max-w-lg">
      <div className="relative overflow-hidden rounded-[2rem] border border-ink-900/10 bg-white p-5 shadow-card sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-brand-100/70 blur-2xl" />

        {/* Header */}
        <div className="relative z-10 mb-6 border-b border-ink-900/10 pb-5">
          <span className="eyebrow">
            <LuSparkles className="text-brand-700" />
            Formulir pickup cepat
          </span>
          <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink-900">
            Jadwalkan penjemputan
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-ink-500 sm:text-sm">
            Isi data di bawah, kurir kami segera merespons dan menuju lokasimu.
          </p>
        </div>

        <form onSubmit={submit} className="relative z-10 flex flex-col gap-5">
          {/* Nama */}
          <div>
            <label htmlFor="nama" className="field-label">
              <LuUser className="text-sm text-brand-600" />
              Nama lengkap <span className="text-coral-500">*</span>
            </label>
            <input
              id="nama"
              type="text"
              name="nama"
              placeholder="Contoh: Budi Santoso"
              value={formData.nama}
              onChange={handleChange}
              required
              className="field"
            />
          </div>

          {/* Paket */}
          <div>
            <span className="field-label">
              <LuClock className="text-sm text-brand-600" />
              Pilihan kecepatan <span className="text-coral-500">*</span>
            </span>
            <div className="grid grid-cols-2 gap-2">
              {paketOptions.map((opt) => {
                const active = formData.paket === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, paket: opt.value })}
                    className={`flex flex-col rounded-2xl border px-3 py-2.5 text-left transition-all ${
                      active
                        ? 'border-brand-600 bg-brand-50 shadow-sm ring-1 ring-brand-600/20'
                        : 'border-ink-900/10 bg-cream-50 hover:border-ink-900/25'
                    }`}
                    aria-pressed={active}
                  >
                    <span className="flex items-center justify-between gap-1">
                      <span className="text-xs font-extrabold text-ink-900">{opt.label}</span>
                      {active && <LuCheck className="text-sm text-brand-700" />}
                    </span>
                    <span className="mt-0.5 text-[10px] font-semibold text-ink-400">
                      {opt.hint}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Layanan */}
          <div>
            <label htmlFor="layanan" className="field-label">
              <LuShirt className="text-sm text-brand-600" />
              Jenis layanan <span className="text-coral-500">*</span>
            </label>
            <select
              id="layanan"
              name="layanan"
              value={formData.layanan}
              onChange={handleChange}
              className="field cursor-pointer font-medium"
            >
              <option value="Cuci Setrika">Cuci + Setrika Wangi Rapi (Kiloan)</option>
              <option value="Cuci Kering Lipat">Cuci Kering Lipat (Kiloan)</option>
              <option value="Setrika Saja">Setrika Rapi Saja (Kiloan)</option>
              <option value="Cuci Sepatu">Treatment Cuci Sepatu (Sneakers/Formal)</option>
              <option value="Cuci Bed Cover / Selimut">Cuci Bed Cover / Selimut / Karpet</option>
              <option value="Cucian Satuan (Jas/Gaun)">Cucian Satuan (Jas/Gaun/Pakaian Khusus)</option>
            </select>
          </div>

          {/* Alamat */}
          <div>
            <label htmlFor="alamat" className="field-label">
              <LuMapPin className="text-sm text-brand-600" />
              Alamat lengkap &amp; patokan <span className="text-coral-500">*</span>
            </label>
            <textarea
              id="alamat"
              name="alamat"
              rows={3}
              placeholder="Contoh: Kost Griya Putri No. 12, Jl. Candi Gebang (sebelah minimarket, Sleman)"
              value={formData.alamat}
              onChange={handleChange}
              required
              className="field resize-none"
            />
          </div>

          <button type="submit" disabled={!isValid} className="btn-wa w-full">
            <FaWhatsapp className="text-xl" />
            Kirim pesanan ke WhatsApp
          </button>

          <p className="flex items-start justify-center gap-1.5 text-center text-[11px] leading-tight text-ink-400">
            <LuTruck className="mt-0.5 shrink-0 text-sm text-brand-600" />
            Gratis antar-jemput untuk jarak maksimal 5 km dari outlet Condongcatur, Sleman.
          </p>
        </form>
      </div>
    </div>
  )
}

export default FormPesan
