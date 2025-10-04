"use client";
import { useState, useEffect } from 'react';
//Components
import type { City, WeatherData, DailyForecast, HourlyForecast, UnitsProps } from '@/types/types';
import { useScaleUp } from '../anim';

import WDMainSection from './WDMainSection';
import WDDetailsSection from './WDDetailsSection';
import WDDailySection from './WDDailySection';
import WDHourlySection from './WDHourlySection';

import { DateTime } from 'luxon';
//Bootstrap
import { Row, Col } from 'react-bootstrap';
//Spring
import { animated } from '@react-spring/web';

interface WeatherDisplayProps {
    setBgColor: (bgColor: string) => void; 
    interpolateColor: (hour: number) => string;
    unit: UnitsProps;
    city: City;
}

export default function WeatherDisplay({ setBgColor, interpolateColor, unit, city }: WeatherDisplayProps){
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [dailyForecasts, setDailyForecasts] = useState<DailyForecast[]>([]);
    const [groupedHourlyForecasts, setGroupedHourlyForecasts] = useState<Record<string, HourlyForecast[]>>({});
    const [selectedDay, setSelectedDay] = useState<string>('Monday');
    const startAnim = useScaleUp(250);

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
            const localHour = DateTime.fromISO(data.current_weather.time, { zone: data.timezone }).hour;
            setBgColor(interpolateColor(localHour));

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

            // Transform daily forecast
            const transformedDaily = data.daily.time.map((date: string, index: number) => {
                const day = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
                const imgAlt = `${data.daily.weathercode[index]}`;
                const img = `/images/icon-${getWeatherIcon(data.daily.weathercode[index])}.webp`;
                const tmpOne = Math.round(data.daily.temperature_2m_max[index]);
                const tmpTwo = Math.round(data.daily.temperature_2m_min[index]);

                return { day, img, imgAlt, tmpOne, tmpTwo };
            });

            setDailyForecasts(transformedDaily);

            // Hourly forecast
            const hourlyByDay: Record<string, HourlyForecast[]> = {};
            const now = DateTime.now().setZone(data.timezone);
            const currentHour = now.hour; // e.g., 11

            data.hourly.time.forEach((timestamp: string, index: number) => {
                const dt = DateTime.fromISO(timestamp, { zone: data.timezone });
                if (dt.hour < currentHour) return; // skip hours before current city hour

                const weekday = dt.toFormat('cccc'); // e.g., "Friday"
                const hour = dt.toFormat('h a');     // e.g., "1 PM"

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
        <animated.div style={startAnim} className='container'>
            <Row className='pb-5 gap-lg-0 gap-3'>
                <Col lg={9} xs={12} className='d-flex flex-column align-items-center gap-3'>
                    <WDMainSection 
                        city={city} 
                        weather={weather}
                        getWeatherIcon={getWeatherIcon} 
                        unit={unit} 
                        celsiusToFahrenheit={celsiusToFahrenheit}
                    />

                    <WDDetailsSection 
                        unit={unit} 
                        weather={weather}
                        celsiusToFahrenheit={celsiusToFahrenheit}
                        kmhToMph={kmhToMph}
                        mmToInches={mmToInches}
                    />

                    <WDDailySection 
                        dailyForecasts={dailyForecasts} 
                        unit={unit} 
                        celsiusToFahrenheit={celsiusToFahrenheit}
                    />

                </Col>
                <Col lg={3} xs={12}>
                    <WDHourlySection 
                        selectedDay={selectedDay}
                        setSelectedDay={setSelectedDay}
                        groupedHourlyForecasts={groupedHourlyForecasts}
                        unit={unit}
                        celsiusToFahrenheit={celsiusToFahrenheit}
                    />
                </Col>
            </Row>
        </animated.div>
    );
}