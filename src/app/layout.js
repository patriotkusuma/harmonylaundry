import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import TopBotton from "@/components/TopBotton";

const font = Nunito({ subsets: ["latin"] });


export const metadata = {
  icons: {
    icon: "https://harmonylaundrys.com/img/logo.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={font.className}>
        <Header/>
        {children}
        <TopBotton/>
        <Footer/>
      </body>
    </html>
  );
}
