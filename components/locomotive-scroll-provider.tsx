"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface LocomotiveScrollProviderProps {
  children: ReactNode
}

export default function LocomotiveScrollProvider({ children }: LocomotiveScrollProviderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const locomotiveScrollRef = useRef<any>(null)

  useEffect(() => {
    // Ensure we're in the browser environment
    if (typeof window === "undefined") return

    // Disable overflow hidden on body to allow scrolling
    document.body.style.overflow = "visible"
    
    const initLocomotiveScroll = async () => {
      try {
        // Import GSAP and ScrollTrigger first to ensure they're available
        const gsapModule = await import("gsap")
        const gsap = gsapModule.gsap || gsapModule.default
        const ScrollTriggerModule = await import("gsap/ScrollTrigger")
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default
        
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger)
        
        // Import Locomotive Scroll
        const LocomotiveScroll = (await import("locomotive-scroll")).default
        
        if (!scrollRef.current) return
        
        // Check if we're on Windows to adjust settings
        const isWindows = navigator.userAgent.indexOf('Windows') !== -1;
        
        // Initialize Locomotive Scroll with platform-specific settings
        const locomotiveScroll = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: !isWindows, // Disable smooth scrolling on Windows
          multiplier: isWindows ? 0.5 : 0.8,
          class: "is-revealed",
          reloadOnContextChange: true,
          lenisOptions: {
            lerp: isWindows ? 0.05 : 0.08,
            duration: isWindows ? 0.5 : 1.0,
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: !isWindows, // Disable smooth wheel on Windows
            wheelMultiplier: isWindows ? 0.5 : 0.8,
            touchMultiplier: isWindows ? 1.0 : 1.5,
            normalizeWheel: !isWindows, // Disable wheel normalization on Windows
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          },
        })
        
        // Store reference for cleanup
        locomotiveScrollRef.current = locomotiveScroll
        
        // Set up ScrollTrigger integration
        const scrollerElement = scrollRef.current
        
        // Configure ScrollTrigger to work with Locomotive Scroll
        ScrollTrigger.scrollerProxy(scrollerElement, {
          scrollTop(value) {
            if (value !== undefined) {
              // When ScrollTrigger sets scroll position
              locomotiveScroll.scrollTo(value, { duration: 0, disableLerp: true })
            }
            // When ScrollTrigger gets scroll position
            return locomotiveScroll.scroll?.instance?.scroll?.y || window.scrollY
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            }
          },
          pinType: scrollerElement.style.transform ? "transform" : "fixed",
        })
        
        // Critical: Update ScrollTrigger whenever Locomotive Scroll updates
        locomotiveScroll.on("scroll", ScrollTrigger.update)
        
        // Critical: Update Locomotive Scroll when ScrollTrigger refreshes
        ScrollTrigger.addEventListener("refresh", () => locomotiveScroll.update())
        
        // Set the scroller for all ScrollTrigger instances
        ScrollTrigger.defaults({ scroller: scrollerElement })
        
        // Force a refresh to ensure proper initialization
        setTimeout(() => {
          // Force recalculation of all ScrollTrigger instances
          ScrollTrigger.refresh(true) // true = deep refresh
          
          // Force update of Locomotive Scroll
          locomotiveScroll.update()
          
          // Make sure all sections are visible
          const sections = document.querySelectorAll('[data-scroll-section]')
          sections.forEach(section => {
            section.classList.add('is-revealed')
            ;(section as HTMLElement).style.visibility = 'visible'
            ;(section as HTMLElement).style.opacity = '1'
          })
        }, 300) // Longer delay for more reliable initialization
        
        // Handle window resize
        const handleResize = () => {
          // Update Locomotive Scroll
          locomotiveScroll.update()
          
          // Refresh ScrollTrigger
          ScrollTrigger.refresh()
        }
        
        window.addEventListener("resize", handleResize)
        
        return () => {
          window.removeEventListener("resize", handleResize)
          locomotiveScroll.destroy()
        }
      } catch (error) {
        console.error("Error initializing scroll:", error)
      }
    }
    
    // Initialize after a delay to ensure DOM is fully ready
    const timer = setTimeout(initLocomotiveScroll, 200)
    
    return () => {
      clearTimeout(timer)
      
      // Reset body overflow
      document.body.style.overflow = ""
      
      // Clean up Locomotive Scroll
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy()
      }
      
      // Clean up ScrollTrigger
      try {
        const { ScrollTrigger } = require("gsap/ScrollTrigger")
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
        ScrollTrigger.refresh()
      } catch (error) {
        // GSAP not available, skip cleanup
      }
    }
  }, [])
  
  // Ensure content is visible even if scroll initialization fails
  useEffect(() => {
    // Fallback timeout to ensure content visibility
    const fallbackTimer = setTimeout(() => {
      const sections = document.querySelectorAll('[data-scroll-section]')
      if (sections) {
        sections.forEach(section => {
          ;(section as HTMLElement).style.visibility = 'visible'
          ;(section as HTMLElement).style.opacity = '1'
          ;(section as HTMLElement).style.display = 'block'
        })
      }
    }, 1000) // Fallback after 1 second
    
    return () => clearTimeout(fallbackTimer)
  }, [])
  
  return (
    <div 
      ref={scrollRef} 
      data-scroll-container 
      className="relative w-full h-full"
      style={{ visibility: 'visible' }}
    >
      {children}
    </div>
  )
}
