//Components
import styles from "./page.module.css";
import "@/components/WeatherDisplay/style.css";
import WeatherApp from "@/components/WeatherApp";

//Metadata
export const metadata = {
  title: "Weather App",
  icons: {
    icon: "images/favicon-32x32.png",
  },
  openGraph: {
    title: "Weather App",
    description: "Check the weather with a sleek, animated UI.",
    images: [
      {
        url: "https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/go73d9rjvzc8fsw13hy8.jpg",
        width: 700,
        height: 394,
        alt: "Weather App Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather App",
    description: "Check the weather with a sleek, animated UI.",
    images: [
      "https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/go73d9rjvzc8fsw13hy8.jpg",
    ],
  },
};

export default function Home() {
  return <WeatherApp />
}
