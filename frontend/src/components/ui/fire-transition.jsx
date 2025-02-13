"use client"

import { useState, useEffect } from "react"

export function FireTransition({ show, onComplete }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (show) {
      // Generate random particles
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 1 + 0.5
      }))
      setParticles(newParticles)

      // Complete transition after animation
      const timer = setTimeout(onComplete, 1500)
      return () => clearTimeout(timer)
    }
  }, [show])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black/90 animate-fadeIn" />
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-red-500 rounded-full animate-fireParticle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}rem`,
            height: `${particle.size}rem`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  )
}