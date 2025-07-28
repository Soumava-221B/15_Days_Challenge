"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getWeatherData } from "./actions";

function SubmitButton() {
  return (
    <Button type="submit">
      <Search className="w-4 h-4" />
    </Button>
  )
}

export default function Home() {

  const handleSeach = async(formData: FormData) => {
    const city = formData.get("city") as string;
    const result = await getWeatherData(city);
    if (result && "data" in result) {
      console.log(result.data);
    } else {
      console.log("No data found");
    }
  }

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
      </div>
    </div>
  );
}
