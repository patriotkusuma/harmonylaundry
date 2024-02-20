import React from 'react'
import { PiInstagramLogo, PiTiktokLogo } from 'react-icons/pi'

function Footer() {
  return (
    <footer className=' bg-[url("https://harmonylaundry.my.id/assets/img/footer-bg.png")]   bg-no-repeat bg-right py-20 px-4 xl:px-0'>
        <div className='max-w-screen-xl mx-auto flex flex-col align-middle justify-center gap-y-2 '>
            <div className='inline-flex items-center'>
                <img src='/img/logo.png' alt='Harmony Logo' className='h-[48px]' />
                <h3 className='text-3xl font-bold text-blue-800'>Harmony Laundry</h3>
            </div>
            <p className='text-gray-600'>Harmony Laundry Solve Your Cleaning Problem.</p>
            <div className='inline-flex items-center gap-x-2'>
                <a href='https://www.tiktok.com/@harmonylaundry'
                target='_blank'
                className='text-gray-500 hover:text-gray-900'
                >
                    <PiTiktokLogo className='text-[36px]'/>
                </a>
                <a href='https://www.instagram.com/harmonylaundry.my.id/'
                target='_blank'
                className='text-gray-500 hover:text-gray-900'
                >
                    <PiInstagramLogo className='text-[36px]'/>
                </a>

            </div>
        </div>


    </footer>
  )
}

export default Footer