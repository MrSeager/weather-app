'use client';

import { useState } from 'react';
//Components
import styles from "./page.module.css";
import "@/components/style.css";
import Image from 'next/image';
import WANav from "@/components/WANav";
import SectionOne from "@/components/SectionOne";
import WeatherDisplay from "@/components/WeatherDisplay";
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<unknown>(null);

  return(
    <Container fluid className="cs-bg-main min-vh-100">
        <WANav />
        <SectionOne onSearch={setSelectedCity} />
        <WeatherDisplay city={selectedCity} />
    </Container>
  );
}
