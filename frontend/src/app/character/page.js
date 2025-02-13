"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Shield, Sword, Brain, Heart, Edit2, Loader2 } from "lucide-react"
import Link from "next/link"

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

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState(character)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setCharacter(editForm)
    setIsSaving(false)
    setIsEditing(false)
  }

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

  const EditDialog = () => (
    <Dialog open={isEditing} onOpenChange={setIsEditing}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="absolute top-4 right-4"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Edit Character</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Character Name</Label>
            <Input
              id="name"
              value={editForm.name}
              onChange={(e) => setEditForm({...editForm, name: e.target.value})}
              className="bg-gray-800 border-gray-700"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="class">Class</Label>
              <Input
                id="class"
                value={editForm.class}
                onChange={(e) => setEditForm({...editForm, class: e.target.value})}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="race">Race</Label>
              <Input
                id="race"
                value={editForm.race}
                onChange={(e) => setEditForm({...editForm, race: e.target.value})}
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="level">Level</Label>
              <Input
                id="level"
                type="number"
                value={editForm.level}
                onChange={(e) => setEditForm({...editForm, level: parseInt(e.target.value)})}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxHp">Max HP</Label>
              <Input
                id="maxHp"
                type="number"
                value={editForm.maxHp}
                onChange={(e) => setEditForm({...editForm, maxHp: parseInt(e.target.value)})}
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Ability Scores</Label>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(editForm.stats).map(([stat, value]) => (
                <div key={stat} className="grid gap-1">
                  <Label htmlFor={stat} className="text-xs capitalize">
                    {stat}
                  </Label>
                  <Input
                    id={stat}
                    type="number"
                    value={value}
                    onChange={(e) => setEditForm({
                      ...editForm,
                      stats: {
                        ...editForm.stats,
                        [stat]: parseInt(e.target.value)
                      }
                    })}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 p-4 flex items-center">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold ml-4">Character Sheet</h1>
      </div>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-4 space-y-6">
          {/* Character Header */}
          <Card className="p-6 bg-gray-800 space-y-4 relative">
            <EditDialog />
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

          {/* Detailed Sections */}
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