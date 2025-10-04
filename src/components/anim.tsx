import { useSpring } from '@react-spring/web';

export const useHover = ( hover: boolean, scl: number ) => 
    useSpring({
        scale: hover ? scl : 1,
        config: { tension: 110, friction: 10 },
    });

export const useScaleUp = ( del: number ) => 
    useSpring({
        from: { scale: 0 },
        to: { scale: 1 },
        config: { tension: 110, friction: 10 },
        delay: del
    });