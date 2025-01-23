'use client'

import React from 'react';
import Home from './Home/page';
import LocomotiveScroll from 'locomotive-scroll';
import Cursor from './component/Cursor';


export default function page() {

    const locomotiveScroll = new LocomotiveScroll();

    return (
        <div className='w-full h-full view'>
            <Cursor />
            <Home />
        </div>
    );
}
