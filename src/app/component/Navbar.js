import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import gsap from 'gsap';

export const Navbar = () => {

  useEffect(() => {
    gsap.from('.letter', {
      opacity: 0,
      duration: 1,
      stagger: 0.1, 
    });
  }, []);

  const handleMouseEnter = () => {
    gsap.to('.fade-letter', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)',
      opacity: 0,
      duration: 0.5,
    });

    gsap.to('.txt-1 .letter:first-child', {
      transform: 'translateX(250%)', 
      duration: 1,
      ease: 'power2.out',
      delay: 0.4,
    });

    gsap.to('.txt-2 .letter:first-child', {
      transform: 'translateX(-250%)', 
      duration: 1,
      ease: 'power2.out',
      delay: 0.4,
    });
  };

  const handleMouseLeave = () => {
    gsap.to('.fade-letter', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      opacity: 1,
      duration: 0.5,
    });

    
    gsap.to('.txt-2 .letter:first-child', {
      transform: 'translateX(0%)', 
      duration: 1,
      ease: 'power2.out',
    });

    
    gsap.to('.txt-1 .letter:first-child', {
      transform: 'translateX(0%)', 
      duration: 1,
      ease: 'power2.out',
    });
  };

  return (
    <div className='fixed w-full h-32 flex justify-between items-center'>
      <div className=''>
        <h1 className='text-5xl ml-10 flex font-[Teko]  ' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className='txt-1 flex font-bold tracking-tight'>
            <div className='letter '>S</div>
            <div className='letter fade-letter'>A</div>
            <div className='letter fade-letter'>N</div>
            <div className='letter fade-letter'>I</div>
            <div className='letter fade-letter'>S</div>
            <div className='letter fade-letter'>H</div>
          </div>
          <div className='txt-2 flex pl-1 font-bold tracking-tighter'>
            <div className='letter '>P</div>
            <div className='letter fade-letter'>A</div>
            <div className='letter fade-letter'>G</div>
            <div className='letter fade-letter'>U</div>
            <div className='letter fade-letter'>I</div>
          </div>
        </h1>
      </div>
      <div>
        <ul className='flex space-x-7 text-2xl'>
          <Link href={'/'}><li className='hover:underline'>Home</li></Link>
          <Link href={'/About'}><li className='hover:underline'>About</li></Link>
          <Link href={'#'}><li className='hover:underline'>Contact</li></Link>
        </ul>
      </div>
    </div>
  );
};
