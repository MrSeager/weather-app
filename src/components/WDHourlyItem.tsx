"use client";
import { useState } from 'react';
//Components
import Image from 'next/image';
import type { HourlyForecast } from '@/types/types';
import { useHover } from './anim';
//Spring
import { animated } from '@react-spring/web';

export default function WDHourlyItem({ img, imgAlt, time, temp }: HourlyForecast) {
    const [hovered, setHovered] = useState<boolean>(false);

    const hoverAnim = useHover(hovered, 1.05);
    
    return(
        <animated.div 
            style={hoverAnim}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className='container d-flex align-items-center cs-bg-thr border border-secondary rounded-3 py-2 px-2'
        >
            <Image 
                src={img}
                alt={imgAlt}
                width={35}
                height={35}
            />
            <h3 className='m-0 w-100 h5'>{time}</h3>
            <h4 className='m-0 h6'>{temp}°</h4>
        </animated.div>
    );
}