'use client'

import About from '@/components/About'
import Home from '@/components/Home'
import Projects from '@/components/Projects'
import LocomotiveScroll from 'locomotive-scroll';
import React, {useEffect, useRef} from 'react'

const page = () => {  
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const scroll = new LocomotiveScroll({
        el: containerRef.current as any, 
        smooth: true,
        smartphone: {
          smooth: true,
        },
        tablet: {
          smooth: true,
        },
      });

      return () => {
        scroll.destroy();
      };
    }
  }, []);


  return (
    <div ref={containerRef} className=''>
      <div className=''>
        <Home />
      </div>
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black/50 ' />
      <div className='h-screen'>
        <Projects />
      </div>
    </div>
  )
}

export default page