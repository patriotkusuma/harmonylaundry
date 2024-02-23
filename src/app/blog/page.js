import { getPostData, getSinglePost } from "@/lib/post";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { BiTime, BiUser } from "react-icons/bi";

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: `Info menarik dari Harmony Laundry Yogyakarta|Harmony Laundry`,
    description: `Dapatkan info menarik dari harmony laundry, info promo kiloan, info promo satuan, dan beragam info lainnya, serahkan masalah mencuci pada kami.`,
    icons: {
      icon: "https://harmonylaundrys.com/img/logo.png",
    },
    alternates: {
      canonical: `https://harmonylaundrys.com/blog`,
    },
    metadataBase: new URL(`https://harmonylaundrys.com/blog`),
    author: "Harmony Laundry Yogyakarta",
    keywords: "Laundry, kiloan, satuan, sepatu, cucikiloan, cucisatuan",
    icons: {
      icon: "https://harmonylaundrys.com/img/logo.png",
      shortcut: "https://harmonylaundrys.com/img/logo.png",
      apple: "https://harmonylaundrys.com/img/logo.png",
      other: {
        rel: "apple-touch-icon-precomposed",
        url: "https://harmonylaundrys.com/img/logo.png",
      },
    },
    openGraph: {
      title: "Info Menarik Harmony Laundry Yogyakarta",
      description:
        "Dapatkan info menarik dari harmony laundry, info promo kiloan, info promo satuan, dan beragam info lainnya, serahkan masalah mencuci pada kami.",
      url: "https://harmonylaundrys.com/blog",
      siteName: "Harmony Laundry",
      type: "website",
      images: {
        url: "https://harmonylaundrys.com/img/logo.png",
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
    category: "Laundry Services",
  };
}

async function Blog() {
  const posts = await getPostData();

  console.log(posts);
  return (
    <div className="max-w-screen-xl min-h-screen mx-auto place-items-start items-center  flex flex-col gap-y-2 px-4 xl:px-0 py-6">
      <h1 className="font-bold text-4xl text-center text-blue-900 my-10">Harmony Laundry Blog's</h1>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-5">

      {posts.fileContents.map((post, index) => {
        console.log(post);
        return (
          <Link href={`/blog/${post.id}`} key={index} className="group hover:shadow-2xl shadow-lg rounded-xl overflow-hidden pb-8 duration-500 ease-in-out">
            <div className="flex flex-col gap-y-3">
              <img src={`/${post.socialImage}`} />
              <h2 className="font-bold px-4 group-hover:text-blue-500 duration-500 ease-in-out">{post.title}</h2>
              <div className="font-light flex justify-between text-gray-500 px-4">
                <span className="inline-flex items-center gap-x-2">
                  <BiUser className="text-lg"/>
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-x-2">
                  <BiTime className="text-lg"/>
                  {moment(post.date).format('DD MMMM YYYY')}
                </span>
              </div>
              <p className="px-4 text-gray-500">
                {post.metaDesc}
                </p>
              {/* <div dangerouslySetInnerHTML={{ __html: post.contentHtml}}/> */}
            </div>
          </Link>
        );
      })}
      </div>
      
    </div>
  );
}

export default Blog;
