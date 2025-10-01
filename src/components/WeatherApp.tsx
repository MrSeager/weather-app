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
  const [bgColor, setBgColor] = useState<string>('hsl(243, 96%, 9%)');

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

  function interpolateColor(hour: number): string {
    const t = hour <= 12 ? hour / 12 : (24 - hour) / 12;

    const h = 243; // fixed hue
    const s = Math.round(96 + (0 - 96) * t); // fade saturation
    const l = Math.round(9 + (100 - 9) * t); // brighten

    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  const springBG = useSpring({
    backgroundColor: bgColor,
    config: { duration: 1000 },
  });

  return(
    <animated.div style={springBG} className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <WANav 
          unit={unit}
          setUnit={setUnit}
        />
        <SectionOne onSearch={setSelectedCity} />
        {selectedCity && 
          <WeatherDisplay 
            setBgColor={setBgColor} 
            interpolateColor={interpolateColor} 
            unit={unit} 
            city={selectedCity} 
          />}
    </animated.div>
  );
}
