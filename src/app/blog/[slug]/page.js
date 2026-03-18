import Custom404 from "@/app/404";
import BreadCrumb from "@/components/BreadCrumb";
import { getBlogPost } from "@/lib/newPost";
import moment from "moment";
import React from "react";
import { BiTime, BiUser } from "react-icons/bi";

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
    metadataBase: new URL(
      `https://harmonylaundrys.com`
    ),
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
  typeof blog.content === "string"
    ? blog.content
    : blog.content?.html || "";


  return (
    <article className="mt-16 max-w-screen-xl mx-auto px-4 xl:px-0 py-8">

      {/* BREADCRUMB */}
      <BreadCrumb />

      {/* HERO IMAGE */}
      <div className="relative w-full aspect-video overflow-hidden rounded-3xl shadow-xl mt-6">
        <img
          src={getImageUrl(blog.thumbnail)}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* TITLE */}
      <h1 className="mt-10 text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
        {blog.title}
      </h1>

      {/* META */}
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
        <span className="inline-flex items-center gap-2">
          <BiUser className="text-lg" />
          {blog?.pegawai?.name}
        </span>
        <span className="inline-flex items-center gap-2">
          <BiTime className="text-lg" />
          {moment(blog.created_at).format("DD MMMM YYYY")}
        </span>
      </div>

      {/* CONTENT */}
      <div
        className="
          prose prose-lg max-w-none mt-10
          prose-headings:text-gray-800
          prose-p:text-gray-600
          prose-a:text-blue-600
          prose-img:rounded-xl
        "
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />


      {/* CTA */}
      <div className="mt-16 bg-blue-50 border border-blue-100 rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-bold text-blue-900">
          Capek urusan cucian?
        </h3>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          Serahkan urusan mencuci ke Harmony Laundry. Bersih, wangi, dan tepat waktu.
        </p>
        <a
          href="/"
          className="inline-block mt-6 bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition"
        >
          Lihat Layanan Kami
        </a>
      </div>

    </article>
  );
}

export default Page;
