'use client';
import { useState } from 'react';
//Components
import type { City, UnitsProps } from '@/types/types';
import WANav from "@/components/WANav";
import SectionOne from "@/components/SectionOne";
import WeatherDisplay from "@/components/WeatherDisplay/WeatherDisplay";
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

export default function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [unit, setUnit] = useState<UnitsProps>({
    temperature: 'C',
    wind: 'km/h',
    precip: 'mm',
  });


  return(
    <Container fluid className="cs-bg-main min-vh-100">
        <WANav 
          unit={unit}
          setUnit={setUnit}
        />
        <SectionOne onSearch={setSelectedCity} />
        {selectedCity && <WeatherDisplay city={selectedCity} />}
    </Container>
  );
}
