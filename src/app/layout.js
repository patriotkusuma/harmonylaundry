import { Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBotton from "@/components/TopBotton";
import ChatwootWidget from "@/components/ChatwootWidget";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata = {
  metadataBase: new URL("https://harmonylaundrys.com"),
  icons: {
    icon: "https://harmonylaundrys.com/img/logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F3F8FE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${sans.variable} ${display.variable} font-sans`}>
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-cream-50"
        >
          Lompat ke konten utama
        </a>
        <Header />
        <div id="konten">{children}</div>
        <TopBotton />
        <Footer />
        <ChatwootWidget />
      </body>
    </html>
  );
}
