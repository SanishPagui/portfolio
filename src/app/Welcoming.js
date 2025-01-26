'use client'

import React, { useEffect, useState } from 'react'
import { motion, useAnimation, useInView } from "motion/react"



export const Welcoming = () => {

  return (
    <div
        className='box w-full h-screen bg-cyan-600 flex overflow-hidden  '
    >
        <div className='w-full h-32 flex bg-emerald-700 space-x-7 items-center text-nowrap'>
            <motion.h1 
                className='text-white text-4xl'
                initial ={{x: 0}}
                animate={{ x:  "-100%"}}
                transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
                >Welcome To My Portfolio</motion.h1>
            <motion.h1 
                className='text-white text-4xl'
                initial ={{x: 0}}
                animate={{ x:  "-100%"}}
                transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
                >Welcome To My Portfolio</motion.h1>
            <motion.h1 
                className='text-white text-4xl'
                initial ={{x: 0}}
                animate={{ x:  "-100%"}}
                transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
                >Welcome To My Portfolio</motion.h1>
            <motion.h1 
                className='text-white text-4xl'
                initial ={{x: 0}}
                animate={{ x:  "-100%"}}
                transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
                >Welcome To My Portfolio</motion.h1>
            <motion.h1 
                className='text-white text-4xl'
                initial ={{x: 0}}
                animate={{ x:  "-100%"}}
                transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
                >Welcome To My Portfolio</motion.h1>
            <motion.h1 
                className='text-white text-4xl'
                initial ={{x: 0}}
                animate={{ x:  "-100%"}}
                transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
                >Welcome To My Portfolio</motion.h1>
        </div>
    </div>
  )
}
