"use client"

import { useState, useEffect, useRef } from "react"

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)
  const gsapRef = useRef<any>(null)
  

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      gsapRef.current = gsap
    }
    loadGSAP()
  }, [])

  useEffect(() => {
    const gsap = gsapRef.current
    if (!gsap) return

    if (isOpen) {
      // Set initial states
      gsap.set(overlayRef.current, { opacity: 0 })
      gsap.set(navItemsRef.current, { opacity: 0, y: 50 })
      gsap.set(".mobile-nav-item", { 
        opacity: 0, 
        y: 30,
        rotationX: -90,
        transformOrigin: "50% 0%"
      })
      gsap.set(".nav-line", { scaleX: 0, transformOrigin: "left" })

      // Animation timeline
      const tl = gsap.timeline()

      // Animate overlay
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      })
      
      // Animate container
      .to(navItemsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.2")
      
      // Animate nav items with stagger
      .to(".mobile-nav-item", {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.6,
        stagger: {
          amount: 0.4,
          ease: "power2.out"
        },
        ease: "back.out(1.2)"
      }, "-=0.3")
      
      // Animate underlines
      .to(".nav-line", {
        scaleX: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.2")

      document.body.style.overflow = "hidden"
    } else {
      // Close animation
      if (overlayRef.current) {
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = "auto"
          }
        })

        tl.to(".nav-line", {
          scaleX: 0,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.in"
        })
        .to(".mobile-nav-item", {
          opacity: 0,
          y: -20,
          rotationX: 90,
          duration: 0.3,
          stagger: {
            amount: 0.2,
            from: "end"
          },
          ease: "power2.in"
        }, "-=0.1")
        .to(navItemsRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.3,
          ease: "power2.in"
        }, "-=0.2")
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        }, "-=0.2")
      }
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const navItems = [
    { href: "#home", label: "Home", icon: "🏠" },
    { href: "#story", label: "Story", icon: "📖" },
    { href: "#about", label: "About", icon: "👨‍💻" },
    { href: "#skills", label: "Skills", icon: "⚡" },
    { href: "#projects", label: "Projects", icon: "🚀" },
    { href: "#contact", label: "Contact", icon: "📧" },
  ]

  const handleNavClick = (href: string) => {
    const gsap = gsapRef.current
    if (!gsap) return

    // Add click animation
    gsap.to(event?.currentTarget, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    })

    setTimeout(() => {
      setIsOpen(false)
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
      }, 300)
    }, 100)
  }

  const handleHamburgerClick = () => {
    const gsap = gsapRef.current
    if (!gsap) return

    // Animate hamburger button
    gsap.to(".hamburger-container", {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    })

    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={handleHamburgerClick}
        className="md:hidden p-3 cursor-hover relative z-[100] hamburger-container"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
              isOpen ? "rotate-45 translate-y-1 bg-primary" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 mt-1 ${
              isOpen ? "opacity-0 scale-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] mt-1 ${
              isOpen ? "-rotate-45 -translate-y-1 bg-primary" : ""
            }`}
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div ref={menuRef} className="fixed inset-0 z-[90] md:hidden bg-red-600">
          {/* Backdrop */}
          <div 
            ref={overlayRef}
            className="absolute inset-0 bg-background/98 backdrop-blur-xl" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Navigation Container */}
          <div className="relative z-10 h-screen flex items-center justify-center bg-white">
            <nav 
              ref={navItemsRef}
              className="flex flex-col items-center space-y-8 px-8 "
            >
              {/* Decorative Elements */}
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
              
              {navItems.map((item, index) => (
                <div key={item.href} className="mobile-nav-item relative group">
                  <button
                    onClick={(e) => {
                      const target = e.currentTarget
                      handleNavClick(item.href)
                    }}
                    className="relative flex items-center gap-4 text-2xl md:text-3xl font-bold text-foreground hover:text-primary transition-all duration-300 cursor-hover group py-3 px-6 rounded-2xl hover:bg-muted/30"
                  >
                    {/* Icon */}
                    <span className="text-xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                      {item.icon}
                    </span>
                    
                    {/* Text */}
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                    
                    {/* Hover Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                  </button>
                  
                  {/* Animated Underline */}
                  <div className="nav-line absolute -bottom-1 left-6 right-6 h-0.5 bg-gradient-to-r from-primary/50 to-primary rounded-full" />
                  
                  {/* Decorative Dots */}
                  <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 delay-100" />
                  <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 delay-150" />
                </div>
              ))}
             
             <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
            </nav>
          </div>
          
          {/* Side Decorative Lines */}
          <div className="absolute left-4 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
          <div className="absolute right-4 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
          
          {/* Corner Decorative Elements */}
          <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-primary/20" />
          <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-primary/20" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-primary/20" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-primary/20" />
        </div>
      )}
    </>
  )
}