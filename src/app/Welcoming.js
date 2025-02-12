'use client'

import React, { useEffect } from 'react'
import gsap from 'gsap'

export const Welcoming = () => {
    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1 })
        
        tl.to(".carousel-container", {
            duration: 5, 
            x: "-20.1%",
            ease: "linear",
            repeat: -1,
        })
    }, [])

    const carouselText = "Welcome To My Website"

    return (
        <div className='w-full h-full overflow-hidden'>
            <div className='bg-black h-1 w-full'></div>
            <div className='w-full h-[8vh] flex overflow-hidden'>
                <div className='carousel-container flex items-center space-x-14'>
                    {[...Array(15)].map((_, index) => (
                        <h1 
                            key={index} 
                            className='text-6xl font-bold font-[Teko] whitespace-nowrap'
                        >
                            {carouselText}
                        </h1>
                    ))}
                </div>
            </div>
            <div className='bg-black h-1 w-full'></div>
                
            <div className='w-full h-[82.6vh] '></div>

            <div className='bg-black h-1 w-full'></div>
            <div className='w-full h-[8vh] flex overflow-hidden relative'>
                <div className='carousel-container flex items-center space-x-14'>
                    {[...Array(15)].map((_, index) => (
                        <h1 
                            key={index} 
                            className='text-6xl font-bold font-[Teko] whitespace-nowrap'
                        >
                            {carouselText}
                        </h1>
                    ))}
                </div>
            </div>
            <div className='bg-black h-1 w-full'></div>
        </div>
    )
}