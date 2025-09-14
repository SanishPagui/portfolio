"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  demoType: "ecommerce" | "dashboard" | "social" | "weather"
  color: string
}

const projects: Project[] = [
  {
    id: "ecommerce",
    title: "Modern E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    tech: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
    demoType: "ecommerce",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: "dashboard",
    title: "Analytics Dashboard",
    description: "Real-time data visualization dashboard with interactive charts and customizable widgets.",
    tech: ["React", "D3.js", "Node.js", "MongoDB", "Socket.io"],
    demoType: "dashboard",
    color: "from-green-500 to-teal-600",
  },
  {
    id: "social",
    title: "Social Media App",
    description: "A modern social platform with real-time messaging, content sharing, and community features.",
    tech: ["React Native", "Firebase", "Redux", "WebRTC"],
    demoType: "social",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "weather",
    title: "Weather Forecast App",
    description: "Beautiful weather app with location-based forecasts, interactive maps, and weather alerts.",
    tech: ["Vue.js", "OpenWeather API", "Mapbox", "PWA"],
    demoType: "weather",
    color: "from-orange-500 to-yellow-600",
  },
]

const DemoComponent = ({ type, isActive }: { type: string; isActive: boolean }) => {
  const [currentData, setCurrentData] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setCurrentData((prev) => (prev + 1) % 100)
    }, 100)

    return () => clearInterval(interval)
  }, [isActive])

  switch (type) {
    case "ecommerce":
      return (
        <div className="bg-white rounded-lg p-4 shadow-lg min-h-[200px]">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">Product Dashboard</h4>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded">
              <div className="text-2xl font-bold text-blue-600">${(currentData * 10 + 1250).toLocaleString()}</div>
              <div className="text-sm text-gray-600">Revenue</div>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <div className="text-2xl font-bold text-green-600">{currentData + 45}</div>
              <div className="text-sm text-gray-600">Orders</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Sales Progress</span>
              <span>{currentData}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentData}%` }}
              ></div>
            </div>
          </div>
        </div>
      )

    case "dashboard":
      return (
        <div className="bg-gray-900 rounded-lg p-4 shadow-lg min-h-[200px] text-white">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Analytics Overview</h4>
            <div className="text-green-400 text-sm">● Live</div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-800 p-3 rounded">
              <div className="text-lg font-bold text-green-400">{(currentData * 100 + 12500).toLocaleString()}</div>
              <div className="text-xs text-gray-400">Users</div>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <div className="text-lg font-bold text-blue-400">{currentData + 85}%</div>
              <div className="text-xs text-gray-400">Uptime</div>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <div className="text-lg font-bold text-purple-400">{(currentData * 5 + 250).toLocaleString()}</div>
              <div className="text-xs text-gray-400">Requests</div>
            </div>
          </div>
          <div className="mt-4 h-16 bg-gray-800 rounded flex items-end justify-between px-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-blue-500 to-purple-500 w-2 rounded-t transition-all duration-300"
                style={{ height: `${Math.random() * 60 + 10}px` }}
              ></div>
            ))}
          </div>
        </div>
      )

    default:
      return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-4 shadow-lg min-h-[200px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🚀</div>
            <div className="text-gray-600">Interactive Demo</div>
          </div>
        </div>
      )
  }
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
                  <div className={`w-full h-48 bg-gradient-to-br ${project.color} rounded-lg mb-6 overflow-hidden`}>
                    <DemoComponent type={project.demoType} isActive={activeProject === project.id} />
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
                    <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-hover">
                      View Demo
                    </button>
                    <button className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors cursor-hover">
                      Source Code
                    </button>
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
