"use client";
import { useState, useEffect } from 'react';
//Components
import Image from 'next/image';
import type { City, WeatherData } from '@/types/types';
//Bootstrap
import { Container, Row, Col } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

export default function WDItem({ header, content }: {header: string, content: string}) {
    return (
        <Container className='border bg-secondary rounded-3'>
            <h3>{header}</h3>
            <h3>{content}</h3>
        </Container>
    );
}