"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}


export interface FeatureItem {
  id: number
  title: string
  image: string
  description: string
}

interface Feature197Props {
  features: FeatureItem[]
}



export const Feature197 = (props: Feature197Props) => {
  const [activeTabId, setActiveTabId] = useState<number | null>(1)
  const [activeImage, setActiveImage] = useState(props.features[0].image)
  const featureRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const feature = featureRef.current
    if (!feature) return

    // Parallax effect for feature section
    gsap.fromTo(
      feature,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: feature,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Stagger animation for accordion items
    const accordionItems = feature.querySelectorAll("[data-accordion-item]")
    gsap.fromTo(
      accordionItems,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: feature,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={featureRef} className="py-32">
      <div className="container mx-auto">
        <div className="mb-12 flex w-full items-start justify-between gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Features</h2>
            <p className="mb-6 text-muted-foreground">
              ปลดล็อกโลกใหม่ของการโต้ตอบด้วย Voice Assistant AI ของเรา ผู้ช่วยอัจฉริยะที่พร้อมตอบสนองคุณด้วยข้อความและเสียงในทันที
            </p>
            <Accordion type="single" className="w-full" defaultValue="item-1">
              {props.features.map((tab) => (
                <AccordionItem key={tab.id} value={`item-${tab.id}`} data-accordion-item>
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(tab.image)
                      setActiveTabId(tab.id)
                    }}
                    className="cursor-pointer py-5 no-underline! transition"
                  >
                    <h6
                      className={`text-xl font-semibold ${tab.id === activeTabId ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {tab.title}
                    </h6>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mt-3 text-muted-foreground">{tab.description}</p>
                    <div className="mt-4 md:hidden">
                      <img
                        src={tab.image || "/placeholder.svg"}
                        alt={tab.title}
                        className="h-full max-h-80 w-full rounded-md object-cover"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="relative m-auto hidden w-1/2 overflow-hidden rounded-xl bg-muted md:block">
            <img
              src={activeImage || "/placeholder.svg"}
              alt="Feature preview"
              className="aspect-4/3 rounded-md object-cover pl-4"
            />
          </div>
        </div>
      </div>
    </section>
  )
}