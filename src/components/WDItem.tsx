//Bootstrap
import { Container, Col } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

interface WDItemProps {
    header: string; 
    content: string;
}

export default function WDItem({ header, content }: WDItemProps) {
    return (
        <Col lg={3} md={6} xs={12} className='p-2'>
            <Container className='h-100 py-3 px-3 border border-secondary cs-bg-sec rounded-3 d-flex flex-column justify-content-between gap-3'>
                <h3 className='h5 m-0'>{header}</h3>
                <h3 className='h2 m-0 fw-light'>{content}</h3>
            </Container>
        </Col>
    );
}