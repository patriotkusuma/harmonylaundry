import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"

const font = Nunito({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
