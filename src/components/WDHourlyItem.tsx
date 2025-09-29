"use client";
//Components
import Image from 'next/image';
import type { HourlyForecast } from '@/types/types';
//Bootstrap
import { Container } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

export default function WDHourlyItem({ img, imgAlt, time, temp }: HourlyForecast) {
    return(
        <Container className='d-flex align-items-center border'>
            <Image 
                src={img}
                alt={imgAlt}
                width={35}
                height={35}
            />
            <h3 className='m-0 w-100 h5'>{time}</h3>
            <h4 className='m-0 h6'>{temp}°</h4>
        </Container>
    );
}