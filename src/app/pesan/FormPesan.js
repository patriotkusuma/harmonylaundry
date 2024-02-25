'use client'
import React, { useState } from 'react'
import { FaSave, FaWhatsapp } from 'react-icons/fa'

function FormPesan() {
    const [active, setActive] = useState(false);

    const [formData, setFormData] = useState({
        'nama': '',
        'paket': '',
        'layanan': '',
        'alamat': '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })

        if(isNaN(formData[e.target.nama])){
            setActive(false);
        }else{
            setActive(true);
        }
    }

    const submit = () => {
        let number = "62895363324517";

        var message = encodeURI("Hallo kak! Bisa Tolong Pickup ? ") + '%0a%0a'
        message += encodeURI(`Atas Nama : *${formData.nama}* `) + '%0a'
        message += encodeURI(`Paket : *${formData.paket}* `) + '%0a'
        message += encodeURI(`Layanan : *${formData.layanan}*`) + '%0a'
        message += encodeURI(`Alamat : *${formData.alamat}*`) + '%0a%0a'
        message += encodeURI(`Terima Kasih`)

        console.log(message)
        let url = `https://wa.me/${number}`
        url += `?text=${message}&app_absent=0`

        console.log(url)
    }
  return (
    <div className="mt-24 px-6 sm:px-0 shadow-xl max-w-screen-sm min-w-[312px] rounded-2xl bg-white/80 backdrop-blur-xl"> 
        <div className='px-6 py-8'>
            <div className='py-4'>
                <h1 className='text-blue-900 font-bold'>Form Pemesanan Harmony Laundry</h1>
            </div>
            <hr/>
            <div className='py-2 flex flex-col gap-y-2'>
                <label className='text-blud-600 font-light '>Nama *</label>
                <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                    type='text'
                    placeholder='Nama'
                    name='nama'
                    onChange={(e) => {handleChange(e)}}
                />
            </div>  
            <div className='py-2 flex flex-col gap-y-2'>
                <label className='text-blud-600 font-light '>Paket Laundry *</label>
                <select
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    name='paket'
                    onChange={(e) => {handleChange(e)}}

                >
                    <option value="">Pilih Paket</option>
                    <option value="Regular 2 Hari">Regular 2 Hari</option>
                    <option value="Express 1 Hari">Express 1 Hari</option>
                    <option value="Kilat 6 Jam">Kilat 6 Jam</option>
                    <option value="Kilat 4 Jam">Kilat 4 Jam</option>
                </select>
                    
            </div>  
            <div className='py-2 flex flex-col gap-y-2'>
                <label className='text-blud-600 font-light '>Pilih Layanan *</label>
                <select
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    name='layanan'
                    onChange={(e) => {handleChange(e)}}

                >
                    <option value="">Pilih Layanan</option>
                    <option value="Cuci Setrika">Cuci Setrika</option>
                    <option value="Cuci Lipat">Cuci Lipat</option>
                    <option value="Setrika">Setrika</option>
                </select>
                    
            </div>  
            <div className='py-2 flex flex-col gap-y-2'>
                <label className='text-blud-600 font-light '>Alamat *</label>
                <textarea
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    name='alamat'
                    onChange={(e) => {handleChange(e)}}
                    rows={3}

                >
                </textarea>
                    
            </div> 
            <div className='py-2 flex flex-col gap-y-2'>
                <label className='text-blue-600 font-light '>* Mohon Isi Semua Form Setelah itu akan muncul tombol submit</label>
                
                    
            </div> 
           

                <button onClick={()=> {submit()}} type='button' className='my-2 inline-flex items-center align-middle justify-center gap-x-2 bg-green-600 hover:bg-green-800 duration-500 ease-in-out cursor-pointer text-white py-3 w-full rounded-lg'>
                    <FaWhatsapp className='text-lg'/>
                    <span>Pesan</span>
                </button>
                   

        </div>
        
    </div>
  )
}

export default FormPesan