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

async function getBlogData(){
    const fileDir = fs.readdirSync('public/img/')
    return fileDir
}

function Pesanan({params}) {
   const {pesanId} = params

   console.log(getBlogData());
  return (
    <main>
        <DetailPesan pesanId={pesanId} />
    </main>
  )
}

export default Pesanan