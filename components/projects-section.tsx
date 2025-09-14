"use client"

import { useEffect, useRef } from "react"

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
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

      // Projects animation
      gsap.fromTo(
        projectsRef.current?.children || [],
        { opacity: 0, y: 100, rotationY: 15 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Hover animations for project cards
      const projectCards = projectsRef.current?.children
      if (projectCards) {
        Array.from(projectCards).forEach((card) => {
          const handleMouseEnter = () => {
            gsap.to(card, {
              y: -10,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
            })
          }

          const handleMouseLeave = () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            })
          }

          card.addEventListener("mouseenter", handleMouseEnter)
          card.addEventListener("mouseleave", handleMouseLeave)
        })
      }
    }

    initGSAP()
  }, [])

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A modern e-commerce solution built with Next.js, featuring real-time inventory, payment processing, and admin dashboard.",
      tech: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
      image: "/modern-ecommerce-interface.png",
      link: "#",
      github: "#",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management application with real-time updates, team collaboration, and advanced filtering.",
      tech: ["React", "Node.js", "Socket.io", "PostgreSQL"],
      image: "/task-management-dashboard.png",
      link: "#",
      github: "#",
    },
    {
      title: "Portfolio Website",
      description:
        "A stunning portfolio website with smooth animations, custom cursor, and locomotive scroll integration.",
      tech: ["Next.js", "GSAP", "Locomotive Scroll", "Tailwind"],
      image: "/portfolio-website-with-animations.jpg",
      link: "#",
      github: "#",
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather dashboard with interactive maps, forecasts, and location-based recommendations.",
      tech: ["React", "D3.js", "Weather API", "Mapbox"],
      image: "/weather-dashboard-maps.png",
      link: "#",
      github: "#",
    },
    {
      title: "Social Media App",
      description: "Full-stack social media application with real-time messaging, image sharing, and social features.",
      tech: ["Next.js", "Supabase", "WebRTC", "Tailwind"],
      image: "/social-media-app-interface.png",
      link: "#",
      github: "#",
    },
    {
      title: "Analytics Platform",
      description: "Business analytics platform with interactive charts, data visualization, and reporting features.",
      tech: ["React", "Chart.js", "Express", "Redis"],
      image: "/analytics-dashboard.png",
      link: "#",
      github: "#",
    },
  ]

  return (
    <section ref={sectionRef} id="projects" className="min-h-screen py-20 px-6" data-scroll-section>
      <div className="container mx-auto max-w-7xl">
        <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold text-foreground text-center mb-16">
          Featured Projects
        </h2>

        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-card rounded-xl overflow-hidden border border-border cursor-hover project-card group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.link}
                    className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg text-sm font-medium text-center hover:bg-primary/90 transition-colors cursor-hover"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    className="flex-1 border border-border py-2 px-4 rounded-lg text-sm font-medium text-center hover:bg-muted transition-colors cursor-hover"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
