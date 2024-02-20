'use client'
import React from 'react'
import { BiArrowToTop } from 'react-icons/bi'
import {animateScroll as scroll} from 'react-scroll'

function TopBotton() {
    const scrollTop = () => {
        scroll.scrollToTop()
    }

  return (
    <div onClick={scrollTop} className='fixed right-5 bottom-5 md:right-10 md:bottom-10 z-20 p-2 rounded-lg cursor-pointer hover:bg-blue-900 duration-500 ease-in-out hover:scale-105 hover:shadow-xl bg-blue-600 text-white'>
        <BiArrowToTop className='text-xl'/>
    </div>
  )
}

export default TopBotton