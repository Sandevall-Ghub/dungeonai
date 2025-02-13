"use client"

import { useState } from "react"
import { RaceSelector } from "@/components/ui/race-selector"
import { BackButton } from "@/components/ui/back-button"

export default function CharacterPage() {
  const [selectedRace, setSelectedRace] = useState(null)

  return (
    <div className="min-h-screen bg-fantasy-900 text-white">
      {/* Back Button */}
      <BackButton />

      {/* Race Selection */}
      <RaceSelector 
        onSelect={(race) => setSelectedRace(race)} 
      />
    </div>
  )
}