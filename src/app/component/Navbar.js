import React from 'react'
import Link from 'next/link';
import { motion } from "framer-motion"

export const Navbar = () => {
  return (
    <div className='fixed w-full h-32 flex justify-center items-center'>
        <div>
            <ul className='flex space-x-7 text-2xl '>
                <Link href={'/Home'}><motion.li whileHover={{}} className='hover:underline'>Home</motion.li></Link>
                {/* <Link href={'#'}><motion.li whileHover={{ }} className='hover:underline'>Services</motion.li></Link> */}
                <Link href={'/About'}><motion.li whileHover={{ }} className='hover:underline'>About</motion.li></Link>
                <Link href={'#'}><motion.li whileHover={{ }} className='hover:underline'>Contact</motion.li></Link>
            </ul>
        </div>
    </div>
  )
}
