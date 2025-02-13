"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackgroundSelector } from "@/components/ui/background-selector"
import { RaceSelector } from "@/components/ui/race-selector"

export default function CharacterPage() {
  const [selectedRace, setSelectedRace] = useState("")
  const [selectedBackground, setSelectedBackground] = useState("")

  return (
    <div className="min-h-screen bg-fantasy-900 text-white">
      <div className="container mx-auto p-4">
        <Tabs defaultValue="race" className="space-y-6">
          <TabsList className="bg-fantasy-800 border-fantasy-700">
            <TabsTrigger value="race">Race</TabsTrigger>
            <TabsTrigger value="background">Background</TabsTrigger>
          </TabsList>

          <TabsContent value="race">
            <RaceSelector
              selected={selectedRace}
              onSelect={setSelectedRace}
            />
          </TabsContent>

          <TabsContent value="background">
            <BackgroundSelector
              selected={selectedBackground}
              onSelect={setSelectedBackground}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}