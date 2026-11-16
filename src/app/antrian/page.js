import { getAntrian } from "@/lib/antrian";
import AntrianBoard from "./AntrianBoard";
import { Suspense } from "react";

export const metadata = {
  title: "Antrian Pengerjaan | Harmony Laundry",
  description:
    "Lihat antrian cucianmu secara realtime di Harmony Laundry Yogyakarta.",
};

export default async function AntrianPage() {
  let initial = null;
  let error = null;
  try {
    initial = await getAntrian();
  } catch (err) {
    error = err.message;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-cream-100 pb-14 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-30 mask-fade-b" />
      <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-brand-100/60 blur-3xl" />

      <div className="container-page relative z-10">
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
            Antrian Pengerjaan
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-ink-600">
            Pantau progres cucianmu dan perkiraan giliran antrian secara
            transparan.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="rounded-2xl bg-white/60 p-8 text-center text-ink-500">
              Memuat antrian...
            </div>
          }
        >
          <AntrianBoard initial={initial} error={error} />
        </Suspense>
      </div>
    </main>
  );
}
