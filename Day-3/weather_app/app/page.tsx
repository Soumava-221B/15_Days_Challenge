/* eslint-disable @next/next/no-img-element */
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

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      <Search className={`h-4 w-4 ${pending ? "animate-spin" : ""}`} />
    </Button>
  );
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("")

  const handleSeach = async (formData: FormData) => {
    setError("");

    const city = formData.get("city") as string;
    const { data, error: weatherApiError } = await getWeatherData(city);
    console.log(error)

    if (weatherApiError) {
      setError(weatherApiError);
    }

    if (data) {
      setWeather(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-blue-500 p-4 flex items-center justify-center">
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

        {error && (
          <motion.div 
          initial = {{ opacity: 0, y: 10 }}
          animate = {{ opacity: 1, y: 0 }}
          exit = {{ opacity: 0 }}
          className="text-center text-red-200 bg-red-500/20 rounded-md p-2">{error}</motion.div>
        )}

        {weather && (
          <motion.div
          initial = {{ opacity: 0, y: 20 }}
          animate = {{ opacity: 1, y: 0 }}
          exit = {{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <motion.h2 
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold">{weather.name}</motion.h2>
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
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl font-bold">
                      {Math.round(weather.main.temp)}°C
                    </motion.div>
                  </div>
                  <motion.div
                  initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  className="text-gray-500 mt-1 capitalize">
                    {weather.weather[0].description}
                  </motion.div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <Thermometer className="w-6 h-6 mx-auto text-orange-500" />
                    <div className="mt-2 text-sm text-gray-500">Feels Like</div>
                    <div className="font-semibold">
                      {Math.round(weather.main.feels_like)}°C
                    </div>
                  </div>
                  <div><div className="text-center">
                    <Droplet className="w-6 h-6 mx-auto text-blue-500" />
                    <div className="mt-2 text-sm text-gray-500">Humidity</div>
                    <div className="font-semibold">
                      {Math.round(weather.main.humidity)}°C
                    </div>
                  </div></div>
                  <div><div className="text-center">
                    <Wind className="w-6 h-6 mx-auto text-teal-500" />
                    <div className="mt-2 text-sm text-gray-500">Wind</div>
                    <div className="font-semibold">
                      {Math.round(weather.wind.speed)} m/s
                    </div>
                  </div></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
