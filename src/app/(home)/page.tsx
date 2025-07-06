"use client";
/* import necessary components */
// import { Button } from "@/components/ui/button"
/* Client components */
/* import section components */
import { ModelHero3D } from "./_sections/hero"
import { Logos3, type Logos3Props } from "./_sections/techstack"
import { Feature197 , type FeatureItem} from "./_sections/features"
import { Blog7, type Blog7Props } from "./_sections/getstarted"


/* import react and external library */
import { useEffect, useRef} from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

/* import icons */
/* Server components */
import { FaGolang } from "react-icons/fa6";
import { SiTemporal,SiOllama,SiMinio,SiOpenai } from "react-icons/si";
import { RiNextjsLine } from "react-icons/ri";
import { DiRedis,DiPostgresql,DiDocker  } from "react-icons/di";



const defaultLogo:Logos3Props = {
  heading : "Technology Stack",
  logos : [
    {
      id: "logo-1",
      description: "Golang",
      image: FaGolang,
      className: "h-12 w-auto", // Increased from h-7
    },
    {
      id: "logo-2",
      description: "Next.js",
      image: RiNextjsLine,
      className: "h-12 w-auto", // Increased from h-7
    },
    {
      id: "logo-3",
      description: "Temporal",
      image: SiTemporal,
      className: "h-12 w-auto", // Increased from h-7
    },
    {
      id: "logo-4",
      description: "Ollama",
      image: SiOllama,
      className: "h-12 w-auto", // Increased from h-7
    },
    {
      id: "logo-5",
      description: "Minio",
      image: SiMinio,
      className: "h-12 w-auto", // Increased from h-7
    },
    {
      id: "logo-6",
      description: "Redis",
      image: DiRedis,
      className: "h-12 w-auto", // Increased from h-7
    },
    {
      id: "logo-7",
      description: "Postgres",
      image: DiPostgresql,
      className: "h-12 w-auto", // Increased from h-7 
    },
    {
      id: "logo-8",
      description: "Docker",
      image: DiDocker ,
      className: "h-12 w-auto", // Increased from h-7
    },
    {
      id: "logo-9",
      description: "OpenAI",
      image: SiOpenai ,
      className: "h-12 w-auto", // Increased from h-7
    },
   
  ],
}

const defaultFeatures: FeatureItem[] = [
   {
    id: 1,
    title: "🌤️ Weather",
    image: "/assets/images/ig.png",
    description:
      "ตรวจสอบสภาพอากาศแบบเรียลไทม์ ด้วยข้อมูลจากแหล่งที่เชื่อถือ",
  },
  {
    id: 2,
    title: "🌍 Location",
    image: "/assets/images/map.png",
    description:
      "ระบุตำแหน่งผู้ใช้งานอัตโนมัติ เพื่อนำเสนอข้อมูลหรือบริการที่เกี่ยวข้องกับพื้นที่ปัจจุบัน",
  },
 
  {
    id: 3,
    title: "🔎 Search and Summarize",
    image: "/assets/images/sge-google.png",
    description:
      "ค้นหาข้อมูลจากแหล่งออนไลน์และสรุปประเด็นสำคัญให้อ่านง่าย พร้อมอ้างอิงแหล่งที่มาชัดเจน ",
  },
]


const defaultBlog: Blog7Props  = {
    tagline : "Latest Updates",
    heading : "How Does It Work?",
    description : "AI Assistant คือผู้ช่วยอัจฉริยะที่ออกแบบมาเพื่อช่วยตอบคำถาม แก้ปัญหา และเพิ่มประสิทธิภาพการทำงานในชีวิตประจำวัน ไม่ว่าคุณจะต้องการข้อมูล คำแนะนำ หรือช่วยจัดการงานต่าง ๆ ก็สามารถใช้งานได้ง่ายในไม่กี่ขั้นตอน",
    buttonUrl : "https://shadcnblocks.com",
    posts: [
          {
            id: "post-1",
            title: "Start",
            summary:
              "เริ่มต้นด้วยการลงทะเบียนหรือสร้างบัญชีผู้ใช้บนแพลตฟอร์มหรือเว็บไซต์ของ Assistant โดยกรอกข้อมูลพื้นฐาน เช่น อีเมลและรหัสผ่าน จากนั้นยืนยันตัวตนตามขั้นตอนที่กำหนด",
            label: "Tutorial",
            author: "Sarah Chen",
            published: "1 Jan 2024",
            url: "https://shadcnblocks.com",
            image: "https://images.unsplash.com/photo-1636056514473-dd532ed74cf2?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: "post-2",
            title: "Ask",
            summary:
              "เมื่อเข้าสู่ระบบแล้ว คุณสามารถพิมพ์หรือพูดคำถามหรือคำสั่งที่ต้องการให้ Assistant ช่วยเหลือ เช่น ขอข้อมูลข่าวสาร แปลภาษา หรือแนะนำร้านอาหาร ระบบจะประมวลผลและตอบกลับอย่างรวดเร็ว",
            label: "Accessibility",
            author: "Marcus Rodriguez",
            published: "1 Jan 2024",
            url: "https://shadcnblocks.com",
            image: "https://images.unsplash.com/photo-1724185773486-0b39642e607e?q=80&w=3133&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            id: "post-3",
            title: "Done",
            summary:
              "หลังจากได้รับคำตอบหรือความช่วยเหลือจาก Assistant คุณสามารถนำข้อมูลไปใช้ต่อ หรือสอบถามเพิ่มเติมได้ทันที ช่วยให้การทำงานหรือการค้นหาข้อมูลเป็นเรื่องง่ายและสะดวกยิ่งขึ้น",
            label: "Design Systems",
            author: "Emma Thompson",
            published: "1 Jan 2024",
            url: "https://shadcnblocks.com",
            image: "https://images.pexels.com/photos/5185164/pexels-photo-5185164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          },
        ]
}


const Home = () => {

  // Register ScrollTrigger plugin
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
  }
  const heroRef = useRef<HTMLElement>(null)
  const modelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const model = modelRef.current
    const content = contentRef.current
    const overlay = overlayRef.current
    const title = titleRef.current
    const description = descriptionRef.current
    const button = buttonRef.current

    if (!hero || !model || !content || !overlay) return

    // Create GSAP timeline for enhanced parallax effects with proper reversal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth scrolling effect
        onUpdate: (self) => {
          // Ensure animations reverse properly
          const progress = self.progress
          if (progress === 0) {
            // Reset all elements to initial state when back at top
            gsap.set([title, description, button], { clearProps: "all" })
            gsap.set(content, { clearProps: "all" })
            gsap.set(model, { clearProps: "all" })
            gsap.set(overlay, { clearProps: "all" })
          }
        },
      },
    })

    // Enhanced parallax effect: 3D model moves slower with rotation
    tl.to(
      model,
      {
        yPercent: -30,
        scale: 1.1,
        rotationX: 5,
        ease: "none",
      },
      0,
    )

    // Content moves faster and fades out with blur effect - with proper reversal
    tl.to(
      content,
      {
        yPercent: -80,
        opacity: 0.2,
        filter: "blur(2px)",
        ease: "none",
      },
      0,
    )

    // Individual text elements with different speeds - ensuring they return
    if (title) {
      tl.to(
        title,
        {
          yPercent: -120,
          opacity: 0,
          scale: 0.9,
          ease: "none",
        },
        0,
      )
    }

    if (description) {
      tl.to(
        description,
        {
          yPercent: -100,
          opacity: 0,
          ease: "none",
        },
        0,
      )
    }

    if (button) {
      tl.to(
        button,
        {
          yPercent: -80,
          opacity: 0,
          scale: 0.8,
          ease: "none",
        },
        0,
      )
    }

    // Overlay gets darker and transitions to match the accent color
    tl.to(
      overlay,
      {
        opacity: 0.95,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        ease: "none",
      },
      0,
    )

    // Enhanced entrance animations with more sophisticated timing
    const entranceTl = gsap.timeline({
      delay: 0.3,
      onComplete: () => {
        // Ensure elements are in their final state after entrance animation
        gsap.set([title, description, button], { clearProps: "transform,opacity,filter" })
      },
    })

    // 3D model entrance with scale and rotation
    entranceTl.fromTo(
      model,
      {
        scale: 1.2,
        opacity: 0,
        rotationY: 10,
        filter: "blur(10px)",
      },
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        filter: "blur(0px)",
        duration: 2.5,
        ease: "power3.out",
      },
      0,
    )

    // Staggered text animations with different effects
    if (title) {
      entranceTl.fromTo(
        title,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationX: 45,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        0.5,
      )
    }

    if (description) {
      entranceTl.fromTo(
        description,
        {
          y: 80,
          opacity: 0,
          filter: "blur(5px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
        },
        0.8,
      )
    }

    if (button) {
      entranceTl.fromTo(
        button,
        {
          y: 60,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
        },
        1.1,
      )
    }

    // Floating animation for the button
    if (button) {
      gsap.to(button, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 2,
      })
    }

    // Improved mouse movement parallax effect with bounds checking
    const handleMouseMove = (e: MouseEvent) => {
      if (!hero || !model || !content) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      const xPercent = (clientX / innerWidth - 0.5) * 2
      const yPercent = (clientY / innerHeight - 0.5) * 2

      // Only apply mouse parallax when not scrolled
      const scrollProgress = window.scrollY / window.innerHeight
      if (scrollProgress < 0.5) {
        gsap.to(model, {
          rotationY: xPercent * 5,
          rotationX: -yPercent * 5,
          duration: 1,
          ease: "power2.out",
        })

        gsap.to(content, {
          x: xPercent * 20,
          y: yPercent * 20,
          duration: 1,
          ease: "power2.out",
        })
      }
    }

    // Additional ScrollTrigger to ensure content visibility
    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom top",
      onEnter: () => {
        // Ensure content is visible when entering hero section
        gsap.set([title, description, button], { opacity: 1, visibility: "visible" })
      },
      onLeave: () => {
        // Content can fade out when leaving
      },
      onEnterBack: () => {
        // Restore content when scrolling back up
        gsap.to([title, description, button], {
          opacity: 1,
          visibility: "visible",
          duration: 0.5,
          ease: "power2.out",
        })
      },
      onLeaveBack: () => {
        // Ensure content is visible when at the very top
        gsap.set([title, description, button], { opacity: 1, visibility: "visible" })
      },
    })

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <section
        ref={heroRef}
        className="relative flex h-svh max-h-[1400px] w-svw overflow-hidden bg-cover bg-center bg-no-repeat font-sans"
      >
        {/* 3D Model Background Layer */}
        <div ref={modelRef} className="absolute inset-0 z-10">
          <ModelHero3D />
        </div>

        {/* Dark Overlay */}
        <div ref={overlayRef} className="absolute inset-0 z-20 bg-black/30" />

        {/* Content Foreground Layer */}
        <div ref={contentRef} className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="max-w-[46.25rem] flex flex-col items-center justify-center gap-6 px-5 text-center">
            <h1
              ref={titleRef}
              className="font-serif text-2xl leading-tight text-white md:text-4xl xl:text-[2.2rem] drop-shadow-lg"
            >
               Ratcha AI ผู้ช่วยอัจฉริยะที่พร้อมตอบสนองคุณด้วยข้อความและเสียงในทันที
            </h1>
            <p ref={descriptionRef} className="text-base text-white/90 drop-shadow-md">
              สัมผัสประสบการณ์ใหม่ของการโต้ตอบด้วย AI Assistant ที่เข้าใจคุณได้อย่างลึกซึ้ง
              พร้อมให้คำตอบและความช่วยเหลือในทุกเรื่องที่คุณต้องการ
            </p>
            {/* <div ref={buttonRef}>
              <Button className="h-fit w-fit rounded-full px-7 py-4 text-sm leading-tight font-medium bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Chat
              </Button>
            </div> */}
          </div>
        </div>
      </section>

      {/* Additional content sections with enhanced parallax */}
      <Logos3
      {...defaultLogo} 
      
      />
      <Feature197 features={defaultFeatures} />
      <Blog7 
        {...defaultBlog}
      />
    </>
  )
}

export default function Page() {
  return (
    <div>
      <Home />
    </div>
  )
}
