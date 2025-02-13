"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { validateStats } from "@/lib/stat-validation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert } from "@/components/ui/alert"

export function MagicalCircle({ 
  stats, 
  onStatChange,
  characterClass,
  race,
  className = "" 
}) {
  const [validation, setValidation] = useState(null)

  useEffect(() => {
    const result = validateStats(stats, characterClass, race)
    setValidation(result)
  }, [stats, characterClass, race])

  const getModifier = (value) => {
    return Math.floor((value - 10) / 2)
  }

  const baseStats = [
    { id: 'strength', label: 'Strength' },
    { id: 'dexterity', label: 'Dexterity' },
    { id: 'constitution', label: 'Constitution' },
    { id: 'intelligence', label: 'Intelligence' },
    { id: 'wisdom', label: 'Wisdom' },
    { id: 'charisma', label: 'Charisma' }
  ]

  const StatNode = ({ stat, index, total }) => {
    const angle = (index * 360) / total
    const radius = 180
    const x = 250 + radius * Math.cos((angle - 90) * (Math.PI / 180))
    const y = 250 + radius * Math.sin((angle - 90) * (Math.PI / 180))
    const modifier = getModifier(stats[stat.id])

    const hasError = validation?.errors[stat.id]
    const hasWarning = validation?.warnings[stat.id]

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
                  hasError ? "stroke-red-400/50" :
                  hasWarning ? "stroke-yellow-400/50" :
                  "stroke-amber-400/20"
                )}
              />

              {/* Stat Controls */}
              <g transform={`translate(${x}, ${y})`}>
                {/* Background Circle */}
                <circle
                  r="30"
                  className={cn(
                    "transition-colors duration-300",
                    hasError ? "fill-red-900/20 stroke-red-400" :
                    hasWarning ? "fill-yellow-900/20 stroke-yellow-400" :
                    "fill-fantasy-800 stroke-amber-400/30 stroke-2"
                  )}
                />

                {/* Stat Value */}
                <text
                  y="-5"
                  textAnchor="middle"
                  className={cn(
                    "text-lg font-bold",
                    hasError ? "fill-red-400" :
                    hasWarning ? "fill-yellow-400" :
                    "fill-white"
                  )}
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
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="font-bold">{stat.label}</p>
              {hasError && (
                <p className="text-red-400 text-sm">{validation.errors[stat.id]}</p>
              )}
              {hasWarning && (
                <p className="text-yellow-400 text-sm">{validation.warnings[stat.id]}</p>
              )}
              {validation?.suggestions.map((suggestion, i) => (
                <p key={i} className="text-gray-400 text-sm">{suggestion}</p>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Validation Messages */}
      {validation && !validation.isValid && (
        <Alert className="absolute top-0 left-0 right-0 bg-red-900/20 border-red-400/50">
          <p className="text-red-400">Please fix the following issues:</p>
          <ul className="list-disc list-inside">
            {Object.values(validation.errors).map((error, i) => (
              <li key={i} className="text-sm text-red-300">{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      {/* Magical Circle SVG */}
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
            Validation
          </text>
          <text
            x="250"
            y="265"
            textAnchor="middle"
            className={cn(
              "text-xl font-bold",
              validation?.isValid ? "fill-green-400" : "fill-red-400"
            )}
          >
            {validation?.isValid ? "Valid" : "Invalid"}
          </text>
        </g>
      </svg>
    </div>
  )
}