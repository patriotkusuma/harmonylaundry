"use client";

import { useEffect, useState } from "react";
import { getAntrian } from "@/lib/antrian";

const TAHAP_META = {
  cuci: {
    label: "Mencuci",
    sub: "Sedang dicuci / menunggu mesin cuci",
    color: "bg-sky-100 text-sky-900 border-sky-200",
    icon: "🫧",
  },
  drying: {
    label: "Mengeringkan",
    sub: "Sedang di mesin pengering",
    color: "bg-amber-100 text-amber-900 border-amber-200",
    icon: "🌀",
  },
  setrika: {
    label: "Menyetrika",
    sub: "Sedang disetrika / dilipat",
    color: "bg-rose-100 text-rose-900 border-rose-200",
    icon: "🔥",
  },
  selesai: {
    label: "Selesai",
    sub: "Siap diambil / menunggu pengantaran",
    color: "bg-emerald-100 text-emerald-900 border-emerald-200",
    icon: "✅",
  },
};

function durasiSingkat(jam) {
  const h = Math.floor(jam);
  const m = Math.round((jam - h) * 60);
  if (h < 1) return `${m} menit`;
  if (m === 0) return `${h} jam`;
  return `${h} jam ${m} menit`;
}

export default function AntrianBoard({ initial, error: initialError }) {
  const [data, setData] = useState(initial?.data ?? null);
  const [error, setError] = useState(initialError ?? null);
  const [loading, setLoading] = useState(false);
  const [batasHari, setBatasHari] = useState(7);

  async function refresh(hari) {
    setLoading(true);
    setError(null);
    try {
      const res = await getAntrian(hari);
      if (res.status && res.data) {
        setData(res.data);
      } else {
        setError("Data antrian kosong");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const id = setInterval(() => refresh(batasHari), 60000);
    return () => clearInterval(id);
  }, [batasHari]);

  const totalMenungguAntar = data?.menunggu_antar ?? 0;

  return (
    <div className="space-y-6">
      {/* ribbon menunggu pengantaran */}
      {totalMenungguAntar > 0 && (
        <div className="relative overflow-hidden rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-4 text-white shadow-md">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
          <div className="relative flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚚</span>
              <div>
                <p className="font-display text-lg font-bold">
                  {totalMenungguAntar} pesanan menunggu pengantaran
                </p>
                <p className="text-brand-50 text-sm">
                  Kurir akan segera mengantar ke alamat tujuan.
                </p>
              </div>
            </div>
            <span className="inline-flex w-fit items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Pengantaran
            </span>
          </div>
        </div>
      )}

      {/* kontrol */}
      <div className="flex flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-ink-600">
          <span className="font-semibold text-ink-900">
            {data?.total_order ?? 0}
          </span>{" "}
          order aktif
        </div>
        <div className="flex items-center gap-2 text-sm text-ink-600">
          <label htmlFor="hari">Data berapa hari terakhir:</label>
          <select
            id="hari"
            value={batasHari}
            onChange={(e) => {
              const v = Number(e.target.value);
              setBatasHari(v);
              refresh(v);
            }}
            className="rounded-lg border border-ink-200 bg-cream-50 px-3 py-1.5 text-ink-900 focus:border-brand-500 focus:outline-none"
          >
            <option value={1}>1 hari</option>
            <option value={3}>3 hari</option>
            <option value={7}>7 hari</option>
            <option value={30}>30 hari</option>
          </select>
          <button
            onClick={() => refresh(batasHari)}
            disabled={loading}
            className="rounded-lg bg-brand-600 px-4 py-1.5 font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {loading ? "..." : "Refresh"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
          {error}
        </div>
      )}

      {!data && !error && (
        <div className="rounded-2xl bg-white/60 p-8 text-center text-ink-500">
          Memuat antrian...
        </div>
      )}

      {data && (
        <div className="grid gap-5 lg:grid-cols-2">
          {data.tahap.map((tahap) => {
            const meta = TAHAP_META[tahap.tahap];
            return (
              <section
                key={tahap.tahap}
                className={`rounded-2xl border ${meta.color.split(" ")[2]} bg-white p-5 shadow-sm`}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{meta.icon}</span>
                    <div>
                      <h2 className="font-display text-lg font-bold">
                        {meta.label}
                      </h2>
                      <p className="text-xs opacity-80">{meta.sub}</p>
                    </div>
                  </div>
                  <div
                    className={`inline-flex flex-col items-center justify-center rounded-xl border px-4 py-2 ${meta.color}`}
                  >
                    <span className="text-xl font-bold leading-none">
                      {tahap.jumlah_order}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-wide opacity-80">
                      order
                    </span>
                  </div>
                </div>

                {tahap.jumlah_order === 0 ? (
                  <p className="rounded-xl bg-ink-50/50 py-6 text-center text-sm text-ink-500">
                    Tidak ada antrian di tahap ini.
                  </p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-1 text-xs text-ink-500">
                      <span>{tahap.jumlah_rfid} RFID menempel</span>
                      <span>Posisi</span>
                    </div>
                    <ul className="space-y-2">
                      {tahap.item.map((item) => (
                        <li
                          key={item.order_id}
                          className="flex items-center justify-between rounded-xl border border-ink-100 bg-cream-50 px-4 py-3"
                        >
                          <div>
                            <p className="font-semibold text-ink-900">
                              {item.kode_pesan}
                            </p>
                            <p className="text-xs text-ink-500">
                              {item.customer || "Tanpa nama"} ·{" "}
                              {item.jumlah_rfid > 0
                                ? `${item.jumlah_rfid} RFID`
                                : "Belum scan RFID"}
                              {item.butuh_antar && (
                                <span className="ml-2 inline-flex items-center rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                                  diantar
                                </span>
                              )}
                            </p>
                            <p className="mt-0.5 text-[10px] text-ink-400">
                              menunggu {durasiSingkat(item.menunggu_jam)}
                            </p>
                          </div>
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-ink-700 shadow-sm">
                            {item.posisi}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
