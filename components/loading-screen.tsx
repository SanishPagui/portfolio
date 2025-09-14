"use client"

import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 500) // Small delay before hiding
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="loading-screen">
      <div className="flex flex-col items-center gap-8">
        <div className="loading-text">Portfolio</div>
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-muted-foreground text-sm">{progress}%</div>
      </div>
    </div>
  )
}
