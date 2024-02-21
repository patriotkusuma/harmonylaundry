import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
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
    icon: 'https://harmonylaundrys.com/img/logo.png',
    shortcut: 'https://harmonylaundrys.com/img/logo.png',
    apple: 'https://harmonylaundrys.com/img/logo.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: 'https://harmonylaundrys.com/img/logo.png',
    }
    
  },
  openGraph:{
    title: "Harmony Laundry",
    description:"Laundry Kiloan dan Satuan DI Yogyakarta, Antar Jemput Gratis (max 5 km)",
    url: "https://harmonylaundrys.com",
    siteName: "Harmony Laundry",
    type: 'website',
    images: {
      url: 'https://harmonylaundrys.com/img/logo.png',
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
  category:'Laundry Services',
  alternates: {
    canonical: `https://harmonylaundrys.com/`
  }
};


export default function Home() {
  return (
    <main className="">
      <Hero  />
      <WeAre />
      <Harga />
      <Contact />
      
    </main>
  );
}
