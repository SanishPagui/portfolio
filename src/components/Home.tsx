'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Home = () => {

    const homeRef = useRef<HTMLDivElement>(null)

    useEffect (() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.letter', {
                opacity: 0,
            } , {
                opacity: 1,
                duration: 1,
                stagger: .1,
                ease: 'power3.inOut',
            })
        }, homeRef)   

        return () => ctx.revert()
    }, [])


    const displayLetter = (text: string, baseClassName: string) => {
        return text.split('').map((letter, index) => {
            return (
                <div key={index} className={`${baseClassName}`}>
                    {letter === ' ' ? '\u00A0' : letter}
                </div>
            )
        })
    }

  return (
    <div ref={homeRef} className='h-screen w-full z-0'>
        <div className='flex w-full h-full items-center justify-center text-9xl'>
            {displayLetter('SANISH PAGUI', 'letter')}
        </div>
    </div>
  )
}

export default Home