"use client"

import { useState } from "react"
import { BackButton } from "@/components/ui/back-button"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  User, Scroll, Shield, Book, 
  Flame, Star, Magic
} from "lucide-react"

export default function CharacterPage() {
  const [selectedTab, setSelectedTab] = useState('character')
  
  const NavigationButton = ({ icon: Icon, label, value }) => (
    <button
      onClick={() => setSelectedTab(value)}
      className={`
        w-full group relative flex items-center gap-3 px-6 py-4
        text-left text-lg font-medium
        ${selectedTab === value ? 'text-amber-400' : 'text-gray-400'}
        hover:text-amber-400 transition-colors
      `}
    >
      {/* Ornate Left Border */}
      <div className={`
        absolute left-0 top-0 bottom-0 w-1
        ${selectedTab === value ? 'bg-amber-400' : 'bg-transparent'}
        transition-colors
      `} />
      
      {/* Hover Effect Background */}
      <div className={`
        absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent
        opacity-0 group-hover:opacity-100
        ${selectedTab === value ? 'opacity-100' : ''}
        transition-opacity
      `} />
      
      <Icon className={`
        h-5 w-5 transition-transform group-hover:scale-110
        ${selectedTab === value ? 'text-amber-400' : 'text-gray-500'}
      `} />
      {label}
    </button>
  )

  return (
    <div className="relative min-h-screen bg-[#0d1219] text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://sparkstack.app/api/mocks/images?query=dark+fantasy+castle')"
        }}
      />
      
      {/* Content Layout */}
      <div className="relative z-10 flex h-screen">
        {/* Left Navigation Panel */}
        <div className="w-72 bg-[#0d1219]/90 border-r border-[#2a3446]">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-amber-400">Character Creation</h1>
          </div>
          
          <div className="space-y-1">
            <NavigationButton 
              icon={User} 
              label="Character" 
              value="character" 
            />
            <NavigationButton 
              icon={Scroll} 
              label="Skills" 
              value="skills" 
            />
            <NavigationButton 
              icon={Shield} 
              label="Equipment" 
              value="equipment" 
            />
            <NavigationButton 
              icon={Book} 
              label="Story" 
              value="story" 
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative">
          <BackButton />
          
          {/* Top Stats Display */}
          <div className="absolute top-6 right-6 flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1a2436]/90 rounded-full border border-[#2a3446]">
              <Flame className="h-5 w-5 text-amber-400" />
              <span className="text-amber-400">AP 10</span>
            </div>
          </div>

          {/* Skill Tree / Main Content */}
          <ScrollArea className="h-[calc(100vh-2rem)] p-6">
            <div className="relative">
              {/* Magical Circle Background */}
              <div className="absolute right-0 top-0 w-96 h-96 opacity-20">
                <div className="absolute inset-0 animate-spin-slow">
                  {/* Add SVG magical circle here */}
                </div>
              </div>

              {/* Content Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                <Card className="p-6 bg-[#1a2436]/90 border-[#2a3446]">
                  {/* Add character content based on selectedTab */}
                </Card>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}