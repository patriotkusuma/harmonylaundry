"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  LuCheck,
  LuCrosshair,
  LuLoader2,
  LuMapPin,
  LuSearch,
  LuTruck,
  LuX,
} from "react-icons/lu";
import { waLink } from "@/data/harga";
import {
  FREE_RADIUS_KM,
  OUTLET,
  RATE_PER_KM,
  formatKm,
  formatRupiah,
  hitungOngkir,
} from "@/lib/ongkir";

const OngkirMap = dynamic(() => import("./Ongkir/OngkirMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[300px] w-full place-items-center bg-cream-200 sm:h-[420px]">
      <LuLoader2 className="animate-spin text-2xl text-brand-700" />
    </div>
  ),
});

const singkatAlamat = (alamat) =>
  alamat.length > 68 ? `${alamat.slice(0, 68)}…` : alamat;

function CekOngkir() {
  const [destination, setDestination] = useState(null);
  const [info, setInfo] = useState(null);
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [geoBusy, setGeoBusy] = useState(false);

  // Hitung jarak setiap titik tujuan berubah (debounce agar drag marker
  // tidak membanjiri API).
  useEffect(() => {
    if (!destination) {
      setInfo(null);
      setRoute([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/ongkir?lat=${destination.lat}&lng=${destination.lng}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Gagal menghitung jarak");

        setInfo(data);
        setRoute(data.geometry || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Gagal menghitung jarak");
          setInfo(null);
          setRoute([]);
        }
      } finally {
        setLoading(false);
      }
    }, 450);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [destination]);

  const handlePick = useCallback(({ lat, lng, label }) => {
    setDestination((prev) => ({
      lat,
      lng,
      label: label || prev?.label || null,
    }));
    setResults([]);
    setSearchError(null);
  }, []);

  const cariAlamat = async (event) => {
    event.preventDefault();
    const q = query.trim();
    if (q.length < 3) {
      setSearchError("Tulis minimal 3 karakter, mis. nama jalan atau kelurahan.");
      return;
    }

    setSearching(true);
    setSearchError(null);
    setResults([]);

    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Alamat tidak ditemukan");

      if (!data.results?.length) {
        setSearchError("Alamat tidak ketemu. Coba kata kunci lain atau klik langsung di peta.");
      } else {
        setResults(data.results);
      }
    } catch (err) {
      setSearchError(err.message || "Gagal mencari alamat");
    } finally {
      setSearching(false);
    }
  };

  const pakaiLokasiSaya = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setSearchError("Browser ini tidak mendukung deteksi lokasi.");
      return;
    }

    setGeoBusy(true);
    setSearchError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoBusy(false);
        setDestination({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: "Lokasi saya",
        });
        setResults([]);
      },
      () => {
        setGeoBusy(false);
        setSearchError("Izin lokasi ditolak. Klik peta atau cari alamat manual.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const rincian = useMemo(
    () => (info ? hitungOngkir(info.distance_m) : null),
    [info]
  );

  // Estimasi waktu tempuh dari OSRM (detik) jadi teks yang enak dibaca.
  const durasi = useMemo(() => {
    if (!info?.duration_s) return null;

    const menit = Math.round(info.duration_s / 60);
    if (menit < 1) return "< 1 mnt";
    if (menit < 60) return `${menit} mnt`;

    const jam = Math.floor(menit / 60);
    const sisa = menit % 60;
    return sisa ? `${jam} j ${sisa} mnt` : `${jam} j`;
  }, [info]);

  const ringkasanPeta = useMemo(
    () =>
      rincian
        ? { distanceKm: formatKm(rincian.distanceKm), duration: durasi }
        : null,
    [rincian, durasi]
  );

  const pesanWa = useMemo(() => {
    if (!rincian) return "Halo Harmony Laundry! Saya mau tanya ongkir antar jemput.";

    const lokasi = destination?.label
      ? singkatAlamat(destination.label)
      : `${destination.lat.toFixed(5)}, ${destination.lng.toFixed(5)}`;

    return (
      `Halo Harmony Laundry! Saya mau antar jemput.\n\n` +
      `• Lokasi: ${lokasi}\n` +
      `• Jarak dari outlet: ${formatKm(rincian.distanceKm)} km\n` +
      `• Ongkir: ${rincian.gratis ? "Gratis (dalam 5 km)" : `Rp ${formatRupiah(rincian.biaya)}`}\n\n` +
      `Mohon konfirmasi jadwal penjemputannya ya kak. Terima kasih!`
    );
  }, [rincian, destination]);

  return (
    <section
      id="cek-ongkir"
      className="relative overflow-hidden bg-ink-900 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-linegrid opacity-[0.06]" />
      <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-brand-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-citrus-400/15 blur-3xl" />

      <div className="container-page relative z-10">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cream-50/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-citrus-400" />
            Cek ongkir
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-cream-50 text-balance sm:text-4xl lg:text-5xl">
            Antar jemput{" "}
            <span className="text-brand-300">gratis 5 km pertama.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-300">
            Tandai lokasi rumahmu di peta. Jarak dihitung mengikuti rute jalan
            (OpenStreetMap), bukan garis lurus.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          {/* Peta */}
          <div className="overflow-hidden rounded-[2rem] border border-ink-900/10 bg-white shadow-[0_24px_60px_-30px_rgba(7,22,38,0.45)] lg:col-span-3">
            <OngkirMap
              destination={destination}
              route={route}
              summary={ringkasanPeta}
              onPick={handlePick}
            />
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink-900/5 px-4 py-3 text-xs text-ink-500 sm:px-5">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-700" />
                Titik outlet
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-coral-500" />
                Titik lokasi kamu
              </span>
              <span className="hidden sm:inline">Klik peta atau geser pin merah</span>
            </div>
          </div>

          {/* Panel */}
          <div className="rounded-[2rem] border border-ink-900/10 bg-white p-5 shadow-[0_24px_60px_-30px_rgba(7,22,38,0.45)] sm:p-7 lg:col-span-2">
            <form onSubmit={cariAlamat} className="space-y-3">
              <label
                htmlFor="ongkir-alamat"
                className="block text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink-500"
              >
                Alamat penjemputan
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-ink-900/15 bg-cream-50 px-3 py-2 focus-within:border-brand-600">
                <LuSearch className="shrink-0 text-ink-400" />
                <input
                  id="ongkir-alamat"
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="mis. Jl. Kaliurang KM 8"
                  className="w-full bg-transparent py-1.5 text-sm font-semibold text-ink-800 outline-none placeholder:font-normal placeholder:text-ink-400"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={searching}
                  className="shrink-0 rounded-xl bg-brand-700 px-3 py-1.5 text-xs font-extrabold text-white transition hover:bg-brand-800 disabled:opacity-50"
                >
                  {searching ? <LuLoader2 className="animate-spin" /> : "Cari"}
                </button>
              </div>

              <button
                type="button"
                onClick={pakaiLokasiSaya}
                disabled={geoBusy}
                className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-3.5 py-2 text-xs font-bold text-ink-700 transition hover:border-brand-600 hover:text-brand-700 disabled:opacity-50"
              >
                {geoBusy ? (
                  <LuLoader2 className="animate-spin" />
                ) : (
                  <LuCrosshair />
                )}
                Gunakan lokasi saya
              </button>
            </form>

            {searchError && (
              <p className="mt-3 rounded-xl bg-coral-500/10 px-3 py-2 text-xs font-semibold text-coral-600">
                {searchError}
              </p>
            )}

            {results.length > 0 && (
              <ul className="mt-3 max-h-52 space-y-1 overflow-y-auto rounded-xl border border-ink-900/10 bg-cream-50 p-1">
                {results.map((item, index) => (
                  <li key={`${item.lat}-${item.lng}-${index}`}>
                    <button
                      type="button"
                      onClick={() => {
                        handlePick({ ...item, label: item.label });
                        setQuery("");
                        setSearchError(null);
                      }}
                      className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold leading-snug text-ink-700 transition hover:bg-white"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="my-5 h-px bg-ink-900/10" />

            {/* Hasil */}
            {!destination ? (
              <div className="rounded-2xl bg-cream-100 p-4 text-sm leading-relaxed text-ink-500">
                <p className="font-bold text-ink-700">Belum ada titik lokasi.</p>
                <p className="mt-1">
                  Cari alamat di atas, klik peta, atau pakai lokasi HP-mu untuk
                  melihat ongkir.
                </p>
              </div>
            ) : loading ? (
              <div className="flex items-center gap-3 rounded-2xl bg-cream-100 p-4 text-sm font-semibold text-ink-600">
                <LuLoader2 className="animate-spin text-brand-700" />
                Menghitung rute...
              </div>
            ) : error ? (
              <div className="rounded-2xl bg-coral-500/10 p-4 text-sm font-semibold text-coral-600">
                {error}
              </div>
            ) : rincian ? (
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink-500">
                      Jarak tempuh
                    </p>
                    <p className="font-display text-3xl font-extrabold text-ink-900">
                      {formatKm(rincian.distanceKm)}{" "}
                      <span className="text-base font-bold text-ink-500">km</span>
                    </p>
                    {durasi && (
                      <p className="mt-1 text-[11px] font-bold text-ink-400">
                        ± {durasi} perjalanan dari outlet
                      </p>
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-extrabold ${
                      rincian.gratis
                        ? "bg-emerald-500/10 text-emerald-700"
                        : "bg-brand-700/10 text-brand-700"
                    }`}
                  >
                    {rincian.gratis ? <LuCheck /> : <LuTruck />}
                    {rincian.gratis ? "Gratis ongkir" : "Ongkir berbayar"}
                  </span>
                </div>

                {destination.label && (
                  <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-ink-500">
                    <LuMapPin className="mt-0.5 shrink-0 text-coral-500" />
                    {singkatAlamat(destination.label)}
                  </p>
                )}

                <dl className="mt-4 space-y-2 rounded-2xl bg-cream-100 p-4 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-ink-500">Gratis {FREE_RADIUS_KM} km pertama</dt>
                    <dd className="font-bold text-emerald-700">Rp 0</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-ink-500">Km kena biaya</dt>
                    <dd className="font-bold text-ink-800">
                      {formatKm(rincian.chargeableKm)} km
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-ink-500">
                      Tarif Rp {formatRupiah(RATE_PER_KM)}/km
                    </dt>
                    <dd className="font-bold text-ink-800">
                      {formatKm(rincian.chargeableKm)} × {formatRupiah(RATE_PER_KM)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-ink-900/10 pt-2">
                    <dt className="font-extrabold text-ink-800">Total ongkir</dt>
                    <dd className="font-display text-xl font-extrabold text-brand-700">
                      {rincian.gratis
                        ? "Gratis"
                        : `Rp ${formatRupiah(rincian.biaya)}`}
                    </dd>
                  </div>
                </dl>

                {info?.source === "estimasi" && (
                  <p className="mt-3 text-[11px] font-semibold text-coral-600">
                    Rute jalan sedang tidak tersedia, jarak di atas hanya
                    perkiraan. Ongkir final dikonfirmasi admin.
                  </p>
                )}

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <a
                    href={waLink(pesanWa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-wa flex-1"
                  >
                    <FaWhatsapp className="text-base" />
                    Pesan antar jemput
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setDestination(null);
                      setInfo(null);
                      setRoute([]);
                      setError(null);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-ink-900/15 px-4 py-3 text-xs font-bold text-ink-600 transition hover:border-coral-500 hover:text-coral-600"
                  >
                    <LuX /> Hapus titik
                  </button>
                </div>
              </div>
            ) : null}

            <p className="mt-4 text-[11px] leading-relaxed text-ink-400">
              Jarak dihitung dari {OUTLET.name}, {OUTLET.address}. Peta &amp;
              rute: OpenStreetMap. Jarak tagihan dibulatkan ke atas per 0,1 km.
              Ongkir final dikonfirmasi admin saat penjemputan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CekOngkir;
