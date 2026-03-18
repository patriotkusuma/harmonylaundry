import getDetailPesan from "@/lib/pesanan";
import moment from "moment";
import "moment/locale/id";
import Custom404 from "./404";
import {
  FaCheckCircle,
  FaClipboardList,
  FaSoap,
  FaTshirt,
  FaBoxOpen,
  FaHandHoldingHeart,
  FaBan,
  FaChevronDown, 
  FaChevronUp,
} from "react-icons/fa";
import Step from "@/components/Step";
import getOrderLog from "@/lib/getOrderLog";



const normalizeProses = (p = "") => p.toLowerCase().trim();

const groupLogsByProses = (logs = []) => {
  const groups = {};
  for (const l of logs) {
    const key = normalizeProses(l?.proses || "lainnya");
    if (!groups[key]) groups[key] = [];
    groups[key].push(l);
  }
  // sort tiap group by started_at asc
  Object.keys(groups).forEach((k) => {
    groups[k].sort((a, b) => new Date(a.started_at) - new Date(b.started_at));
  });
  return groups;
};

const getStepTimeFromLogs = (logs = [], mode = "first") => {
  if (!logs.length) return null;
  if (mode === "last") return logs[logs.length - 1]?.finished_at || logs[logs.length - 1]?.started_at;
  return logs[0]?.started_at;
};

const buildStepsFromOrderAndLogs = (order, logs = []) => {
  const status = (order?.status || "").toLowerCase();
  const grouped = groupLogsByProses(logs);

  const cuciLogs = grouped["cuci"] || [];
  const setrikaLogs = grouped["setrika"] || [];

  // timeline utama
  const steps = [
    {
      key: "masuk",
      title: "Masuk",
      proses: "masuk",
      desc: "Pesanan diterima dan masuk antrian.",
      time: order?.tanggal_pesan,
      logs: [],
      icon: <FaClipboardList />,
      color: "bg-sky-50 border-sky-200 text-sky-700",
    },
    {
      key: "cuci",
      title: "Cuci",
      proses: "cuci",
      desc: "Laundry sedang dicuci dan diproses.",
      time: getStepTimeFromLogs(cuciLogs, "first"),
      logs: cuciLogs,
      icon: <FaSoap />,
      color: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
      key: "setrika",
      title: "Setrika",
      proses: "setrika",
      desc: "Laundry sedang disetrika / finishing.",
      time: getStepTimeFromLogs(setrikaLogs, "first"),
      logs: setrikaLogs,
      icon: <FaTshirt />,
      color: "bg-indigo-50 border-indigo-200 text-indigo-700",
    },
    {
      key: "selesai",
      title: "Selesai",
      proses: "selesai",
      desc: "Laundry selesai dan siap diambil/dikirim.",
      time: order?.selesai_at || (status === "selesai" ? order?.updated_at : null),
      logs: grouped["selesai"] || [],
      icon: <FaBoxOpen />,
      color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    },
    {
      key: "diambil",
      title: "Diambil",
      proses: "diambil",
      desc: "Laundry sudah diambil customer.",
      time: order?.tanggal_ambil,
      logs: grouped["diambil"] || [],
      icon: <FaHandHoldingHeart />,
      color: "bg-green-50 border-green-200 text-green-700",
    },
  ];

  // Tentukan active step:
  // prioritas: status order
  let activeIdx = 1;
  if (status === "cuci") activeIdx = 1;
  else if (status === "setrika") activeIdx = 2;
  else if (status === "selesai") activeIdx = 3;
  else if (status === "diambil") activeIdx = 4;

  // batal
  const canceled = status === "batal";

  return { steps, activeIdx, canceled };
};


/** pembulatan total ke ribuan (opsional, mengikuti logika lama kamu) */
const totalHargaRound = (value) => {
  if (value == null) return 0;

  let harga = value / 1000;
  const decimalPart = harga % 1;
  let result = 0;

  if (decimalPart > 0.7) result = Math.round(harga) * 1000;
  else if (decimalPart < 0.3) result = Math.floor(harga) * 1000;
  else result = Math.round(harga) * 1000;

  return result;
};

const formatIDR = (val) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    Number(val || 0)
  );

const statusBadge = (status) => {
  const s = (status || "").toLowerCase();

  if (s === "cuci") return "bg-blue-100 text-blue-700 border-blue-200";
  if (s === "setrika") return "bg-indigo-100 text-indigo-700 border-indigo-200";
  if (s === "selesai") return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (s === "diambil") return "bg-green-100 text-green-700 border-green-200";
  if (s === "batal") return "bg-rose-100 text-rose-700 border-rose-200";
  return "bg-gray-100 text-gray-700 border-gray-200";
};

const bayarBadge = (statusPembayaran) => {
  if (statusPembayaran === "Lunas") return "bg-emerald-100 text-emerald-700 border-emerald-200";
  return "bg-amber-100 text-amber-700 border-amber-200";
};


const buildWorkSteps = (data) => {
  const status = (data?.status || "").toLowerCase();

  // batal
  if (status === "batal") {
    return {
      canceled: true,
      steps: [
        {
          key: "masuk",
          title: "Masuk",
          desc: "Pesanan diterima.",
          time: data?.tanggal_pesan,
          icon: <FaClipboardList />,
        },
        {
          key: "batal",
          title: "Dibatalkan",
          desc: "Pesanan dibatalkan.",
          time: data?.updated_at,
          icon: <FaBan />,
        },
      ],
      activeIdx: 1,
    };
  }

  const steps = [
    {
      key: "masuk",
      title: "Masuk",
      desc: "Pesanan diterima dan masuk antrian.",
      time: data?.tanggal_pesan,
      icon: <FaClipboardList />,
    },
    {
      key: "cuci",
      title: "Cuci",
      desc: "Laundry sedang dicuci dan diproses.",
      time: null,
      icon: <FaSoap />,
    },
    {
      key: "setrika",
      title: "Setrika",
      desc: "Laundry sedang disetrika / finishing.",
      time: data?.setrika_at,
      icon: <FaTshirt />,
    },
    {
      key: "selesai",
      title: "Selesai",
      desc: "Laundry selesai dan siap diambil/dikirim.",
      time: data?.selesai_at,
      icon: <FaBoxOpen />,
    },
    {
      key: "diambil",
      title: "Diambil",
      desc: "Laundry sudah diambil customer.",
      time: data?.tanggal_ambil,
      icon: <FaHandHoldingHeart />,
    },
  ];

  let activeIdx = 1; // default cuci
  if (status === "cuci") activeIdx = 1;
  else if (status === "setrika") activeIdx = 2;
  else if (status === "selesai") activeIdx = 3;
  else if (status === "diambil") activeIdx = 4;

  return { canceled: false, steps, activeIdx };
};

const prosesMeta = (proses) => {
  const p = (proses || "").toLowerCase();
  if (p.includes("cuci")) return { title: "Cuci", icon: <FaSoap />, color: "text-blue-700 bg-blue-50 border-blue-200" };
  if (p.includes("setrika")) return { title: "Setrika", icon: <FaTshirt />, color: "text-indigo-700 bg-indigo-50 border-indigo-200" };
  if (p.includes("packing") || p.includes("siap")) return { title: "Packing", icon: <FaBoxOpen />, color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
  return { title: proses || "-", icon: <FaCheckCircle />, color: "text-gray-600 bg-gray-50 border-gray-200" };
};


export async function getStatusPembayaran(pesanId) {
  const res = await getDetailPesan(pesanId);
  if (!res || res.status === 404) return null;
  return res?.data?.status_pembayaran ?? null;
}

async function DetailPesan(props) {
  const pesanId = props.pesanId;
  const res = await getDetailPesan(pesanId);

  if (!res || res.success === false || res.status === 404) {
    return <Custom404 statusCode={404} />;
  }

  /** Struktur JSON kamu: { data: {...}, status: 200 } */
  const data = res?.data ?? {};
  const customer = data?.customer ?? {};

  const details = data?.detail_pesanans ?? [];
  const needPayAmount = data?.paid - data?.total_harga;
  const total =  Number(Math.abs(needPayAmount)) ;

  // const { steps, activeIdx, canceled } = buildWorkSteps(data);
  const logRes = await getOrderLog(pesanId);
  const logs = logRes?.data ?? [];
  const { steps, activeIdx, canceled } = buildStepsFromOrderAndLogs(data, logs);

  


  return (
    <section className="w-full">
      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
        {/* Header */}
        {/* Header */}
        <div className="p-4 sm:p-5 md:p-6 border-b bg-gradient-to-r from-blue-50 to-white">
          <div className="flex flex-col gap-4">
            {/* ROW 1: Brand */}
            <div className="flex items-start gap-3">
              <img
                src="/img/logo.png"
                alt="Harmony Laundry"
                className="h-11 w-11 rounded-xl shrink-0 bg-white border"
              />

              <div className="min-w-0">
                <div className="text-lg font-bold text-gray-900 leading-tight">
                  Harmony Laundry
                </div>
                <div className="mt-1 text-sm text-gray-600 leading-snug">
                  Jln. Candi Gebang, Karangasem, Condongcatur
                </div>
                <div className="text-sm text-gray-600">
                  Telp / WA: <span className="font-semibold">0895363324517</span>
                </div>
              </div>
            </div>

            {/* ROW 2: Order meta */}
            <div className="rounded-2xl border bg-white/70 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-wide text-gray-500">
                    Kode Pesanan
                  </div>
                  <div className="mt-1 font-mono text-sm font-semibold text-gray-900 break-all">
                    {data?.kode_pesan || pesanId}
                  </div>
                </div>

                {/* badges */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${statusBadge(
                      data?.status
                    )}`}
                  >
                    {data?.status || "-"}
                  </div>
                  <div
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${bayarBadge(
                      data?.status_pembayaran
                    )}`}
                  >
                    {data?.status_pembayaran || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer info */}
            <div className="rounded-2xl border p-5">
              <div className="text-sm font-semibold text-gray-900">Detail Pemesan</div>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                <div>
                  <div className="text-xs text-gray-500">Nama</div>
                  <div className="font-semibold">{customer?.nama || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Telp / WA</div>
                  <div className="font-semibold">{customer?.telpon || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Tanggal Pesan</div>
                  <div className="font-semibold">
                    {data?.tanggal_pesan
                      ? moment(data.tanggal_pesan).locale("id").format("dddd HH:mm, DD MMMM YYYY")
                      : "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Estimasi Selesai</div>
                  <div className="font-semibold">
                    {data?.tanggal_selesai
                      ? moment(data.tanggal_selesai).locale("id").format("dddd HH:mm, DD MMMM YYYY")
                      : "-"}
                  </div>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="rounded-2xl border overflow-hidden">
              <div className="px-5 py-4 border-b">
                <div className="text-sm font-semibold text-gray-900">Rincian Item</div>
                <div className="text-sm text-gray-500">Detail layanan yang kamu ambil.</div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="text-left px-5 py-3 font-semibold">Layanan</th>
                      <th className="text-right px-5 py-3 font-semibold">Qty</th>
                      <th className="text-right px-5 py-3 font-semibold">Harga</th>
                      <th className="text-right px-5 py-3 font-semibold">Subtotal</th>
                    </tr>
                  </thead>

                  <tbody>
                    {(details ?? []).length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-5 py-6 text-center text-sm text-gray-500">
                          Belum ada detail layanan.
                        </td>
                      </tr>
                    ) : (
                      (details ?? []).map((item, idx) => {
                        const layanan = item?.jenis_cuci?.nama || "-";
                        const qty = item?.qty ?? 0;
                        const harga = item?.harga ?? 0;
                        const subtotal = totalHargaRound(item?.total_harga);

                        return (
                          <tr key={idx} className="border-t">
                            <td className="px-5 py-3">
                              <div className="font-semibold text-gray-900">{layanan}</div>
                              <div className="text-xs text-gray-500">
                                {item?.jenis_cuci?.keterangan || ""}
                              </div>
                            </td>
                            <td className="px-5 py-3 text-right">{qty}</td>
                            <td className="px-5 py-3 text-right">{formatIDR(harga)}</td>
                            <td className="px-5 py-3 text-right font-semibold text-gray-900">
                              {formatIDR(subtotal)}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>

                  <tfoot className="bg-gray-50 border-t">
                    <tr>
                      <td colSpan={3} className="px-5 py-4 text-right font-semibold text-gray-700">
                        Total
                      </td>
                      <td className="px-5 py-4 text-right font-bold text-gray-900">
                        {formatIDR(total)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Catatan */}
            
            {/* Detail Pengerjaan (Timeline) */}
            <div className="rounded-2xl border p-5 bg-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-gray-900">Detail Pengerjaan</div>
                  <div className="text-sm text-gray-500">Klik tahap untuk melihat keterangannya.</div>
                </div>
                <div
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusBadge(
                    data?.status
                  )}`}
                >
                  {data?.status || "-"}
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {steps.map((step, idx) => (
                  <Step
                    key={step.key}
                    step={step}
                    idx={idx}
                    activeIdx={activeIdx}
                    canceled={canceled}
                  />
                ))}
              </div>

              <div className="mt-3 rounded-2xl bg-gray-50 p-4 text-xs text-gray-600">
                <div className="font-semibold text-gray-900 mb-1">Info</div>
                Estimasi selesai dapat berubah jika antrean sedang ramai. Jika ada perubahan,
                admin akan menghubungi via WhatsApp.
              </div>
            </div>

{data?.keterangan && (
              <div className="rounded-2xl border p-5">
                <div className="text-sm font-semibold text-gray-900">Catatan</div>
                <div className="mt-2 text-sm text-gray-700">{data.keterangan}</div>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Ringkasan */}
            <div className="rounded-2xl border p-5 bg-white">
              <div className="text-sm font-semibold text-gray-900">Ringkasan</div>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Total</span>
                  <span className="font-semibold text-gray-900">{formatIDR(total)}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Status</span>
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusBadge(data?.status)}`}>
                    {data?.status || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">Pembayaran</span>
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${bayarBadge(data?.status_pembayaran)}`}>
                    {data?.status_pembayaran || "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Thanks */}
            <div className="rounded-2xl border p-5">
              <div className="text-sm font-semibold text-gray-900">Terima kasih!</div>
              <div className="text-sm text-gray-600 mt-1">Berani Kotor Itu Baik 😊</div>
            </div>
          </div>
        </div>

        
      </div>
      
    </section>
  );
}

export default DetailPesan;