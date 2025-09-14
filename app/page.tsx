"use client"

import { useState, useEffect } from "react"
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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

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

    return () => {
      document.body.style.cursor = "auto"
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

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
            <main className="min-h-screen pt-20">
              <section id="home" data-scroll-section>
                <HeroSection />
              </section>
              <section id="story">
                <StoryTimeline />
              </section>
              <section data-scroll-section>
                <AboutSection />
              </section>
              <div id="skills" data-scroll-section>
                <SkillsConstellation />
              </div>
              <section data-scroll-section>
                <InteractiveProjectDemo />
              </section>
              <section data-scroll-section>
                <ProjectsSection />
              </section>
              <section data-scroll-section>
                <ContactSection />
              </section>

              <footer className="bg-muted py-12 px-6" data-scroll-section>
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
                        href="https://linkedin.com/in/sanishpagui"
                        className="text-muted-foreground hover:text-primary transition-colors cursor-hover"
                        aria-label="LinkedIn"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="https://twitter.com/sanishpagui"
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
