"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { LuX } from "react-icons/lu";

export default function FloatingQrisButton({ children }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const qrisLogoPath = "/img/qris/logo.png";

  useEffect(() => {
    setMounted(true);
  }, []);

  const floatingButton = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="group pointer-events-auto relative flex items-center justify-center rounded-full border border-ink-900/10 bg-white p-3 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 md:hidden"
      aria-label="Buka pembayaran QRIS"
      title="Buka pembayaran QRIS"
    >
      <img src={qrisLogoPath} alt="QRIS" className="h-8 w-8 object-contain" />
      <span className="absolute -right-1 -top-1 flex items-center justify-center rounded-full bg-coral-500 px-1.5 py-0.5 text-[10px] font-bold text-white shadow">
        !
      </span>
    </button>
  );

  return (
    <>
      {mounted
        ? document.getElementById("floating-button-portal")
          ? createPortal(
              floatingButton,
              document.getElementById("floating-button-portal")
            )
          : (
            <div className="pointer-events-none fixed bottom-5 right-5 z-40 md:hidden">
              {floatingButton}
            </div>
          )
        : null}

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[88vh] overflow-auto rounded-t-[2rem] border-t border-ink-900/10 bg-cream-50 p-4">
            <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-ink-900/15" />

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <img src={qrisLogoPath} alt="QRIS" className="h-7 w-7 object-contain" />
                <div className="text-sm font-extrabold text-ink-900">Pembayaran QRIS</div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-900/10 bg-white px-3 py-2 text-xs font-bold text-ink-700"
              >
                <LuX /> Tutup
              </button>
            </div>

            <div className="mt-4">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
