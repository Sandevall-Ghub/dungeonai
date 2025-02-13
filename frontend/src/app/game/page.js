"use client"

import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Sword, Shield, Scroll, Backpack, 
  Map, Book, Settings, Save,
  Heart, Brain, Crown
} from "lucide-react"
import Link from "next/link"

export default function GameScreen() {
  const [character] = useState({
    name: "Eldric Shadowweaver",
    class: "Wizard",
    race: "High Elf",
    level: 5,
    hp: 28,
    maxHp: 35,
    mana: 45,
    maxMana: 50,
    xp: 75,
    stats: {
      strength: 10,
      intelligence: 16,
      charisma: 14
    }
  })

  const [currentScene] = useState({
    image: "https://sparkstack.app/api/mocks/images?query=fantasy+castle",
    title: "The Beginning of Your Journey",
    description: "You find yourself at the entrance of a dimly lit tavern. The smell of oak and ale fills the air, while hushed conversations echo through the room."
  })

  const StatIndicator = ({ icon: Icon, label, value, max }) => (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-red-400" />
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">{label}</span>
          <span className="text-gray-300">{value}/{max}</span>
        </div>
        <Progress value={(value / max) * 100} className="h-1" />
      </div>
    </div>
  )

  const MenuButton = ({ icon: Icon, label, onClick }) => (
    <Button
      variant="ghost"
      size="sm"
      className="w-full justify-start hover:bg-red-500/10 hover:text-red-400 transition-colors"
      onClick={onClick}
    >
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </Button>
  )

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Main Scene Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
        style={{ backgroundImage: `url('${currentScene.image}')` }}
      />
      
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Scene Text */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500">
        <h1 className="text-2xl font-bold text-white mb-2">{currentScene.title}</h1>
        <p className="text-gray-200 max-w-2xl">{currentScene.description}</p>
      </div>

      {/* Player Portrait and Menu */}
      <div className="absolute bottom-6 right-6 z-10">
        <HoverCard openDelay={0} closeDelay={200}>
          <HoverCardTrigger asChild>
            <button className="group transition-transform duration-300 hover:scale-105">
              <Avatar className="h-14 w-14 ring-2 ring-red-500/50 transition-all duration-300 group-hover:ring-4 group-hover:ring-red-500">
                <AvatarImage src="https://sparkstack.app/api/mocks/images?query=fantasy+portrait" />
                <AvatarFallback className="bg-red-500">ES</AvatarFallback>
              </Avatar>
            </button>
          </HoverCardTrigger>
          
          <HoverCardContent 
            className="w-72 bg-gray-900/95 border-gray-800 backdrop-blur-sm"
            side="left"
          >
            <ScrollArea className="h-full max-h-[500px]">
              {/* Character Header */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://sparkstack.app/api/mocks/images?query=fantasy+portrait" />
                  <AvatarFallback>ES</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-semibold text-white">{character.name}</h4>
                  <p className="text-xs text-gray-400">
                    Level {character.level} {character.race} {character.class}
                  </p>
                </div>
              </div>

              {/* Status Bars */}
              <div className="space-y-2 mb-4">
                <StatIndicator 
                  icon={Heart} 
                  label="Health" 
                  value={character.hp} 
                  max={character.maxHp} 
                />
                <StatIndicator 
                  icon={Brain} 
                  label="Mana" 
                  value={character.mana} 
                  max={character.maxMana} 
                />
                <StatIndicator 
                  icon={Crown} 
                  label="Experience" 
                  value={character.xp} 
                  max={100} 
                />
              </div>

              <Separator className="my-4 bg-gray-800" />

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 bg-gray-800/50 rounded-lg">
                  <Sword className="h-4 w-4 mx-auto mb-1 text-red-400" />
                  <span className="text-xs text-gray-400">STR</span>
                  <p className="text-sm font-medium">{character.stats.strength}</p>
                </div>
                <div className="text-center p-2 bg-gray-800/50 rounded-lg">
                  <Brain className="h-4 w-4 mx-auto mb-1 text-red-400" />
                  <span className="text-xs text-gray-400">INT</span>
                  <p className="text-sm font-medium">{character.stats.intelligence}</p>
                </div>
                <div className="text-center p-2 bg-gray-800/50 rounded-lg">
                  <Crown className="h-4 w-4 mx-auto mb-1 text-red-400" />
                  <span className="text-xs text-gray-400">CHA</span>
                  <p className="text-sm font-medium">{character.stats.charisma}</p>
                </div>
              </div>

              {/* Menu Options */}
              <div className="space-y-1">
                <MenuButton icon={Sword} label="Combat" />
                <MenuButton icon={Scroll} label="Spells & Abilities" />
                <MenuButton icon={Backpack} label="Inventory" />
                <MenuButton icon={Map} label="World Map" />
                <MenuButton icon={Book} label="Quest Log" />
                <Separator className="my-2 bg-gray-800" />
                <MenuButton icon={Settings} label="Settings" />
                <MenuButton icon={Save} label="Save Game" />
              </div>
            </ScrollArea>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  )
}