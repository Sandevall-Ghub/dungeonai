"use client"

import { useState } from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card"
import { Button } from "./button"
import { ScrollArea } from "./scroll-area"
import { Dice, Book, Shield, Sword, Scroll } from "lucide-react"

export function DndMechanicsCard({ title, description, children }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="cursor-help">{children}</div>
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-80 bg-[#1a2436]/95 border-[#2a3446] backdrop-blur-sm"
        side="right"
      >
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-blue-400">{title}</h4>
          <p className="text-xs text-gray-300">{description}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export function DiceRoller({ diceType, modifier = 0 }) {
  const [result, setResult] = useState(null)
  const [rolling, setRolling] = useState(false)

  const rollDice = () => {
    setRolling(true)
    setTimeout(() => {
      const roll = Math.floor(Math.random() * diceType) + 1
      setResult(roll + modifier)
      setRolling(false)
    }, 800)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={rollDice}
      className={`
        relative group bg-[#1a2436] border-[#2a3446]
        hover:bg-[#2a3446] hover:border-blue-500/50
        ${rolling ? 'animate-shake' : ''}
      `}
    >
      <Dice className={`h-4 w-4 mr-2 ${rolling ? 'animate-spin' : ''}`} />
      d{diceType} {modifier > 0 ? `+${modifier}` : modifier < 0 ? modifier : ''}
      {result && (
        <span className="absolute -top-2 -right-2 bg-blue-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {result}
        </span>
      )}
    </Button>
  )
}

export function RuleReference({ rule }) {
  return (
    <div className="p-4 bg-[#1a2436] border border-[#2a3446] rounded-lg space-y-2">
      <div className="flex items-center gap-2 text-blue-400">
        <Book className="h-4 w-4" />
        <h3 className="text-sm font-semibold">{rule.title}</h3>
      </div>
      <p className="text-xs text-gray-300">{rule.description}</p>
    </div>
  )
}