'use client'

import React from 'react'
import { Navbar } from '../component/Navbar'

export default function page () {
  return (
    <div className='w-full h-screen'>
        <Navbar />
        <div className='sm:pt-36 lg:pt-32 font-[Teko] px-4'>
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
          <div className='w-full h-[500px] flex flex-col sm:-mt-20 lg:-mt-0 md:flex-row'>
            <div className='order-1 sm:order-0 w-[150vw] sm:w-[30vw] md:w-full  text-wrap flex flex-col  items-center justify-center  mb-8 pl-9 text-7xl sm:text-4xl lg:text-5xl'>
              <div className='flex flex-col w-full md:-mt-80 lg:mt-0'>
              <h1>Hello👋</h1>
              <h1>I'm a front-end developer working in Goa, India </h1>
              </div>
            </div>
            <div className='pl-[30vh] md:pl-0 sm:order-1 lg:pl-[300px] -mt-36 sm:-mt-80 md:-mt-20 lg:-mt-0 flex justify-center tracking-tight -space-x-2 lg:leading-none lg:-space-x-5'>
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
