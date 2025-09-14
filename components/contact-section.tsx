"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const contactInfoRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")

      gsap.registerPlugin(ScrollTrigger)

      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
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

      // Contact info animation
      gsap.fromTo(
        contactInfoRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    initGSAP()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen flex items-center justify-center px-6 bg-card relative overflow-hidden"
      data-scroll-section
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold text-card-foreground text-center mb-16">
          Let's Work Together
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors cursor-hover"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors cursor-hover"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors cursor-hover resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors cursor-hover relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">Send Message</span>
            </button>
          </form>

          <div ref={contactInfoRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Get In Touch</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always interested in new opportunities and exciting projects. Whether you have a question or just
                want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold">@</span>
                </div>
                <div>
                  <p className="font-medium text-card-foreground">Email</p>
                  <p className="text-muted-foreground">hello@example.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <span className="text-accent font-bold">#</span>
                </div>
                <div>
                  <p className="font-medium text-card-foreground">Social</p>
                  <p className="text-muted-foreground">@yourhandle</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <span className="text-secondary font-bold">📍</span>
                </div>
                <div>
                  <p className="font-medium text-card-foreground">Location</p>
                  <p className="text-muted-foreground">Your City, Country</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-sm text-muted-foreground">Response time: Usually within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
