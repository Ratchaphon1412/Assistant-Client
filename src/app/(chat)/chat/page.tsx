"use client"

import Spline from "@splinetool/react-spline"
import type { Application } from "@splinetool/runtime"
import { useRef } from "react"
import { Cloud, Sun, CloudRain } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const weatherForecast = [
  { day: "Sun", icon: Sun, temp: "32.3", condition: "sunny" },
  { day: "Mon", icon: Cloud, temp: "30.1", condition: "cloudy" },
  { day: "Tue", icon: Cloud, temp: "29.3", condition: "cloudy" },
  { day: "Wed", icon: Cloud, temp: "27.3", condition: "cloudy" },
  { day: "Thu", icon: Cloud, temp: "26.5", condition: "cloudy" },
  { day: "Fri", icon: CloudRain, temp: "27.5", condition: "rainy" },
]

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

const ModelHero3D = () => {
  const splineRef = useRef<Application | null>(null)

  // Handle the Spline scene load
  const handleLoad = (spline: Application) => {
    splineRef.current = spline
    // Set initial zoom level - adjust the value as needed
    // The camera position might need adjustment based on your specific model
    spline.setZoom(0.45) // Set your desired zoom level
  }

  return (
    <div className=" flex flex-col items-center justify-center ">
      {/* 3D Model Container */}
      <div className="w-full ">
        <Spline scene="https://prod.spline.design/Ta2HMunMnI24HlhJ/scene.splinecode" onLoad={handleLoad} />
      </div>

      {/* Scrollable Text positioned closer to the model */}
      <div className=" px-4  max-h-24 overflow-y-auto ">

        <p className=" text-center  text-white/80 text-sm leading-relaxed ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, explicabo facere! Aut nisi
          exercitationem, quod nihil magnam repellat molestias beatae alias. Quis quibusdam dicta est officia eum
          cumque similique maiores! Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
          beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>

      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="">
      {/* 3D Model Background - Fixed z-index to be behind content */}
      {/* <div className="absolute inset-0 z-0  items-center justify-center bg-amber-300">
        <ModelHero3D />
      </div> */}

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
        <div className="col-span-6 max-h-[80dvh] ">
          {/* Intentionally left empty to allow the 3D model to show through */}
            <ModelHero3D />
        </div>

        {/* Right Column - Weather */}
        <div className="col-span-3 space-y-4 pt-6 max-h-[80dvh] ">
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
                {weatherForecast.map((day, index) => {
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
      </div>
    </div>
  )
}
