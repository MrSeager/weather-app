"use client";
import { useState, useEffect } from 'react';
//Components
import Image from 'next/image';
import type { City, WeatherData, DailyForecast } from '@/types/types';
import WDItem from '../WDItem';
import WDItemForecast from '../WDItemForecast';
//Bootstrap
import { Container, Row, Col } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

export default function WeatherDisplay({ city }: { city: City }){
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [dailyForecasts, setDailyForecasts] = useState<DailyForecast[]>([]);

    function getWeatherIcon(code: number): string {
        if ([0].includes(code)) return 'sunny';
        if ([1, 2].includes(code)) return 'partly-cloudy';
        if ([3].includes(code)) return 'overcast';
        if ([30, 45, 48].includes(code)) return 'fog';
        if ([51, 53, 55].includes(code)) return 'drizzle';
        if ([61, 63, 65, 80, 81].includes(code)) return 'rain';
        if ([71, 73, 75, 85, 86].includes(code)) return 'snow';
        if ([95, 96, 99].includes(code)) return 'storm';

        return 'unknown'; // fallback for unmapped codes
    }


    useEffect(() => {
        if (!city) return;

        const fetchWeather = async () => {
            const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&hourly=apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
            );
            const data = await res.json();
            console.log('Full weather data:', data);

            // Parse current weather
            const latestIndex = 0;
            const parsed: WeatherData = {
                temperature: data.current_weather.temperature,
                weathercode: data.current_weather.weathercode,
                description: '',
                icon: '',
                apparent_temperature: data.hourly.apparent_temperature[latestIndex],
                relative_humidity_2m: data.hourly.relative_humidity_2m[latestIndex],
                wind_speed_10m: data.hourly.wind_speed_10m[latestIndex],
                precipitation: data.hourly.precipitation[latestIndex],
            };
            setWeather(parsed);

            // ✅ Transform daily forecast
            const transformedDaily = data.daily.time.map((date: string, index: number) => {
                const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
                const imgAlt = `${data.daily.weathercode[index]}`;
                const img = `/images/icon-${getWeatherIcon(data.daily.weathercode[index])}.webp`;
                const tmpOne = Math.round(data.daily.temperature_2m_max[index]);
                const tmpTwo = Math.round(data.daily.temperature_2m_min[index]);

                return { day, img, imgAlt, tmpOne, tmpTwo };
            });

            setDailyForecasts(transformedDaily); // 👈 This is your new state
        };

        fetchWeather();
    }, [city]);


    if (!city || !weather) return null;

    return(
        <Container>
            <Row className='pb-5'>
                <Col lg={8} xs={12} className='d-flex flex-column align-items-center gap-3'>
                    <Container as={Row} className='cs-bg-image rounded-3 py-5'>
                        <Col xs={6} className='d-flex flex-column align-items-start justify-content-center'>
                            <h2>{city.name}, {city.country}</h2>
                            <p>{new Date().toLocaleDateString()}</p>
                        </Col>
                        <Col xs={6} className='d-flex flex-row align-items-center justify-content-end'>
                            <Image
                                src={`/images/icon-${getWeatherIcon(weather.weathercode)}.webp`}
                                alt={`${weather.weathercode}`}
                                width={75}
                                height={75}
                            />
                            <h2 className='display-1'>{Math.round(weather.temperature)}°</h2>
                        </Col>
                    </Container>
                    <Container className='px-0 d-flex flex-row align-items-center justify-content-between gap-3'>
                        <WDItem 
                            header={'Feels Like'} 
                            content={`${weather.apparent_temperature}°`}
                        />
                        <WDItem 
                            header={'Humidity'} 
                            content={`${weather.relative_humidity_2m}%`}
                        />
                        <WDItem 
                            header={'Wind'} 
                            content={`${weather.wind_speed_10m} km/h`}
                        />
                        <WDItem 
                            header={'Precipitation'} 
                            content={`${weather.precipitation} mm`}
                        />
                    </Container>
                    <Container className='px-0'>
                        <h2 className='h3'>Daily forecast</h2>
                        <Container className='px-0 d-flex align-items-center justify-content-between gap-3'>
                            {dailyForecasts.map((forecast, idx) => (
                                <WDItemForecast
                                    key={idx}
                                    day={forecast.day}
                                    img={forecast.img}
                                    imgAlt={forecast.imgAlt}
                                    tmpOne={forecast.tmpOne}
                                    tmpTwo={forecast.tmpTwo}
                                />
                            ))}
                        </Container>
                    </Container>
                </Col>
                <Col lg={4} xs={12}>
                </Col>
            </Row>
        </Container>
    );
}