import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

function WeAre() {
  return (
    <section className='max-w-screen-xl mx-auto h-[70vh] flex place-items-center px-4 md:px-0 my-10 md:my-0'>
        <div className='grid grid-cols-1 md:grid-cols-2   justify-between text-start'>
            <div className='place-self-center bg-blue-50 pr-4 py-10 pl-10'>
                <h3 className='uppercase text-blue-600 font-bold '>Siapa Kami?</h3>
                <h4 className='text-blue-900 font-bold text-2xl'>Kami merupakan usaha laundry kiloan yang bertempat di yogyakarta.</h4>
                <h5 className='text-gray-600 text-[18px] my-4'>Kami menyediakan solusi yang mudah untuk membersihkan pakaian yang rekan-rekan gunakan.</h5>
                <a href='https://wa.me/62896363324517' target='_blank' className='py-3 px-14 inline-flex gap-x-4 place-items-center bg-blue-600 text-white rounded-lg hover:bg-blue-900'>
                        <span>
                        Pesan Sekarang
                        </span>
                        <FaArrowRight/>
                    </a>
            </div>
            <div className='place-selft-center'>
                <img src='https://harmonylaundry.my.id/assets/img/laundry-2.jpg'  className='shadow-2xl rounded-2xl'/>
            </div>
        </div>
        
    </section>
  )
}

export default WeAre