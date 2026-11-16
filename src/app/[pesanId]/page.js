import FloatingQrisButton from "@/components/FloatingQrisButton";
import BayarQris from "./BayarQris";
import DetailPesan from "./DetailPesan";
import Custom404 from "./404";
import AntrianLinkBanner from "./AntrianLinkBanner";
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

  const orderRes = await getDetailPesan(pesanId);
  const orderData = orderRes?.data;

  // API mengembalikan { error: "pesanan tidak ditemukan" } tanpa field status/success.
  const isNotFound =
    !orderData || orderRes?.error || orderRes?.success === false || orderRes?.status === 404;

  if (isNotFound) {
    return <Custom404 statusCode={404} />;
  }

  const statusPembayaran = orderData?.status_pembayaran ?? null;
  const needPayAmount =
    Number(orderData?.paid ?? 0) - Number(orderData?.total_harga ?? 0);

  return (
    <main className="relative min-h-screen overflow-hidden bg-cream-100 pb-14 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-30 mask-fade-b" />
      <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-brand-100/60 blur-3xl" />

      <div className="container-page relative z-10">
        {/* Header */}
        <div className="mb-8">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Status pesanan
          </span>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                Detail pesanan
              </h1>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-500">
                Cek rincian pesanan, status pembayaran, dan progress pengerjaan laundry kamu.
              </p>
            </div>
            <div className="w-fit rounded-full border border-ink-900/10 bg-white px-3.5 py-2 text-xs text-ink-500">
              Kode: <span className="font-mono font-bold text-ink-900">{pesanId}</span>
            </div>
          </div>
        </div>

        <AntrianLinkBanner />

        {/* Content */}
        <div className="flex flex-col items-start gap-6 lg:flex-row">
          <DetailPesan pesanId={pesanId} />

          {statusPembayaran !== null && statusPembayaran !== "Lunas" && (
            <>
              <div className="hidden md:block">
                <BayarQris kodePesan={pesanId} total={needPayAmount} />
              </div>

              <FloatingQrisButton>
                <BayarQris kodePesan={pesanId} total={needPayAmount} compact />
              </FloatingQrisButton>
            </>
          )}
        </div>

        <div className="mt-10 text-center text-xs text-ink-400">
          © {new Date().getFullYear()} Harmony Laundry • Berani Kotor Itu Baik 😊
        </div>
      </div>
    </main>
  );
}
