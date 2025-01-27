'use client'

import React from 'react'
import { Navbar } from '../component/Navbar'

export default function page () {
  return (
    <div className='w-full h-screen'>
        <Navbar />
        <div className='pt-32 font-[Teko]'>
          <div className=' w-full h-[500] flex items-strech justify-start pl-5'>
            <div className='flex h-full tracking-tighter -space-x-5 items-center pt-32'> 
              <div className=' text-[500px]'>S</div>
              <div className=' text-[500px]'>A</div>
              <div className=' text-[500px]'>N</div>
              <div className=' text-[500px]'>I</div>
              <div className=' text-[500px]'>S</div>
              <div className=' text-[500px]'>H</div>
            </div>
            {/* <div className='flex pl-5 h-full tracking-tighter'>
              <div className='pt-36 text-[350px]'>P</div>
              <div className='pt-36 text-[350px]'>A</div>
              <div className='pt-36 text-[350px]'>G</div>
              <div className='pt-36 text-[350px]'>U</div>
              <div className='pt-36 text-[350px]'>I</div>
            </div> */}
          </div>
          <div className='w-full h-[500px] flex '>
            <div className=' w-full text-wrap flex flex-col  items-center justify-center mb-8 pl-9 text-4xl'>
              <div className='flex w-full '>
              Hello👋
              </div>
              I'm a front-end developer working in Goa, India 
            </div>
            <div className='pl-[300px] flex justify-center tracking-tighter leading-none -space-x-5'>
              <div className='-mt-12 text-[500px]'>P</div>
              <div className='-mt-12 text-[500px]'>O</div>
              <div className='-mt-12 text-[500px]'>R</div>
              <div className='-mt-12 text-[500px]'>T</div>
              <div className='-mt-12 text-[500px]'>F</div>
              <div className='-mt-12 text-[500px]'>O</div>
              <div className='-mt-12 text-[500px]'>L</div>
              <div className='-mt-12 text-[500px]'>I</div>
              <div className='-mt-12 text-[500px]'>O</div>
            </div>
          </div>
        </div>
    </div>
  )
}
