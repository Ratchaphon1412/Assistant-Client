import { Card, CardContent } from "@/components/ui/card"
import { ForwardRefExoticComponent , RefAttributes } from "react"
import { Cloud, Sun,LucideProps } from "lucide-react"

type Props = {
    weatherForecast: WeatherForecast[]
}

type WeatherForecast ={
    day: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">> & RefAttributes<SVGSVGElement>
    temp: string
    condition: string
}

export const WeatherSection = (props:Props) => {
    return (
        <>
        {/* Right Column - Weather */}
        <div className="flex flex-col gap-2">
          {/* Current Weather */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white ">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-white/60">Sat, 14:40</p>
                  <p className="text-4xl font-bold">28°</p>
                  <p className="text-sm text-white/80">Partly Sunny</p>
                </div>
                <div className="relative">
                  <Sun className="w-12 h-12 text-yellow-400" />
                  <Cloud className="w-8 h-8 text-white/60 absolute -bottom-1 -right-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weather Forecast */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white ">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Weather Forecast Bangkok, TH</h3>
              <div className="space-y-3">
                {props.weatherForecast.map((day, index) => {
                  const IconComponent = day.icon
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm w-8">{day.day}</span>
                      <IconComponent className="w-5 h-5 text-white/70" />
                      <span className="text-sm font-medium">{day.temp}</span>
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