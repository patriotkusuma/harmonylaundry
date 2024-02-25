import BayarQris from "./BayarQris";
import DetailPesan from "./DetailPesan";
import fs from 'fs';

export async function generateMetadata({params, searchParams}, parent) {
    const pesanId = params.pesanId

    return {
        title: `Detail Pesanan ${pesanId} | Harmony Laundry`,
        description: `Menampilkan detail pesanan dari kode pesanan ${pesanId} | Harmony Laundry` ,
        icons: {
            icon: 'https://harmonylaundrys.com/img/logo.png'
        },
        alternates: {
            canonical: `https://harmonylaundrys.com/${pesanId}`
        },
        metadataBase: new URL('https://harmonylaundrys.com'),

    }
}


function Pesanan({params}) {
   const {pesanId} = params

  return (
    <main className="mt-16 flex gap-6 flex-col md:flex-row">
        <DetailPesan pesanId={pesanId} />
        <BayarQris />
    </main>
  )
}

export default Pesanan