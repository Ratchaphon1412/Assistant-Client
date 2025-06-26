import { NextRequest,NextResponse} from "next/server";
import { getCurrentWeatherData } from "@/utils/api/external/weather"

export async function GET(request:NextRequest){
    const lat = request.nextUrl.searchParams.get("lat") || "0.0";
    const lon = request.nextUrl.searchParams.get("lon") || "0.0";

    const [weatherData, weatherError] = await getCurrentWeatherData(lat, lon);
    if (weatherError) {
        console.error("Error fetching weather data:", weatherError.message);
        return NextResponse.json({ error: weatherError.message }, { status: weatherError.code || 500 });
    }
    const currentWeather = {
        temp: weatherData?.main.temp || 0,
        weather_name: weatherData?.weather[0].main || "Unknown",
        weather_description: weatherData?.weather[0].description || "No description available",
        icon: weatherData?.weather[0].icon || "01d", // Default icon if not available
        location_name: weatherData?.name || "Unknown Location"
    };

    return NextResponse.json(currentWeather,{ status: 200 });




}