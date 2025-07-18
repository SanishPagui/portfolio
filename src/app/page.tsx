import About from '@/components/About'
import Home from '@/components/Home'
import Projects from '@/components/Projects'
import React from 'react'

const page = () => {
  return (
    <div className=''>
      <div className='sticky top-0'>
        <Home />
      </div>
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black/50 z-10' />
      <div className='relative h-screen'>
        <Projects />
      </div>
    </div>
  )
}

export default page