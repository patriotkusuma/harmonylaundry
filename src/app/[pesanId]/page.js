import DetailPesan from "./DetailPesan";

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
        }
    }
}

function Pesanan({params}) {
   const {pesanId} = params
  return (
    <main>
        <DetailPesan pesanId={pesanId} />
    </main>
  )
}

export default Pesanan