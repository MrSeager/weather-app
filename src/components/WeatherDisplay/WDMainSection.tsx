"use client";
import { useState } from 'react';
//Components
import Image from 'next/image';
import type { City, WeatherData, UnitsProps } from '@/types/types';
import { useHover } from '../anim';
//Bootstrap
import { Row, Col } from 'react-bootstrap';
//Spring
import { animated } from '@react-spring/web';

interface WDMainSectionProps {
    city: City;
    weather: WeatherData;
    getWeatherIcon: (code: number) => void;
    unit: UnitsProps;
    celsiusToFahrenheit: (c: number) => number;
}

export default function WDMainSection ({ city, weather, getWeatherIcon, unit, celsiusToFahrenheit }: WDMainSectionProps) {
    const [hovered, setHovered] = useState<boolean>(false);

    const hoverAnim = useHover(hovered, 1.03);

    return (
        <animated.div 
            style={hoverAnim}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)} 
            className='container px-3'>
            <Row className='cs-bg-image rounded-3 py-5 px-3'>
                <Col xs={6} className='d-flex flex-column align-items-start justify-content-center'>
                    <h2 className='h3 fw-bold'>{city.name}, {city.country}</h2>
                    <p>  
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </p>
                </Col>
                <Col xs={6} className='d-flex flex-row align-items-center justify-content-end'>
                    <Image
                        src={`/images/icon-${getWeatherIcon(weather.weathercode)}.webp`}
                        alt={`${weather.weathercode}`}
                        width={75}
                        height={75}
                    />
                    <h2 className='display-1 fst-italic fw-bold ms-3'>
                        {unit.temperature === 'C'
                            ? Math.round(weather.temperature)
                            : celsiusToFahrenheit(weather.temperature)
                        }°
                    </h2>
                </Col>
            </Row>
        </animated.div>
    );
}