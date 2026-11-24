"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { waLink } from "@/data/harga";
import {
  LuArrowRight,
  LuPlay,
  LuRotateCcw,
  LuTimer,
  LuTrophy,
} from "react-icons/lu";

const DURASI = 30; // detik
const BEST_KEY = "harmony-tangkap-cucian-best";

// Bobot kemunculan tiap benda. Noda itu "jebakan".
const JENIS = [
  { kind: "kaus", bobot: 42, poin: 10 },
  { kind: "handuk", bobot: 20, poin: 10 },
  { kind: "kausKaki", bobot: 16, poin: 15 },
  { kind: "express", bobot: 8, poin: 30 },
  { kind: "noda", bobot: 14, poin: -15 },
];

const TOTAL_BOBOT = JENIS.reduce((total, item) => total + item.bobot, 0);

function pilihJenis() {
  let undian = Math.random() * TOTAL_BOBOT;

  for (const jenis of JENIS) {
    undian -= jenis.bobot;
    if (undian <= 0) return jenis;
  }

  return JENIS[0];
}

function pangkat(skor) {
  if (skor >= 700) return "Legenda Harmony";
  if (skor >= 450) return "Jagoan Kiloan";
  if (skor >= 250) return "Kurir Andalan";
  if (skor >= 100) return "Kurir Magang";
  return "Pemula Setrika";
}

function bacaBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY) || 0) || 0;
  } catch {
    return 0;
  }
}

function simpanBest(skor) {
  try {
    localStorage.setItem(BEST_KEY, String(skor));
  } catch {
    /* mode privat: biarkan saja */
  }
}

/* ── Gambar benda ─────────────────────────────────────────── */

function gambarKaus(ctx, s, warna, aksen) {
  ctx.fillStyle = warna;
  ctx.beginPath();
  ctx.moveTo(-0.52 * s, -0.3 * s);
  ctx.lineTo(-0.2 * s, -0.5 * s);
  ctx.lineTo(0.2 * s, -0.5 * s);
  ctx.lineTo(0.52 * s, -0.3 * s);
  ctx.lineTo(0.42 * s, -0.05 * s);
  ctx.lineTo(0.3 * s, -0.12 * s);
  ctx.lineTo(0.3 * s, 0.5 * s);
  ctx.lineTo(-0.3 * s, 0.5 * s);
  ctx.lineTo(-0.3 * s, -0.12 * s);
  ctx.lineTo(-0.42 * s, -0.05 * s);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = aksen;
  ctx.beginPath();
  ctx.ellipse(0, -0.42 * s, 0.16 * s, 0.09 * s, 0, 0, Math.PI * 2);
  ctx.fill();
}

function gambarHanduk(ctx, s) {
  ctx.fillStyle = "#7FA9FF";
  ctx.beginPath();
  ctx.roundRect(-0.5 * s, -0.38 * s, s, 0.76 * s, 0.12 * s);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,.85)";
  ctx.beginPath();
  ctx.roundRect(-0.5 * s, -0.06 * s, s, 0.1 * s, 0.05 * s);
  ctx.fill();
  ctx.beginPath();
  ctx.roundRect(-0.5 * s, 0.14 * s, s, 0.08 * s, 0.04 * s);
  ctx.fill();
}

function gambarKausKaki(ctx, s) {
  ctx.fillStyle = "#FFD166";
  ctx.beginPath();
  ctx.roundRect(-0.44 * s, -0.42 * s, 0.32 * s, 0.78 * s, 0.1 * s);
  ctx.fill();
  ctx.beginPath();
  ctx.roundRect(0.06 * s, -0.42 * s, 0.32 * s, 0.78 * s, 0.1 * s);
  ctx.fill();

  ctx.fillStyle = "#F5B700";
  ctx.beginPath();
  ctx.roundRect(-0.44 * s, 0.2 * s, 0.32 * s, 0.16 * s, 0.05 * s);
  ctx.fill();
  ctx.beginPath();
  ctx.roundRect(0.06 * s, 0.2 * s, 0.32 * s, 0.16 * s, 0.05 * s);
  ctx.fill();
}

function gambarExpress(ctx, s) {
  gambarKaus(ctx, s, "#29A0E6", "#BEE2FA");

  ctx.fillStyle = "#FFD166";
  ctx.beginPath();
  ctx.arc(0.3 * s, 0.26 * s, 0.2 * s, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#0E2138";
  ctx.beginPath();
  ctx.moveTo(0.32 * s, 0.12 * s);
  ctx.lineTo(0.2 * s, 0.3 * s);
  ctx.lineTo(0.29 * s, 0.3 * s);
  ctx.lineTo(0.25 * s, 0.42 * s);
  ctx.lineTo(0.4 * s, 0.24 * s);
  ctx.lineTo(0.3 * s, 0.24 * s);
  ctx.closePath();
  ctx.fill();
}

function gambarNoda(ctx, s) {
  ctx.fillStyle = "#50698A";
  ctx.beginPath();
  ctx.arc(-0.16 * s, 0.02 * s, 0.3 * s, 0, Math.PI * 2);
  ctx.arc(0.14 * s, -0.12 * s, 0.24 * s, 0, Math.PI * 2);
  ctx.arc(0.16 * s, 0.2 * s, 0.2 * s, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,.5)";
  ctx.beginPath();
  ctx.arc(-0.2 * s, -0.06 * s, 0.06 * s, 0, Math.PI * 2);
  ctx.fill();
}

function gambarItem(ctx, item, ts) {
  ctx.save();
  ctx.translate(item.x, item.y);

  const goyang = Math.sin(ts / 420 + item.ayun) * 0.12;
  ctx.rotate(item.rot + goyang);

  if (item.poin < 0) {
    ctx.shadowColor = "rgba(226,78,47,.4)";
    ctx.shadowBlur = 12;
  }

  const s = item.size;
  switch (item.kind) {
    case "handuk":
      gambarHanduk(ctx, s);
      break;
    case "kausKaki":
      gambarKausKaki(ctx, s);
      break;
    case "express":
      gambarExpress(ctx, s);
      break;
    case "noda":
      gambarNoda(ctx, s);
      break;
    default:
      gambarKaus(ctx, s, "#29A0E6", "#BEE2FA");
  }

  ctx.restore();
}

function gambarKeranjang(ctx, g) {
  const { x, y, w, h } = g.basket;
  const kiri = x - w / 2;
  const kanan = x + w / 2;

  // bayangan
  ctx.fillStyle = "rgba(7,22,38,.12)";
  ctx.beginPath();
  ctx.ellipse(x, y + h + 4, w * 0.5, h * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();

  // badan keranjang
  ctx.fillStyle = "#172F4B";
  ctx.beginPath();
  ctx.moveTo(kiri, y);
  ctx.lineTo(kanan, y);
  ctx.lineTo(kanan - w * 0.09, y + h);
  ctx.lineTo(kiri + w * 0.09, y + h);
  ctx.closePath();
  ctx.fill();

  // anyaman
  ctx.strokeStyle = "rgba(255,255,255,.16)";
  ctx.lineWidth = 1;
  for (let i = 1; i < 6; i += 1) {
    const tx = kiri + (w / 6) * i;
    ctx.beginPath();
    ctx.moveTo(tx, y + 3);
    ctx.lineTo(tx - w * 0.03, y + h - 2);
    ctx.stroke();
  }

  // bibir keranjang
  ctx.fillStyle = "#0E5AA4";
  ctx.beginPath();
  ctx.roundRect(kiri - 3, y - 7, w + 6, 9, 4.5);
  ctx.fill();

  ctx.fillStyle = "#BEE2FA";
  ctx.beginPath();
  ctx.roundRect(kiri - 3, y - 7, w + 6, 3.4, 2);
  ctx.fill();
}

/* ── Mesin game ───────────────────────────────────────────── */

function buatGame() {
  return {
    W: 640,
    H: 400,
    mulai: 0,
    terakhir: 0,
    skor: 0,
    combo: 0,
    comboMaks: 0,
    items: [],
    parts: [],
    floaties: [],
    spawnTerakhir: 0,
    intervalBerikut: 700,
    basket: { x: 320, target: 320, w: 110, h: 48, y: 330 },
    shake: 0,
    keys: { kiri: false, kanan: false },
  };
}

function ledakan(g, x, y, warna) {
  for (let i = 0; i < 8; i += 1) {
    const sudut = Math.random() * Math.PI * 2;
    const laju = 60 + Math.random() * 150;
    g.parts.push({
      x,
      y,
      vx: Math.cos(sudut) * laju,
      vy: Math.sin(sudut) * laju - 40,
      hidup: 1,
      warna,
    });
  }
}

export default function TangkapCucian() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const rafRef = useRef(0);
  const gameRef = useRef(buatGame());
  const skorDomRef = useRef(null);
  const waktuDomRef = useRef(null);
  const barDomRef = useRef(null);
  const comboDomRef = useRef(null);

  const [status, setStatus] = useState("idle"); // idle | main | selesai
  const [skorAkhir, setSkorAkhir] = useState(0);
  const [terbaik, setTerbaik] = useState(0);

  useEffect(() => {
    setTerbaik(bacaBest());
  }, []);

  const tulisHud = useCallback((g, sisa) => {
    if (skorDomRef.current) skorDomRef.current.textContent = String(g.skor);
    if (waktuDomRef.current) {
      waktuDomRef.current.textContent = `${Math.ceil(Math.max(0, sisa))}s`;
    }
    if (barDomRef.current) {
      const persen = Math.max(0, Math.min(100, (sisa / DURASI) * 100));
      barDomRef.current.style.width = `${persen}%`;
    }
    if (comboDomRef.current) {
      const mult = Math.min(5, 1 + Math.floor(g.combo / 4));
      const tampil = mult > 1;
      comboDomRef.current.style.opacity = tampil ? "1" : "0";
      comboDomRef.current.textContent = `COMBO x${mult}`;
    }
  }, []);

  const resetCombo = (g) => {
    g.combo = 0;
  };

  const aturUkuran = useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const rect = wrap.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctxRef.current = ctx;

    const g = gameRef.current;
    g.W = rect.width;
    g.H = rect.height;

    const w = Math.max(76, Math.min(132, g.W * 0.2));
    const h = w * 0.44;
    g.basket.w = w;
    g.basket.h = h;
    g.basket.y = g.H - h - 14;
    g.basket.x = Math.min(Math.max(g.basket.x, w / 2), g.W - w / 2);
    g.basket.target = Math.min(Math.max(g.basket.target, w / 2), g.W - w / 2);
  }, []);

  const gambar = useCallback((ctx, g, ts) => {
    const grad = ctx.createLinearGradient(0, 0, 0, g.H);
    grad.addColorStop(0, "#FBFDFF");
    grad.addColorStop(1, "#EFF7FE");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, g.W, g.H);

    ctx.fillStyle = "rgba(14,90,164,.08)";
    const gap = 28;
    for (let x = gap / 2; x < g.W; x += gap) {
      for (let y = gap / 2; y < g.H; y += gap) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.fillStyle = "rgba(23,47,75,.05)";
    ctx.fillRect(0, g.H - 10, g.W, 10);

    ctx.save();
    if (g.shake > 0) {
      ctx.translate(
        (Math.random() - 0.5) * g.shake,
        (Math.random() - 0.5) * g.shake
      );
    }

    g.items.forEach((item) => gambarItem(ctx, item, ts));

    g.parts.forEach((p) => {
      ctx.globalAlpha = Math.max(0, p.hidup);
      ctx.fillStyle = p.warna;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    g.floaties.forEach((f) => {
      ctx.globalAlpha = Math.max(0, f.hidup);
      ctx.fillStyle = f.warna;
      ctx.font = "800 16px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(f.teks, f.x, f.y - (1 - f.hidup) * 34);
    });
    ctx.globalAlpha = 1;

    gambarKeranjang(ctx, g);
    ctx.restore();
  }, []);

  const berhenti = useCallback((g, ts) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    setSkorAkhir(g.skor);
    setStatus("selesai");
    setTerbaik((lama) => {
      if (g.skor > lama) {
        simpanBest(g.skor);
        return g.skor;
      }
      return lama;
    });
  }, []);

  const frame = useCallback(
    (ts) => {
      const g = gameRef.current;
      const ctx = ctxRef.current;
      if (!ctx) return;

      if (!g.terakhir) g.terakhir = ts;
      const dt = Math.min(0.05, (ts - g.terakhir) / 1000);
      g.terakhir = ts;

      const berlalu = (ts - g.mulai) / 1000;
      const sisa = DURASI - berlalu;

      if (sisa <= 0) {
        gambar(ctx, g, ts);
        tulisHud(g, 0);
        berhenti(g, ts);
        return;
      }

      const p = Math.min(1, berlalu / DURASI);

      // Keranjang: ikut pointer, bisa juga panah kiri/kanan.
      const geser = (g.keys.kanan ? 1 : 0) - (g.keys.kiri ? 1 : 0);
      if (geser !== 0) g.basket.target += geser * 620 * dt;
      g.basket.target = Math.min(
        Math.max(g.basket.target, g.basket.w / 2),
        g.W - g.basket.w / 2
      );
      g.basket.x += (g.basket.target - g.basket.x) * Math.min(1, dt * 14);

      // Munculkan benda baru.
      if (!g.spawnTerakhir) g.spawnTerakhir = ts;
      if (ts - g.spawnTerakhir >= g.intervalBerikut) {
        const jenis = pilihJenis();
        const ukuran = Math.max(24, Math.min(38, g.W * 0.055));
        g.items.push({
          kind: jenis.kind,
          poin: jenis.poin,
          x: 26 + Math.random() * Math.max(1, g.W - 52),
          y: -ukuran,
          size: ukuran,
          vy: g.H * (0.3 + 0.42 * p) * (0.85 + Math.random() * 0.3),
          rot: (Math.random() - 0.5) * 0.45,
          vr: (Math.random() - 0.5) * 1.4,
          ayun: Math.random() * Math.PI * 2,
          ambil: false,
          lewat: false,
        });
        g.spawnTerakhir = ts;
        g.intervalBerikut = (700 - 330 * p) * (0.85 + Math.random() * 0.3);
      }

      // Gerakkan benda + deteksi tangkapan.
      g.items.forEach((item) => {
        item.y += item.vy * dt;
        item.rot += item.vr * dt;
        item.x += Math.sin(ts / 620 + item.ayun) * 16 * dt;

        const kenaKeranjang =
          item.y + item.size * 0.4 >= g.basket.y + 8 &&
          Math.abs(item.x - g.basket.x) <=
            g.basket.w / 2 + item.size * 0.28;

        if (kenaKeranjang) {
          item.ambil = true;

          if (item.poin > 0) {
            g.combo += 1;
            g.comboMaks = Math.max(g.comboMaks, g.combo);
            const mult = Math.min(5, 1 + Math.floor(g.combo / 4));
            const tambah = item.poin * mult;
            g.skor += tambah;
            g.floaties.push({
              x: item.x,
              y: g.basket.y - 4,
              teks: `+${tambah}`,
              hidup: 1,
              warna: "#0E5AA4",
            });
            ledakan(g, item.x, g.basket.y + 6, "#29A0E6");
          } else {
            g.skor = Math.max(0, g.skor - 10);
            resetCombo(g);
            g.shake = 11;
            g.floaties.push({
              x: item.x,
              y: g.basket.y - 4,
              teks: "-10",
              hidup: 1,
              warna: "#E24E2F",
            });
            ledakan(g, item.x, g.basket.y + 6, "#50698A");
          }

          tulisHud(g, sisa);
          return;
        }

        if (item.y - item.size * 0.6 > g.H) {
          item.lewat = true;
          if (item.poin > 0) {
            resetCombo(g);
            tulisHud(g, sisa);
          }
        }
      });

      g.items = g.items.filter((item) => !item.ambil && !item.lewat);

      // Partikel + teks melayang.
      g.parts.forEach((part) => {
        part.x += part.vx * dt;
        part.y += part.vy * dt;
        part.vy += 380 * dt;
        part.hidup -= dt * 1.6;
      });
      g.parts = g.parts.filter((part) => part.hidup > 0);

      g.floaties.forEach((f) => {
        f.hidup -= dt * 1.1;
      });
      g.floaties = g.floaties.filter((f) => f.hidup > 0);

      if (g.shake > 0) g.shake = Math.max(0, g.shake - dt * 40);

      gambar(ctx, g, ts);
      tulisHud(g, sisa);

      rafRef.current = requestAnimationFrame(frame);
    },
    [berhenti, gambar, tulisHud]
  );

  const mulaiMain = useCallback(() => {
    const g = gameRef.current;
    const baru = buatGame();
    baru.W = g.W;
    baru.H = g.H;
    baru.basket.w = g.basket.w;
    baru.basket.h = g.basket.h;
    baru.basket.y = g.basket.y;
    baru.basket.x = g.W / 2;
    baru.basket.target = g.W / 2;
    gameRef.current = baru;

    aturUkuran();
    baru.mulai = performance.now();
    baru.terakhir = 0;
    setSkorAkhir(0);
    setStatus("main");
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(frame);
  }, [aturUkuran, frame]);

  // Ukuran kanvas + gambar frame awal.
  useEffect(() => {
    aturUkuran();
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    const ro = new ResizeObserver(() => {
      aturUkuran();
      const ctx = ctxRef.current;
      if (ctx && status !== "main") {
        gambar(ctx, gameRef.current, performance.now());
      }
    });
    ro.observe(wrap);

    return () => ro.disconnect();
  }, [aturUkuran, gambar, status]);

  // Gambar frame awal begitu siap.
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (status === "main") return;
    gambar(ctx, gameRef.current, performance.now());
  }, [gambar, status]);

  // Kontrol: pointer (mouse + sentuh) dan panah.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    const arahkanPointer = (event) => {
      const g = gameRef.current;
      const rect = wrap.getBoundingClientRect();
      g.basket.target = Math.min(
        Math.max(event.clientX - rect.left, g.basket.w / 2),
        g.W - g.basket.w / 2
      );
    };

    const onKeyDown = (event) => {
      const g = gameRef.current;
      if (event.key === "ArrowLeft") {
        g.keys.kiri = true;
        event.preventDefault();
      }
      if (event.key === "ArrowRight") {
        g.keys.kanan = true;
        event.preventDefault();
      }
    };

    const onKeyUp = (event) => {
      const g = gameRef.current;
      if (event.key === "ArrowLeft") g.keys.kiri = false;
      if (event.key === "ArrowRight") g.keys.kanan = false;
    };

    wrap.addEventListener("pointermove", arahkanPointer);
    wrap.addEventListener("pointerdown", arahkanPointer);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      wrap.removeEventListener("pointermove", arahkanPointer);
      wrap.removeEventListener("pointerdown", arahkanPointer);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  // Hemat baterai: jeda saat tab disembunyikan.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && status === "main") {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      } else if (!document.hidden && status === "main" && !rafRef.current) {
        gameRef.current.terakhir = 0;
        rafRef.current = requestAnimationFrame(frame);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () =>
      document.removeEventListener("visibilitychange", onVisibility);
  }, [frame, status]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const pesanWa = waLink(
    `Halo Harmony Laundry! Saya baru main game Tangkap Cucian, skor saya ${skorAkhir} poin.\n\nSaya mau pesan antar jemput cucian ya.`
  );

  return (
    <div className="overflow-hidden rounded-[2rem] border border-ink-900/10 bg-white shadow-[0_24px_60px_-30px_rgba(7,22,38,0.45)]">
      {/* HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-900/5 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3 py-1.5 text-xs font-extrabold text-ink-800">
            <LuTrophy className="text-sm text-citrus-500" />
            <span ref={skorDomRef}>0</span>
            <span className="font-bold text-ink-400">poin</span>
          </span>
          <span
            ref={comboDomRef}
            className="rounded-full bg-brand-700 px-2.5 py-1.5 text-[11px] font-extrabold text-white opacity-0 transition-opacity duration-200"
          >
            COMBO x1
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-500">
            <LuTimer className="text-sm" />
            <span ref={waktuDomRef}>{DURASI}s</span>
          </span>
          <span className="text-xs font-bold text-ink-400">
            Terbaik: <span className="text-ink-700">{terbaik}</span>
          </span>
        </div>
      </div>

      <div className="h-1 w-full bg-cream-200">
        <div
          ref={barDomRef}
          className="h-full bg-brand-600 transition-[width] duration-150 ease-linear"
          style={{ width: "100%" }}
        />
      </div>

      {/* Arena */}
      <div
        ref={wrapRef}
        className="relative aspect-[16/10] w-full touch-none select-none bg-cream-50"
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Arena game Tangkap Cucian: gerakkan keranjang untuk menangkap cucian yang jatuh"
          className="block h-full w-full"
        />

        {status === "idle" && (
          <div className="absolute inset-0 grid place-items-center bg-white/80 p-5 text-center backdrop-blur-sm">
            <div className="max-w-sm">
              <p className="font-display text-xl font-extrabold text-ink-900">
                Tangkap Cucian
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                Geser keranjang (atau panah kiri/kanan) buat nangkep baju,
                handuk, dan kaos kaki. Hindari noda lumpur, ya. 30 detik saja.
              </p>
              <button
                type="button"
                onClick={mulaiMain}
                className="btn btn-brand btn-lg mt-5"
              >
                <LuPlay className="text-base" />
                Mainkan
              </button>
            </div>
          </div>
        )}

        {status === "selesai" && (
          <div className="absolute inset-0 grid place-items-center bg-white/85 p-5 text-center backdrop-blur-sm">
            <div className="max-w-sm">
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                Hasil
              </span>
              <p className="mt-3 font-display text-4xl font-extrabold text-ink-900">
                {skorAkhir}
                <span className="ml-1.5 text-base font-bold text-ink-400">
                  poin
                </span>
              </p>
              <p className="mt-1 text-sm font-bold text-brand-700">
                Pangkat: {pangkat(skorAkhir)}
              </p>
              <p className="mt-2 text-xs text-ink-500">
                {skorAkhir >= terbaik
                  ? "Rekor baru! Catatan sebelumnya " + terbaik + " poin."
                  : `Rekor kamu masih ${terbaik} poin.`}
              </p>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={mulaiMain}
                  className="btn btn-brand"
                >
                  <LuRotateCcw className="text-base" />
                  Main lagi
                </button>
                <a
                  href={pesanWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-light"
                >
                  Pesan antar jemput
                  <LuArrowRight className="text-base" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink-900/5 px-4 py-3 text-[11px] text-ink-400 sm:px-5">
        <span>Geser pakai mouse atau jari. Bisa juga tombol panah.</span>
        <span className="hidden sm:inline">
          Noda lumpur bikin poin potong 10 dan combo hilang.
        </span>
      </div>
    </div>
  );
}
