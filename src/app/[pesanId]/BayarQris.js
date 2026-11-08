"use client";

import React, { useMemo, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { LuQrCode, LuShieldCheck, LuX } from "react-icons/lu";

export default function BayarQris({ kodePesan, total }) {
  const [open, setOpen] = useState(false);
  const qrisPath = "/img/qris/qris_baru.png";

  const merchantInfo = useMemo(() => {
    return {
      name: "Harmony Laundry",
      nmid: "ID1023298971830",
    };
  }, []);

  const formatIDR = (val) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
      Number(val || 0)
    );

  const downloadQris = async () => {
    try {
      const res = await fetch(qrisPath, { method: "GET" });
      const buffer = await res.arrayBuffer();
      const url = window.URL.createObjectURL(new Blob([buffer]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "QRIS-HarmonyLaundry.png");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Gagal download QRIS. Coba refresh halaman ya.");
    }
  };

  return (
    <section className="w-full md:w-[400px]">
      <div className="overflow-hidden rounded-[1.75rem] border border-ink-900/10 bg-white shadow-card">
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-brand-700">
                <LuQrCode className="text-xs" /> QRIS
              </span>
              <h2 className="mt-2 font-display text-lg font-extrabold text-ink-900">
                Pembayaran QRIS
              </h2>
              <p className="text-xs text-ink-500">Scan untuk pembayaran non-tunai.</p>
            </div>

            <button
              onClick={downloadQris}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-cream-50 px-3 py-2 text-[11px] font-bold text-ink-700 transition-colors hover:bg-white"
              title="Download QRIS"
            >
              <FaDownload className="text-xs" /> Download
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5 text-sm">
            <div className="rounded-xl border border-ink-900/10 bg-cream-50 px-3 py-2.5">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">
                Kode pesanan
              </div>
              <div className="mt-0.5 break-all font-mono text-xs font-bold text-ink-900">
                {kodePesan || "-"}
              </div>
            </div>
            <div className="rounded-xl border border-ink-900/10 bg-cream-50 px-3 py-2.5">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">
                Total tagihan
              </div>
              <div className="mt-0.5 text-xs font-bold text-ink-900">
                {total ? formatIDR(Math.abs(total)) : "-"}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-ink-900/10 bg-cream-50 p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-sm font-extrabold text-ink-900">{merchantInfo.name}</div>
                <div className="text-[11px] text-ink-500">
                  NMID: <span className="font-mono">{merchantInfo.nmid}</span>
                </div>
              </div>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                <LuShieldCheck className="text-sm" />
              </span>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="mt-3 w-full rounded-xl border border-ink-900/10 bg-white p-3 transition-colors hover:bg-cream-50"
              title="Klik untuk memperbesar"
            >
              <img
                src={qrisPath}
                alt="QRIS Harmony Laundry"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <div className="mt-2 text-[11px] font-medium text-ink-400">
                Klik gambar untuk memperbesar
              </div>
            </button>
          </div>

          <div className="mt-4 rounded-2xl border border-ink-900/10 p-4">
            <div className="text-xs font-extrabold text-ink-900">Tips pembayaran</div>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-[11px] leading-relaxed text-ink-500">
              <li>Pastikan nominal sesuai total tagihan.</li>
              <li>Jika sudah membayar, konfirmasi ke admin via WhatsApp.</li>
              <li>Butuh bantuan? Hubungi admin via WhatsApp.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Zoom modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-3xl rounded-[1.75rem] bg-white p-4 shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-extrabold text-ink-900">QRIS Harmony Laundry</div>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 px-3 py-2 text-xs font-bold text-ink-700 hover:bg-cream-50"
              >
                <LuX /> Tutup
              </button>
            </div>

            <img src={qrisPath} alt="QRIS" className="mt-3 w-full rounded-2xl" />
          </div>
        </div>
      )}
    </section>
  );
}
