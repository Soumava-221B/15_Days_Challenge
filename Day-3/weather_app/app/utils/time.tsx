import { WeatherData } from "../types/weather";


export function formatLocalTime(weatherData: WeatherData): string {
    const localTimestamp = weatherData.dt + weatherData.timezone;
    
    const date = new Date(localTimestamp * 1000);
    
    // Format time as HH:MM AM/PM
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
    });
}

export function isDayTime(weatherData: WeatherData): boolean {
    const localTimestamp = weatherData.dt + weatherData.timezone;
    const date = new Date(localTimestamp * 1000);
    const hours = date.getUTCHours();
    return hours >= 6 && hours < 18;
}