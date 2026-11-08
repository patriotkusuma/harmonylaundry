'use client'

import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { LuChevronDown, LuClock, LuSparkles } from 'react-icons/lu'
import {
  formatRp,
  grupHarga,
  kategoriHarga,
  satuanLabel,
  waLink,
} from '@/data/harga'

const totalLayanan = kategoriHarga.reduce(
  (total, kategori) => total + kategori.items.length,
  0
)

function DaftarHarga() {
  const [activeGroup, setActiveGroup] = useState('semua')
  const [openId, setOpenId] = useState(kategoriHarga[0]?.id ?? null)

  const daftar =
    activeGroup === 'semua'
      ? kategoriHarga
      : kategoriHarga.filter((kategori) => kategori.grup === activeGroup)

  const pilihGrup = (grup) => {
    setActiveGroup(grup)
    const berikutnya =
      grup === 'semua'
        ? kategoriHarga
        : kategoriHarga.filter((kategori) => kategori.grup === grup)
    setOpenId(berikutnya[0]?.id ?? null)
  }

  return (
    <div id="daftar-harga">
      {/* Ringkasan */}
      <div className="mx-auto mb-8 flex max-w-3xl flex-wrap items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-[11px] font-bold text-brand-800">
          <LuSparkles className="text-brand-600" />
          {totalLayanan} layanan
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-white px-3 py-1.5 text-[11px] font-bold text-ink-600">
          <LuClock className="text-brand-600" />
          Estimasi 1–7 hari
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-white px-3 py-1.5 text-[11px] font-bold text-ink-600">
          Harga per kg / pcs / meter
        </span>
      </div>

      {/* Tab grup */}
      <div className="mb-6 flex flex-wrap items-center justify-start gap-2 sm:justify-center">
        {grupHarga.map((grup) => (
          <button
            key={grup.id}
            type="button"
            onClick={() => pilihGrup(grup.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-bold transition-all sm:text-[13px] ${
              activeGroup === grup.id
                ? 'bg-brand-700 text-white shadow-sm'
                : 'border border-ink-900/10 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700'
            }`}
          >
            {grup.label}
          </button>
        ))}
      </div>

      {/* Kategori */}
      <div className="mx-auto flex max-w-4xl flex-col gap-3">
        {daftar.map((kategori) => {
          const terbuka = openId === kategori.id

          return (
            <div
              key={kategori.id}
              className={`overflow-hidden rounded-2xl border bg-white transition-shadow ${
                terbuka ? 'border-brand-200 shadow-card' : 'border-ink-900/10'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenId(terbuka ? null : kategori.id)}
                aria-expanded={terbuka}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left sm:px-6"
              >
                <span className="min-w-0">
                  <span className="block font-display text-base font-extrabold text-ink-900">
                    {kategori.nama}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-relaxed text-ink-400">
                    {kategori.deskripsi}
                  </span>
                </span>

                <span className="flex shrink-0 items-center gap-2.5">
                  <span className="hidden items-center gap-1 text-[10px] font-bold text-ink-500 sm:flex">
                    <LuClock className="text-brand-600" />
                    {kategori.durasi}
                  </span>
                  <span className="rounded-full bg-cream-100 px-2.5 py-1 text-[10px] font-extrabold text-ink-600">
                    {kategori.items.length}
                  </span>
                  <LuChevronDown
                    className={`text-lg text-brand-600 transition-transform duration-200 ${
                      terbuka ? 'rotate-180' : ''
                    }`}
                  />
                </span>
              </button>

              {terbuka && (
                <div className="border-t border-ink-900/5">
                  <div className="flex items-center justify-between gap-3 bg-cream-50 px-5 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-ink-400 sm:px-6">
                    <span>Layanan</span>
                    <span>Harga</span>
                  </div>

                  {kategori.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 border-b border-ink-900/5 px-5 py-3.5 last:border-b-0 sm:px-6"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-extrabold text-ink-900">{item.nama}</div>
                        {item.ket && (
                          <div className="mt-0.5 text-[11px] leading-relaxed text-ink-400">
                            {item.ket}
                          </div>
                        )}
                      </div>
                      <div className="shrink-0 text-right font-display text-sm font-extrabold text-ink-900">
                        Rp {formatRp(item.harga)}
                        <span className="ml-0.5 text-[10px] font-semibold text-ink-400">
                          /{item.satuan || satuanLabel[item.tipe] || 'pcs'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Catatan & CTA */}
      <div className="mx-auto mt-6 flex max-w-4xl flex-col items-center justify-between gap-4 rounded-2xl border border-brand-100 bg-brand-50/70 px-5 py-5 sm:flex-row sm:px-6">
        <div className="text-center sm:text-left">
          <div className="text-sm font-extrabold text-ink-900">
            Butuh item yang belum ada di daftar?
          </div>
          <p className="mt-1 text-xs leading-relaxed text-ink-500">
            Kirim foto barangnya via WhatsApp, admin akan memberi harga pasti.
          </p>
        </div>
        <a
          href={waLink('Halo Harmony Laundry! Saya ingin tanya harga untuk barang berikut.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-brand shrink-0"
        >
          <FaWhatsapp className="text-lg" />
          Tanya admin
        </a>
      </div>
    </div>
  )
}

export default DaftarHarga
