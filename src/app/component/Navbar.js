import { useEffect } from 'react';
import Link from 'next/link';
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
      scaleY: 0,
      transfoemOrigin: 'center',
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)',
      duration: 0.5,
      ease: 'power2.out',
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

  const handleUnderlineEnter = (e) => {
    const underline = e.target.querySelector('.underline');
    if (underline) {
      gsap.to(underline, {
        scaleX: 1,
        transformOrigin: 'bottom left',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        startAt: {
          scaleX: 0,
          transformOrigin: 'bottom left',
        },
      });
    }
  };

  const handleUnderlineLeave = (e) => {
    const underline = e.target.querySelector('.underline');
    if (underline) {
      gsap.to(underline, {
        scaleX: 0,
        transformOrigin: 'bottom left',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        startAt: {
          scaleX: 1,
          transformOrigin: 'bottom right',
        },
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to('.fade-letter', {
      scaleY: 1,
      transfoemOrigin: 'center',
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 0.5,
      ease: 'power2.out',
      delay: .45,
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
        <h1 className='text-5xl ml-10 flex font-[Teko]' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
        <ul className='flex space-x-9 text-2xl mr-16'>
          <Link href={'/About'} onMouseEnter={handleUnderlineEnter} onMouseLeave={handleUnderlineLeave}>
            <li className='relative flex flex-col' >
              About
              <span className='underline absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 opacity-0'></span>
            </li>
          </Link>
          <Link href={'#'} onMouseEnter={handleUnderlineEnter} onMouseLeave={handleUnderlineLeave}>
            <li className='relative flex flex-col ' >
              Contact
              <span className='underline absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 opacity-0'></span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
