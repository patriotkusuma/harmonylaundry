import Link from "next/link";
import { FaReceipt } from "react-icons/fa";
import { LuArrowLeft, LuHome } from "react-icons/lu";

export default function Custom404() {
  return (
    <main className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden bg-cream-100 px-4 py-24 text-center">
      <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-40 mask-fade-b" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl" />

      <div className="relative z-10 w-full max-w-lg rounded-[2rem] border border-ink-900/10 bg-white/85 p-8 shadow-card backdrop-blur sm:p-12">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-coral-300/40 text-3xl text-coral-600">
          <FaReceipt />
        </div>

        <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-ink-900">
          Data tidak ditemukan
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-500">
          Maaf, kode pesanan yang kamu cari tidak ada dalam sistem kami. Coba periksa kembali kode
          pesananmu, ya.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
          <Link href="/pesan" className="btn-light w-full sm:w-auto">
            <LuArrowLeft className="text-base" />
            Cek ulang kode
          </Link>
          <Link href="/" className="btn-dark w-full sm:w-auto">
            <LuHome className="text-base" />
            Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
