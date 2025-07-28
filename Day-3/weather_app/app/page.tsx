"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplet, Search, Thermometer, Wind } from "lucide-react";
import { getWeatherData } from "./actions";
import { WeatherData } from "./types/weather";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { formatLocalTime } from "./utils/time";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      <Search className={`h-4 w-4 ${pending ? "animate-spin" : ""}`} />
    </Button>
  );
}

function isDayTime(weatherData: WeatherData): boolean {
  const localTimestamp = weatherData.dt + weatherData.timezone;

  const date = new Date(localTimestamp * 1000);
  const hours = date.getUTCHours();

  return hours >= 6 && hours < 18;
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");

  const convertTemp = (temp: number): number => {
      if (unit === "fahrenheit") {
        return (temp * 9) / 5 + 32;
      }
      return temp;
    };

  const handleSeach = async (formData: FormData) => {
    setError("");

    const city = formData.get("city") as string;
    const { data, error: weatherApiError } = await getWeatherData(city);
    console.log(error);

    if (weatherApiError) {
      setError(weatherApiError);
    }

    if (data) {
      setWeather(data);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-sky-400 to-blue-500 p-4 flex items-center justify-center transition-colors duration-1000 ${
        weather
          ? isDayTime(weather)
            ? "bg-gradient-to-b from-sky-400 to-blue-500"
            : "bg-gradient-to-b from-blue-900 to-gray-900"
          : "bg-gradient-to-b from-sky-400 to-blue-500"
      }`}
    >
      <div className="w-full max-w-md space-y-4">
        <form action={handleSeach} className="flex gap-2">
          <Input
            name="city"
            type="text"
            placeholder="Enter city name..."
            className="bg-white/90"
            required
          />
          <SubmitButton />
        </form>
        <Button
          variant="outline"
          onClick={() => setUnit(unit === "celsius" ? "fahrenheit" : "celsius")}
          className="bg-white/90"
        >
          °{unit === "celsius" ? "C" : "F"}
        </Button>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-red-200 bg-red-500/20 rounded-md p-2"
          >
            {error}
          </motion.div>
        )}

        {weather && (
          <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
    >
        <Card className={`backdrop-blur ${
            isDayTime(weather) 
                ? "bg-white/50" 
                : "bg-gray-800/50 text-white"
        }`}>
            <CardContent className="p-6">
                <div className="text-center mb-4">
                    <motion.div 
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        className="flex justify-between items-start"
                    >
                        <h2 className="text-2xl font-bold">{weather.name}</h2>
                        <div className="text-sm bg-black/10 dark:bg-white/10 px-2 py-1 rounded-md">
                            {formatLocalTime(weather)}
                        </div>
                    </motion.div>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <motion.img
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                            width={64}
                            height={64}
                        />
                        <motion.div 
                            key={`temp-${unit}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className="text-5xl font-bold"
                        >
                            {Math.round(convertTemp(weather.main.temp))}°{unit === "celsius" ? "C" : "F"}
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-500 mt-1 capitalize"
                    >
                        {weather.weather[0].description}
                    </motion.div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                        <Thermometer className="w-6 h-6 mx-auto text-orange-500" />
                        <div className="mt-2 text-sm text-gray-500">Feels Like</div>
                        <div className="font-semibold">
                            {Math.round(convertTemp(weather.main.feels_like))}°{unit === "celsius" ? "C" : "F"}
                        </div>
                    </div>
                    <div className="text-center">
                        <Droplet className="w-6 h-6 mx-auto text-blue-500" />
                        <div className="mt-2 text-sm text-gray-500">Humidity</div>
                        <div className="font-semibold">
                            {Math.round(weather.main.humidity)}%
                        </div>
                    </div>
                    <div className="text-center">
                        <Wind className="w-6 h-6 mx-auto text-teal-500" />
                        <div className="mt-2 text-sm text-gray-500">Wind</div>
                        <div className="font-semibold">
                            {Math.round(weather.wind.speed)} m/s
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </motion.div>
        )}
      </div>
    </div>
  );
}
