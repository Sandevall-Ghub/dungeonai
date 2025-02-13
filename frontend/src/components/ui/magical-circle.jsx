"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { RACE_BONUSES, CLASS_RECOMMENDATIONS, calculateTotalStats } from "@/lib/stat-validation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

export function MagicalCircle({ 
  baseStats, 
  race,
  characterClass,
  onStatChange,
  className = "" 
}) {
  const totalStats = calculateTotalStats(baseStats, race)
  
  const StatNode = ({ stat, index, total }) => {
    const angle = (index * 360) / total
    const radius = 180
    const x = 250 + radius * Math.cos((angle - 90) * (Math.PI / 180))
    const y = 250 + radius * Math.sin((angle - 90) * (Math.PI / 180))
    
    const baseValue = baseStats[stat.id]
    const totalValue = totalStats[stat.id]
    const bonus = totalValue - baseValue
    const isRecommended = characterClass && 
      CLASS_RECOMMENDATIONS[characterClass]?.primary === stat.id

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <g className="transition-transform duration-300 hover:scale-105">
              {/* Connection Line */}
              <line
                x1="250"
                y1="250"
                x2={x}
                y2={y}
                className={cn(
                  "stroke-1",
                  isRecommended ? "stroke-amber-400/50" : "stroke-gray-400/20"
                )}
              />

              {/* Stat Circle */}
              <circle
                cx={x}
                cy={y}
                r="35"
                className={cn(
                  "fill-fantasy-800 transition-all duration-300",
                  isRecommended ? "stroke-amber-400" : "stroke-gray-400/50",
                  bonus > 0 && "ring-2 ring-blue-400/50"
                )}
              />

              {/* Base Value */}
              <text
                x={x}
                y={y - 8}
                textAnchor="middle"
                className="fill-white text-lg font-bold"
              >
                {baseValue}
              </text>

              {/* Racial Bonus */}
              {bonus > 0 && (
                <text
                  x={x}
                  y={y + 12}
                  textAnchor="middle"
                  className="fill-blue-400 text-sm font-bold"
                >
                  +{bonus}
                </text>
              )}

              {/* Stat Label */}
              <text
                x={x}
                y={y + 40}
                textAnchor="middle"
                className={cn(
                  "text-sm",
                  isRecommended ? "fill-amber-400" : "fill-gray-400"
                )}
              >
                {stat.label}
              </text>
            </g>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold">{stat.label}</span>
                <span className="text-sm">
                  Total: {totalValue}
                </span>
              </div>
              {bonus > 0 && (
                <Badge className="bg-blue-500/20 text-blue-400">
                  +{bonus} from {race}
                </Badge>
              )}
              {isRecommended && (
                <Badge className="bg-amber-500/20 text-amber-400">
                  Recommended for {characterClass}
                </Badge>
              )}
              {CLASS_RECOMMENDATIONS[characterClass]?.description && (
                <p className="text-sm text-gray-400">
                  {CLASS_RECOMMENDATIONS[characterClass].description}
                </p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <div className={cn("relative w-full h-full", className)}>
      {race && RACE_BONUSES[race] && (
        <div className="absolute top-4 left-4 right-4">
          <Badge className="w-full justify-center bg-blue-500/20 text-blue-400">
            {RACE_BONUSES[race].description}
          </Badge>
        </div>
      )}

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
        {Object.entries(baseStats).map(([id, _], index) => (
          <StatNode
            key={id}
            stat={{ id, label: id.charAt(0).toUpperCase() + id.slice(1) }}
            index={index}
            total={Object.keys(baseStats).length}
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
            Character
          </text>
          <text
            x="250"
            y="265"
            textAnchor="middle"
            className="text-xl font-bold fill-amber-400"
          >
            {characterClass} {race}
          </text>
        </g>
      </svg>
    </div>
  )
}