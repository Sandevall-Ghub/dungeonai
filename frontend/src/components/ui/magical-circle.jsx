"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function MagicalCircle({ 
  selectedTab, 
  stats, 
  onStatClick,
  className = "" 
}) {
  const [activeNodes, setActiveNodes] = useState([])

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
      // Add more cases for other tabs
      default:
        return []
    }
  }

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Base Circle */}
      <svg viewBox="0 0 500 500" className="w-full h-full">
        {/* Outer Decorative Circles */}
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
        <AnimatePresence>
          {getStatNodes().map((stat, index) => {
            const angle = (index * 360) / getStatNodes().length
            const radius = 180
            const x = 250 + radius * Math.cos((angle - 90) * (Math.PI / 180))
            const y = 250 + radius * Math.sin((angle - 90) * (Math.PI / 180))

            return (
              <motion.g
                key={stat.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => onStatClick(stat)}
                className="cursor-pointer"
              >
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

                {/* Connecting Lines */}
                <line
                  x1="250"
                  y1="250"
                  x2={x}
                  y2={y}
                  className={`stroke-${stat.color}-400/20 stroke-1`}
                />
              </motion.g>
            )
          })}
        </AnimatePresence>

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

      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {activeNodes.map((node, index) => (
          <div
            key={`particle-${index}`}
            className={`
              absolute w-1 h-1 rounded-full
              bg-${node.color}-400
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