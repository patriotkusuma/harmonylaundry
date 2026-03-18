"use client";

import React, { useMemo, useState } from "react";
import { FaDownload } from "react-icons/fa";

/**
 * QRIS Payment Card (STATIC)
 * - scan QR image (static)
 * - download QR image
 * - zoom modal
 */
export default function BayarQris({ kodePesan, total }) {
  const [open, setOpen] = useState(false);
  const qrisPath = "/img/qris/qris_baru.png";
  console.log("total : ", total);
  

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
    <section className="w-full md:w-[420px]">
      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Pembayaran QRIS</h2>
              <p className="text-sm text-gray-500">
                Scan QRIS untuk pembayaran non-tunai.
              </p>
            </div>

            <button
              onClick={downloadQris}
              className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-[0.99]"
              title="Download QRIS"
            >
              <FaDownload /> Download
            </button>
          </div>

          {/* info transaksi (optional) */}
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border bg-gray-50 px-3 py-2">
              <div className="text-xs text-gray-500">Kode Pesanan</div>
              <div className="font-mono font-semibold text-gray-900 break-all">
                {kodePesan || "-"}
              </div>
            </div>
            <div className="rounded-xl border bg-gray-50 px-3 py-2">
              <div className="text-xs text-gray-500">Total Tagihan</div>
              <div className="font-semibold text-gray-900">
                {total ? formatIDR(Math.abs(total)) : "-"}
              </div>
            </div>
          </div>

          {/* merchant info */}
          <div className="mt-4 rounded-2xl border bg-gray-50 p-4">
            <div className="text-sm font-semibold text-gray-900">{merchantInfo.name}</div>
            <div className="text-xs text-gray-600">
              NMID: <span className="font-mono">{merchantInfo.nmid}</span>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="mt-4 w-full rounded-2xl bg-white p-3 border hover:bg-gray-50"
              title="Klik untuk memperbesar"
            >
              <img
                src={qrisPath}
                alt="QRIS Harmony Laundry"
                className="w-full rounded-xl"
                loading="lazy"
              />
              <div className="mt-2 text-xs text-gray-500">
                Klik gambar untuk memperbesar.
              </div>
            </button>
          </div>

          <div className="mt-4 rounded-2xl border p-4">
            <div className="text-sm font-semibold text-gray-900">Tips</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Pastikan nominal sesuai total tagihan.</li>
              <li>Jika sudah membayar, mohon konfirmasi ke admin via WhatsApp.</li>
              <li>Butuh bantuan? Hubungi admin via WhatsApp.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Light Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="max-w-3xl w-full rounded-2xl bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-900">QRIS</div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
              >
                Tutup
              </button>
            </div>

            <img src={qrisPath} alt="QRIS" className="mt-3 w-full rounded-xl" />
          </div>
        </div>
      )}
    </section>
  );
}
