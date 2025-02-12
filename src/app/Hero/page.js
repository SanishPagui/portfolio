'use client'

import React from 'react'
import { Navbar } from '../component/Navbar'

export default function page () {
  return (
    <div className='w-full h-screen'>
        <Navbar />
        <div className='lg:pt-32 font-[Teko] px-4'>
          <div className=' w-full h-[500px] flex items-strech justify-start pl-5'>
            <div className='flex h-full tracking-tight -space-x-2 lg:-space-x-5 items-center lg:pt-32'> 
              <div className='text-[200px] lg:text-[500px]'>S</div>
              <div className='text-[200px] lg:text-[500px]'>A</div>
              <div className='text-[200px] lg:text-[500px]'>N</div>
              <div className='text-[200px] lg:text-[500px]'>I</div>
              <div className='text-[200px] lg:text-[500px]'>S</div>
              <div className='text-[200px] lg:text-[500px]'>H</div>
              <div className='text-[200px] lg:text-[500px]'>'</div>
              <div className='text-[200px] lg:text-[500px]'>S</div>
            </div>
          </div>
          <div className='w-full h-[500px] flex flex-col md:flex-row'>
            <div className='order-1 md:order-0 w-[150vw] lg:w-full text-wrap flex flex-col  items-center justify-center  mb-8 pl-9 text-7xl md:text-4xl'>
              <div className='flex flex-col w-full '>
              <h1>Hello👋</h1>
              <h1>I'm a front-end developer working in Goa, India </h1>
              </div>
            </div>
            <div className='pl-[30vh] lg:pl-[300px] -mt-36 flex justify-center tracking-tight -space-x-2 lg:leading-none lg:-space-x-5'>
              <div className='lg:-mt-12 text-[200px] lg:text-[500px]'>P</div>
              <div className='lg:-mt-12 text-[200px] lg:text-[500px]'>O</div>
              <div className='lg:-mt-12 text-[200px] lg:text-[500px]'>R</div>
              <div className='lg:-mt-12 text-[200px] lg:text-[500px]'>T</div>
              <div className='lg:-mt-12 text-[200px] lg:text-[500px]'>F</div>
              <div className='lg:-mt-12 text-[200px] lg:text-[500px]'>O</div>
              <div className='lg:-mt-12 text-[200px] lg:text-[500px]'>L</div>
              <div className='lg:-mt-12 text-[200px] lg:text-[500px]'>I</div>
              <div className='lg:-mt-12 text-[200px] lg:text-[500px]'>O</div>
            </div>
          </div>
        </div>
    </div>
  )
}
