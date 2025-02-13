"use client"

import { useState } from "react"
import { MagicalCircle } from "@/components/ui/magical-circle"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  User, Scroll, Shield, Book, 
  ChevronLeft, Star
} from "lucide-react"

export default function CharacterPage() {
  const [selectedTab, setSelectedTab] = useState('character')
  const [availableAP] = useState(10)

  const NavigationButton = ({ icon: Icon, label, value }) => (
    <button
      onClick={() => setSelectedTab(value)}
      className={`
        group relative w-full px-8 py-4
        flex items-center gap-3
        font-medieval text-lg
        ${selectedTab === value ? 'text-amber-400' : 'text-gray-400'}
      `}
    >
      {/* Ornate Background */}
      <div className={`
        absolute inset-0 
        ${selectedTab === value ? 'bg-gradient-to-r from-amber-500/20 to-transparent' : ''}
      `} />
      
      {/* Left Border */}
      <div className={`
        absolute left-0 top-2 bottom-2 w-1
        ${selectedTab === value ? 'bg-amber-400' : ''}
      `} />
      
      {/* Ornate Edges */}
      <div className={`
        absolute left-0 top-0 w-16 h-1
        ${selectedTab === value ? 'bg-amber-400/20' : ''}
      `} />
      <div className={`
        absolute left-0 bottom-0 w-16 h-1
        ${selectedTab === value ? 'bg-amber-400/20' : ''}
      `} />
      
      <Icon className={`
        h-5 w-5
        ${selectedTab === value ? 'text-amber-400' : 'text-gray-500'}
      `} />
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-fantasy-900 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('/images/dark-texture.png')] opacity-20" />
      
      <div className="relative z-10 flex h-screen">
        {/* Left Navigation */}
        <div className="w-80 bg-fantasy-800/95 border-r border-fantasy-700">
          {/* Back Button */}
          <button className="flex items-center gap-2 p-6 text-gray-400 hover:text-amber-400">
            <ChevronLeft className="h-5 w-5" />
            Back
          </button>
          
          <div className="space-y-1 pt-4">
            <NavigationButton icon={User} label="Character" value="character" />
            <NavigationButton icon={Scroll} label="Skills" value="skills" />
            <NavigationButton icon={Shield} label="Equipment" value="equipment" />
            <NavigationButton icon={Book} label="Story" value="story" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 relative">
          {/* AP Display */}
          <div className="absolute top-6 right-6 flex items-center gap-2">
            <div className="px-4 py-2 bg-fantasy-800/90 rounded-full border border-fantasy-700">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400" />
                <span className="text-amber-400 font-medieval">
                  Available AP {availableAP}
                </span>
              </div>
            </div>
          </div>

          {/* Skill Tree */}
          <div className="absolute right-20 top-20 w-[500px] h-[500px]">
            <MagicalCircle className="opacity-80" />
          </div>

          {/* Content Area */}
          <ScrollArea className="h-screen p-8">
            <div className="max-w-2xl space-y-6">
              <Card className="p-6 bg-fantasy-800/90 border-fantasy-700">
                {/* Content based on selectedTab */}
              </Card>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}