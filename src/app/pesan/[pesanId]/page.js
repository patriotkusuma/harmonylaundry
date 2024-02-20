import DetailPesan from "./DetailPesan";

export async function generateMetadata({params, searchParams}, parent) {
    const pesanId = params.pesanId

    return {
        title: `Detail Pesanan ${pesanId}`,
        description: `Menampilkan detail pesanan dari kode pesanan ${pesanId}`,
        icons: {
            icon: 'https://harmonylaundrys.com/img/logo.png'
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