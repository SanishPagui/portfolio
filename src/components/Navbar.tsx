'use client'

import React, { useLayoutEffect, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Link from 'next/link';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);
    const t2 = useRef<gsap.core.Timeline | null>(null);


    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
        
            gsap.fromTo('.letter', {
                opacity: 0,
            }, {
                opacity: 1,
                stagger: .1,
                duration: 1,
            });

        
            tl.current = gsap.timeline({ paused: true });

        
            tl.current
                .to('.animate-menu-2', {
                    opacity: 0,
                    duration: 0.7,
                    ease: 'power3.inOut',
                })
                .to('.animate-menu-1', {
                    rotate: 45,
                    y: 6,
                    duration: 1,
                    ease: 'power3.inOut',
                }, '<')
                .to('.animate-menu-3', {
                    rotate: -45,
                    y: -6,
                    duration: 1,
                    ease: 'power3.inOut',
                }, '<');

            t2.current = gsap.timeline({ paused: true });

            t2.current.fromTo('.mobile-menu', {
                x: '100%',
                duration: 0.5,
            } , {
                x: '0%',
                duration: 0.5,
            }, '<')
            .fromTo('.mobile-menu-items',{
                opacity: 0,
                x: '15%',
                duration: 0.3,
            } , {
                opacity: 1,
                x: '0%',
                stagger: .1,
                duration: 0.3,
            }, '<')

            const desktopItems =  gsap.utils.toArray('.desktop-item')

            desktopItems.forEach((item: any) => {
                const underline = item.querySelector('.underline')

                const hoverAnimation = gsap.fromTo(underline,{
                    scaleX: 0,
                    
                } , {
                    scaleX: 1,
                    duration: 0.3,
                    ease: 'power3.inOut',
                    paused: true,
                })

                item.animation = hoverAnimation;

                item.addEventListener('mouseenter', () => item.animation.play());
                item.addEventListener('mouseleave', () => {item.animation.reverse()})
            })

        }, navRef);

        return () => ctx.revert();
    }, []);


    useEffect(() => {
        if (tl.current) {
            if (isOpen) {
                tl.current.play();
                t2.current?.play();
            } else {
                tl.current.reverse();
                t2.current?.reverse();
            }
        }
    }, [isOpen]);
    


    const list = [
        {name : 'Home', link: '/'},
        {name : 'Projects', link : '/projects'},
        {name : 'About', link : '/about'},
        {name : 'Contact', link : '/contact'}
    ]

    const displayLetters = (text: string, definedClassName: string) => {
        return text.split('').map((letter, index) => {
            return (
                <div key={index} className={`${definedClassName}`}>
                    {letter === ' '? "\u00A0" : letter}
                </div>
            )
        })
    }

    const handleClick = () =>{
        setIsOpen(!isOpen)
    }

  return (
    <div ref={navRef} className='fixed w-full h-24  px-3 p-5 lg:p-9 text-black text-md '>
        <div className=' flex items-center justify-between  h-full'>
            <div className='flex text-2xl font-semibold md:text-3xl lg:text-4xl tracking-tighter'>
                {displayLetters('SANISH PAGUI', 'letter')}
            </div>
            <div className='  hidden md:flex space-x-7 text-xl lg:text-2xl'>
                {list.map((item, index) => (
                    <div key={index} className='desktop-item relative cursor-pointer'>
                        {item.name} 
                        <div className='underline absolute bg-black h-[.3px] w-full'></div>
                    </div>
                ))}
            </div>

            <div onClick={handleClick} className='z-50 space-y-1 cursor-pointer md:hidden'>
                <div className={`animate-menu-1 h-[2px] bg-black w-6`}></div>
                <div className={`animate-menu-2 h-[2px] bg-black w-6`}></div>
                <div className={`animate-menu-3 h-[2px] bg-black w-6`}></div>
            </div>

            <div ref={mobileMenuRef} className={`mobile-menu md:hidden inline-block w-full bg-white top-0 left-0 space-y-10 h-screen absolute  ${isOpen ? 'flex' : ''}`}>
                {list.map((item, index) => (
                    <div key={index} className='mobile-menu-items desktop-item relative cursor-pointer flex flex-col items-center justify-center mt-32'>
                        <div className='desktop-item relative inline-block cursor-pointer'>
                            <Link href={item.link} className='text-2xl font-semibold '>{item.name}</Link>
                            <div className='underline absolute bottom-0 w-full bg-black h-[.3px] '></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
    </div>
  )
}

export default Navbar