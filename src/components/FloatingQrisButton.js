"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

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
      className="relative flex items-center justify-center p-3.5 rounded-full bg-white border border-gray-200 shadow-[0_0_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-110 active:scale-95 group pointer-events-auto md:hidden"
      aria-label="Buka pembayaran QRIS"
      title="Buka pembayaran QRIS"
    >
      <img
        src={qrisLogoPath}
        alt="QRIS"
        className="h-8 w-8 object-contain"
      />
      <span className="absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-rose-600 text-white text-[10px] font-bold px-1.5 py-0.5 shadow animate-pulse">
        !
      </span>
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-bold px-3 py-1.5 rounded-xl shadow-xl opacity-0 scale-95 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap hidden md:block">
        Bayar QRIS
        <svg className="absolute top-1/2 -mt-2 -right-2 w-4 h-4 text-white" fill="currentColor" viewBox="0 0 8 8"><path d="M0 0l8 4-8 4z" /></svg>
      </span>
    </button>
  );

  return (
    <>
      {/* Portalled Floating button to TopBotton's stack (mobile only) */}
      {mounted
        ? document.getElementById("floating-button-portal")
          ? createPortal(
              floatingButton,
              document.getElementById("floating-button-portal")
            )
          : (
            <div className="fixed z-40 bottom-5 right-5 md:hidden pointer-events-none">
              {floatingButton}
            </div>
          )
        : null}

      {/* Bottom sheet */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />

          {/* sheet */}
          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-4 max-h-[85vh] overflow-auto">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <img
                  src={qrisLogoPath}
                  alt="QRIS"
                  className="h-7 w-7 object-contain"
                />
                <div className="text-sm font-semibold text-gray-900">
                  Pembayaran QRIS
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
              >
                Tutup
              </button>
            </div>

            {/* handle */}
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gray-200" />

            <div className="mt-4">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
