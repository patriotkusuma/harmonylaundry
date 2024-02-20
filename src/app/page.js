import Contact from "@/components/Contact";
import Harga from "@/components/Harga";
import Hero from "@/components/Hero";
import WeAre from "@/components/WeAre";
import Image from "next/image";

export const metadata = {
  title: "Harmony Laundry | Laundry Kiloan & Satuan DI Yogyakarta Antar Jemput",
  description: "Laundry Kiloan dan Satuan DI Yogyakarta, Antar Jemput Gratis (max 5 km)",
  author: "Harmony Laundry",
  keywords: "Laundry, kiloan, satuan, sepatu, cucikiloan, cucisatuan",
  icons: {
    icon: '/img/logo.png',
    shortcut: '/img/logo.png',
    apple: '/img/logo.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/img/logo.png',
    }
    
  },
  openGraph:{
    title: "Harmony Laundry",
    description:"Laundry Kiloan dan Satuan DI Yogyakarta, Antar Jemput Gratis (max 5 km)",
    url: "https://harmonylaundry.my.id",
    siteName: "Harmony Laundry",
    type: 'website',
    images: {
      url: '/img/logo.png',
      alt: 'Harmony Laundry Logo'
    }
  },
  robots:{
    index:true,
    follow: true,
    googleBot:{
      index:true,
      follow:true
    }
  },
  category:'Laundry Services'
};


export default function Home() {
  return (
    <main className="">
      <Hero/>
      <WeAre/>
      <Harga/>
      <Contact/>
      
    </main>
  );
}
