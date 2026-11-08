import getDetailPesan from "@/lib/pesanan";
import moment from "moment";
import "moment/locale/id";
import Custom404 from "./404";
import {
  FaBan,
  FaBoxOpen,
  FaCheckCircle,
  FaClipboardList,
  FaHandHoldingHeart,
  FaSoap,
  FaTshirt,
} from "react-icons/fa";
import { LuClock, LuShieldCheck, LuSparkles } from "react-icons/lu";
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
      color: "bg-brand-50 border-brand-200 text-brand-700",
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
      color: "bg-brand-50 border-brand-200 text-brand-700",
    },
  ];

  let activeIdx = 1;
  if (status === "cuci") activeIdx = 1;
  else if (status === "setrika") activeIdx = 2;
  else if (status === "selesai") activeIdx = 3;
  else if (status === "diambil") activeIdx = 4;

  const canceled = status === "batal";

  return { steps, activeIdx, canceled };
};

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

  if (s === "cuci") return "bg-sky-100 text-sky-700 border-sky-200";
  if (s === "setrika") return "bg-indigo-100 text-indigo-700 border-indigo-200";
  if (s === "selesai") return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (s === "diambil") return "bg-brand-100 text-brand-700 border-brand-200";
  if (s === "batal") return "bg-rose-100 text-rose-700 border-rose-200";
  return "bg-cream-100 text-ink-600 border-ink-900/10";
};

const bayarBadge = (statusPembayaran) => {
  if (statusPembayaran === "Lunas") return "bg-emerald-100 text-emerald-700 border-emerald-200";
  return "bg-citrus-100 text-citrus-500 border-citrus-300";
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

  const data = res?.data ?? {};
  const customer = data?.customer ?? {};

  const details = data?.detail_pesanans ?? [];
  const needPayAmount =
    Number(data?.paid ?? 0) - Number(data?.total_harga ?? 0);
  const total = Math.abs(needPayAmount);

  const logRes = await getOrderLog(pesanId);
  const logs = logRes?.data ?? [];
  const { steps, activeIdx, canceled } = buildStepsFromOrderAndLogs(data, logs);

  return (
    <section className="w-full lg:flex-1">
      <div className="overflow-hidden rounded-[1.75rem] border border-ink-900/10 bg-white shadow-card">
        {/* Header */}
        <div className="border-b border-ink-900/10 bg-gradient-to-r from-brand-50 via-cream-50 to-white p-5 sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <img
                src="/img/logo.png"
                alt="Harmony Laundry"
                className="h-11 w-11 shrink-0 rounded-xl border border-ink-900/10 bg-white"
              />

              <div className="min-w-0">
                <div className="font-display text-lg font-extrabold leading-tight text-ink-900">
                  Harmony Laundry
                </div>
                <div className="mt-1 text-xs leading-snug text-ink-500">
                  Jln. Candi Gebang, Karangasem, Condongcatur
                </div>
                <div className="text-xs text-ink-500">
                  Telp / WA: <span className="font-semibold text-ink-800">0895363324517</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-ink-900/10 bg-white/80 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-400">
                    Kode pesanan
                  </div>
                  <div className="mt-1 break-all font-mono text-sm font-bold text-ink-900">
                    {data?.kode_pesan || pesanId}
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <div
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold capitalize ${statusBadge(
                      data?.status
                    )}`}
                  >
                    {data?.status || "-"}
                  </div>
                  <div
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold ${bayarBadge(
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
        <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-5 lg:col-span-2">
            {/* Customer */}
            <div className="rounded-2xl border border-ink-900/10 p-5">
              <div className="text-sm font-extrabold text-ink-900">Detail pemesan</div>

              <div className="mt-4 grid grid-cols-1 gap-4 text-sm text-ink-700 md:grid-cols-2">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Nama</div>
                  <div className="mt-0.5 font-bold text-ink-900">{customer?.nama || "-"}</div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Telp / WA</div>
                  <div className="mt-0.5 font-bold text-ink-900">{customer?.telpon || "-"}</div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Tanggal pesan</div>
                  <div className="mt-0.5 font-semibold text-ink-800">
                    {data?.tanggal_pesan
                      ? moment(data.tanggal_pesan).locale("id").format("dddd HH:mm, DD MMMM YYYY")
                      : "-"}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Estimasi selesai</div>
                  <div className="mt-0.5 font-semibold text-ink-800">
                    {data?.tanggal_selesai
                      ? moment(data.tanggal_selesai).locale("id").format("dddd HH:mm, DD MMMM YYYY")
                      : "-"}
                  </div>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="overflow-hidden rounded-2xl border border-ink-900/10">
              <div className="border-b border-ink-900/10 px-5 py-4">
                <div className="text-sm font-extrabold text-ink-900">Rincian item</div>
                <div className="text-xs text-ink-500">Detail layanan yang kamu ambil.</div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-cream-50 text-[11px] uppercase tracking-wide text-ink-500">
                    <tr>
                      <th className="px-5 py-3 text-left font-bold">Layanan</th>
                      <th className="px-5 py-3 text-right font-bold">Qty</th>
                      <th className="px-5 py-3 text-right font-bold">Harga</th>
                      <th className="px-5 py-3 text-right font-bold">Subtotal</th>
                    </tr>
                  </thead>

                  <tbody>
                    {(details ?? []).length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-5 py-6 text-center text-sm text-ink-500">
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
                          <tr key={idx} className="border-t border-ink-900/10">
                            <td className="px-5 py-3">
                              <div className="font-bold text-ink-900">{layanan}</div>
                              <div className="text-[11px] text-ink-500">
                                {item?.jenis_cuci?.keterangan || ""}
                              </div>
                            </td>
                            <td className="px-5 py-3 text-right text-ink-700">{qty}</td>
                            <td className="px-5 py-3 text-right text-ink-700">{formatIDR(harga)}</td>
                            <td className="px-5 py-3 text-right font-bold text-ink-900">
                              {formatIDR(subtotal)}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>

                  <tfoot className="border-t border-ink-900/10 bg-cream-50">
                    <tr>
                      <td colSpan={3} className="px-5 py-4 text-right font-bold text-ink-600">
                        Total
                      </td>
                      <td className="px-5 py-4 text-right font-display text-base font-extrabold text-ink-900">
                        {formatIDR(total)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl border border-ink-900/10 bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-extrabold text-ink-900">Detail pengerjaan</div>
                  <div className="text-xs text-ink-500">Klik tahap untuk melihat keterangannya.</div>
                </div>
                <div
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold capitalize ${statusBadge(
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

              <div className="mt-4 rounded-2xl border border-ink-900/10 bg-cream-50 p-4 text-xs text-ink-600">
                <div className="mb-1 flex items-center gap-1.5 font-bold text-ink-900">
                  <LuSparkles className="text-brand-700" /> Info
                </div>
                Estimasi selesai dapat berubah jika antrean sedang ramai. Jika ada perubahan,
                admin akan menghubungi via WhatsApp.
              </div>
            </div>

            {data?.keterangan && (
              <div className="rounded-2xl border border-ink-900/10 p-5">
                <div className="text-sm font-extrabold text-ink-900">Catatan</div>
                <div className="mt-2 text-sm text-ink-700">{data.keterangan}</div>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="space-y-5">
            <div className="relative overflow-hidden rounded-2xl bg-ink-900 p-5 text-white">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/25 blur-2xl" />
              <div className="relative">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink-300">
                  Ringkasan
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-xs font-bold text-ink-300">Rp</span>
                  <span className="font-display text-3xl font-extrabold tracking-tight text-cream-50">
                    {total.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-ink-300">Status</span>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold capitalize ${statusBadge(
                        data?.status
                      )}`}
                    >
                      {data?.status || "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-ink-300">Pembayaran</span>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold ${bayarBadge(
                        data?.status_pembayaran
                      )}`}
                    >
                      {data?.status_pembayaran || "-"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-[11px] leading-relaxed text-ink-300">
                  <LuShieldCheck className="mt-0.5 shrink-0 text-sm text-brand-300" />
                  Cucian diproses higienis 1 mesin 1 pelanggan.
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-ink-900/10 bg-citrus-100 p-5">
              <div className="flex items-center gap-2 text-sm font-extrabold text-ink-900">
                <FaCheckCircle className="text-emerald-600" />
                Terima kasih!
              </div>
              <div className="mt-1 text-xs leading-relaxed text-ink-600">
                Berani kotor itu baik 😊 Kami tunggu cucian berikutnya, ya.
              </div>
            </div>

            <div className="flex items-center gap-2 px-1 text-[11px] text-ink-400">
              <LuClock className="text-sm" />
              Halaman ini diperbarui otomatis saat kamu refresh.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailPesan;
