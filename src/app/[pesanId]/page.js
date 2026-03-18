import FloatingQrisButton from "@/components/FloatingQrisButton";
import BayarQris from "./BayarQris";
import DetailPesan, { getStatusPembayaran } from "./DetailPesan";
import getDetailPesan from "@/lib/pesanan";


export async function generateMetadata({ params }) {
  const pesanId = params.pesanId;

  return {
    title: `Detail Pesanan ${pesanId} | Harmony Laundry`,
    description: `Menampilkan detail pesanan dari kode pesanan ${pesanId} | Harmony Laundry`,
    robots: {
      index: false,
      follow: false,
    },
    icons: {
      icon: "https://harmonylaundrys.com/img/logo.png",
    },
  };
}

export default async function Pesanan({ params }) {
  const { pesanId } = params;

  const statusPembayaran = await getStatusPembayaran(pesanId);

  // ✅ ambil total tagihan dari API pesanan
  const orderRes = await getDetailPesan(pesanId);
//   const total = orderRes?.data?.total_harga ?? 0;
const needPayAmount = orderRes?.data?.paid - orderRes?.data?.total_harga;
  const total = Number(needPayAmount ?? 0);

  


  return (
    <main className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header halaman */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Detail Pesanan</h1>
          <p className="text-sm text-gray-600">
            Cek rincian pesanan, status pembayaran, dan progress pengerjaan laundry kamu.
          </p>

          <div className="mt-2 text-xs text-gray-500">
            Kode Pesanan: <span className="font-mono font-semibold">{pesanId}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-6 flex-col lg:flex-row items-start">
          <DetailPesan pesanId={pesanId} />

          {/* QRIS tampil hanya kalau belum lunas */}
          {statusPembayaran !== null && statusPembayaran !== "Lunas" && (
            <>
                {/* Desktop/tablet: QRIS tampil di kanan */}
                <div className="hidden md:block">
                <BayarQris kodePesan={pesanId} total={needPayAmount} />
                </div>

                {/* Mobile: QRIS floating */}
                <FloatingQrisButton>
                <BayarQris kodePesan={pesanId} total={needPayAmount} compact />
                </FloatingQrisButton>
            </>
            )}

        </div>

        {/* Footer kecil */}
        <div className="mt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Harmony Laundry • Berani Kotor Itu Baik 😊
        </div>
      </div>
    </main>
  );
}
