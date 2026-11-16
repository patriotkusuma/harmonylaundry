"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import moment from "moment";
import "moment/locale/id";

// Menampilkan info antrian untuk tahap yang sedang aktif.
// Hanya tahap aktif yang diberi info; tahap lain tidak dihitung sama sekali.
const AntrianInfo = ({ antrian }) => {
  if (!antrian) return null;

  const { posisi, di_depan, total_di_tahap, menunggu_antar } = antrian;

  // Tahap selesai + minta diantar: yang penting "menunggu pengantaran".
  if (menunggu_antar) {
    return (
      <div className="mt-2 rounded-xl border border-brand-200 bg-brand-50 px-3 py-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-brand-800">
          <span>🚚</span> Menunggu pengantaran
        </div>
        <div className="mt-0.5 text-[11px] leading-relaxed text-brand-700">
          Pesanan selesai dan akan diantar oleh kurir.
        </div>
      </div>
    );
  }

  // Giliran sekarang.
  if (di_depan === 0) {
    return (
      <div className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5">
        <div className="text-xs font-bold text-emerald-800">
          🎉 Sekarang giliranmu
        </div>
        <div className="mt-0.5 text-[11px] leading-relaxed text-emerald-700">
          Pesananmu sedang ditangani pada tahap ini.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 rounded-xl border border-ink-900/10 bg-cream-50 px-3 py-2.5">
      <div className="flex items-baseline gap-1.5">
        <span className="text-[11px] text-ink-500">Antrian ke-</span>
        <span className="font-display text-base font-extrabold leading-none text-ink-900">
          {posisi}
        </span>
        <span className="text-[11px] text-ink-500">dari {total_di_tahap}</span>
      </div>
      <div className="mt-0.5 text-[11px] leading-relaxed text-ink-500">
        {di_depan} pesanan di depanmu. Biasanya lebih cepat kalau antrean
        sedang lengang.
      </div>
    </div>
  );
};

const Step = ({ step, idx, activeIdx, canceled, antrian }) => {
  const { title, desc, time, logs, icon, color } = step;

  const done = idx < activeIdx;
  const active = idx === activeIdx;

  const [open, setOpen] = useState(active);

  const iconCls = canceled
    ? "bg-rose-50 border-rose-200 text-rose-600"
    : done
      ? "bg-emerald-50 border-emerald-200 text-emerald-600"
      : active
        ? "bg-brand-50 border-brand-200 text-brand-700"
        : "bg-white border-ink-900/10 text-ink-300";

  const iconStyle = color || iconCls;

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
        active ? "border-brand-600/40 ring-1 ring-brand-600/10" : "border-ink-900/10"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-cream-50"
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-sm ${iconStyle}`}
        >
          {icon ? icon : done ? "✓" : "•"}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-sm font-extrabold text-ink-900">{title}</div>

                {done && !canceled && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    Selesai
                  </span>
                )}
                {active && !canceled && (
                  <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-700">
                    Sedang diproses
                  </span>
                )}
                {canceled && active && (
                  <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                    Dibatalkan
                  </span>
                )}
              </div>

              {time && (
                <div className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-ink-400">
                  <LuClock className="text-xs" />
                  {moment(time).locale("id").format("ddd, DD MMM YYYY HH:mm")}
                </div>
              )}

              {open && (
                <div className="mt-2 text-xs leading-relaxed text-ink-600">{desc}</div>
              )}

              {/* Info antrian hanya untuk tahap yang sedang aktif. */}
              {active && !canceled && <AntrianInfo antrian={antrian} />}

              {!open && (logs?.length || 0) > 0 && (
                <div className="mt-1.5 text-[11px] font-medium text-ink-400">
                  {logs.length} aktivitas tercatat
                </div>
              )}
            </div>

            <div className="mt-0.5 shrink-0 text-ink-300">
              {open ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>
        </div>
      </button>

      {open && (
        <div className="border-t border-ink-900/10 bg-cream-50 p-4">
          {(logs?.length || 0) === 0 ? (
            <div className="text-xs text-ink-500">Belum ada log proses untuk tahap ini.</div>
          ) : (
            <div className="space-y-2.5">
              {logs.map((l) => (
                <div key={l.id} className="rounded-xl border border-ink-900/10 bg-white p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-xs font-bold capitalize text-ink-900">{l.proses}</div>
                    <div className="text-[11px] text-ink-400">
                      {moment(l.started_at).locale("id").format("DD MMM HH:mm")}
                    </div>
                  </div>

                  <div className="mt-1 text-xs leading-relaxed text-ink-600">{l.keterangan}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Step;
