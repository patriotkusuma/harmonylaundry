import BreadCrumb from "@/components/BreadCrumb";
import { getSinglePost } from "@/lib/post";
import moment from "moment";
import React from "react";
import { BiTime, BiUser } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

export async function generateMetadata({ params, searchParams }, parent) {
  const post = await getSinglePost(params.slug);

  return {
    title: `${post.title}`,
    description: `${post.metaDesc}`,
    
    alternates: {
      canonical: `/blog/${post.name}`,
    },
    metadataBase: new URL(`https://harmonylaundrys.com/blog/${post.name}`),
    author: "Harmony Laundry ",
    keywords: `${post.keywords}`,
    icons: {
      icon: `/img/logo.png`,
      shortcut: `/img/logo.png`,
      apple: `/img/logo.png`,
      other: {
        rel: "apple-touch-icon-precomposed",
        url: `/img/logo.png`,
      },
    },
    openGraph: {
      title: `${post.title} | Harmony Laundry Yogyakarta`,
      description:`${post.metaDesc}`,
      url: `https://harmonylaundrys.com/blog/${post.name}`,
      siteName: "Harmony Laundry",
      type: "website",
      images: {
        url: `${post.socialImage}`,
        alt: "Harmony Laundry Logo",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    category: "Blog",
  };
}

async function page({ params }) {
  const post = await getSinglePost(params.slug);

  return (
    <div className="max-w-screen-xl mx-auto place-items-start flex flex-col px-4 xl:px-0 py-6 ">
        <BreadCrumb/>
      <img
        src={`/${post.socialImage}`}
        className="w-full aspect-video object-cover shadow-lg rounded-3xl mb-8"
        alt="Thumbnail Blog"
      />
      <h1 className="font-bold text-gray-700 text-3xl text-left place-self-start">
        {post.title}
      </h1>
      <div className="place-self-start text-gray-500 inline-flex gap-x-3 ">
        <span className="inline-flex items-center justify-center gap-x-2">
          <BiUser />
          {post.author}
        </span>
        <span className="inline-flex items-center justify-center gap-x-2">
          <BiTime />
          {moment(post.date).format("DD MMMM YYYY")}
        </span>
      </div>
      <div
        className="prose lg:prose text-gray-500 mt-8"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <div className="grid md:grid-cols-2 grid-cols-1 shadow-xl p-6 mx-auto"></div>
    </div>
  );
}

export default page;
