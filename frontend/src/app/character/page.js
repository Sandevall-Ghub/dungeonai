"use client"

import { useState } from "react"
import { MagicalCircle } from "@/components/ui/magical-circle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CharacterPage() {
  const [stats, setStats] = useState({
    strength: 8,
    dexterity: 8,
    constitution: 8,
    intelligence: 8,
    wisdom: 8,
    charisma: 8
  })
  const [characterClass, setCharacterClass] = useState("")
  const [race, setRace] = useState("")

  const TOTAL_POINTS = 27
  const usedPoints = Object.values(stats).reduce((total, value) => {
    const pointCosts = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 }
    return total + pointCosts[value]
  }, 0)

  return (
    <div className="min-h-screen bg-fantasy-900 text-white">
      <div className="container mx-auto p-4">
        <div className="flex gap-4 mb-8">
          <Select value={characterClass} onValueChange={setCharacterClass}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fighter">Fighter</SelectItem>
              <SelectItem value="wizard">Wizard</SelectItem>
              <SelectItem value="rogue">Rogue</SelectItem>
              <SelectItem value="cleric">Cleric</SelectItem>
            </SelectContent>
          </Select>

          <Select value={race} onValueChange={setRace}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Race" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="human">Human</SelectItem>
              <SelectItem value="elf">Elf</SelectItem>
              <SelectItem value="dwarf">Dwarf</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative aspect-square max-w-2xl mx-auto">
          <MagicalCircle
            stats={stats}
            characterClass={characterClass}
            race={race}
            pointsRemaining={TOTAL_POINTS - usedPoints}
            onStatChange={(statId, increase) => {
              setStats(prev => ({
                ...prev,
                [statId]: prev[statId] + (increase ? 1 : -1)
              }))
            }}
          />
        </div>
      </div>
    </div>
  )
}