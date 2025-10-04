//Components
import type { HourlyForecast, UnitsProps } from '@/types/types';
import WDHourlyItem from '../WDHourlyItem';
//Bootstrap
import { Container, Dropdown } from 'react-bootstrap';

interface WDHourlySectionProps {
    selectedDay: string;
    setSelectedDay: (selectedDay: string) => void;
    groupedHourlyForecasts: Record<string, HourlyForecast[]>;
    unit: UnitsProps;
    celsiusToFahrenheit: (c: number) => number;
}

export default function WDHourlySection({ selectedDay, setSelectedDay, groupedHourlyForecasts, unit, celsiusToFahrenheit }: WDHourlySectionProps ) {
    return (
        <Container className='h-100 cs-bg-sec rounded-3 d-flex flex-column align-items-center justify-content-between gap-2 py-2'>
            <Container className='p-0 m-0 d-flex align-items-center justify-content-between'>
                <h3 className='h6 m-0'>Hourly forecast</h3>
                <div className='position-relative'>
                    <Dropdown onSelect={(day) => setSelectedDay(day || 'Monday')}>
                        <Dropdown.Toggle className='px-3 cs-btn cs-transition border-0 cs-bg-thr' size='sm'>{selectedDay}</Dropdown.Toggle>
                        <Dropdown.Menu align="end" className='cs-dropdown-menu cs-bg-sec px-2 border border-secondary my-2 rounded-3'>
                            {Object.keys(groupedHourlyForecasts).map((day) => (
                                <Dropdown.Item className='rounded-3 py-1 px-2 text-white cs-btn cs-transition' key={day} eventKey={day}>{day}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
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
    );
}