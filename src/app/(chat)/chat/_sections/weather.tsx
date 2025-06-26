"use client"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'



type Props = {
    currentWeather: CurrentWeather
    weatherForecast: ForecastWeather[]

}
type ForecastWeather = {
    weather_name:string
    temp: number
    weather_description: string
    icon: string
    date_txt: string
}

type CurrentWeather = {
    weather_name:string
    temp: number
    weather_description: string
    icon: string
    location_name: string
}



export const WeatherSection = (props:Props) => {
    const now = new Date();
    const weekday = now.toLocaleDateString('th-TH', { weekday: 'long' });
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const time = `${hour}:${minute}`;


    return (
        <>
        {/* Right Column - Weather */}
        <div className="flex flex-col gap-2">
          {/* Current Weather */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white ">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-white/60">{weekday} , {time}</p>
                  <p className="text-4xl font-bold">{props.currentWeather.temp} °C</p>
                  <p className="text-sm text-white/80">{props.currentWeather.weather_name}</p>
                  <p className="text-xs text-white/60">{props.currentWeather.weather_description}</p>
                  <p className="text-xs text-white/60">{props.currentWeather.location_name}</p>
                </div>
                <div className="relative">
                    <Image
                        src={`https://openweathermap.org/img/wn/` + props.currentWeather.icon + `@2x.png`}
                        width={72}
                        height={72} alt={props.currentWeather.weather_name}
                    />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weather Forecast */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white ">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Weather Forecast {props.currentWeather.location_name}</h3>
              <div className="space-y-3">
                {props.weatherForecast.map((day, index) => {
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm w-8">{new Date(day.date_txt).toLocaleString('th-TH', {
                            weekday: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</span>
                      
                        <Image
                            src={`https://openweathermap.org/img/wn/` + day.icon + `@2x.png`}
                            width={72}
                            height={72} alt={props.currentWeather.weather_name}
                        />
                      <span className="text-sm font-medium">{day.temp} °C</span>
                    <span className="text-xs text-white/60">{day.weather_description}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        </>
    )
}