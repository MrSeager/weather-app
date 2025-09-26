//Components
import styles from "./page.module.css";
import "@/components/WeatherDisplay/style.css";
import Image from 'next/image';
import WeatherApp from "@/components/WeatherApp";
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
//Spring
import { useSpring, animated } from '@react-spring/web';

export default function Home() {
  return <WeatherApp />
}
