"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useQuery } from "react-query";
import { format, parseISO } from "date-fns";
import Container from "@/components/Container";
import { convertToCelsius } from "@/utils/convertK-C";
import WeatherIcon from "@/components/WeatherIcon";

interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>("repoData", async () => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Katlehong&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`)
    return data;
  }
  );

  const firstData = data?.list[0];

  console.log("data", data);
  if (isLoading) return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate-bounce">Loading......</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* Today's data */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
              <p className="text-lg">({format(parseISO(firstData?.dt_txt ?? ''), 'dd.MM.yyyy')})</p>
            </h2>
            <Container className="gap-10 px-6 items-center">
              {/* Temparature */}
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  {convertToCelsius(firstData?.main.temp ?? 0)}℃
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels Like</span>
                  <span>
                    {convertToCelsius(firstData?.main.feels_like ?? 0)}℃
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertToCelsius(firstData?.main.temp_min ?? 0)}°↓
                  </span>
                  <span>
                    {convertToCelsius(firstData?.main.temp_max ?? 0)}°↑
                  </span>
                </p>
              </div>
              {/* time and weather icon */}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d, i) => (
                  <div key={i} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                    <p className="whitespace-nowrap">
                      {format(parseISO(d.dt_txt), 'h:mm a')}
                    </p>
                    <WeatherIcon iconName={d.weather[0].icon} />
                    <p>
                      {convertToCelsius(d?.main.temp ?? 0)}°
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </section>
        {/* 7 days forcust */}
        <section className="flex w-full flex-col gap-4">
          <p className="text-2xl">Forcast (7 days)</p>
        </section>
      </main>
    </div>
  );
}
