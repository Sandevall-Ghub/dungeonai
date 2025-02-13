"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Tooltip } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"

export function MagicalCircle({ 
  stats, 
  onStatChange,
  pointsRemaining,
  className = "" 
}) {
  // D&D 5e Point Buy Rules
  const POINT_COSTS = {
    8: 0, 9: 1, 10: 2, 11: 3, 12: 4,
    13: 5, 14: 7, 15: 9
  }

  const getPointCost = (currentValue, increase = true) => {
    if (increase) {
      return POINT_COSTS[currentValue + 1] - POINT_COSTS[currentValue]
    }
    return POINT_COSTS[currentValue] - POINT_COSTS[currentValue - 1]
  }

  const canIncreaseStat = (stat) => {
    const cost = getPointCost(stats[stat.id])
    return stats[stat.id] < 15 && pointsRemaining >= cost
  }

  const canDecreaseStat = (stat) => {
    return stats[stat.id] > 8
  }

  const getModifier = (value) => {
    return Math.floor((value - 10) / 2)
  }

  const StatNode = ({ stat, index, total }) => {
    const angle = (index * 360) / total
    const radius = 180
    const x = 250 + radius * Math.cos((angle - 90) * (Math.PI / 180))
    const y = 250 + radius * Math.sin((angle - 90) * (Math.PI / 180))
    const modifier = getModifier(stats[stat.id])

    return (
      <g className="transition-transform duration-300 hover:scale-105">
        {/* Connection Line */}
        <line
          x1="250"
          y1="250"
          x2={x}
          y2={y}
          className={`
            stroke-amber-400/20 stroke-1
            ${canIncreaseStat(stat) ? 'animate-pulse-subtle' : ''}
          `}
        />

        {/* Stat Controls */}
        <g transform={`translate(${x}, ${y})`}>
          {/* Background Circle */}
          <circle
            r="30"
            className="fill-fantasy-800 stroke-amber-400/30 stroke-2"
          />

          {/* Stat Value */}
          <text
            y="-5"
            textAnchor="middle"
            className="fill-white text-lg font-bold"
          >
            {stats[stat.id]}
          </text>

          {/* Modifier */}
          <text
            y="15"
            textAnchor="middle"
            className={cn(
              "text-sm",
              modifier >= 0 ? "fill-green-400" : "fill-red-400"
            )}
          >
            {modifier >= 0 ? `+${modifier}` : modifier}
          </text>

          {/* Control Buttons */}
          <g className="opacity-0 hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              className="absolute -left-8 top-0 h-6 w-6"
              onClick={() => onStatChange(stat.id, false)}
              disabled={!canDecreaseStat(stat)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="absolute -right-8 top-0 h-6 w-6"
              onClick={() => onStatChange(stat.id, true)}
              disabled={!canIncreaseStat(stat)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </g>
        </g>

        {/* Stat Label */}
        <text
          x={x}
          y={y + 40}
          textAnchor="middle"
          className="fill-amber-400/80 text-sm font-medieval"
        >
          {stat.label}
        </text>
      </g>
    )
  }

  const baseStats = [
    { id: 'strength', label: 'Strength' },
    { id: 'dexterity', label: 'Dexterity' },
    { id: 'constitution', label: 'Constitution' },
    { id: 'intelligence', label: 'Intelligence' },
    { id: 'wisdom', label: 'Wisdom' },
    { id: 'charisma', label: 'Charisma' }
  ]

  return (
    <div className={cn("relative w-full h-full", className)}>
      <svg viewBox="0 0 500 500" className="w-full h-full">
        {/* Decorative Circles */}
        <circle 
          cx="250" cy="250" r="240" 
          className="fill-none stroke-amber-400/20 stroke-2"
        />
        <circle 
          cx="250" cy="250" r="200" 
          className="fill-none stroke-amber-400/20 stroke-2 animate-spin-slow"
        />

        {/* Stats */}
        {baseStats.map((stat, index) => (
          <StatNode
            key={stat.id}
            stat={stat}
            index={index}
            total={baseStats.length}
          />
        ))}

        {/* Center Display */}
        <g className="pointer-events-none">
          <circle
            cx="250"
            cy="250"
            r="50"
            className="fill-fantasy-800 stroke-amber-400/50 stroke-2"
          />
          <text
            x="250"
            y="240"
            textAnchor="middle"
            className="fill-amber-400 text-lg font-medieval"
          >
            Points
          </text>
          <text
            x="250"
            y="265"
            textAnchor="middle"
            className="fill-white text-xl font-bold"
          >
            {pointsRemaining}
          </text>
        </g>
      </svg>
    </div>
  )
}