"use client"

import { useEffect, useRef, useState } from "react"

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)

  const storyMilestones = [
    {
      year: "2018",
      title: "First Line of Code",
      description: "Started my journey with HTML & CSS, building my first website",
      icon: "💻",
      color: "from-blue-500 to-cyan-500",
    },
    {
      year: "2019",
      title: "JavaScript Mastery",
      description: "Dove deep into JavaScript and discovered the power of interactivity",
      icon: "⚡",
      color: "from-yellow-500 to-orange-500",
    },
    {
      year: "2021",
      title: "React Revolution",
      description: "Embraced React and modern frontend development practices",
      icon: "⚛️",
      color: "from-blue-400 to-purple-500",
    },
    {
      year: "2022",
      title: "Full-Stack Evolution",
      description: "Expanded to backend development with Node.js and databases",
      icon: "🚀",
      color: "from-green-500 to-teal-500",
    },
    {
      year: "2024",
      title: "Creative Innovation",
      description: "Specializing in animations, 3D experiences, and cutting-edge web tech",
      icon: "✨",
      color: "from-purple-500 to-pink-500",
    },
  ]

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item")
      if (timelineItems) {
        gsap.fromTo(
          timelineItems,
          { opacity: 0, x: -50, scale: 0.8 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 90%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      gsap.fromTo(
        skillsRef.current?.children || [],
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.2 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const storyInterval = setInterval(() => {
        setCurrentStoryIndex((prev) => (prev + 1) % storyMilestones.length)
      }, 3000)

      return () => clearInterval(storyInterval)
    }

    initGSAP()
  }, [])

  const skills = ["React", "Next.js", "TypeScript", "Node.js", "GSAP", "Tailwind CSS", "MongoDB", "PostgreSQL"]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex items-center justify-center px-6 bg-card relative overflow-hidden"
      data-scroll-section
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"
        data-scroll
        data-scroll-speed="-0.5"
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold text-card-foreground mb-8">
              My Story
            </h2>

            <div ref={contentRef} className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm Sanish Pagui, a passionate full-stack developer who believes in the power of code to transform ideas
                into reality. My journey began with curiosity and has evolved into a mission to create digital
                experiences that inspire and engage.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                From crafting pixel-perfect interfaces to architecting scalable backends, I thrive on solving complex
                problems with elegant solutions. Every project is an opportunity to push boundaries and explore new
                possibilities.
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${storyMilestones[currentStoryIndex].color} rounded-full flex items-center justify-center text-2xl`}
                  >
                    {storyMilestones[currentStoryIndex].icon}
                  </div>
                  <div>
                    <div className="text-sm text-primary font-mono">{storyMilestones[currentStoryIndex].year}</div>
                    <div className="text-lg font-semibold text-card-foreground">
                      {storyMilestones[currentStoryIndex].title}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{storyMilestones[currentStoryIndex].description}</p>

                <div className="flex gap-2 mt-4">
                  {storyMilestones.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStoryIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all cursor-hover ${
                        index === currentStoryIndex ? "bg-primary w-6" : "bg-primary/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-xl font-semibold text-card-foreground mb-4">Technologies I work with:</h3>
                <div ref={skillsRef} className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium cursor-hover hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div
              ref={imageRef}
              className="w-80 h-80 bg-gradient-to-br from-primary to-accent rounded-2xl relative overflow-hidden group cursor-hover"
            >
              <div className="absolute inset-4 bg-background/90 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:bg-background/95">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center relative overflow-hidden">
                    <span className="text-2xl font-bold text-primary z-10">AC</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 animate-pulse"></div>
                  </div>
                  <p className="text-muted-foreground">Sanish Pagui</p>
                  <p className="text-sm text-primary">Creative Developer</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>

            <div ref={timelineRef} className="w-full max-w-sm">
              <h4 className="text-lg font-semibold text-card-foreground mb-4 text-center">Journey Timeline</h4>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent"></div>
                {storyMilestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`timeline-item flex items-center gap-4 mb-6 cursor-hover transition-all duration-300 ${
                      index === currentStoryIndex ? "scale-105" : "hover:scale-102"
                    }`}
                    onClick={() => setCurrentStoryIndex(index)}
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${milestone.color} rounded-full flex items-center justify-center text-lg z-10 border-4 border-background shadow-lg`}
                    >
                      {milestone.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-primary font-mono">{milestone.year}</div>
                      <div className="text-sm font-medium text-card-foreground">{milestone.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
