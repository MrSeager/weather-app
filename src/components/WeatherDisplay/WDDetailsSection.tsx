//Components
import type { WeatherData, UnitsProps } from '@/types/types';
import WDItem from '../WDItem';
//Bootstrap
import { Container, Row } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

interface WDDetailsSectionProps {
    unit: UnitsProps;
    weather: WeatherData;
    celsiusToFahrenheit: (c: number) => number;
    kmhToMph: (kmh: number) => number;
    mmToInches: (mm: number) => string;
}

export default function WDDetailsSection({ unit, weather, celsiusToFahrenheit, kmhToMph, mmToInches }: WDDetailsSectionProps){
    return (
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
    );
} 