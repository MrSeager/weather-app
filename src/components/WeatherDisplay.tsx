"use client";
import { useState, useEffect } from 'react';
//Components
import Image from 'next/image';
//Bootstrap
import { Container, Row, Col } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

export default function WeatherDisplay({ city }: { city: unknown }){
    const [weather, setWeather] = useState<unknown>(null);

    const weatherCodeToIcon: Record<number, string> = {
        0: 'sunny',
        1: 'partly-cloudy',
        2: 'partly-cloudy',
        3: 'overcast',
        45: 'fog',
        48: 'fog',
        51: 'drizzle',
        53: 'drizzle',
        55: 'drizzle',
        61: 'rain',
        63: 'rain',
        65: 'rain',
        71: 'snow',
        73: 'snow',
        75: 'snow',
        95: 'storm',
        96: 'storm',
        99: 'storm',
    };


    useEffect(() => {
        if (!city) return;

        const fetchWeather = async () => {
            const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`
            );
            const data = await res.json();
            setWeather(data.current_weather);
        };

        fetchWeather();
    }, [city]);

    if (!city || !weather) return null;

    return(
        <Container>
            <Row>
                <Col lg={8} xs={12} className='d-flex flex-column align-items-center gap-3'>
                    <Container as={Row} className='cs-bg-image rounded-3 py-5'>
                        <Col xs={6} className='d-flex flex-column align-items-start justify-content-center'>
                            <h2>{city.name}, {city.country}</h2>
                            <p>{new Date().toLocaleDateString()}</p>
                        </Col>
                        <Col xs={6} className='d-flex flex-row align-items-center justify-content-end'>
                            <Image
                                src={`/images/icon-${weatherCodeToIcon[weather.weathercode]}.webp`}
                                alt={`${weather.weathercode}`}
                                width={75}
                                height={75}
                            />
                            <h2 className='display-1'>{Math.round(weather.temperature)}°</h2>
                        </Col>
                    </Container>
                </Col>
                <Col lg={4} xs={12}>
                
                </Col>
            </Row>
        </Container>
    );
}