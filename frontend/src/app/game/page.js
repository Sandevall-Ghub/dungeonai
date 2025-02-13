"use client"

import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Map, Book, Sword, MessageCircle, Menu } from "lucide-react"
import Link from "next/link"

export default function GameScreen() {
  const [showMenu, setShowMenu] = useState(false)
  const [currentScene] = useState({
    image: "https://sparkstack.app/api/mocks/images?query=fantasy+castle",
    title: "The Beginning of Your Journey",
    description: "You find yourself at the entrance of a dimly lit tavern. The smell of oak and ale fills the air, while hushed conversations echo through the room."
  })

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

      {/* Player Avatar and Menu */}
      <div className="absolute bottom-6 right-6 z-10">
        <HoverCard openDelay={0} closeDelay={200}>
          <HoverCardTrigger asChild>
            <button
              className="relative group"
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => setShowMenu(false)}
            >
              <Avatar className="h-12 w-12 ring-2 ring-red-500 transition-all duration-300 hover:ring-4">
                <AvatarImage src="https://sparkstack.app/api/mocks/images?query=fantasy+portrait" />
                <AvatarFallback className="bg-red-500">PC</AvatarFallback>
              </Avatar>
            </button>
          </HoverCardTrigger>
          <HoverCardContent 
            className="w-64 bg-gray-900/95 border-gray-800 backdrop-blur-sm p-4"
            side="left"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://sparkstack.app/api/mocks/images?query=fantasy+portrait" />
                  <AvatarFallback>PC</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-semibold text-white">Eldric Shadowweaver</h4>
                  <p className="text-xs text-gray-400">Level 5 High Elf Wizard</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Map className="h-4 w-4 mr-2" />
                  World Map
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Book className="h-4 w-4 mr-2" />
                  Journal
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Sword className="h-4 w-4 mr-2" />
                  Character
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat
                </Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="absolute top-6 right-6 md:hidden bg-gray-900/50 p-2 rounded-full backdrop-blur-sm"
        onClick={() => setShowMenu(!showMenu)}
      >
        <Menu className="h-6 w-6 text-white" />
      </button>
    </div>
  )
}