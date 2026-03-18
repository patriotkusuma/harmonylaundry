import { getBlogDataPaginated } from "@/lib/newPost";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { BiTime, BiUser, BiChevronLeft, BiChevronRight } from "react-icons/bi";

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
  const delta = 2; // jumlah halaman di kiri/kanan halaman aktif

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

  // Hapus duplikat "..."
  const dedupedPages = pages.filter(
    (p, idx) => !(p === "..." && pages[idx - 1] === "...")
  );

  return (
    <nav
      aria-label="Navigasi halaman blog"
      className="flex items-center justify-center gap-1.5 mt-14 flex-wrap"
    >
      {/* Prev */}
      {currentPage > 1 ? (
        <Link
          href={`/blog?page=${currentPage - 1}`}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-md transition-all duration-200"
          aria-label="Halaman sebelumnya"
        >
          <BiChevronLeft className="text-lg" /> Sebelumnya
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 bg-white border border-slate-100 cursor-not-allowed">
          <BiChevronLeft className="text-lg" /> Sebelumnya
        </span>
      )}

      {/* Page Numbers */}
      {dedupedPages.map((p, idx) =>
        p === "..." ? (
          <span
            key={`dots-${idx}`}
            className="px-3 py-2 text-slate-400 text-sm select-none"
          >
            ···
          </span>
        ) : (
          <Link
            key={p}
            href={`/blog?page=${p}`}
            aria-label={`Halaman ${p}`}
            aria-current={p === currentPage ? "page" : undefined}
            className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200 ${
              p === currentPage
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                : "bg-white text-slate-600 border border-slate-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-md"
            }`}
          >
            {p}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={`/blog?page=${currentPage + 1}`}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 hover:shadow-md transition-all duration-200"
          aria-label="Halaman berikutnya"
        >
          Berikutnya <BiChevronRight className="text-lg" />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 bg-white border border-slate-100 cursor-not-allowed">
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

  // Halaman 1: featured = item pertama, grid = sisanya
  // Halaman > 1: semua masuk grid
  const isFirstPage = currentPage === 1;
  const featuredPost = isFirstPage && data.length > 0 ? data[0] : null;
  const gridPosts = isFirstPage ? data.slice(1) : data;

  return (
    <div className="bg-[url('/img/hero-bg.png')] bg-cover bg-no-repeat min-h-screen pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-4 xl:px-0">

        {/* HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-slate-800 tracking-tight mb-6">
            Kabar <span className="text-blue-600">Harmony Laundry</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600">
            Temukan tips mencuci praktis, promo menarik, dan kabar terbaru seputar layanan kami.
          </p>
          {pagination.totalItems > 0 && (
            <p className="mt-3 text-sm text-slate-400">
              Menampilkan {data.length} dari {pagination.totalItems} artikel
            </p>
          )}
        </div>

        {/* EMPTY STATE */}
        {data.length === 0 && (
          <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-100">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-500 mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l2 2h4a2 2 0 012 2v10a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Belum ada artikel</h3>
            <p className="text-slate-500">Nantikan update menarik dari kami segera!</p>
          </div>
        )}

        {/* FEATURED POST — hanya di halaman 1 */}
        {featuredPost && (
          <div className="mb-12">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-[2rem] p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              <div className="relative aspect-video lg:aspect-auto min-h-[300px] w-full overflow-hidden rounded-3xl">
                <Image
                  src={getImageUrl(featuredPost.thumbnail)}
                  alt={featuredPost.title}
                  fill
                  priority
                  unoptimized
                  className="object-cover group-hover:scale-105 transition duration-700 ease-in-out"
                />
              </div>
              <div className="flex flex-col justify-center py-6 px-2 sm:px-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full capitalize">
                    {featuredPost.kategori?.nama || "Terbaru"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                    <BiTime className="text-lg" />
                    {moment(featuredPost.created_at).format("DD MMM YYYY")}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-600 mb-6 line-clamp-3 text-lg">
                  {featuredPost.meta_desc || featuredPost.title}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                      <BiUser className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{featuredPost.pegawai?.name || "Admin"}</p>
                      <p className="text-xs text-slate-500">Author</p>
                    </div>
                  </div>
                  <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Baca <span className="hidden sm:inline">Artikel</span> &rarr;
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* BLOG GRID */}
        {gridPosts.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((bg) => (
              <Link
                key={bg.slug}
                href={`/blog/${bg.slug}`}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1"
              >
                {/* THUMBNAIL */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={getImageUrl(bg.thumbnail)}
                    alt={bg.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition duration-700 ease-in-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-semibold text-slate-800 bg-white/90 backdrop-blur-sm rounded-full capitalize shadow-sm">
                      {bg.kategori?.nama || "Artikel"}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col flex-grow p-6 sm:p-8">
                  <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
                    <BiTime className="text-lg" />
                    {moment(bg.created_at).format("DD MMM YYYY")}
                  </div>

                  <h3 className="font-bold text-xl text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-snug">
                    {bg.title}
                  </h3>

                  <p className="text-slate-600 line-clamp-3 mb-6 flex-grow">
                    {bg.meta_desc || bg.title}
                  </p>

                  {/* AUTHOR & READ MORE */}
                  <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                    <span className="inline-flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <BiUser className="text-lg text-slate-400" />
                        <span className="truncate max-w-[100px]">{bg.pegawai?.name || "Admin"}</span>
                    </span>
                    <span className="text-blue-600 flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />

      </div>
    </div>
  );
}

export default Blog;
