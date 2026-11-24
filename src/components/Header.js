"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { LuArrowUpRight, LuClock, LuPackageSearch } from "react-icons/lu";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Layanan & Harga", href: "/layanan" },
  { name: "Cara Kerja", href: "/#cara-kerja" },
  { name: "Cek Ongkir", href: "/#cek-ongkir" },
  { name: "Booking", href: "/pesan" },
  { name: "Blog", href: "/blog" },
];

function Header() {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setNav(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = nav ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [nav]);

  const isActive = (href) => {
    if (href.includes("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-2.5 sm:px-6 sm:pt-4">
      <nav
        className={`container-page flex items-center justify-between gap-3 rounded-full border px-3 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-ink-900/10 bg-cream-50/90 shadow-card backdrop-blur-xl"
            : "border-transparent bg-cream-50/70 backdrop-blur-md"
        }`}
      >
        {/* Brand */}
        <Link href="/" className="group flex min-w-0 items-center gap-2.5">
          <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-ink-900/10 bg-white p-1 shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
            <img
              src="/img/logo-harmony.png"
              alt="Logo Harmony Laundry"
              className="h-full w-full object-contain"
            />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-citrus-400 ring-2 ring-cream-50" />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-display text-[17px] font-extrabold tracking-tight text-ink-900 sm:text-lg">
              Harmony <span className="text-brand-700">Laundry</span>
            </span>
            <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-400 sm:inline">
              Laundry kiloan &amp; satuan
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-0.5 rounded-full border border-ink-900/10 bg-white/60 p-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-[13px] font-bold transition-all duration-200 xl:px-4 ${
                  active
                    ? "bg-brand-700 text-white shadow-sm"
                    : "text-ink-500 hover:bg-white hover:text-ink-900"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/lacak"
            aria-label="Lacak pesanan"
            title="Lacak pesanan"
            className={`hidden h-10 w-10 place-items-center rounded-full border transition-all duration-200 lg:grid ${
              pathname === "/lacak"
                ? "border-brand-700 bg-brand-700 text-white"
                : "border-ink-900/10 bg-white text-ink-700 hover:border-brand-200 hover:bg-cream-50 hover:text-brand-700"
            }`}
          >
            <LuPackageSearch className="text-lg" />
          </Link>
          <Link
            href="/pesan"
            className="hidden items-center gap-1 rounded-full border border-ink-900/15 bg-white px-4 py-2.5 text-xs font-bold text-ink-800 transition-all hover:border-ink-900/30 hover:bg-cream-50 sm:inline-flex"
          >
            Booking
            <LuArrowUpRight className="text-sm" />
          </Link>
          <a
            href="https://wa.me/62895363324517"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-brand-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-800 sm:inline-flex"
          >
            <FaWhatsapp className="text-base" />
            <span className="hidden md:inline">Pesan Sekarang</span>
            <span className="md:hidden">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setNav((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/10 bg-white text-ink-900 transition-colors hover:bg-cream-50 lg:hidden"
            aria-label={nav ? "Tutup navigasi" : "Buka navigasi"}
            aria-expanded={nav}
          >
            {nav ? <HiX className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {nav && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-40 bg-ink-900/40 backdrop-blur-sm"
            onClick={() => setNav(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-x-3 top-[5.5rem] z-50 flex flex-col gap-4 rounded-[1.75rem] border border-ink-900/10 bg-cream-50 p-5 shadow-lift sm:inset-x-6">
            <div className="flex items-center justify-between border-b border-ink-900/10 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-400">
                Menu
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Buka 08.00–21.00
              </span>
            </div>

            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setNav(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${
                    isActive(item.href)
                      ? "bg-brand-700 text-white"
                      : "text-ink-700 hover:bg-white"
                  }`}
                >
                  {item.name}
                  <LuArrowUpRight className="text-base opacity-60" />
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2 border-t border-ink-900/10 pt-4">
              <Link
                href="/lacak"
                onClick={() => setNav(false)}
                className="flex items-center gap-2 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm font-bold text-brand-800 transition-colors hover:bg-brand-100"
              >
                <LuPackageSearch className="text-lg" />
                Lacak pesanan
                <LuArrowUpRight className="ml-auto text-base opacity-60" />
              </Link>
              <a
                href="https://wa.me/62895363324517"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setNav(false)}
                className="btn-wa w-full"
              >
                <FaWhatsapp className="text-xl" />
                Chat WhatsApp
              </a>
              <p className="flex items-center justify-center gap-1.5 pt-1 text-[11px] font-medium text-ink-400">
                <LuClock className="text-sm" />
                Gratis antar-jemput jarak 5 km
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
