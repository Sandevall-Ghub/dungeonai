"use client"

import { useState } from "react"
import { Card } from "./card"
import { Button } from "./button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { RACES } from "@/lib/race-data"

export function RaceSelector({ onSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const races = Object.entries(RACES)

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? races.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === races.length - 1 ? 0 : prev + 1
    )
  }

  const currentRace = races[currentIndex][1]

  return (
    <div className="relative min-h-[600px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('https://sparkstack.app/api/mocks/images?query=fantasy+${races[currentIndex][0]}')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 z-10 h-12 w-12 rounded-full 
                   bg-black/20 hover:bg-red-950/30 backdrop-blur-sm
                   border border-gray-800 hover:border-red-800
                   text-gray-400 hover:text-red-400
                   transition-all duration-300"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 z-10 h-12 w-12 rounded-full 
                   bg-black/20 hover:bg-red-950/30 backdrop-blur-sm
                   border border-gray-800 hover:border-red-800
                   text-gray-400 hover:text-red-400
                   transition-all duration-300"
        onClick={handleNext}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Race Display */}
      <div className="relative z-10 text-center space-y-6">
        <h2 className="text-6xl font-medieval text-white">
          {currentRace.name}
        </h2>
        
        {/* Ornate Divider */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          <div className="h-2 w-2 rotate-45 bg-red-500" />
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </div>

        {/* Race Description */}
        <Card className="max-w-xl mx-auto bg-black/40 border-gray-800 backdrop-blur-sm p-6">
          <p className="text-gray-300 text-lg">
            {currentRace.description}
          </p>
          
          {/* Race Features */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {currentRace.features.map((feature) => (
              <div 
                key={feature.name}
                className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg"
              >
                <h4 className="text-red-400 font-medieval">{feature.name}</h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Selection Button */}
          <Button 
            className="mt-6 w-full bg-red-950/50 hover:bg-red-900/50 
                     border border-red-800/50 hover:border-red-700
                     text-red-100 hover:text-white
                     transition-all duration-300"
            onClick={() => onSelect(races[currentIndex][0])}
          >
            Choose {currentRace.name}
          </Button>
        </Card>
      </div>
    </div>
  )
}