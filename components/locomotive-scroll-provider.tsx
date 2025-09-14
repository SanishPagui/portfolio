"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface LocomotiveScrollProviderProps {
  children: ReactNode
}

export default function LocomotiveScrollProvider({ children }: LocomotiveScrollProviderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const locomotiveScrollRef = useRef<any>(null)

  useEffect(() => {
    let locomotiveScroll: any

    const initLocomotiveScroll = async () => {
      // Dynamic import to avoid SSR issues
      const LocomotiveScroll = (await import("locomotive-scroll")).default
      // Lazy-load GSAP ScrollTrigger for integration
      let gsap: any | null = null
      let ScrollTrigger: any | null = null
      try {
        gsap = (await import("gsap")).gsap || (await import("gsap")).default
        ScrollTrigger = (await import("gsap/ScrollTrigger")).ScrollTrigger || (await import("gsap/ScrollTrigger")).default
        if (gsap && ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger)
        }
      } catch (_) {
        // GSAP not installed; skip integration gracefully
      }

      if (scrollRef.current) {
        locomotiveScroll = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          multiplier: 1,
          class: "is-revealed",
          scrollbarContainer: false,
          lenisOptions: {
            lerp: 0.1,
            duration: 1.2,
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            normalizeWheel: true,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          },
        })

        locomotiveScrollRef.current = locomotiveScroll

        // If GSAP is available, connect ScrollTrigger with Locomotive/Lenis
        if (ScrollTrigger && gsap) {
          const scrollerElement = scrollRef.current

          ScrollTrigger.scrollerProxy(scrollerElement, {
            scrollTop(value?: number) {
              if (typeof value === "number") {
                // jump immediately without smoothing to let ScrollTrigger control position
                try {
                  locomotiveScroll.scrollTo(value, { duration: 0, disableLerp: true })
                } catch (_) {}
              }
              return locomotiveScroll.scroll?.instance?.scroll?.y ?? window.scrollY
            },
            getBoundingClientRect() {
              return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
            },
            // Use computed style to detect transforms applied by the smooth scroller
            pinType:
              typeof window !== "undefined" &&
              getComputedStyle(scrollerElement as HTMLElement).transform !== "none"
                ? "transform"
                : "fixed",
          })

          locomotiveScroll.on("scroll", () => ScrollTrigger.update())
          ScrollTrigger.addEventListener("refresh", () => {
            locomotiveScroll.update()
          })
          ScrollTrigger.defaults({ scroller: scrollerElement })
          // refresh once to compute pin spacing correctly
          setTimeout(() => ScrollTrigger.refresh(), 0)
        }

        // Update scroll on window resize
        const handleResize = () => {
          locomotiveScroll.update()
        }

        window.addEventListener("resize", handleResize)

        return () => {
          window.removeEventListener("resize", handleResize)
          if (locomotiveScroll) {
            locomotiveScroll.destroy()
          }
        }
      }
    }

    // Initialize after a short delay to ensure DOM is ready
    const timer = setTimeout(initLocomotiveScroll, 100)

    return () => {
      clearTimeout(timer)
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy()
      }
    }
  }, [])

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  )
}
