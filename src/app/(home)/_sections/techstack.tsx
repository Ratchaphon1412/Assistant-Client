"use client"
import AutoScroll from "embla-carousel-auto-scroll"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import type { IconType } from "react-icons/lib"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Logo {
  id: string
  description: string
  image: IconType
  className?: string
}

export interface Logos3Props {
  heading?: string
  logos?: Logo[]
  className?: string
}

export const Logos3 = (props: Logos3Props) => {
  const logoRef = useRef<HTMLElement>(null)
  const transitionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const logoSection = logoRef.current
    const transition = transitionRef.current
    if (!logoSection || !transition) return

    // Smooth transition animation
    gsap.fromTo(
      transition,
      {
        opacity: 0,
        height: "0vh",
      },
      {
        opacity: 1,
        height: "20vh",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: transition,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      },
    )

    // Parallax effect for logo section
    gsap.fromTo(
      logoSection,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: logoSection,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Floating animation for logos
    const logoItems = logoSection.querySelectorAll("[data-logo-item]")
    logoItems.forEach((logo, index) => {
      gsap.to(logo, {
        y: -10,
        duration: 2 + index * 0.1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: index * 0.2,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // สร้าง array ที่ทำซ้ำ logos หลายรอบเพื่อให้ scroll ได้แบบไม่มีสะดุด
  const duplicatedLogos = props.logos ? [...props.logos, ...props.logos, ...props.logos, ...props.logos] : []

  return (
    <>
      {/* Smooth transition gradient from hero to logos section */}
      <div id="#teachstack" ref={transitionRef} className="w-full bg-gradient-to-b from-black/90 to-accent"></div>

      <section ref={logoRef} className="bg-accent pt-10 pb-20">
        <div className="container flex flex-col items-center text-center">
          <h1 className="my-6 text-2xl font-bold text-pretty lg:text-4xl">{props.heading}</h1>
        </div>
        <div className="p-8">
          <div className="relative mx-auto flex items-center justify-center">
            <Carousel
              opts={{
                loop: true,
                align: "start",
                skipSnaps: false,
                dragFree: true,
              }}
              plugins={[
                AutoScroll({
                  playOnInit: true,
                  speed: 1, // ความเร็วในการเลื่อน (ยิ่งน้อยยิ่งช้า)
                  stopOnInteraction: false, // ไม่หยุดเมื่อ user โต้ตอบ
                  stopOnMouseEnter: true, // หยุดเมื่อ hover
                  startDelay: 0, // ไม่มี delay ในการเริ่ม
                }),
              ]}
            >
              <CarouselContent className="ml-0 p-2">
                {duplicatedLogos.map((logo, index) => (
                  <CarouselItem
                    key={`${logo.id}-${index}`} // ใช้ index เพื่อให้ key ไม่ซ้ำ
                    className="flex basis-1/3 justify-center pl-0 mr-2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                    data-logo-item
                  >
                    <div className="flex shrink-0 items-center justify-center">
                      <div>
                        <logo.image className={logo.className} />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-accent to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-accent to-transparent"></div>
          </div>
        </div>
      </section>
    </>
  )
}
