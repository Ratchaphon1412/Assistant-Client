"use client"
import { Card, CardContent } from "@/components/ui/card"
import { VoiceVisual } from "./_sections/voice-visualizer"
import  { ModelHero3D } from "./_sections/model"
import { WeatherSection } from "./_sections/weather"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import { useEffect, useState } from "react"

import { getCurrentWeatherData,getForecastWeatherData,type ForecastWeatherResponse } from "@/utils/api/internal/weather"

type Thumbnail = {
  width: number;
  height: number;
  src: string;
};

type SearchResult = {
  kind: string;
  title: string;
  display_link: string;
  link: string;
  image: string;
  chat_id: number;
  thumbnails: Thumbnail[];
};



  


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
  const [search, setSearch] = useState<SearchResult[]>([])

  useEffect(() => {

    // Fetch current weather data
    const fetchCurrentWeather = async () => {
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
            console.log("Weather Data:", weatherData);
            setCurrentWeather({
              temp: weatherData?.temp || 0,
              weather_name: weatherData?.weather_name || "Unknown",
              weather_description: weatherData?.weather_description || "No description available",
              icon: weatherData?.icon || "01d", // Default icon if not available
              location_name: weatherData?.location_name || "Unknown Location"
            });
          }

    }

    // Fetch weather forecast data
    const fetchWeatherForecast = async () => {
      const [forecastData, forecastError] = await getForecastWeatherData(location.lat, location.long);
          if (forecastError) {
            console.error("Error fetching forecast data:", forecastError.message);
            setWeatherForecast([]);
          } else {
            setWeatherForecast(forecastData ?? []);
          }
    }

    if (typeof window !== "undefined") {
      // Get user's location if available
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLocation({
            lat: position.coords.latitude.toString(),
            long: position.coords.longitude.toString(),
          });
          console.log("User's Location:", position.coords.latitude, position.coords.longitude);

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
      // Fetch weather data after setting location
      fetchCurrentWeather();
      fetchWeatherForecast();
      
    } else {
      // Fallback to default location if not in browser environment
      setLocation({
        lat: "13.74998", // Default latitude for Bangkok
        long: "100.51682", // Default longitude for Bangkok
      });
      fetchCurrentWeather();
      fetchWeatherForecast();
    }
  }, []);
  
 

  return (
    <div className="">

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-12 gap-6 px-6 py-8 ">
        {/* Left Column - Scrollable News Cards */}
        <div className="col-span-3 max-h-[80dvh] ">
          <div className="flex flex-col max-h-full space-y-4 pr-2 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent gap-3 ">
            {search.length === 0 ? (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <p className="text-white/70">No search results yet</p>
                  <p className="text-sm text-white/50 mt-2">Use voice search to find content</p>
                </CardContent>
              </Card>
            ) : (
              search.map((item, index) => (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-200 cursor-pointer group"
                >
                  <CardContent className="p-4">
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                      <div className="flex items-start gap-3">
                        {/* Image/Thumbnail */}
                        {(item.image || item.thumbnails?.[0]?.src) && (
                          <div className="flex-shrink-0">
                            <img
                              src={item.image || item.thumbnails[0].src}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-lg bg-white/10"
                              onError={(e) => {
                                e.currentTarget.style.display = "none"
                              }}
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Title */}
                          <h3 className="font-medium text-white line-clamp-2 group-hover:text-blue-200 transition-colors">
                            {item.title}
                          </h3>

                          {/* Display Link */}
                          <div className="flex items-center gap-1 mt-2">
                            <p className="text-sm text-white/60 truncate">{item.display_link}</p>
                            <ExternalLink className="w-3 h-3 text-white/40 flex-shrink-0" />
                          </div>

                          {/* Kind Badge */}
                          {item.kind && (
                            <Badge variant="secondary" className="mt-2 bg-white/20 text-white border-white/30 text-xs">
                              {item.kind}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Center Column - Empty to allow model to show through */}
        <div className="col-span-6 ">
          {/* Intentionally left empty to allow the 3D model to show through */}
          <div className="flex flex-col max-h-[80dvh] gap-4">
            <ModelHero3D />
            <VoiceVisual setSearchResult={setSearch}  />
          </div>
        </div>

        <div className="col-span-3 space-y-4 pt-6 max-h-[80dvh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <WeatherSection currentWeather={currentWeather} weatherForecast={weatherForecast} />
        </div>


      </div>
    </div>
  )
}
