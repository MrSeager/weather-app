'use client';
import { useState } from 'react';
//Components
import type { City } from '@/types/types';
import Image from 'next/image';
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

  return(
    <Container fluid className="cs-bg-main min-vh-100">
        <WANav />
        <SectionOne onSearch={setSelectedCity} />
        {selectedCity && <WeatherDisplay city={selectedCity} />}
    </Container>
  );
}
