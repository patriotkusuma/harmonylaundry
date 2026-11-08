import { getBlogDataPaginated } from "@/lib/newPost";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { BiChevronLeft, BiChevronRight, BiTime, BiUser } from "react-icons/bi";
import { LuArrowRight, LuArrowUpRight, LuBookOpen } from "react-icons/lu";

const PER_PAGE = 9;

export const dynamic = 'force-dynamic'

export async function generateMetadata({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const canonicalUrl = page > 1
    ? `https://harmonylaundrys.com/blog?page=${page}`
    : "https://harmonylaundrys.com/blog";

  return {
    title: "Info Menarik Harmony Laundry Yogyakarta | Harmony Laundry",
    description:
      "Dapatkan info menarik dari Harmony Laundry, promo kiloan, promo satuan, dan berbagai tips mencuci praktis untuk pakaian anda.",
    keywords: ["Layanan laundry", "Promo laundry", "Tips mencuci", "Laundry Yogyakarta", "Harmony Laundry blog", "Laundry kiloan", "Laundry satuan"],
    authors: [{ name: "Harmony Laundry" }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    icons: {
      icon: "https://harmonylaundrys.com/img/logo.png",
      apple: "https://harmonylaundrys.com/img/logo.png",
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Info Menarik Harmony Laundry Yogyakarta",
      description:
        "Dapatkan info menarik dari Harmony Laundry, promo kiloan, promo satuan, dan berbagai tips mencuci praktis untuk pakaian anda.",
      url: canonicalUrl,
      siteName: "Harmony Laundry",
      type: "website",
      locale: "id_ID",
      images: [
        {
          url: "https://harmonylaundrys.com/img/logo.png",
          width: 800,
          height: 600,
          alt: "Harmony Laundry Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Info Menarik Harmony Laundry Yogyakarta",
      description: "Dapatkan info menarik dari Harmony Laundry, promo kiloan, promo satuan, dan berbagai tips mencuci praktis untuk pakaian anda.",
      images: ["https://harmonylaundrys.com/img/logo.png"],
    },
  };
}

const getImageUrl = (path) => {
  if (!path) return "/img/landry-hero.jpg";
  if (path.startsWith("/uploads")) return `https://go.harmonylaundry.my.id${path}`;
  return path;
};

// ── Pagination Component ────────────────────────────────────────────────────
function Pagination({ currentPage, totalPages }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const delta = 2;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      pages.push(i);
    } else if (
      i === currentPage - delta - 1 ||
      i === currentPage + delta + 1
    ) {
      pages.push("...");
    }
  }

  const dedupedPages = pages.filter(
    (p, idx) => !(p === "..." && pages[idx - 1] === "...")
  );

  return (
    <nav
      aria-label="Navigasi halaman blog"
      className="mt-14 flex flex-wrap items-center justify-center gap-1.5"
    >
      {currentPage > 1 ? (
        <Link
          href={`/blog?page=${currentPage - 1}`}
          className="flex items-center gap-1 rounded-full border border-ink-900/10 bg-white px-4 py-2 text-sm font-bold text-ink-600 transition-all hover:border-ink-900/25 hover:text-ink-900"
          aria-label="Halaman sebelumnya"
        >
          <BiChevronLeft className="text-lg" /> Sebelumnya
        </Link>
      ) : (
        <span className="flex cursor-not-allowed items-center gap-1 rounded-full border border-ink-900/5 bg-white px-4 py-2 text-sm font-bold text-ink-300">
          <BiChevronLeft className="text-lg" /> Sebelumnya
        </span>
      )}

      {dedupedPages.map((p, idx) =>
        p === "..." ? (
          <span key={`dots-${idx}`} className="select-none px-2 py-2 text-sm text-ink-300">
            ···
          </span>
        ) : (
          <Link
            key={p}
            href={`/blog?page=${p}`}
            aria-label={`Halaman ${p}`}
            aria-current={p === currentPage ? "page" : undefined}
            className={`grid h-10 w-10 place-items-center rounded-full text-sm font-extrabold transition-all ${
              p === currentPage
                ? "bg-ink-900 text-cream-50 shadow-sm"
                : "border border-ink-900/10 bg-white text-ink-600 hover:border-ink-900/25 hover:text-ink-900"
            }`}
          >
            {p}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link
          href={`/blog?page=${currentPage + 1}`}
          className="flex items-center gap-1 rounded-full border border-ink-900/10 bg-white px-4 py-2 text-sm font-bold text-ink-600 transition-all hover:border-ink-900/25 hover:text-ink-900"
          aria-label="Halaman berikutnya"
        >
          Berikutnya <BiChevronRight className="text-lg" />
        </Link>
      ) : (
        <span className="flex cursor-not-allowed items-center gap-1 rounded-full border border-ink-900/5 bg-white px-4 py-2 text-sm font-bold text-ink-300">
          Berikutnya <BiChevronRight className="text-lg" />
        </span>
      )}
    </nav>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────────
async function Blog({ searchParams }) {
  const rawPage = parseInt(searchParams?.page) || 1;
  const currentPage = rawPage < 1 ? 1 : rawPage;

  const result = await getBlogDataPaginated({ page: currentPage, limit: PER_PAGE });
  const data = result?.data?.blog || [];
  const pagination = result?.pagination || {
    currentPage,
    totalPages: 1,
    totalItems: data.length,
    perPage: PER_PAGE,
  };

  const isFirstPage = currentPage === 1;
  const featuredPost = isFirstPage && data.length > 0 ? data[0] : null;
  const gridPosts = isFirstPage ? data.slice(1) : data;

  return (
    <div className="relative min-h-screen overflow-hidden bg-cream-100 pb-24 pt-32">
      <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-40 mask-fade-b" />
      <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-brand-100/60 blur-3xl" />

      <div className="container-page relative z-10">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="eyebrow">
            <LuBookOpen className="text-brand-700" />
            Blog &amp; tips
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-6xl">
            Kabar dari <span className="text-brand-700">Harmony Laundry.</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-500 sm:text-lg">
            Tips mencuci praktis, promo menarik, dan cerita terbaru seputar layanan kami.
          </p>
          {pagination.totalItems > 0 && (
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
              {data.length} dari {pagination.totalItems} artikel
            </p>
          )}
        </div>

        {/* Empty state */}
        {data.length === 0 && (
          <div className="rounded-[2rem] border border-ink-900/10 bg-white/80 px-6 py-20 text-center backdrop-blur">
            <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-brand-100 text-brand-700">
              <LuBookOpen className="text-3xl" />
            </div>
            <h3 className="font-display text-2xl font-extrabold text-ink-900">Belum ada artikel</h3>
            <p className="mt-2 text-ink-500">Nantikan update menarik dari kami segera!</p>
          </div>
        )}

        {/* Featured */}
        {featuredPost && (
          <div className="mb-10">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid grid-cols-1 gap-6 rounded-[2rem] border border-ink-900/10 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:p-4 lg:grid-cols-2 lg:gap-8"
            >
              <div className="relative aspect-video min-h-[260px] w-full overflow-hidden rounded-[1.5rem] bg-cream-100 lg:aspect-auto lg:min-h-[340px]">
                <Image
                  src={getImageUrl(featuredPost.thumbnail)}
                  alt={featuredPost.title}
                  fill
                  priority
                  unoptimized
                  className="object-cover transition duration-700 ease-in-out group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-cream-50/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-ink-900 backdrop-blur">
                  Artikel pilihan
                </span>
              </div>

              <div className="flex flex-col justify-center px-2 pb-6 pt-2 sm:px-4 lg:py-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-full bg-brand-100 px-3 py-1 text-[11px] font-bold capitalize text-brand-700">
                    {featuredPost.kategori?.nama || "Terbaru"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-400">
                    <BiTime className="text-base" />
                    {moment(featuredPost.created_at).format("DD MMM YYYY")}
                  </span>
                </div>

                <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight text-ink-900 transition-colors group-hover:text-brand-700 sm:text-3xl lg:text-4xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-500 sm:text-base">
                  {featuredPost.meta_desc || featuredPost.title}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-ink-900/10 pt-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-cream-100 text-ink-400">
                      <BiUser className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-ink-900">
                        {featuredPost.pegawai?.name || "Admin"}
                      </p>
                      <p className="text-[11px] font-medium text-ink-400">Author</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-extrabold text-brand-700">
                    Baca <span className="hidden sm:inline">artikel</span>
                    <LuArrowRight className="text-base transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Grid */}
        {gridPosts.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((bg) => (
              <Link
                key={bg.slug}
                href={`/blog/${bg.slug}`}
                className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-ink-900/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-ink-900/20 hover:shadow-card"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-100">
                  <Image
                    src={getImageUrl(bg.thumbnail)}
                    alt={bg.title}
                    fill
                    unoptimized
                    className="object-cover transition duration-700 ease-in-out group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-cream-50/90 px-3 py-1 text-[10px] font-bold capitalize text-ink-900 backdrop-blur">
                    {bg.kategori?.nama || "Artikel"}
                  </span>
                </div>

                <div className="flex flex-grow flex-col p-5 sm:p-6">
                  <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-ink-400">
                    <BiTime className="text-base" />
                    {moment(bg.created_at).format("DD MMM YYYY")}
                  </div>

                  <h3 className="line-clamp-2 font-display text-xl font-extrabold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
                    {bg.title}
                  </h3>

                  <p className="mb-5 mt-2 line-clamp-3 flex-grow text-sm leading-relaxed text-ink-500">
                    {bg.meta_desc || bg.title}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-ink-900/10 pt-4">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-ink-500">
                      <BiUser className="text-base text-ink-300" />
                      <span className="max-w-[110px] truncate">{bg.pegawai?.name || "Admin"}</span>
                    </span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-cream-100 text-brand-700 transition-colors duration-300 group-hover:bg-ink-900 group-hover:text-cream-50">
                      <LuArrowUpRight className="text-sm" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      </div>
    </div>
  );
}

export default Blog;
