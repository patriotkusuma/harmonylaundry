"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaClock } from "react-icons/fa";
import moment from "moment";
import "moment/locale/id";

/**
 * Step accordion for Order Timeline
 * - Compact on mobile
 * - Icon + color per step
 * - Log details shown only when expanded
 * - Machine/operator intentionally hidden (per request)
 */
const Step = ({ step, idx, activeIdx, canceled }) => {
  const { title, desc, time, logs, icon, color } = step;

  const done = idx < activeIdx;
  const active = idx === activeIdx;

  const [open, setOpen] = useState(active); // active step auto-open

  // fallback colors if not provided
  const iconCls = canceled
    ? "bg-rose-50 border-rose-200 text-rose-600"
    : done
    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
    : active
    ? "bg-blue-50 border-blue-200 text-blue-700"
    : "bg-white border-gray-200 text-gray-400";

  // if step defines its own style (recommended), use it
  const iconStyle = color || iconCls;

  return (
    <div className="rounded-2xl border bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full p-4 flex items-start gap-3 text-left hover:bg-gray-50 transition"
      >
        {/* icon bubble */}
        <div
          className={`h-10 w-10 rounded-2xl border flex items-center justify-center shrink-0 ${iconStyle}`}
        >
          {icon ? icon : done ? "✓" : "•"}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <div className="font-semibold text-gray-900">{title}</div>

                {done && !canceled && (
                  <span className="rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5 text-[11px] font-semibold">
                    Selesai
                  </span>
                )}
                {active && !canceled && (
                  <span className="rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-[11px] font-semibold">
                    Sedang diproses
                  </span>
                )}
              </div>

              {time && (
                <div className="mt-1 text-xs text-gray-500 flex items-center gap-2">
                  <FaClock />
                  {moment(time).locale("id").format("ddd, DD MMM YYYY HH:mm")}
                </div>
              )}

              {/* desc only when open */}
              {open && (
                <div className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {desc}
                </div>
              )}

              {/* log count when closed */}
              {!open && (logs?.length || 0) > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  {logs.length} aktivitas tercatat
                </div>
              )}
            </div>

            <div className="text-gray-400 mt-1 shrink-0">
              {open ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>
        </div>
      </button>

      {/* expanded content: logs */}
      {open && (
        <div className="border-t bg-gray-50 p-4">
          {(logs?.length || 0) === 0 ? (
            <div className="text-sm text-gray-600">Belum ada log proses untuk tahap ini.</div>
          ) : (
            <div className="space-y-3">
              {logs.map((l) => (
                <div key={l.id} className="rounded-xl border bg-white p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm font-semibold text-gray-900 capitalize">
                      {l.proses}
                    </div>
                    <div className="text-xs text-gray-500">
                      {moment(l.started_at).locale("id").format("DD MMM HH:mm")}
                    </div>
                  </div>

                  <div className="mt-1 text-sm text-gray-600 leading-relaxed">
                    {l.keterangan}
                  </div>
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