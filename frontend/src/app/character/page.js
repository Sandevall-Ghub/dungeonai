"use client"

import { useState } from "react"
import { BackButton } from "@/components/ui/back-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Sword, Shield, Scroll, Heart, Brain, Crown, 
  Palette, Book, Feather, User
} from "lucide-react"

export default function CharacterPage() {
  const [character, setCharacter] = useState({
    basics: {
      name: "",
      race: "",
      class: "",
      level: 1,
      alignment: "",
      background: "",
    },
    appearance: {
      height: 170,
      build: "medium",
      eyeColor: "",
      hairColor: "",
      distinguishingFeatures: "",
    },
    stats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    background: {
      personality: "",
      ideals: "",
      bonds: "",
      flaws: "",
      backstory: "",
    }
  })

  const StatBlock = ({ label, value, icon: Icon, onChange }) => (
    <Card className="p-4 bg-gray-800/50 space-y-2">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-red-400" />
        <Label className="text-sm text-gray-300">{label}</Label>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Value: {value}</span>
          <span className="text-gray-400">Modifier: {Math.floor((value - 10) / 2)}</span>
        </div>
        <Slider
          values={[value]}
          min={3}
          max={18}
          step={1}
          onValueChange={([newValue]) => onChange(newValue)}
          className="w-full"
        />
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <BackButton />
      
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">Character Creation</h1>

        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid grid-cols-4 w-full bg-gray-800">
            <TabsTrigger value="basics" className="data-[state=active]:bg-red-950">
              <User className="h-4 w-4 mr-2" />
              Basics
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-red-950">
              <Palette className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-red-950">
              <Sword className="h-4 w-4 mr-2" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="background" className="data-[state=active]:bg-red-950">
              <Book className="h-4 w-4 mr-2" />
              Background
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="p-4 space-y-6">
              <TabsContent value="basics" className="space-y-4">
                <Card className="p-6 bg-gray-800/50 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Character Name</Label>
                      <Input
                        id="name"
                        value={character.basics.name}
                        onChange={(e) => setCharacter({
                          ...character,
                          basics: { ...character.basics, name: e.target.value }
                        })}
                        className="bg-gray-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="class">Class</Label>
                      <Select
                        value={character.basics.class}
                        onValueChange={(value) => setCharacter({
                          ...character,
                          basics: { ...character.basics, class: value }
                        })}
                      >
                        <SelectTrigger className="bg-gray-900">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fighter">Fighter</SelectItem>
                          <SelectItem value="wizard">Wizard</SelectItem>
                          <SelectItem value="rogue">Rogue</SelectItem>
                          <SelectItem value="cleric">Cleric</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-4">
                <Card className="p-6 bg-gray-800/50 space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Build</Label>
                      <RadioGroup
                        value={character.appearance.build}
                        onValueChange={(value) => setCharacter({
                          ...character,
                          appearance: { ...character.appearance, build: value }
                        })}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="slim" id="slim" />
                          <Label htmlFor="slim">Slim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medium" id="medium" />
                          <Label htmlFor="medium">Medium</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="muscular" id="muscular" />
                          <Label htmlFor="muscular">Muscular</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Height (cm): {character.appearance.height}</Label>
                      <Slider
                        values={[character.appearance.height]}
                        min={150}
                        max={200}
                        step={1}
                        onValueChange={([value]) => setCharacter({
                          ...character,
                          appearance: { ...character.appearance, height: value }
                        })}
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="stats" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatBlock
                  label="Strength"
                  value={character.stats.strength}
                  icon={Sword}
                  onChange={(value) => setCharacter({
                    ...character,
                    stats: { ...character.stats, strength: value }
                  })}
                />
                {/* Add similar StatBlocks for other attributes */}
              </TabsContent>

              <TabsContent value="background" className="space-y-4">
                <Card className="p-6 bg-gray-800/50 space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="backstory">Character Backstory</Label>
                      <Textarea
                        id="backstory"
                        value={character.background.backstory}
                        onChange={(e) => setCharacter({
                          ...character,
                          background: { ...character.background, backstory: e.target.value }
                        })}
                        className="bg-gray-900 min-h-[200px]"
                        placeholder="Tell us your character's story..."
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  )
}