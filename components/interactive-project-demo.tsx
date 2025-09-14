"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  demoType: "Space" | "Portfolio" |  "Weather"
  color: string
  demoUrl: string
  sourceUrl: string
  image: string
}

const projects: Project[] = [
  {
    id: "Space",
    title: "Astro Guide",
    description: "A webpage which lets you explore about the asteroids and their orbits.",
    tech: ["Next.js", "TypeScript", "gsap", "shadcn ui"],
    demoType: "Space",
    color: "from-blue-500 to-purple-600",
    demoUrl: "https://cchack.vercel.app/",
    sourceUrl: "https://github.com/SanishPagui/cchack",
    image: "/astro.png"
  },
  {
    id: "Portfolio",
    title: "Portfolio",
    description: "A webpage which showcases my projects and skills.",
    tech: ["Next.js", "TypeScript", "gsap"],
    demoType: "Portfolio",
    color: "from-pink-500 to-rose-600",
    demoUrl: "https://portfolio-coral-two-27.vercel.app/",
    sourceUrl: "https://github.com/SanishPagui/portfolio",
    image: "/portfolio.png"
  },
  {
    id: "weather",
    title: "Weather Forecast App",
    description: "Beautiful weather app with location-based forecasts, interactive maps, and weather alerts.",
    tech: ["Next.js", "OpenWeather API", "Mapbox", "PWA", "gsap"],
    demoType: "Weather",
    color: "from-orange-500 to-yellow-600",
    demoUrl: "https://weather-dashboard-opal-delta.vercel.app/",
    sourceUrl: "https://github.com/SanishPagui/weather-dashboard",
    image: "/weather.png"
  },
]

const DemoComponent = ({ type, isActive, image }: { type: string; isActive: boolean; image: string }) => {
  const [currentData, setCurrentData] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setCurrentData((prev) => (prev + 1) % 100)
    }, 100)

    return () => clearInterval(interval)
  }, [isActive])

  return (
    <div className="relative w-full h-full">
      <Image
        src={image}
        alt={`${type} project preview`}
        fill
        className="object-cover rounded-lg"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-lg"></div>
    </div>
  )
}

export default function InteractiveProjectDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const cards = containerRef.current.querySelectorAll(".project-card")

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          rotationY: -15,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={containerRef} className="py-20 px-6 bg-gradient-to-b from-background to-muted/20" data-scroll-section>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">Interactive Project Demos</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore my projects through interactive demonstrations. Hover over each card to see live previews and
            animations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card group cursor-hover"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-border">
                <div className="mb-6">
                  <div className={`relative w-full h-48 rounded-lg mb-6 overflow-hidden`}>
                    <DemoComponent 
                      type={project.demoType} 
                      isActive={activeProject === project.id} 
                      image={project.image}
                    />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-hover"
                    >
                      View Demo
                    </a>
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors cursor-hover"
                    >
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
