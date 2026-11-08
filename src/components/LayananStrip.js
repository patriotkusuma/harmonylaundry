import Link from 'next/link'
import { LuBedDouble, LuFootprints, LuLayers, LuShirt, LuTruck, LuWaves } from 'react-icons/lu'

const layanan = [
  { label: 'Cuci kiloan', hint: 'Reguler & express', icon: LuShirt },
  { label: 'Cuci satuan', hint: 'Jas, gaun, gorden', icon: LuLayers },
  { label: 'Cuci sepatu', hint: 'Sneakers & formal', icon: LuFootprints },
  { label: 'Bed cover', hint: 'Selimut & karpet', icon: LuBedDouble },
  { label: 'Antar jemput', hint: 'Gratis 5 km', icon: LuTruck },
]

function LayananStrip() {
  return (
    <section className="relative border-y border-brand-100 bg-white/75">
      <div className="pointer-events-none absolute inset-0 bg-bubbles opacity-60" />

      <div className="container-page relative py-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-6">
          <span className="eyebrow shrink-0 self-start border-brand-200 bg-brand-50 text-brand-800 xl:self-auto">
            <LuWaves className="text-brand-600" />
            Layanan laundry
          </span>

          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-0.5 xl:mx-0 xl:grid xl:flex-1 xl:grid-cols-5 xl:gap-2 xl:overflow-visible xl:px-0">
            {layanan.map(({ label, hint, icon: Icon }) => (
              <Link
                key={label}
                href="/layanan"
                className="group flex shrink-0 items-center gap-2.5 rounded-2xl border border-ink-900/10 bg-white px-3.5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-sm"
              >
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-100">
                  <Icon className="text-base" />
                </span>
                <span className="leading-tight">
                  <span className="block text-xs font-extrabold text-ink-900">{label}</span>
                  <span className="block text-[10px] font-medium text-ink-400">{hint}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LayananStrip
