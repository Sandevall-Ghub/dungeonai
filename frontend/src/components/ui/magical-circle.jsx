"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function MagicalCircle({ 
  selectedTab, 
  stats, 
  onStatClick,
  className = "" 
}) {
  const [activeStats, setActiveStats] = useState([])

  // Define stat nodes based on selected tab
  const getStatNodes = () => {
    switch (selectedTab) {
      case 'character':
        return [
          { id: 'strength', label: 'Strength', value: stats.strength, color: 'red' },
          { id: 'dexterity', label: 'Dexterity', value: stats.dexterity, color: 'green' },
          { id: 'constitution', label: 'Constitution', value: stats.constitution, color: 'yellow' },
          { id: 'intelligence', label: 'Intelligence', value: stats.intelligence, color: 'blue' },
          { id: 'wisdom', label: 'Wisdom', value: stats.wisdom, color: 'purple' },
          { id: 'charisma', label: 'Charisma', value: stats.charisma, color: 'pink' }
        ]
      case 'skills':
        return [
          { id: 'combat', label: 'Combat', value: stats.combat, color: 'red' },
          { id: 'magic', label: 'Magic', value: stats.magic, color: 'blue' },
          { id: 'stealth', label: 'Stealth', value: stats.stealth, color: 'green' }
        ]
      default:
        return []
    }
  }

  return (
    <div className={cn("relative w-full h-full", className)}>
      <svg viewBox="0 0 500 500" className="w-full h-full">
        {/* Base Circles */}
        <circle 
          cx="250" cy="250" r="240" 
          className="fill-none stroke-amber-400/20 stroke-2"
        />
        <circle 
          cx="250" cy="250" r="200" 
          className="fill-none stroke-amber-400/20 stroke-2 animate-spin-slow"
        />
        
        {/* Magical Runes */}
        <g className="animate-spin-reverse-slow">
          {[...Array(24)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 15} 250 250)`}>
              <path 
                d={`M 250 30 L 260 50 L 240 50 Z`} 
                className="fill-amber-400/20"
              />
            </g>
          ))}
        </g>

        {/* Stat Nodes */}
        {getStatNodes().map((stat, index) => {
          const angle = (index * 360) / getStatNodes().length
          const radius = 180
          const x = 250 + radius * Math.cos((angle - 90) * (Math.PI / 180))
          const y = 250 + radius * Math.sin((angle - 90) * (Math.PI / 180))

          return (
            <g
              key={stat.id}
              onClick={() => onStatClick(stat)}
              className={`
                cursor-pointer transition-opacity duration-500
                opacity-0 animate-fade-in
              `}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Connecting Line */}
              <line
                x1="250"
                y1="250"
                x2={x}
                y2={y}
                className={`stroke-${stat.color}-400/20 stroke-1`}
              />

              {/* Stat Circle */}
              <circle
                cx={x}
                cy={y}
                r="20"
                className={`
                  fill-${stat.color}-500/20 stroke-${stat.color}-400
                  hover:fill-${stat.color}-500/40 hover:stroke-${stat.color}-300
                  transition-all duration-300
                `}
              />
              
              {/* Stat Value */}
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white text-sm font-bold"
              >
                {stat.value}
              </text>

              {/* Stat Label */}
              <text
                x={x}
                y={y + 30}
                textAnchor="middle"
                className="fill-gray-400 text-xs"
              >
                {stat.label}
              </text>
            </g>
          )
        })}

        {/* Center Piece */}
        <circle
          cx="250"
          cy="250"
          r="40"
          className="fill-fantasy-800 stroke-amber-400/50 stroke-2"
        />
        <text
          x="250"
          y="250"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-amber-400 text-sm font-medieval"
        >
          {selectedTab.toUpperCase()}
        </text>
      </svg>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {activeStats.map((stat, index) => (
          <div
            key={`particle-${index}`}
            className={`
              absolute w-1 h-1 rounded-full
              bg-${stat.color}-400
              animate-float-up
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}