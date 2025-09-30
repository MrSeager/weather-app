'use client';
import { useState, useEffect } from 'react';
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
  const defaultUnits: UnitsProps = {
    temperature: 'C',
    wind: 'km/h',
    precip: 'mm',
  };

  const [unit, setUnit] = useState<UnitsProps>(defaultUnits);

  // Load from localStorage once on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('weatherUnits');
      if (saved) {
        setUnit(JSON.parse(saved));
      }
    }
  }, []);

  // Save to localStorage whenever unit changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('weatherUnits', JSON.stringify(unit));
    }
  }, [unit]);

  return(
    <Container fluid className="cs-bg-main min-vh-100">
        <WANav 
          unit={unit}
          setUnit={setUnit}
        />
        <SectionOne onSearch={setSelectedCity} />
        {selectedCity && <WeatherDisplay unit={unit} city={selectedCity} />}
    </Container>
  );
}
