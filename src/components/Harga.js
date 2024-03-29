'use client'
import React from 'react'
import { Element } from 'react-scroll'

function Harga() {
  return (
    <Element name='hero3' className='max-w-screen-xl mx-auto py-10 mb-5 flex flex-col gap-y-4 px-4 lg:px-0 my-20 xl:my-0'>
        <div className='flex flex-col items-center'>
            <h3 className='text-blue-600 uppercase font-bold'>Harga</h3>
            <h4 className='text-blue-900 font-bold md:text-4xl text-2xl'>Harga Laundry Kami</h4>
        </div>
        <div className='relative'>
        <div class="absolute top-10 left-20 w-[80%] h-[100%] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-x-8 gap-y-4 lg:gap-x-4 relative'>
            
            <div className='shadow-lg rounded-3xl p-12 lg:px-6 text-center hover:shadow-2xl duration-500 ease-in-out bg-white flex flex-col gap-y-8 text-gray-500 md:text-lg md:hover:scale-105 cursor-pointer'>
                <div >

                    <h3 className='font-bold text-teal-600 text-xl'>Regular</h3>
                    <h4 className='text-2xl my-1'>Mulai Dari</h4>
                    <div className='font-extrabold text-3xl flex gap-x-1 justify-center text-black'>
                        <span className='text-xl text-gray-500'>Rp</span>
                        4.000
                        <span className='text-xl text-gray-500'> / Kg</span>

                    </div>
                </div>
                <div className='flex flex-col gap-y-2'>

                    <img src='/img/paket/kiloan.png' alt='Regular'/>
                    <h5 className='text-[16px]'>Setrika Rp 4.000</h5>
                    <h5 className='text-[16px]'>Cuci Lipat Rp 4.000</h5>
                    <h5 className='text-[16px]'>Cuci Setrika Rp 5.000</h5>
                    <h5 className='text-[16px]'>Pengerjaan 2 Hari</h5>
                    <h5 className='text-[16px]'>Gratis Pickup & Delivery *</h5>
                </div>
                <a href='https://wa.me/62895363324517' target='_blank' className='py-2 border-blue-600 border rounded-3xl hover:bg-blue-600 hover:text-white duration-500 ease-in-out'>
                    Pesan Sekarang

                </a>



            </div>
            <div className='shadow-lg rounded-3xl p-12 lg:px-6 text-center hover:shadow-2xl duration-500 ease-in-out bg-white flex flex-col gap-y-8 text-gray-500 md:text-lg md:hover:scale-105 cursor-pointer'>
                <div >

                <h3 className='font-bold text-green-600 text-xl'>Express</h3>
                <h4 className='text-2xl my-1'>Mulai Dari</h4>
                <div className='font-extrabold text-3xl flex gap-x-1 justify-center text-black'>
                    <span className='text-xl text-gray-500'>Rp</span>
                    5.000
                    <span className='text-xl text-gray-500'> / Kg</span>

                </div>
                </div>
                <div className='flex flex-col gap-y-2'>

                <img src='/img/paket/dry-clean.png' alt='Regular'/>
                    <h5 className='text-[16px]'>Setrika Rp 5.000</h5>
                    <h5 className='text-[16px]'>Cuci Lipat Rp 5.000</h5>
                    <h5 className='text-[16px]'>Cuci Setrika Rp 7.000</h5>
                    <h5 className='text-[16px]'>Pengerjaan 1 Hari</h5>
                    <h5 className='text-[16px]'>Gratis Pickup & Delivery *</h5>
                </div>
                <a href='https://wa.me/62895363324517' target='_blank' className='py-2 border-blue-600 border rounded-3xl hover:bg-blue-600 hover:text-white duration-500 ease-in-out'>
                    Pesan Sekarang

                </a>



            </div>
            <div className='shadow-lg rounded-3xl p-12 lg:px-6 text-center hover:shadow-2xl duration-500 ease-in-out bg-white flex flex-col gap-y-8 text-gray-500 md:text-lg md:hover:scale-105 cursor-pointer'>
                <div >

                <h3 className='font-bold text-yellow-600 text-xl'>Satuan</h3>
                <h4 className='text-2xl my-1'>Mulai Dari</h4>
                <div className='font-extrabold text-3xl flex gap-x-1 justify-center text-black'>
                    <span className='text-xl text-gray-500'>Rp</span>
                    3.000
                    <span className='text-xl text-gray-500'> / Kg</span>

                </div>
                </div>
                <div className='flex flex-col gap-y-2'>

                <img src='/img/paket/satuan.png' alt='Regular'/>
                <h5 className='text-[16px]'>Selimut</h5>
                <h5 className='text-[16px]'>Bed Cover</h5>
                <h5 className='text-[16px]'>Boneka</h5>
                <h5 className='text-[16px]'>Jaz</h5>
                <h5 className='text-[16px]'>dan Lainnya</h5>
                
                </div>
                <a href='https://wa.me/62895363324517' target='_blank' className='py-2 border-blue-600 border rounded-3xl hover:bg-blue-600 hover:text-white duration-500 ease-in-out'>
                    Pesan Sekarang

                </a>



            </div>
            <div className='shadow-lg rounded-3xl p-12 lg:px-6 text-center hover:shadow-2xl duration-500 ease-in-out bg-white flex flex-col gap-y-8 text-gray-500 md:text-lg md:hover:scale-105 cursor-pointer'>
                <div >

                <h3 className='font-bold text-purple-800 text-xl'>Sepatu</h3>
                <h4 className='text-2xl my-1'>Mulai Dari</h4>
                <div className='font-extrabold text-3xl flex gap-x-1 justify-center text-black'>
                    <span className='text-xl text-gray-500'>Rp</span>
                    20.000
                    <span className='text-sm font-thin text-gray-500'> / Pasang</span>

                </div>
                </div>
                <div className='flex flex-col gap-y-2'>

                <img src='/img/paket/sepatu.png' alt='Regular'/>
                <h5 className='text-[16px]'>Fast Clean Rp 20.000</h5>
                <h5 className='text-[16px]'>Deep Clean Rp 30.000 - Rp 40.000</h5>
                <h5 className='text-[16px]'>Pengerjaan 1 - 3 Hari</h5>
                <h5 className='text-[16px]'>Gratis Pickup & Delivery</h5>
                
                </div>
                <a href='https://wa.me/62895363324517' target='_blank' className='py-2 border-blue-600 border rounded-3xl hover:bg-blue-600 hover:text-white duration-500 ease-in-out'>
                    Pesan Sekarang

                </a>



            </div>
           
            
        </div>
        </div>

        

    </Element>
  )
}

export default Harga