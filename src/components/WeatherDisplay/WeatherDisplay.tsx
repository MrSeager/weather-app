"use client";
import { useState, useEffect } from 'react';
//Components
import Image from 'next/image';
import type { City, WeatherData, DailyForecast, HourlyForecast, UnitsProps } from '@/types/types';
import WDItem from '../WDItem';
import WDItemForecast from '../WDItemForecast';
import WDHourlyItem from '../WDHourlyItem';
//Bootstrap
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

interface WeatherDisplayProps {
    unit: UnitsProps;
    city: City;
}

export default function WeatherDisplay({ unit, city }: WeatherDisplayProps){
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [dailyForecasts, setDailyForecasts] = useState<DailyForecast[]>([]);
    const [groupedHourlyForecasts, setGroupedHourlyForecasts] = useState<Record<string, HourlyForecast[]>>({});
    const [selectedDay, setSelectedDay] = useState<string>('Monday');

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

            setDailyForecasts(transformedDaily);

            //Hourly forecast
            const hourlyByDay: Record<string, HourlyForecast[]> = {};

            data.hourly.time.forEach((timestamp: string, index: number) => {
            const date = new Date(timestamp);
            const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
            const hour = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });

            const temp = Math.round(data.hourly.apparent_temperature[index]);
            const code = data.hourly.weathercode?.[index] ?? data.current_weather.weathercode;
            const img = `/images/icon-${getWeatherIcon(code)}.webp`;
            const imgAlt = `${code}`;

            if (!hourlyByDay[weekday]) hourlyByDay[weekday] = [];
            hourlyByDay[weekday].push({ time: hour, temp, img, imgAlt });
            });

            setGroupedHourlyForecasts(hourlyByDay); // new state
            setSelectedDay(new Date().toLocaleDateString('en-US', { weekday: 'long' })); // default to today
        };

        fetchWeather();
    }, [city]);

    if (!city || !weather) return null;

    //Conversion to F
    const celsiusToFahrenheit = (c: number) => Math.round((c * 9) / 5 + 32);
    //Conversion to mph
    const kmhToMph = (kmh: number) => Math.round(kmh / 1.60934);
    //Conversion to in
    const mmToInches = (mm: number) => (mm / 25.4).toFixed(2);

    return(
        <Container>
            <Row className='pb-5 gap-lg-0 gap-3'>
                <Col lg={9} xs={12} className='d-flex flex-column align-items-center gap-3'>
                    <Container as={Row} className='cs-bg-image rounded-3 py-5'>
                        <Col xs={6} className='d-flex flex-column align-items-start justify-content-center'>
                            <h2>{city.name}, {city.country}</h2>
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
                            <h2 className='display-1'>
                                {unit.temperature === 'C'
                                    ? Math.round(weather.temperature)
                                    : celsiusToFahrenheit(weather.temperature)
                                }°
                            </h2>
                        </Col>
                    </Container>
                    <Container className='px-0'>
                        <Row className='px-0 mx-0'>
                            <WDItem 
                                header={'Feels Like'} 
                                content={`${unit.temperature === 'C'
                                    ? weather.apparent_temperature
                                    : celsiusToFahrenheit(weather.apparent_temperature)
                                }°`}
                            />
                            <WDItem 
                                header={'Humidity'} 
                                content={`${weather.relative_humidity_2m}%`}
                            />
                            <WDItem 
                                header={'Wind'} 
                                content={`${unit.wind === 'km/h'
                                    ? weather.wind_speed_10m
                                    : kmhToMph(weather.wind_speed_10m)
                                } ${unit.wind}`}
                            />
                            <WDItem 
                                header={'Precipitation'} 
                                content={`${unit.precip === 'mm'
                                    ? weather.precipitation
                                    : mmToInches(weather.precipitation)
                                } ${unit.precip}`}
                            />
                        </Row>
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
                                    tmpOne={unit.temperature === 'C'
                                        ? forecast.tmpOne
                                        : celsiusToFahrenheit(forecast.tmpOne)
                                    }
                                    tmpTwo={unit.temperature === 'C'
                                        ? forecast.tmpTwo
                                        : celsiusToFahrenheit(forecast.tmpTwo)
                                    }
                                />
                            ))}
                        </Container>
                    </Container>
                </Col>
                <Col lg={3} xs={12}>
                    <Container className='h-100 bg-secondary rounded-3 d-flex flex-column align-items-center justify-content-around'>
                        <Container className='p-0 m-0 d-flex align-items-center justify-content-between'>
                            <h3 className='h5 m-0'>Hourly forecast</h3>
                            <Dropdown onSelect={(day) => setSelectedDay(day || 'Monday')}>
                                <Dropdown.Toggle size='sm'>{selectedDay}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {Object.keys(groupedHourlyForecasts).map((day) => (
                                        <Dropdown.Item key={day} eventKey={day}>{day}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Container>
                        {groupedHourlyForecasts[selectedDay]?.slice(0, 8).map((item, idx) => (
                            <WDHourlyItem
                                key={idx}
                                img={item.img}
                                imgAlt={item.imgAlt}
                                time={item.time}
                                temp={unit.temperature === 'C'
                                    ? item.temp
                                    : celsiusToFahrenheit(item.temp)
                                }
                            />
                        ))}
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}