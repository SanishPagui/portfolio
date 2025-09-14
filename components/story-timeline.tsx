"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const storySteps = [
  {
    id: "origin",
    title: "The Beginning",
    content: "Every great developer starts with a single line of code...",
    year: "2018",
    icon: "💡",
  },
  {
    id: "learning",
    title: "The Learning Journey",
    content: "Countless hours of debugging, learning, and growing...",
    year: "2019-2021",
    icon: "📚",
  },
  {
    id: "building",
    title: "Building Dreams",
    content: "Turning ideas into reality, one project at a time...",
    year: "2022-2023",
    icon: "🚀",
  },
  {
    id: "mastery",
    title: "Mastering the Craft",
    content: "Specializing in modern web technologies and user experiences...",
    year: "2024",
    icon: "⚡",
  },
]

export default function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !timelineRef.current) return

    const container = containerRef.current
    const timeline = timelineRef.current
    const steps = container.querySelectorAll(".story-step")

    // Set initial state for all story content to be visible immediately
    gsap.set(steps, { opacity: 1 })
    gsap.set(container.querySelectorAll(".story-content"), { opacity: 1, y: 0, scale: 1 })
    gsap.set(container.querySelectorAll(".story-icon"), { rotation: 0, scale: 1, opacity: 1 })

    // Initialize timeline without Locomotive Scroll
    const initTimeline = () => {
      try {
        // Calculate the total scroll distance needed
        const totalWidth = timeline.scrollWidth
        const viewportWidth = window.innerWidth
        const scrollDistance = totalWidth - viewportWidth

        // Only proceed if we have content to scroll
        if (scrollDistance > 0) {
          // Horizontal scroll animation with proper pinning
          const scrollTween = gsap.to(timeline, {
            x: -scrollDistance,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              pin: true,
              start: "top top",
              end: `+=${scrollDistance}`,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                // Ensure content is visible during scroll
                const progress = self.progress
                steps.forEach((step, index) => {
                  const stepProgress = Math.max(0, Math.min(1, (progress * steps.length) - index))
                  if (stepProgress > 0.1) {
                    gsap.set(step.querySelector(".story-content"), { opacity: 1 })
                    gsap.set(step.querySelector(".story-icon"), { opacity: 1 })
                  }
                })
              },
            },
          })

          // Animate each step with better timing
          steps.forEach((step, index) => {
            // Content animation
            gsap.fromTo(
              step.querySelector(".story-content"),
              {
                opacity: 0,
                y: 50,
                scale: 0.9,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: step,
                  containerAnimation: scrollTween,
                  start: "left 90%",
                  end: "left 10%",
                  toggleActions: "play none none reverse",
                },
              },
            )

            // Icon animation
            gsap.fromTo(
              step.querySelector(".story-icon"),
              {
                rotation: -90,
                scale: 0.5,
                opacity: 0,
              },
              {
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: step,
                  containerAnimation: scrollTween,
                  start: "left 85%",
                  end: "left 15%",
                  toggleActions: "play none none reverse",
                },
              },
            )
          })
        } else {
          // If no horizontal scroll needed, just animate the first step
          const firstStep = steps[0]
          if (firstStep) {
            gsap.fromTo(
              firstStep.querySelector(".story-content"),
              {
                opacity: 0,
                y: 50,
                scale: 0.9,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: container,
                  start: "top 80%",
                  end: "top 20%",
                  toggleActions: "play none none reverse",
                },
              },
            )

            gsap.fromTo(
              firstStep.querySelector(".story-icon"),
              {
                rotation: -90,
                scale: 0.5,
                opacity: 0,
              },
              {
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: container,
                  start: "top 70%",
                  end: "top 30%",
                  toggleActions: "play none none reverse",
                },
              },
            )
          }
        }
      } catch (error) {
        console.warn("GSAP ScrollTrigger failed to initialize:", error)
        // Fallback: ensure all content is visible
        gsap.set(steps, { opacity: 1 })
        gsap.set(container.querySelectorAll(".story-content"), { opacity: 1, y: 0, scale: 1 })
        gsap.set(container.querySelectorAll(".story-icon"), { rotation: 0, scale: 1, opacity: 1 })
      }
    }

    // Initialize immediately without waiting for Locomotive Scroll
    const timer = setTimeout(initTimeline, 100)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="story-timeline h-screen overflow-hidden bg-gradient-to-r from-background via-muted/20 to-background"
    >
      <div ref={timelineRef} className="flex items-center h-full" style={{ width: `${storySteps.length * 100}vw` }}>
        {storySteps.map((step, index) => (
          <div
            key={step.id}
            className="story-step flex-shrink-0 w-screen h-full flex items-center justify-center px-12"
          >
            <div className="story-content max-w-2xl text-center">
              <div className="story-icon text-8xl mb-8 inline-block">{step.icon}</div>
              <div className="text-sm text-primary font-mono mb-4 tracking-wider">{step.year}</div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">{step.title}</h2>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">{step.content}</p>
              <div className="mt-8 w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
