//Components
import type { DailyForecast, UnitsProps } from '@/types/types';
import WDItemForecast from '../WDItemForecast';
//Bootstrap
import { Container } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

interface WDDailySectionProps {
    dailyForecasts: DailyForecast[];
    unit: UnitsProps;
    celsiusToFahrenheit: (c: number) => number;
}

export default function WDDailySection({ dailyForecasts, unit, celsiusToFahrenheit }: WDDailySectionProps) {
    return (
        <Container className='px-0 d-flex flex-column gap-3 mt-3'>
            <h2 className='h4 ms-2 my-0'>Daily forecast</h2>
            <Container className='px-2 d-flex flex-row flex-wrap align-items-stretch gap-3'>
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
    );
}