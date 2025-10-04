'use client';
import { useState, useEffect } from 'react';
//Components
import type { City, UnitsProps } from '@/types/types';
import WANav from "@/components/WANav";
import SectionOne from "@/components/SectionOne";
import WeatherDisplay from "@/components/WeatherDisplay/WeatherDisplay";
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
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

  useEffect(() => {
    if (selectedCity) {
      localStorage.setItem('lastSelectedCity', JSON.stringify(selectedCity));
    }
  }, [selectedCity]);

  useEffect(() => {
    const savedCity = localStorage.getItem('lastSelectedCity');
    if (savedCity) {
      try {
        setSelectedCity(JSON.parse(savedCity));
      } catch (err) {
        console.error('Failed to parse saved city:', err);
      }
    }
  }, []);

  //Background color 
  function interpolateColor(hour: number): string {
    const t = hour <= 12 ? (12 - hour) / 12 : (hour - 12) / 12;
    const a = 0.2 + (1 * t);
    return `rgba(20, 30, 60, ${a})`;
  }

  const springBG = useSpring({
    backgroundColor: bgColor,
    config: { duration: 1000 },
  });

  //Clear and reload page
  const handleClearCity = () => {
    localStorage.removeItem('lastSelectedCity');
    setSelectedCity(null);
  };

  return(
    <animated.div style={springBG} className="overflow-hidden user-select-none container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-start text-white">
        <WANav 
          unit={unit}
          setUnit={setUnit}
          handleClearCity={handleClearCity}
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
