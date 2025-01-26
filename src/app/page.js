'use client';

import React, { useEffect } from 'react';
import Home from './Home/page';
import LocomotiveScroll from 'locomotive-scroll';
import Cursor from './component/Cursor';

export default function Page() {

    useEffect(() => {
        if (typeof window !== "undefined") { 
            const locomotiveScroll = new LocomotiveScroll();
            return () => {
                locomotiveScroll.destroy();
            };
        }
    }, []);

    return (
        <div className='w-full h-full'>
            <Cursor />
            <div>
                <Home />
            </div>
        </div>
    );
}
