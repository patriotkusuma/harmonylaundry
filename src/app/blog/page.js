import { getPostData, getSinglePost } from "@/lib/post";
import React from "react";

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
  const singlePost = await getSinglePost("webrtc-part-1");

  console.log(posts);
  return (
    <div>
      {posts.fileContents.map((post) => {
        console.log(post);
        return (
          <>
            <h1 className="font-bold">{post.id}</h1>
            <h1 className="font-bold">{post.title}</h1>
            {/* <div dangerouslySetInnerHTML={{ __html: post.contentHtml}}/> */}
          </>
        );
      })}
      {/* {posts.map((post) => {
        return (
          <>
          <h1>{singlePost.name}</h1>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: singlePost.contentHtml}}/>
          </>
        )
      })} */}
    </div>
  );
}

export default Blog;
