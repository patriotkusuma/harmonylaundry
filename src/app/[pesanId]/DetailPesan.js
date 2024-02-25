import getDetailPesan from "@/lib/pesanan";
import moment from "moment";
import React from "react";

async function DetailPesan(props) {
  const pesanId = props.pesanId
  const pesanan = await getDetailPesan(pesanId);

  console.log(pesanan)

  const statusCuci = (status) => {
    var color;
    var text;
    switch (status) {
      case 'cuci':
        color = 'bg-red-700 text-white'
        text = 'Sedang di Cuci'
        break;
      case 'selesai' :
        color = 'bg-green-500 text-white'
        text = 'Sudah Selesai'
        break;
    
      case 'diambil':
        color = 'bg-blue-950 text-white'
        text = 'Sudah Diambil'
        break;

      default:
        break;
    }

    return (
      <strong  className={`ml-2 rounded-xl px-2 ${color}`}>
        {text }
      </strong>
    )
  }

  const checkLunas = (statusPembayaran) => {
    var style;
    var text;

    if(statusPembayaran == "Lunas"){
      style = 'absolute top-2 right-[-60px] rotate-45 px-16 py-2 text-center  text-white bg-green-500'
      text = 'Lunas'
    }else{
      style = 'absolute top-[30px] right-[-60px] rotate-45 px-16 py-2 text-center  text-white bg-red-700'
      text = 'Belum Lunas'
    }
    return (
      <div className={style}>
            {text}
        </div>
    )
  }


  return (
    <section className='max-w-screen-lg mx-auto lg:h-[80vh] flex items-start justify-center px-4 xl:px-0 my-2 lg:my-0'>
      {pesanan != null && (

      <div className='flex justify-start items-start'>
        <div className="bg-white border rounded-xl relative overflow-hidden shadow-lg px-6 py-8 max-w-md mx-auto mt-8">
          <h1 className="font-bold text-lg my-4 text-center text-blue-600 flex flex-col">
            Harmony Laundry
            <span>Jln. Candi Gebang, Karangasem, Condongcatur</span>  
            <span>Telp : 0895363324517</span>
          </h1>
          <hr className="mb-2"/>
          <div className="text-gray-700">
            <div> Nomor : <strong> {pesanan.data.pesanan.kode_pesan}</strong></div>
            <div>Masuk : <strong>{moment(pesanan.data.pesanan.tanggal_pesan).format('H:m , DD MMMM YYYY')}</strong></div>
            <div>Selesai : <strong>{moment(pesanan.data.pesanan.tanggal_selesai).format('H:m , DD MMMM YYYY')}</strong></div>
          </div>
          <div class="mb-2">
              <div class="text-gray-700">Nama :  
                <strong>{pesanan.data.pesanan.customer.nama}</strong>
              </div>
              <div class="text-gray-700">
                Telp / Wa :  
                <strong>{pesanan.data.pesanan.customer.telpon}</strong>
              </div>
              <div class="text-gray-700">
                Status :  {statusCuci(pesanan.data.pesanan.status)}
                
              </div>
          </div>
          <hr className="mb-2" />
          <table class="w-full mb-8">
              <tbody>
                  {pesanan.data.pesanan.detail_pesanan.map((detail,index) => {
                    return(
                      <>
                      <tr>
                          <td colSpan={4} class="text-left text-gray-700">{detail.jenis_cuci.category_paket.nama}</td>
                      </tr>
                      <tr>
                          <td colSpan={4} class="text-left text-gray-700">{detail.jenis_cuci.nama}</td>
                      </tr>
                      <tr>
                          <td class="text-left text-gray-700">{detail.qty < 1 ? `${detail.qty * 1000} pcs` : `${detail.qty} kg`}</td>
                          <td class="text-left text-gray-700">x</td>
                          <td class="text-left text-gray-700">{detail.jenis_cuci.harga}</td>
                          <td class="text-right text-gray-700">{(new Intl.NumberFormat('id-id', {style:'currency', currency: 'IDR'}).format(Math.round(detail.total_harga)))}</td>
                      </tr>
                      </>
                    )
                  })}
              </tbody>
              <tfoot>
                  <tr>
                    <td colSpan={4}>
                      <hr/>
                    </td>
                  </tr>
                  <tr>
                      <td colSpan={3} class="text-left font-bold text-gray-700">Total</td>
                      <td class="text-right font-bold text-gray-700">{(new Intl.NumberFormat('id-id', {style:'currency', currency: 'IDR'}).format(pesanan.data.pesanan.total_harga))}</td>
                  </tr>
              </tfoot>
          </table>
    <div class="text-gray-700 mb-2">Terima Kasih !</div>
    <div class="text-gray-700 text-sm">Tetap semangat, semoga sehat selalu. 😊</div>

          {checkLunas(pesanan.data.pesanan.status_pembayaran)}

        </div>
      </div>
      )}

    </section>
  );
}

export default DetailPesan;
