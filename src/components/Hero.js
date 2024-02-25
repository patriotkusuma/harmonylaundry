'use client'
import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Element } from 'react-scroll';

function Hero() {
    return (
        <Element name='hero1' className='xl:h-[100vh] lg:h-[90vh] place-self-center flex bg-[url("/img/hero-bg.png")] bg-fixed py-16 md:py-0 '>
            <div className='max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 place-self-center gap-10 px-5 xl:px-0 md:px-2'>

                
                <div className='place-self-center h-100  '>
                    <h1 className='text-4xl lg:text-5xl font-bold text-blue-900 mb-10 '>Kami menyediakan solusi untuk kebersihan pakaian anda.</h1>
                    <a href='https://wa.me/62895363324517' target='_blank' className='py-3 px-14 inline-flex gap-x-4 place-items-center bg-blue-600 text-white rounded-lg hover:bg-blue-900'>
                        <span>
                        Pesan Sekarang
                        </span>
                        <FaArrowRight/>
                    </a>
                </div>
                <div className='place-self-center order-first lg:order-last mt-4 xl:mt-0'>
                    <img src='/img/thumb-hero.png' alt="Harmony Laundry" className='w-full shadow-xl rounded-2xl'/>
                </div>
            </div>

                

        </Element>

    )
}

export default Hero