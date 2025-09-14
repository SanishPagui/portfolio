"use client"

import { useEffect, useState, useRef } from "react"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorText, setCursorText] = useState("")
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let outlineX = 0
    let outlineY = 0

    const updateMousePosition = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setMousePosition({ x: mouseX, y: mouseY })
    }

    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.1
      outlineY += (mouseY - outlineY) * 0.1

      if (outlineRef.current) {
        outlineRef.current.style.left = `${outlineX}px`
        outlineRef.current.style.top = `${outlineY}px`
      }

      requestAnimationFrame(animateOutline)
    }

    const handleMouseEnter = (e: Event) => {
      setIsHovering(true)
      const target = e.target as HTMLElement

      if (target.tagName === "A") {
        setCursorText("CLICK")
      } else if (target.tagName === "BUTTON") {
        setCursorText("PRESS")
      } else if (target.classList.contains("project-card")) {
        setCursorText("VIEW")
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setCursorText("")
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Add event listeners
    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .project-card, .cursor-hover')
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    // Start outline animation
    animateOutline()

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.5 : isHovering ? 1.5 : 1})`,
        }}
      />

      {/* Cursor outline */}
      <div
        ref={outlineRef}
        className="cursor-outline"
        style={{
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering ? 1.8 : 1})`,
          opacity: isHovering ? 0.8 : 0.3,
          borderWidth: isHovering ? "3px" : "2px",
        }}
      >
        {cursorText && (
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-accent pointer-events-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  )
}
