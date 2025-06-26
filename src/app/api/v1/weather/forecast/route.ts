import { NextRequest,NextResponse} from "next/server";
import { getForecastWeatherData } from "@/utils/api/external/weather"

export async function GET(request:NextRequest){
    const lat = request.nextUrl.searchParams.get("lat") || "0.0";
    const lon = request.nextUrl.searchParams.get("lon") || "0.0";

    const [weatherForecastWeather, weatherError] = await getForecastWeatherData(lat, lon);
    if (weatherError) {
        console.error("Error fetching weather data:", weatherError.message);
        return NextResponse.json({ error: weatherError.message }, { status: weatherError.code || 500 });
    }

    const listforecast = weatherForecastWeather?.list.map((item) => ({
        temp: item?.main.temp || 0,
        weather_name: item?.weather[0].main || "Unknown",
        weather_description: item?.weather[0].description || "No description available",
        icon: item?.weather[0].icon || "01d", // Default icon if not available
        date_txt: item?.dt_txt || "00-00-00 00:00:00"
    })) || [];


    

    return NextResponse.json(listforecast,{ status: 200 });

}