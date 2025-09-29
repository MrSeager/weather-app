// types.ts
export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  weathercode: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  precipitation: number;
}

export interface DailyForecast {
  day: string;
  img: string;
  imgAlt: string;
  tmpOne: number; // max temp
  tmpTwo: number; // min temp
}

export interface HourlyForecast {
  time: string;
  temp: number;
  img: string;
  imgAlt: string;
}

export interface UnitsProps {
  temperature: string;
  wind: string;
  precip: string;
}
