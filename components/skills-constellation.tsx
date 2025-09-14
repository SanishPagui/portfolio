"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { name: "React", level: 95, x: 15, y: 20, color: "#61DAFB" },
  { name: "TypeScript", level: 90, x: 85, y: 20, color: "#3178C6" },
  { name: "Next.js", level: 88, x: 50, y: 35, color: "#000000" },
  { name: "Node.js", level: 85, x: 25, y: 50, color: "#339933" },
  { name: "Python", level: 82, x: 75, y: 50, color: "#3776AB" },
  { name: "GSAP", level: 78, x: 15, y: 80, color: "#88CE02" },
  { name: "Three.js", level: 75, x: 40, y: 65, color: "#000000" },
  { name: "PostgreSQL", level: 80, x: 60, y: 65, color: "#336791" },
  { name: "C++", level: 70, x: 85, y: 80, color: "#2496ED" },
  { name: "C", level: 72, x: 50, y: 90, color: "#FF9900" },
]

export default function SkillsConstellation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animate skill nodes
    const skillNodes = containerRef.current.querySelectorAll(".skill-node")

    skillNodes.forEach((node, index) => {
      gsap.fromTo(
        node,
        {
          opacity: 0,
          scale: 0,
          rotation: -180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    // Draw connections between skills
    const drawConnections = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = "rgba(139, 92, 246, 0.15)"
      ctx.lineWidth = 0.8

      skills.forEach((skill, i) => {
        skills.slice(i + 1).forEach((otherSkill) => {
          const distance = Math.sqrt(Math.pow(skill.x - otherSkill.x, 2) + Math.pow(skill.y - otherSkill.y, 2))

          if (distance < 50) {
            ctx.beginPath()
            ctx.moveTo((skill.x / 100) * canvas.offsetWidth, (skill.y / 100) * canvas.offsetHeight)
            ctx.lineTo((otherSkill.x / 100) * canvas.offsetWidth, (otherSkill.y / 100) * canvas.offsetHeight)
            ctx.stroke()
          }
        })
      })
    }

    const animateConnections = () => {
      drawConnections()
      requestAnimationFrame(animateConnections)
    }

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 70%",
      onEnter: () => animateConnections(),
    })

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative py-20 px-6 bg-gradient-to-b from-muted/20 to-background overflow-hidden"
      data-scroll-section
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">Skills Constellation</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My technical expertise mapped as an interactive constellation. Each star represents a skill, connected by
            the relationships between technologies.
          </p>
        </div>

        <div className="relative h-96 md:h-[600px]">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-node absolute cursor-hover group"
              style={{
                left: `${skill.x}%`,
                top: `${skill.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative">
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-125 group-hover:shadow-2xl"
                  style={{ backgroundColor: skill.color }}
                >
                  <span className="text-white font-bold text-sm md:text-base">{skill.name.slice(0, 2)}</span>
                </div>

                <div className="absolute z-20 -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
                    <div className="text-sm font-semibold text-foreground">{skill.name}</div>
                    <div className="text-xs text-muted-foreground">{skill.level}% proficiency</div>
                  </div>
                </div>

                <div
                  className="absolute inset-0 rounded-full opacity-20 animate-pulse"
                  style={{
                    backgroundColor: skill.color,
                    animation: `pulse 2s infinite ${index * 0.2}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
