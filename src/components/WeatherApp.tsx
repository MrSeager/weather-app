'use client';
import { useState, useEffect } from 'react';
//Components
import type { City, UnitsProps } from '@/types/types';
import WANav from "@/components/WANav";
import SectionOne from "@/components/SectionOne";
import WeatherDisplay from "@/components/WeatherDisplay/WeatherDisplay";
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Placeholder } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

export default function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const defaultUnits: UnitsProps = {
    temperature: 'C',
    wind: 'km/h',
    precip: 'mm',
  };
  const [bgColor, setBgColor] = useState<string>('rgba(3, 1, 45, 1)');
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

  //Background color 
  function interpolateColor(hour: number): string {
    const t = hour <= 12 ? (12 - hour) / 12 : (hour - 12) / 12;
    const a = 0.1 + (1 * t);
    return `rgba(20, 30, 60, ${a})`;
  }

  const springBG = useSpring({
    backgroundColor: bgColor,
    config: { duration: 1000 },
  });

  return(
    <animated.div style={springBG} className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-start text-white">
        <WANav 
          unit={unit}
          setUnit={setUnit}
        />
        <SectionOne onSearch={setSelectedCity} />
        {selectedCity && (
          <WeatherDisplay
            setBgColor={setBgColor} 
            interpolateColor={interpolateColor} 
            unit={unit} 
            city={selectedCity} 
          />
        )}
    </animated.div>
  );
}
