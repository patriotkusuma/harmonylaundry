'use client'
import Aos from 'aos'
import React, { useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Element } from 'react-scroll'

function WeAre() {
  useEffect(()=>{
    Aos.init()
  })
  return (
    <Element name='hero2' className='max-w-screen-xl mx-auto lg:h-[70vh] flex place-items-center px-4 xl:px-0 my-10 lg:my-0'>
        <div className='grid grid-cols-1 lg:grid-cols-2   justify-between text-start'>
            <div data-aos="fade-right" className='place-self-center bg-blue-50 pr-4 py-10 pl-10'>
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
            <div data-aos="fade-left" className='place-selft-center'>
                <img src='/img/laundry-2.jpg'  className='shadow-2xl rounded-2xl' alt='harmony we are'/>
            </div>
        </div>
        
    </Element>
  )
}

export default WeAre