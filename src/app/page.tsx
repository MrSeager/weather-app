//Components
import styles from "./page.module.css";
import "@/components/WeatherDisplay/style.css";
import Image from 'next/image';
import WeatherApp from "@/components/WeatherApp";

export default function Home() {
  return <WeatherApp />
}
