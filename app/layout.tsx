import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sanish Pagui - Creative Developer Portfolio",
  description:
    "Full-stack developer specializing in React, Next.js, and modern web technologies. Creating beautiful digital experiences with smooth animations and innovative design.",
  keywords: ["developer", "portfolio", "react", "nextjs", "web development", "full-stack"],
  authors: [{ name: "Sanish Pagui" }],
  creator: "Sanish Pagui",
  openGraph: {
    title: "Sanish Pagui - Creative Developer Portfolio",
    description: "Full-stack developer creating beautiful digital experiences",
    type: "website",
    locale: "India",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanish Pagui - Creative Developer Portfolio",
    description: "Full-stack developer creating beautiful digital experiences",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/placeholder-logo.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/placeholder-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/placeholder-logo.png" />
      </head>
      <body suppressHydrationWarning className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
