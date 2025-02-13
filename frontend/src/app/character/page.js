"use client"

import { useState } from "react"
import { MagicalCircle } from "@/components/ui/magical-circle"
import { Alert } from "@/components/ui/alert"
import { InfoCircled } from "lucide-react"

export default function CharacterPage() {
  const [stats, setStats] = useState({
    strength: 8,
    dexterity: 8,
    constitution: 8,
    intelligence: 8,
    wisdom: 8,
    charisma: 8
  })

  const TOTAL_POINTS = 27
  const usedPoints = Object.values(stats).reduce((total, value) => {
    const pointCosts = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 }
    return total + pointCosts[value]
  }, 0)

  const handleStatChange = (statId, increase) => {
    setStats(prev => ({
      ...prev,
      [statId]: prev[statId] + (increase ? 1 : -1)
    }))
  }

  return (
    <div className="min-h-screen bg-fantasy-900 text-white">
      <div className="container mx-auto p-4">
        <Alert className="mb-4 bg-fantasy-800 border-amber-400/20">
          <InfoCircled className="h-4 w-4" />
          <p className="text-sm">
            Use the point buy system to allocate your ability scores. 
            You have {TOTAL_POINTS - usedPoints} points remaining.
          </p>
        </Alert>

        <div className="relative aspect-square max-w-2xl mx-auto">
          <MagicalCircle
            stats={stats}
            onStatChange={handleStatChange}
            pointsRemaining={TOTAL_POINTS - usedPoints}
          />
        </div>
      </div>
    </div>
  )
}