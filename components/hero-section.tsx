"use client"

import { useEffect, useRef, useState } from "react"

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [currentStory, setCurrentStory] = useState(0)
  const codeRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLCanvasElement>(null)

  const storyElements = [
    { text: "Hello World", subtitle: "Every journey begins with a single line of code" },
    { text: "Creative Developer", subtitle: "Crafting beautiful digital experiences with modern technologies" },
    { text: "Problem Solver", subtitle: "Turning complex challenges into elegant solutions" },
    { text: "Innovation Driven", subtitle: "Building the future, one pixel at a time" },
  ]

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap")
      const { TextPlugin } = await import("gsap/TextPlugin")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(TextPlugin, ScrollTrigger)

      gsap.set([titleRef.current, subtitleRef.current, buttonRef.current, codeRef.current], {
        opacity: 0,
        y: 100,
      })

      gsap.set(backgroundRef.current, {
        scale: 1.2,
        opacity: 0,
      })

      const canvas = particlesRef.current
      if (canvas) {
        const ctx = canvas.getContext("2d")
        const resizeCanvas = () => {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
        }
        
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = []
        const particleCount = window.innerWidth < 768 ? 25 : 50 // Fewer particles on mobile

        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
          })
        }

        const animateParticles = () => {
          if (!ctx) return
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.fillStyle = "rgba(139, 92, 246, 0.1)"

          particles.forEach((particle) => {
            particle.x += particle.vx
            particle.y += particle.vy

            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
          })

          requestAnimationFrame(animateParticles)
        }

        animateParticles()
      }

      const tl = gsap.timeline({ delay: 0.5 })

      tl.to(backgroundRef.current, {
        scale: 1,
        opacity: 0.1,
        duration: 2,
        ease: "power2.out",
      })

      tl.to(
        codeRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=1.5",
      )

      // Set initial text content before animation
      if (titleRef.current) {
        titleRef.current.textContent = storyElements[0].text
      }

      tl.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=1",
      )

      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=1",
      )

      tl.to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      )

      const storyInterval = setInterval(() => {
        setCurrentStory((prev) => {
          const next = (prev + 1) % storyElements.length

          gsap.to(titleRef.current, {
            text: {
              value: storyElements[next].text,
              delimiter: "",
            },
            duration: 1.5,
            ease: "power2.inOut",
          })

          gsap.to(subtitleRef.current, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              if (subtitleRef.current) {
                subtitleRef.current.textContent = storyElements[next].subtitle
              }
              gsap.to(subtitleRef.current, {
                opacity: 1,
                duration: 0.5,
              })
            },
          })

          return next
        })
      }, 4000)

      gsap.to(backgroundRef.current, {
        y: -20,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      })

      gsap.to(titleRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      gsap.to(subtitleRef.current, {
        y: -50,
        opacity: 0.5,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      const button = buttonRef.current
      if (button) {
        const handleMouseEnter = () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          })
        }

        const handleMouseLeave = () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
        }

        button.addEventListener("mouseenter", handleMouseEnter)
        button.addEventListener("mouseleave", handleMouseLeave)

        return () => {
          clearInterval(storyInterval)
          button.removeEventListener("mouseenter", handleMouseEnter)
          button.removeEventListener("mouseleave", handleMouseLeave)
          ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
      }
    }

    initGSAP()
  }, [])

  const handleScrollToProjects = () => {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      data-scroll-section
    >
      <canvas ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Floating elements - responsive positioning */}
      <div className="absolute top-16 sm:top-20 left-4 sm:left-10 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 border-2 border-accent/20 rounded-full animate-pulse" />
      <div className="absolute bottom-20 sm:bottom-32 right-8 sm:right-16 w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 bg-primary/10 rotate-45 animate-bounce" />
      <div className="absolute top-1/4 sm:top-1/3 right-8 sm:right-20 w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 border-2 border-primary/20 rotate-12" />
      <div className="absolute top-1/2 left-8 sm:left-16 w-6 sm:w-8 h-6 sm:h-8 bg-accent/20 rounded-full animate-ping" />
      <div
        className="absolute bottom-1/4 left-1/4 w-4 sm:w-6 h-4 sm:h-6 border border-secondary/30 rotate-45 animate-spin"
        style={{ animationDuration: "8s" }}
      />

      <div className="text-center w-full max-w-4xl mx-auto pt-16 sm:pt-32 lg:pt-72 z-10">
        <div
          ref={codeRef}
          className="bg-gray-900 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 text-left max-w-xs sm:max-w-sm lg:max-w-md mx-auto font-mono text-xs sm:text-sm border border-primary/20"
        >
          <div className="flex items-center gap-1 sm:gap-2 mb-2">
            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-500 rounded-full"></div>
            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-gray-300 text-xs sm:text-sm">
            <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span>{" "}
            <span className="text-white">=</span> <span className="text-green-400">"Sanish Pagui"</span>
            <br />
            <span className="text-purple-400">console</span>
            <span className="text-white">.</span>
            <span className="text-yellow-400">log</span>
            <span className="text-white">(</span>
            <span className="text-green-400">"Ready to create magic!"</span>
            <span className="text-white">)</span>
          </div>
        </div>

        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary mb-4 sm:mb-6 leading-tight whitespace-pre-line text-center px-2"
          data-scroll
          data-scroll-speed="0.5"
          data-scroll-delay="0.1"
        ></h1>

        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-xl lg:max-w-2xl mx-auto leading-relaxed text-center px-4"
          data-scroll
          data-scroll-speed="0.3"
          data-scroll-delay="0.2"
        >
          {storyElements[1].subtitle}
        </p>

        <button
          ref={buttonRef}
          onClick={handleScrollToProjects}
          className="bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-primary/90 transition-colors cursor-hover relative overflow-hidden group"
          data-scroll
          data-scroll-speed="0.2"
          data-scroll-delay="0.3"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="relative">Begin the Journey</span>
        </button>
      </div>
    </section>
  )
}