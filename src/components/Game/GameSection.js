"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { LuGamepad2 } from "react-icons/lu";

// Game baru diunduh saat section-nya mau kelihatan, bukan saat landing dibuka.
const TangkapCucian = dynamic(() => import("./TangkapCucian"), {
  ssr: false,
  loading: () => (
    <div className="grid aspect-[16/10] w-full place-items-center rounded-[2rem] border border-white/10 bg-white/5">
      <span className="inline-flex items-center gap-2 text-xs font-bold text-cream-50/70">
        <LuGamepad2 className="animate-pulse" />
        Menyiapkan arena...
      </span>
    </div>
  ),
});

export default function GameSection() {
  const holderRef = useRef(null);
  const [muncul, setMuncul] = useState(false);

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return undefined;

    // Browser jadul tanpa IntersectionObserver: langsung tampilkan.
    if (typeof IntersectionObserver === "undefined") {
      setMuncul(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMuncul(true);
          io.disconnect();
        }
      },
      { rootMargin: "320px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="game"
      className="relative w-full overflow-hidden bg-ink-900 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-linegrid opacity-[0.06]" />
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-brand-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-coral-500/20 blur-3xl" />

      <div className="container-page relative z-10">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cream-50/80 backdrop-blur">
            <LuGamepad2 className="text-citrus-400" />
            Mini game
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-cream-50 text-balance sm:text-4xl lg:text-5xl">
            Nunggu cucian? <span className="text-brand-300">Main dulu.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-300">
            &ldquo;Tangkap Cucian&rdquo;: geser keranjang, tangkap baju dan
            handuk, hindari noda lumpur. 30 detik saja, langsung tahu pangkatmu.
          </p>
        </div>

        <div ref={holderRef} className="mx-auto max-w-3xl">
          {muncul ? (
            <TangkapCucian />
          ) : (
            <div className="grid aspect-[16/10] w-full place-items-center rounded-[2rem] border border-white/10 bg-white/5">
              <span className="text-xs font-bold text-cream-50/50">
                Scroll sedikit lagi untuk mulai main
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
