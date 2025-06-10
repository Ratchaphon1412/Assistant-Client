"use client";
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"


import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useEffect, useRef} from "react"


interface Post {
  id: string
  title: string
  summary: string
  label: string
  author: string
  published: string
  url: string
  image: string
}

export interface Blog7Props {
  tagline: string
  heading: string
  description: string
  buttonUrl: string
  posts: Post[]
}


export const Blog7 = (props: Blog7Props) => {
  const blogRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const blogSection = blogRef.current
    if (!blogSection) return

    // Header animation
    const header = blogSection.querySelector("[data-blog-header]")
    gsap.fromTo(
      header,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: blogSection,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Cards stagger animation
    const cards = blogSection.querySelectorAll("[data-blog-card]")
    gsap.fromTo(
      cards,
      { y: 100, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: blogSection,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Hover animations for cards
    cards.forEach((card) => {
      const cardElement = card as HTMLElement

      cardElement.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      cardElement.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={blogRef} className="py-32">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center" data-blog-header>
          <Badge variant="secondary" className="mb-6">
            {props.tagline}
          </Badge>
          <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {props.heading}
          </h2>
          <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">{props.description}</p>
        
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {props.posts.map((post) => (
            <Card
              key={post.id}
              className="grid grid-rows-[auto_auto_1fr_auto] pt-0 cursor-pointer transition-all duration-300"
              data-blog-card
            >
              <div className="aspect-16/9 w-full overflow-hidden">
                <a
                  href={post.url}
                  target="_blank"
                  className="transition-opacity duration-200 fade-in hover:opacity-70"
                  rel="noreferrer"
                >
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  />
                </a>
              </div>
              <CardHeader>
                <h3 className="text-lg font-semibold hover:underline md:text-xl">
                  <a href={post.url} target="_blank" rel="noreferrer">
                    {post.title}
                  </a>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.summary}</p>
              </CardContent>
              <CardFooter>
                
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}