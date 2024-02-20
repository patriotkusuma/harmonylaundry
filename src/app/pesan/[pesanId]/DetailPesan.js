'use client'
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

function DetailPesan(props) {
  const {pesanId} = props
  const [pesanan, setPesanan] = useState(null)

  const getPesanan =  async() => {
    try {
      var res = await axios.get(`https://admin.harmonylaundry.my.id/api/pesan/${pesanId}`)

      setPesanan(res.data.data.pesanan)
      return res.data
    }catch(err){
      console.log(err);
    }
  } 

    useEffect(()=> {
      if(pesanan == null){
        getPesanan()
      }
    },[])

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
            <div> Nomor : <strong> {pesanan.kode_pesan}</strong></div>
            <div>Masuk : <strong>{moment(pesanan.tanggal_pesan).format('H:m , DD MMMM YYYY')}</strong></div>
            <div>Selesai : <strong>{moment(pesanan.tanggal_selesai).format('H:m , DD MMMM YYYY')}</strong></div>
          </div>
          <div class="mb-2">
              <div class="text-gray-700">Nama :  
                <strong>{pesanan.customer.nama}</strong>
              </div>
              <div class="text-gray-700">
                Telp / Wa :  
                <strong>{pesanan.customer.telpon}</strong>
              </div>
          </div>
          <hr className="mb-2" />
          <table class="w-full mb-8">
              <tbody>
                  {pesanan.detail_pesanan.map((detail,index) => {
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
                      <td class="text-right font-bold text-gray-700">{(new Intl.NumberFormat('id-id', {style:'currency', currency: 'IDR'}).format(pesanan.total_harga))}</td>
                  </tr>
              </tfoot>
          </table>
    <div class="text-gray-700 mb-2">Terima Kasih !</div>
    <div class="text-gray-700 text-sm">Tetap semangat, semoga sehat selalu. 😊</div>

          <div className={"absolute top-2 right-[-35px] rotate-45 px-10 py-2 text-center  bg-red-700 text-white "}>
            
            {pesanan.status_pembayaran}
          </div>

        </div>
      </div>
      )}

    </section>
  );
}

export default DetailPesan;
