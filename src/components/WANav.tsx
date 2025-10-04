"use client";
//Components
import Image from 'next/image';
import type { UnitsProps } from '@/types/types';
import { Dropdown, Navbar, Form } from 'react-bootstrap';
import { useScaleUp } from './anim';
//Icons
import { IoSettingsOutline } from "react-icons/io5";
//Spring
import { animated } from '@react-spring/web';

interface WANavProps {
    unit: UnitsProps;
    setUnit: React.Dispatch<React.SetStateAction<UnitsProps>>;
    handleClearCity: () => void;
}

export default function WANav({ unit, setUnit, handleClearCity }: WANavProps) {
    const HandleSwitchUnits = () => {
        const isMetric =
            unit.temperature === 'C' &&
            unit.wind === 'km/h' &&
            unit.precip === 'mm';

        setUnit({
            temperature: isMetric ? 'F' : 'C',
            wind: isMetric ? 'mph' : 'km/h',
            precip: isMetric ? 'in' : 'mm',
        });
    };

    const startAnim = useScaleUp(150);

    return(
        <Navbar className='w-100'>
            <animated.div style={startAnim} className='container'>
                <Navbar.Brand onClick={handleClearCity} href='#home'>
                    <Image
                        src="/images/logo.svg"
                        alt='logo'
                        width={180}
                        height={50}
                    />
                </Navbar.Brand>
                <Dropdown>
                    <Dropdown.Toggle className='cs-bg-sec border-0 py-2 px-3 d-flex flex-row align-items-center gap-2 cs-btn cs-transition'>
                        <IoSettingsOutline className='fw-bold' /> Units
                    </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-end cs-dropdown-menu cs-bg-sec border border-secondary text-white px-2 mt-2">
                        <Dropdown.Item onClick={HandleSwitchUnits} className={`rounded-3 py-1 px-2 text-white cs-btn${unit.precip === 'in' && unit.temperature === 'F' && unit.wind === 'mph' ? '-imp' : ''} cs-transition`}>Switch to Imperial</Dropdown.Item>
                        <Dropdown.ItemText className='text-white-50 px-2'>Temperature</Dropdown.ItemText>
                        <Form.Check type="radio" id="tempC" className="cs-cursor-pointer rounded-3 py-1 px-2 d-flex justify-content-between align-items-center cs-btn cs-transition">
                            <Form.Check.Label htmlFor="tempC" className="ms-0 cs-cursor-pointer">
                                Celsius (°C)
                            </Form.Check.Label>
                            <Form.Check.Input 
                                type="radio" 
                                name="temperature"
                                className='cs-radio bg-transparent border-0 shadow-none cs-cursor-pointer'
                                checked={unit.temperature === 'C'} 
                                onChange={() => setUnit({ ...unit, temperature: 'C' })}
                            />
                        </Form.Check>
                        <Form.Check type="radio" id="tempF" className="cs-cursor-pointer rounded-3 py-1 px-2 d-flex justify-content-between align-items-center cs-btn cs-transition">
                            <Form.Check.Label htmlFor="tempF" className="ms-0 cs-cursor-pointer">
                                Fahrenheit (°F)
                            </Form.Check.Label>
                            <Form.Check.Input 
                                type="radio" 
                                name="temperature"
                                className='cs-radio bg-transparent border-0 shadow-none cs-cursor-pointer'
                                checked={unit.temperature === 'F'} 
                                onChange={() => setUnit({ ...unit, temperature: 'F' })}
                            />
                        </Form.Check>
                        <Dropdown.Divider className='bg-secondary mx-1' />

                        <Dropdown.ItemText className='text-white-50 px-2'>Wind Speed</Dropdown.ItemText>
                        <Form.Check type="radio" id="tempKM" className="cs-cursor-pointer rounded-3 py-1 px-2 d-flex justify-content-between align-items-center cs-btn cs-transition">
                            <Form.Check.Label htmlFor="tempKM" className="ms-0 cs-cursor-pointer">
                                km/h
                            </Form.Check.Label>
                            <Form.Check.Input 
                                type="radio" 
                                name="wind"
                                className='cs-radio bg-transparent border-0 shadow-none cs-cursor-pointer'
                                checked={unit.wind === 'km/h'} 
                                onChange={() => setUnit({ ...unit, wind: 'km/h' })}
                            />
                        </Form.Check>
                        <Form.Check type="radio" id="tempM" className="cs-cursor-pointer rounded-3 py-1 px-2 d-flex justify-content-between align-items-center cs-btn cs-transition">
                            <Form.Check.Label htmlFor="tempM" className="ms-0 cs-cursor-pointer">
                                mph
                            </Form.Check.Label>
                            <Form.Check.Input 
                                type="radio" 
                                name="wind"
                                className='cs-radio bg-transparent border-0 shadow-none cs-cursor-pointer'
                                checked={unit.wind === 'mph'} 
                                onChange={() => setUnit({ ...unit, wind: 'mph' })}
                            />
                        </Form.Check>
                        <Dropdown.Divider className='bg-secondary mx-1' />

                        <Dropdown.ItemText className='text-white-50 px-2'>Precipitation</Dropdown.ItemText>
                        <Form.Check type="radio" id="tempMM" className="cs-cursor-pointer rounded-3 py-1 px-2 d-flex justify-content-between align-items-center cs-btn cs-transition">
                            <Form.Check.Label htmlFor="tempMM" className="ms-0 cs-cursor-pointer">
                                Millimeters (mm)
                            </Form.Check.Label>
                            <Form.Check.Input 
                                type="radio" 
                                name="precip"
                                className='cs-radio bg-transparent border-0 shadow-none cs-cursor-pointer'
                                checked={unit.precip === 'mm'} 
                                onChange={() => setUnit({ ...unit, precip: 'mm' })}
                            />
                        </Form.Check>
                        <Form.Check type="radio" id="tempIN" className="cs-cursor-pointer rounded-3 py-1 px-2 d-flex justify-content-between align-items-center cs-btn cs-transition">
                            <Form.Check.Label htmlFor="tempIN" className="ms-0 cs-cursor-pointer">
                                Inches (in)
                            </Form.Check.Label>
                            <Form.Check.Input 
                                type="radio" 
                                name="precip"
                                className='cs-radio bg-transparent border-0 shadow-none cs-cursor-pointer'
                                checked={unit.precip === 'in'} 
                                onChange={() => setUnit({ ...unit, precip: 'in' })}
                            />
                        </Form.Check>
                    </Dropdown.Menu>
                </Dropdown>
            </animated.div>
        </Navbar>
);
}