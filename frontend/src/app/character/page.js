"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Shield, Sword, Brain, Heart } from "lucide-react"
import { PDFHandler } from "./pdf-handler"
import { FileDropzone } from "./file-dropzone"
import Link from "next/link"
import { BackButton } from "@/components/ui/back-button"

export default function CharacterSheet() {
  const [character, setCharacter] = useState({
    name: "Eldric Shadowweaver",
    class: "Wizard",
    race: "High Elf",
    level: 5,
    hp: 28,
    maxHp: 35,
    stats: {
      strength: 10,
      dexterity: 14,
      constitution: 12,
      intelligence: 16,
      wisdom: 13,
      charisma: 11
    }
  })

  const StatBlock = ({ label, value, icon: Icon }) => (
    <Card className="flex flex-col items-center p-4 bg-gray-800">
      <Icon className="h-6 w-6 mb-2 text-red-500" />
      <Label className="text-sm text-gray-400">{label}</Label>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-400">
        {Math.floor((value - 10) / 2) >= 0 ? "+" : ""}
        {Math.floor((value - 10) / 2)}
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <BackButton />
          <h1 className="text-xl font-bold ml-4">Character Sheet</h1>
        </div>
        <PDFHandler />
      </div>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-4 space-y-6">
          {/* Add FileDropzone at the top */}
          <FileDropzone />

          {/* Character Header */}
          <Card className="p-6 bg-gray-800 space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-red-600 flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {character.name.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{character.name}</h2>
                <p className="text-gray-400">
                  Level {character.level} {character.race} {character.class}
                </p>
              </div>
            </div>

            {/* Health Bar */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Hit Points</Label>
                <span>{character.hp} / {character.maxHp}</span>
              </div>
              <Progress 
                value={(character.hp / character.maxHp) * 100} 
                className="h-3 bg-gray-700"
              />
            </div>
          </Card>

          {/* Ability Scores */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatBlock label="Strength" value={character.stats.strength} icon={Sword} />
            <StatBlock label="Dexterity" value={character.stats.dexterity} icon={Shield} />
            <StatBlock label="Constitution" value={character.stats.constitution} icon={Heart} />
            <StatBlock label="Intelligence" value={character.stats.intelligence} icon={Brain} />
            <StatBlock label="Wisdom" value={character.stats.wisdom} icon={Brain} />
            <StatBlock label="Charisma" value={character.stats.charisma} icon={Brain} />
          </div>

          {/* Character Details Tabs */}
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="spells">Spells</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>
            <TabsContent value="skills" className="mt-4">
              <Card className="bg-gray-800 p-4">
                <h3 className="font-bold mb-4">Proficiencies</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Arcana</span>
                    <span className="text-green-500">+5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>History</span>
                    <span className="text-green-500">+5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investigation</span>
                    <span className="text-green-500">+5</span>
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="spells">
              <Card className="bg-gray-800 p-4">
                <h3 className="font-bold mb-4">Spell Slots</h3>
                {/* Add spell content here */}
              </Card>
            </TabsContent>
            <TabsContent value="inventory">
              <Card className="bg-gray-800 p-4">
                <h3 className="font-bold mb-4">Equipment</h3>
                {/* Add inventory content here */}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  )
}