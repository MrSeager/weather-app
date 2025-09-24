//Components
import styles from "./page.module.css";
import "@/components/style.css";
import WheatherPage from "@/components/SectionOne";
import SectionOne from "@/components/SectionOne";
import Image from 'next/image';
import WANav from "@/components/WANav";
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

export default function Home() {
  return(
    <Container fluid className="cs-bg-main min-vh-100">
        <WANav />
        <SectionOne />
    </Container>
  );
}
