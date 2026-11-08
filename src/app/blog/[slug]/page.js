import Custom404 from "@/app/404";
import BreadCrumb from "@/components/BreadCrumb";
import { getBlogPost } from "@/lib/newPost";
import moment from "moment";
import React from "react";
import { BiTime, BiUser } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { LuArrowRight } from "react-icons/lu";

export async function generateMetadata({ params }) {
  const response = await getBlogPost(params.slug);
  const blog = response?.data || response;

  const getImageUrl = (path) => {
    if (!path) return "https://harmonylaundrys.com/img/landry-hero.jpg";
    if (path.startsWith("/uploads")) return `https://go.harmonylaundry.my.id${path}`;
    return path;
  };

  const finalImage = getImageUrl(blog.thumbnail);
  const authorName = blog?.pegawai?.name || "Harmony Laundry";
  const publishedDate = blog.created_at ? new Date(blog.created_at).toISOString() : new Date().toISOString();

  return {
    title: `${blog.title} | Harmony Laundry`,
    description: blog.meta_desc || blog.title,
    keywords: [blog.kategori?.nama || "Laundry", "Harmony Laundry", blog.title, "Laundry Yogyakarta"],
    authors: [{ name: authorName }],
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: `https://harmonylaundrys.com/blog/${blog.slug}`,
    },
    metadataBase: new URL(`https://harmonylaundrys.com`),
    openGraph: {
      title: `${blog.title} | Harmony Laundry`,
      description: blog.meta_desc || blog.title,
      url: `https://harmonylaundrys.com/blog/${blog.slug}`,
      siteName: "Harmony Laundry",
      type: "article",
      locale: "id_ID",
      publishedTime: publishedDate,
      authors: [authorName],
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} | Harmony Laundry`,
      description: blog.meta_desc || blog.title,
      images: [finalImage],
    },
  };
}

async function Page({ params }) {
  const response = await getBlogPost(params.slug);
  const blog = response?.data || response;

  if (!blog || response?.success === false) {
    return <Custom404 statusCode={404} />;
  }

  const getImageUrl = (path) => {
    if (!path) return "/img/landry-hero.jpg";
    if (path.startsWith("/uploads")) return `https://go.harmonylaundry.my.id${path}`;
    return path;
  };

  const htmlContent =
    typeof blog.content === "string" ? blog.content : blog.content?.html || "";

  return (
    <div className="relative min-h-screen overflow-hidden bg-cream-100 pb-24 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-30 mask-fade-b" />
      <div className="pointer-events-none absolute -right-24 top-32 h-80 w-80 rounded-full bg-brand-100/60 blur-3xl" />

      <article className="container-page relative z-10 max-w-4xl">
        <BreadCrumb />

        {/* Header */}
        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-brand-100 px-3 py-1 text-[11px] font-bold capitalize text-brand-700">
              {blog.kategori?.nama || "Artikel"}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-400">
              <BiTime className="text-base" />
              {moment(blog.created_at).format("DD MMMM YYYY")}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          <div className="mt-5 flex items-center gap-3 border-b border-ink-900/10 pb-6">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink-400 shadow-sm">
              <BiUser className="text-lg" />
            </span>
            <div>
              <p className="text-sm font-extrabold text-ink-900">
                {blog?.pegawai?.name || "Harmony Laundry"}
              </p>
              <p className="text-[11px] font-medium text-ink-400">Penulis</p>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-[2rem] border-[6px] border-white bg-white shadow-lift">
          <img
            src={getImageUrl(blog.thumbnail)}
            alt={blog.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div
          className="
            prose prose-lg mt-10 max-w-none
            prose-headings:font-display prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-ink-900
            prose-p:leading-relaxed prose-p:text-ink-600
            prose-a:font-semibold prose-a:text-brand-700 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-ink-900
            prose-li:text-ink-600
            prose-img:rounded-2xl
            prose-blockquote:border-l-brand-500 prose-blockquote:bg-white/60 prose-blockquote:py-1 prose-blockquote:not-italic prose-blockquote:text-ink-600
          "
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* CTA */}
        <div className="relative mt-16 overflow-hidden rounded-[2rem] bg-ink-900 p-8 text-center sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/4 h-56 w-56 rounded-full bg-citrus-400/10 blur-3xl" />

          <div className="relative">
            <h3 className="font-display text-2xl font-extrabold text-cream-50 sm:text-3xl">
              Capek urusan cucian?
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-300">
              Serahkan pada Harmony Laundry. Dijemput gratis, kembali bersih, wangi, dan rapi.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://wa.me/62895363324517"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa w-full sm:w-auto"
              >
                <FaWhatsapp className="text-xl" />
                Pesan antar jemput
              </a>
              <a href="/" className="btn-light w-full border-white/20 bg-white/10 text-cream-50 hover:bg-white/20 sm:w-auto">
                Lihat layanan
                <LuArrowRight className="text-base" />
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Page;
