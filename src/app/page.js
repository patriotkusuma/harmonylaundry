import Contact from "@/components/Contact";
import Harga from "@/components/Harga";
import Hero from "@/components/Hero";
import WeAre from "@/components/WeAre";
import Image from "next/image";

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
