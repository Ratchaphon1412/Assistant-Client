"use client"
import React, { useRef } from "react"
import Spline from "@splinetool/react-spline"
import type { Application } from "@splinetool/runtime"

export const ModelHero3D = () => {
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
    </div>
  )
}

