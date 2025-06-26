"use client"
import { Card, CardContent } from "@/components/ui/card"
import { VoiceVisual } from "./_sections/voice-visualizer"
import  { ModelHero3D } from "./_sections/model"
import { WeatherSection } from "./_sections/weather"

import { useEffect, useState } from "react"

import { getCurrentWeatherData,getForecastWeatherData,type ForecastWeatherResponse } from "@/utils/api/internal/weather"


const newsItems = [
  {
    id: 1,
    company: "The Standard",
    logo: "TS",
    title: "ชาวเมียนมา",
    subtitle: "ความสัมพันธ์ในพื้นที่ชายแดนไทย-เมียนมา",
    date: "20 เมษายน 2025",
    bgColor: "bg-purple-600",
  },
  {
    id: 2,
    company: "Wongnai Media Co.Ltd",
    logo: "W",
    title: "6 พฤษภา",
    subtitle: "เก็บไปชิมกันได้เลยจ้าอาหารแสนอร่อย",
    date: "20 เมษายน 2025 - ร้านอาหารไทย",
    bgColor: "bg-red-500",
  },
  {
    id: 3,
    company: "True ID",
    logo: "T",
    title: "ภาพยนตร์ ชาวนาที่มีความใฝ่ฝันในการต่อสู้",
    date: "20 เมษายน 2025",
    subtitle: "ชิงชนะเลิศจังหวัดเก็บไปชิมกันได้เลยจ้าอาหารแสนอร่อย",
    bgColor: "bg-red-600",
  },
  // Adding more items to demonstrate scrolling
  {
    id: 4,
    company: "StoreHub Thailand",
    logo: "S",
    title: "ภาพยนตร์ที่มีความใฝ่ฝันของชาวนาในยุคปัจจุบัน",
    subtitle: "ชิงชนะเลิศจังหวัดเก็บไปชิมกันได้เลยจ้า",
    date: "20 เมษายน 2025",
    bgColor: "bg-purple-500",
  },
  {
    id: 5,
    company: "ngthai",
    logo: "N",
    title: "ชาวเมียนมา เครื่องดื่มชาเขียวใส่นมใส่ น้ำ",
    subtitle: "ปรับปรุง และปรับปรุงใส่ลิง",
    date: "20 เมษายน 2025",
    bgColor: "bg-blue-600",
  },
   {
    id: 6,
    company: "ngthai",
    logo: "N",
    title: "ชาวเมียนมา เครื่องดื่มชาเขียวใส่นมใส่ น้ำ",
    subtitle: "ปรับปรุง และปรับปรุงใส่ลิง",
    date: "20 เมษายน 2025",
    bgColor: "bg-blue-600",
  },
]

  


export default function Dashboard() {
  const [location, setLocation] = useState({
    lat: "13.74998", // Default latitude for Bangkok
    long: "100.51682", // Default longitude for Bangkok 
  });
  const [currentWeather, setCurrentWeather] = useState({
    temp: 0,
    weather_name: "Loading...",
    weather_description: "Loading...",
    icon: "01d", // Default icon
    location_name: "Loading...",
  });

  const [weatherForecast, setWeatherForecast] = useState<ForecastWeatherResponse[]>([]);

  useEffect(() => {

    if (typeof window !== "undefined") {
      // Get user's location if available
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLocation({
            lat: position.coords.latitude.toString(),
            long: position.coords.longitude.toString(),
          });

          const [weatherData, weatherError] = await getCurrentWeatherData(location.lat, location.long);
          if (weatherError) {
            console.error("Error fetching weather data:", weatherError.message);
            setCurrentWeather({
              temp: 0,
              weather_name: "Error",
              weather_description: "Unable to fetch weather data",
              icon: "01d", // Default icon if there's an error
              location_name: "Unknown Location"
            });
          } else {
            setCurrentWeather({
              temp: weatherData?.temp || 0,
              weather_name: weatherData?.weather_name || "Unknown",
              weather_description: weatherData?.weather_description || "No description available",
              icon: weatherData?.icon || "01d", // Default icon if not available
              location_name: weatherData?.location_name || "Unknown Location"
            });
          }

          const [forecastData, forecastError] = await getForecastWeatherData(location.lat, location.long);
          if (forecastError) {
            console.error("Error fetching forecast data:", forecastError.message);
            setWeatherForecast([]);
          } else {
            setWeatherForecast(forecastData ?? []);
          }
          
          
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to default location if geolocation fails
          setLocation({
            lat: "13.74998", // Default latitude for Bangkok
            long: "100.51682", // Default longitude for Bangkok
          });
        }
      );
    } else {
      // Fallback to default location if not in browser environment
      setLocation({
        lat: "13.74998", // Default latitude for Bangkok
        long: "100.51682", // Default longitude for Bangkok
      });
    }



    



  }, []);
  
 

  return (
    <div className="">

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-12 gap-6 px-6 py-8 ">
        {/* Left Column - Scrollable News Cards */}
        <div className="col-span-3 max-h-[80dvh] ">
          <div className="flex flex-col max-h-full  pace-y-4 pr-2  overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent gap-3 ">
            {newsItems.map((item) => (
              <Card key={item.id} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${item.bgColor} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                    >
                      {item.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1">{item.company}</h3>
                      <h4 className="font-bold text-base mb-1 leading-tight">{item.title}</h4>
                      <p className="text-sm text-white/80 mb-2 leading-tight">{item.subtitle}</p>
                      <p className="text-xs text-white/60">{item.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Center Column - Empty to allow model to show through */}
        <div className="col-span-6 ">
          {/* Intentionally left empty to allow the 3D model to show through */}
          <div className="flex flex-col max-h-[80dvh] gap-4">
            <ModelHero3D />
            <VoiceVisual  />
          </div>
        </div>

        <div className="col-span-3 space-y-4 pt-6 max-h-[80dvh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <WeatherSection currentWeather={currentWeather} weatherForecast={weatherForecast} />
        </div>


      </div>
    </div>
  )
}
