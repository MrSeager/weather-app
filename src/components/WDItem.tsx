"use client";
import { useState } from 'react';
//Components
import { useHover } from './anim';
//Bootstrap
import { Col } from 'react-bootstrap';
//Spring
import { animated } from '@react-spring/web';

interface WDItemProps {
    header: string; 
    content: string;
}

export default function WDItem({ header, content }: WDItemProps) {
    const [hovered, setHovered] = useState<boolean>(false);

    const hoverAnim = useHover(hovered, 1.07);

    return (
        <Col lg={3} md={6} xs={12} className='p-2'>
            <animated.div 
                style={hoverAnim}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className='container h-100 py-3 px-3 border border-secondary cs-bg-sec rounded-3 d-flex flex-column justify-content-between gap-3'
            >
                <h3 className='h5 m-0'>{header}</h3>
                <h3 className='h2 m-0 fw-light'>{content}</h3>
            </animated.div>
        </Col>
    );
}