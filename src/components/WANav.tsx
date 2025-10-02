"use client";
//Components
import Image from 'next/image';
import type { UnitsProps } from '@/types/types';
import { Container, Dropdown, Navbar, Form } from 'react-bootstrap';
//Icons
import { IoSettingsOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

interface WANavProps {
    unit: UnitsProps;
    setUnit: React.Dispatch<React.SetStateAction<UnitsProps>>;
}

export default function WANav({ unit, setUnit }: WANavProps) {
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

    return(
        <Navbar className='w-100'>
            <Container>
                <Navbar.Brand href='#home'>
                    <Image
                        src="/images/logo.svg"
                        alt='logo'
                        width={180}
                        height={50}
                    />
                </Navbar.Brand>
                <Dropdown>
                    <Dropdown.Toggle className='cs-bg-sec border-0 py-2 px-3 d-flex flex-row align-items-center gap-2'>
                        <IoSettingsOutline className='fw-bold' /> Units
                    </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-end cs-dropdown-menu cs-bg-sec text-white px-0 mt-2">
                        <Dropdown.Item onClick={HandleSwitchUnits} className='text-white'>Switch to Imperial</Dropdown.Item>
                        <Dropdown.ItemText className='text-white'>Temperature</Dropdown.ItemText>
                        <Form.Check type="radio" id="tempC" className="px-3 d-flex justify-content-between align-items-center">
                            <Form.Check.Label htmlFor="tempC" className="ms-0">
                                Celsius (°C)
                            </Form.Check.Label>
                            <Form.Check.Input 
                                type="radio" 
                                name="temperature"
                                className='cs-radio bg-transparent border-0 shadow-none'
                                checked={unit.temperature === 'C'} 
                                onChange={() => setUnit({ ...unit, temperature: 'C' })}
                            />
                        </Form.Check>
                        <Form.Check type="radio" id="tempC" className="px-3 d-flex justify-content-between align-items-center">
                            <Form.Check.Label htmlFor="tempC" className="ms-0">
                                Fahrenheit (°F)
                            </Form.Check.Label>
                            <Form.Check.Input 
                                type="radio" 
                                name="temperature"
                                className='cs-radio bg-transparent border-0 shadow-none'
                                checked={unit.temperature === 'F'} 
                                onChange={() => setUnit({ ...unit, temperature: 'F' })}
                            />
                        </Form.Check>
                        <Dropdown.Divider className='bg-white mx-3' />

                        <Dropdown.ItemText className='text-white'>Wind Speed</Dropdown.ItemText>
                        <Form.Check type="radio" id="tempC" className="px-3 d-flex justify-content-between align-items-center">
                            <Form.Check.Label htmlFor="tempC" className="ms-0">
                                km/h
                            </Form.Check.Label>
                            <Form.Check.Input 
                                type="radio" 
                                name="wind"
                                className='cs-radio bg-transparent border-0 shadow-none'
                                checked={unit.wind === 'km/h'} 
                                onChange={() => setUnit({ ...unit, wind: 'km/h' })}
                            />
                        </Form.Check>
                        <Form.Check type="radio" id="tempC" className="px-3 d-flex justify-content-between align-items-center">
                            <Form.Check.Label htmlFor="tempC" className="ms-0">
                                mph
                            </Form.Check.Label>
                            <Form.Check.Input 
                                type="radio" 
                                name="wind"
                                className='cs-radio bg-transparent border-0 shadow-none'
                                checked={unit.wind === 'mph'} 
                                onChange={() => setUnit({ ...unit, wind: 'mph' })}
                            />
                        </Form.Check>
                        <Dropdown.Divider className='bg-white mx-3' />

                        <Dropdown.ItemText className='text-white'>Precipitation</Dropdown.ItemText>
                        <Form.Check type="radio" id="tempC" className="px-3 d-flex justify-content-between align-items-center">
                            <Form.Check.Label htmlFor="tempC" className="ms-0">
                                Millimeters (mm)
                            </Form.Check.Label>
                            <Form.Check.Input 
                                type="radio" 
                                name="precip"
                                className='cs-radio bg-transparent border-0 shadow-none'
                                checked={unit.precip === 'mm'} 
                                onChange={() => setUnit({ ...unit, precip: 'mm' })}
                            />
                        </Form.Check>
                        <Form.Check type="radio" id="tempC" className="px-3 d-flex justify-content-between align-items-center">
                            <Form.Check.Label htmlFor="tempC" className="ms-0">
                                Inches (in)
                            </Form.Check.Label>
                            <Form.Check.Input 
                                type="radio" 
                                name="precip"
                                className='cs-radio bg-transparent border-0 shadow-none'
                                checked={unit.precip === 'in'} 
                                onChange={() => setUnit({ ...unit, precip: 'in' })}
                            />
                        </Form.Check>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>
);
}