import Link from "next/link";
import { FaArrowLeft, FaReceipt } from "react-icons/fa";

export default function Custom404() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center w-full text-center px-4 bg-gray-50">
        <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-xl border border-gray-100 max-w-lg w-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">
                    <FaReceipt />
                </div>
                
                <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Halaman Tidak Ditemukan</h2>
                <p className="text-gray-500 text-base leading-relaxed mb-8">
                    Maaf, halaman yang Anda tuju sepertinya sedang dipindahkan atau tidak ada di dalam sistem kami.
                </p>
                
                <div className="flex w-full justify-center">
                    <Link href="/" className="inline-flex items-center justify-center gap-2 py-3.5 px-8 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300">
                        <FaArrowLeft />
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    </main>
  );
}