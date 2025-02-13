"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sword, Users, BookOpen } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://sparkstack.app/api/mocks/images?query=fantasy+castle')",
            filter: "brightness(0.6)"
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
          <h1 className="mb-4 text-4xl font-bold">DungeonAI</h1>
          <p className="mb-8 max-w-md text-lg text-gray-200">
            Embark on an epic adventure with your AI-powered Dungeon Master
          </p>
          <Link href="/game">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Begin Your Quest
            </Button>
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid gap-6 p-6 md:grid-cols-3">
        <Card className="bg-gray-800 p-6 text-white">
          <Sword className="mb-4 h-8 w-8 text-red-500" />
          <h2 className="mb-2 text-xl font-bold">Adventure Mode</h2>
          <p className="text-gray-300">Start a new campaign with our AI Dungeon Master</p>
        </Card>

        <Card className="bg-gray-800 p-6 text-white">
          <Users className="mb-4 h-8 w-8 text-red-500" />
          <h2 className="mb-2 text-xl font-bold">Character Creation</h2>
          <p className="text-gray-300">Design your hero with detailed customization</p>
          <Link href="/character" className="mt-4 inline-block">
            <Button variant="secondary" size="sm">View Character</Button>
          </Link>
        </Card>

        <Card className="bg-gray-800 p-6 text-white">
          <BookOpen className="mb-4 h-8 w-8 text-red-500" />
          <h2 className="mb-2 text-xl font-bold">Campaign Journal</h2>
          <p className="text-gray-300">Track your adventures and achievements</p>
        </Card>
      </div>
    </div>
  )
}