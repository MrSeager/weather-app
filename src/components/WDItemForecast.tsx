"use client";
import { useState } from 'react';
//Components
import Image from 'next/image';
import type { DailyForecast } from '@/types/types';
import { useHover } from './anim';
//Bootstrap
import { Container } from 'react-bootstrap';
//Spring
import { animated } from '@react-spring/web';

export default function WDItemForecast({ day, img, imgAlt, tmpOne, tmpTwo }: DailyForecast) {
    const [hovered, setHovered] = useState<boolean>(false);

    const hoverAnim = useHover(hovered, 1.07);
    
    return (
        <animated.div 
            style={hoverAnim}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className='container forecast-item border border-secondary cs-bg-sec py-2 rounded-3 d-flex flex-column align-items-center'
        >
            <h3 className='h5'>{day}</h3>
            <Image
                src={img}
                alt={imgAlt}
                width={75}
                height={75}
            />
            <Container className='px-0 d-flex align-items-center justify-content-between'>
                <h3 className='h5'>{tmpOne}°</h3>
                <h3 className='h5'>{tmpTwo}°</h3>
            </Container>
        </animated.div>
    );
}