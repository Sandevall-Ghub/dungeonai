"use client"

import { useState, useEffect } from "react"
import { PDFHandler } from "./pdf-handler"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Shield, Sword, Brain, Heart, Edit2, Loader2, RefreshCw, Save } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function CharacterSheet() {
  const { toast } = useToast()
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
    },
    lastSynced: new Date().toISOString(),
    isModified: false
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState(character)
  const [isSaving, setIsSaving] = useState(false)

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (character.isModified) {
        handleSave()
      }
    }, 30000) // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval)
  }, [character])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call to save character
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setCharacter(prev => ({
        ...editForm,
        lastSynced: new Date().toISOString(),
        isModified: false
      }))

      setIsSaving(false)
      setIsEditing(false)

      toast({
        title: "Character saved",
        description: "All changes have been synchronized",
      })
    } catch (error) {
      setIsSaving(false)
      toast({
        variant: "destructive",
        title: "Error saving character",
        description: "Please try again later",
      })
    }
  }

  const handleImport = (importedData) => {
    setCharacter(prev => ({
      ...prev,
      ...importedData,
      isModified: true
    }))

    toast({
      title: "Character imported",
      description: "Character sheet has been successfully imported",
    })
  }

  // Existing StatBlock and EditDialog components...
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
      {/* Existing EditDialog content */}
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
        {/* Existing dialog content */}
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
      <div className="border-b border-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold ml-4">Character Sheet</h1>
        </div>
        <div className="flex items-center gap-2">
          {character.isModified && (
            <span className="text-sm text-yellow-500">Unsaved changes</span>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleSave}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <RefreshCw className="h-4 w-4" />
            Last synced: {new Date(character.lastSynced).toLocaleTimeString()}
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-4 space-y-6">
          <PDFHandler onImport={handleImport} />

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