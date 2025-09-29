"use client";
//Components
import Image from 'next/image';
import type { UnitsProps } from '@/types/types';
import { Container, Dropdown, Navbar, Form } from 'react-bootstrap';
//Icons
import { IoSettingsOutline } from "react-icons/io5";

interface WANavProps {
    unit: UnitsProps;
    setUnit: React.Dispatch<React.SetStateAction<UnitsProps>>;
}

export default function WANav({ unit, setUnit }: WANavProps) {
    return(
        <Navbar>
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
                    <Dropdown.Toggle className='d-flex flex-row align-items-center gap-2'>
                        <IoSettingsOutline /> Units
                    </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-center px-0">
                        <Dropdown.Item>Switch to Imperial</Dropdown.Item>
                        <Dropdown.ItemText>Temperature</Dropdown.ItemText>
                        <Form.Check type="radio" id="tempC" className="px-3 d-flex justify-content-between align-items-center">
                            <Form.Check.Label htmlFor="tempC" className="ms-0">
                                Celsius (°C)
                            </Form.Check.Label>
                            <Form.Check.Input 
                                type="radio" 
                                name="temperature" 
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
                                checked={unit.temperature === 'F'} 
                                onChange={() => setUnit({ ...unit, temperature: 'F' })}
                            />
                        </Form.Check>
                        <Dropdown.Divider />

                        <Dropdown.ItemText>Wind Speed</Dropdown.ItemText>
                        <Form.Check type="radio" id="tempC" className="px-3 d-flex justify-content-between align-items-center">
                            <Form.Check.Label htmlFor="tempC" className="ms-0">
                                km/h
                            </Form.Check.Label>
                            <Form.Check.Input 
                                type="radio" 
                                name="wind" 
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
                                checked={unit.wind === 'mph'} 
                                onChange={() => setUnit({ ...unit, wind: 'mph' })}
                            />
                        </Form.Check>
                        <Dropdown.Divider />

                        <Dropdown.ItemText>Precipitation</Dropdown.ItemText>
                        <Form.Check type="radio" id="tempC" className="px-3 d-flex justify-content-between align-items-center">
                            <Form.Check.Label htmlFor="tempC" className="ms-0">
                                Millimeters (mm)
                            </Form.Check.Label>
                            <Form.Check.Input 
                                type="radio" 
                                name="precip" 
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