"use client"

import { useState, useEffect } from "react"

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap")

      if (isOpen) {
        gsap.fromTo(
          ".mobile-nav-item",
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out",
          },
        )
      }
    }

    if (isOpen) {
      initGSAP()
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ]

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 cursor-hover"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-1" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 mt-1 ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 mt-1 ${
              isOpen ? "-rotate-45 -translate-y-1" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <nav className="relative z-10 flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="mobile-nav-item text-2xl font-semibold text-foreground hover:text-primary transition-colors cursor-hover"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
