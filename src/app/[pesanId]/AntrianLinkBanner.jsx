import Link from "next/link";

export default function AntrianLinkBanner() {
  return (
    <div className="mb-6 rounded-2xl border border-brand-100 bg-white p-4 shadow-sm">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👕</span>
          <div>
            <p className="font-display font-bold text-ink-900">
              Lihat antrian pengerjaan
            </p>
            <p className="text-sm text-ink-500">
              Pantau posisi antrian cucian dan status pengantaran secara realtime.
            </p>
          </div>
        </div>
        <Link
          href="/antrian"
          className="inline-flex shrink-0 items-center rounded-lg bg-brand-600 px-5 py-2.5 font-medium text-white hover:bg-brand-700"
        >
          Buka Antrian
        </Link>
      </div>
    </div>
  );
}
