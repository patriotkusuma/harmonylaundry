import Link from "next/link";
import { FaArrowLeft, FaReceipt } from "react-icons/fa";
import { LuArrowUpRight, LuHome } from "react-icons/lu";

export default function Custom404() {
  return (
    <main className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden bg-cream-100 px-4 py-24 text-center">
      <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-40 mask-fade-b" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-citrus-200/40 blur-3xl" />

      <div className="relative z-10 w-full max-w-lg rounded-[2rem] border border-ink-900/10 bg-white/85 p-8 shadow-card backdrop-blur sm:p-12">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-coral-300/40 text-3xl text-coral-600">
          <FaReceipt />
        </div>

        <div className="mt-5 font-display text-6xl font-extrabold leading-none tracking-tighter text-ink-900">
          404
        </div>
        <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink-900">
          Halaman tidak ditemukan
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-500">
          Maaf, halaman yang kamu tuju sedang dipindahkan atau tidak ada di sistem kami.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
          <Link href="/" className="btn-dark w-full sm:w-auto">
            <LuHome className="text-base" />
            Kembali ke beranda
          </Link>
          <Link href="/blog" className="btn-light w-full sm:w-auto">
            Baca blog
            <LuArrowUpRight className="text-base" />
          </Link>
        </div>

        <p className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-400">
          <FaArrowLeft className="text-[10px]" />
          Butuh bantuan? Chat CS kami via WhatsApp.
        </p>
      </div>
    </main>
  );
}
