"use client"

import { useState } from "react"
import { MagicalCircle } from "@/components/ui/magical-circle"
import { BackgroundSelector } from "@/components/ui/background-selector"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const RACE_BONUSES = {
  human: { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 },
  elf: { dexterity: 2, intelligence: 1 },
  dwarf: { constitution: 2, strength: 1 }
}

const CLASS_RECOMMENDATIONS = {
  fighter: { primaryStats: ['strength', 'constitution'], recommendedStats: { strength: 15, constitution: 14 } },
  wizard: { primaryStats: ['intelligence', 'dexterity'], recommendedStats: { intelligence: 15, dexterity: 14 } },
  rogue: { primaryStats: ['dexterity', 'intelligence'], recommendedStats: { dexterity: 15, intelligence: 14 } },
  cleric: { primaryStats: ['wisdom', 'constitution'], recommendedStats: { wisdom: 15, constitution: 14 } }
}

export default function CharacterPage() {
  const [baseStats, setBaseStats] = useState({
    strength: 8,
    dexterity: 8,
    constitution: 8,
    intelligence: 8,
    wisdom: 8,
    charisma: 8
  })
  const [race, setRace] = useState("")
  const [characterClass, setCharacterClass] = useState("")
  const [background, setBackground] = useState("")

  const handleStatChange = (statId, value) => {
    setBaseStats(prev => ({...prev, [statId]: value}))
  }

  return (
    <div className="min-h-screen bg-fantasy-900 text-white">
      <div className="container mx-auto p-4">
        <div className="flex gap-4 mb-8">
          <Select value={race} onValueChange={setRace}>
            <SelectTrigger className="w-48 bg-fantasy-800 border-fantasy-700">
              <SelectValue placeholder="Select Race" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(RACE_BONUSES).map(raceName => (
                <SelectItem key={raceName} value={raceName}>
                  {raceName.charAt(0).toUpperCase() + raceName.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={characterClass} onValueChange={setCharacterClass}>
            <SelectTrigger className="w-48 bg-fantasy-800 border-fantasy-700">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(CLASS_RECOMMENDATIONS).map(className => (
                <SelectItem key={className} value={className}>
                  {className.charAt(0).toUpperCase() + className.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="bg-fantasy-800 border-fantasy-700">
            <TabsTrigger value="stats">Abilities</TabsTrigger>
            <TabsTrigger value="background">Background</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <div className="relative aspect-square max-w-2xl mx-auto">
              <MagicalCircle
                baseStats={baseStats}
                race={race}
                characterClass={characterClass}
                background={background}
                onStatChange={handleStatChange}
              />
            </div>
          </TabsContent>

          <TabsContent value="background">
            <BackgroundSelector
              selected={background}
              onSelect={setBackground}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}