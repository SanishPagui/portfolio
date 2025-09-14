"use client"

import { useState, useEffect, useRef } from "react"
import LoadingScreen from "@/components/loading-screen"
import CustomCursor from "@/components/custom-cursor"
import LocomotiveScrollProvider from "@/components/locomotive-scroll-provider"
import HeroSection from "@/components/hero-section"
import StoryTimeline from "@/components/story-timeline"
import AboutSection from "@/components/about-section"
import SkillsConstellation from "@/components/skills-constellation"
import InteractiveProjectDemo from "@/components/interactive-project-demo"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import MobileNavigation from "@/components/mobile-navigation"
import ScrollProgress from "@/components/scroll-progress"
import ErrorBoundary from "@/components/error-boundary"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const mainRef = useRef<HTMLElement>(null)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none"

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.style.cursor = "auto"
      } else {
        document.body.style.cursor = "none"
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Hide cursor on mobile devices
    const isMobile = window.innerWidth <= 768
    const cursor = document.querySelector(".custom-cursor") as HTMLElement
    if (cursor && isMobile) {
      cursor.style.display = "none"
    }

    return () => {
      document.body.style.cursor = "auto"
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])
  
  useEffect(() => {
    if (!isLoading) {
      // Ensure the DOM is fully ready before initializing GSAP
      setTimeout(() => {
        initGSAP()
      }, 100)
    }

    return () => {
      // Clean up ScrollTrigger when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      ScrollTrigger.clearMatchMedia()
    }
  }, [isLoading])

  const initGSAP = () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)
    
    // Force all sections to be visible
    const sections = document.querySelectorAll('[data-scroll-section]')
    sections.forEach(section => {
      const el = section as HTMLElement
      el.style.visibility = 'visible'
      el.style.opacity = '1'
      el.style.display = 'block'
    })
    
    // Force the main container to be visible
    if (mainRef.current) {
      mainRef.current.style.visibility = 'visible'
      mainRef.current.style.opacity = '1'
    }
    
    // Give ScrollTrigger time to initialize properly with multiple refresh attempts
    setTimeout(() => {
      ScrollTrigger.refresh(true) // First refresh
      
      // Second refresh after a delay
      setTimeout(() => {
        ScrollTrigger.refresh(true)
      }, 500)
    }, 200)
  }

  return (
    <ErrorBoundary>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {!isLoading && (
        <>
          <CustomCursor />
          <ScrollProgress />

          {/* Fixed header must be outside the scroll container */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
            <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
              <div className="text-2xl font-bold text-primary cursor-hover">Sanish Pagui</div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8 md:gap-8">
                <a href="#home" className="text-foreground hover:text-primary transition-colors cursor-pointer cursor-hover">
                  Home
                </a>
                <a href="#story" className="text-foreground hover:text-primary transition-colors cursor-pointer cursor-hover">
                  Story
                </a>
                <a href="#about" className="text-foreground hover:text-primary transition-colors cursor-pointer cursor-hover">
                  About
                </a>
                <a href="#skills" className="text-foreground hover:text-primary transition-colors cursor-pointer cursor-hover">
                  Skills
                </a>
                <a href="#projects" className="text-foreground hover:text-primary transition-colors cursor-pointer cursor-hover">
                  Projects
                </a>
                <a href="#contact" className="text-foreground hover:text-primary transition-colors cursor-pointer cursor-hover">
                  Contact
                </a>
              </div>

              {/* Mobile Navigation */}
              <MobileNavigation />
            </nav>
          </header>

          <LocomotiveScrollProvider>
            <main ref={mainRef} className="min-h-screen main-content" style={{visibility: 'visible', opacity: 1, display: 'block'}}>
              <section id="home" data-scroll-section style={{visibility: 'visible', opacity: 1}}>
                <HeroSection />
              </section>
              <section id="story" data-scroll-section style={{visibility: 'visible', opacity: 1}}>
                <StoryTimeline />
              </section>
              <section id="about" data-scroll-section style={{visibility: 'visible', opacity: 1}}>
                <AboutSection />
              </section>
              <div id="skills" data-scroll-section style={{visibility: 'visible', opacity: 1}}>
                <SkillsConstellation />
              </div>
              <section id="projects" data-scroll-section style={{visibility: 'visible', opacity: 1}}>
                <InteractiveProjectDemo />
              </section>
              <section id="projects-list" data-scroll-section style={{visibility: 'visible', opacity: 1}}>
                <ProjectsSection />
              </section>
              <section id="contact" data-scroll-section style={{visibility: 'visible', opacity: 1}}>
                <ContactSection />
              </section>

              <footer className="bg-muted py-12 px-6" data-scroll-section style={{visibility: 'visible', opacity: 1}}>
                <div className="container mx-auto max-w-6xl">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                      <p className="text-muted-foreground">© 2025 Sanish Pagui. Crafted with passion and code.</p>
                    </div>
                    <div className="flex gap-6">
                      <a
                        href="https://github.com/sanishpagui"
                        className="text-muted-foreground hover:text-primary transition-colors cursor-hover"
                        aria-label="GitHub"
                      >
                        GitHub
                      </a>
                      <a
                        href="https://www.linkedin.com/in/sanish-pagui-529789307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                        className="text-muted-foreground hover:text-primary transition-colors cursor-hover"
                        aria-label="LinkedIn"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="https://x.com/Sanish24144248"
                        className="text-muted-foreground hover:text-primary transition-colors cursor-hover"
                        aria-label="Twitter"
                      >
                        Twitter
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
            </main>
          </LocomotiveScrollProvider>
        </>
      )}
    </ErrorBoundary>
  )
}
