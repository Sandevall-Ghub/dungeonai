"use client"

import { useState } from "react"
import { Card } from "./card"
import { ScrollArea } from "./scroll-area"
import { Badge } from "./badge"
import { Button } from "./button"
import { BACKGROUNDS } from "@/lib/background-data"

export function BackgroundSelector({ onSelect, selected }) {
  const [selectedTrait, setSelectedTrait] = useState({
    personality: 0,
    ideal: 0,
    bond: 0,
    flaw: 0
  })

  const BackgroundCard = ({ id, background }) => (
    <Card
      className={`
        relative p-4 cursor-pointer transition-all duration-300
        ${selected === id 
          ? 'bg-fantasy-800 border-amber-400/50' 
          : 'bg-fantasy-900 border-fantasy-700 hover:bg-fantasy-800'}
      `}
      onClick={() => onSelect(id)}
    >
      {/* Ornate Border */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`
          absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2
          ${selected === id ? 'border-amber-400/50' : 'border-fantasy-700'}
          transition-colors duration-300
        `} />
        <div className={`
          absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2
          ${selected === id ? 'border-amber-400/50' : 'border-fantasy-700'}
          transition-colors duration-300
        `} />
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-medieval text-amber-400">{background.name}</h3>
        <p className="text-sm text-gray-400">{background.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {background.proficiencies.map((prof) => (
            <Badge 
              key={prof}
              className="bg-blue-500/20 text-blue-400"
            >
              {prof}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  )

  const TraitSelector = ({ type, traits, background }) => (
    <div className="space-y-2">
      <h4 className="text-sm font-medieval text-amber-400 capitalize">{type}</h4>
      <div className="grid grid-cols-2 gap-2">
        {traits.map((trait, index) => (
          <Button
            key={index}
            variant="outline"
            className={`
              h-auto py-2 text-left text-xs
              ${selectedTrait[type] === index 
                ? 'bg-fantasy-800 border-amber-400/50' 
                : 'bg-fantasy-900 border-fantasy-700'}
            `}
            onClick={() => setSelectedTrait(prev => ({
              ...prev,
              [type]: index
            }))}
          >
            {trait}
          </Button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Background Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(BACKGROUNDS).map(([id, background]) => (
          <BackgroundCard key={id} id={id} background={background} />
        ))}
      </div>

      {/* Selected Background Details */}
      {selected && BACKGROUNDS[selected] && (
        <Card className="p-6 bg-fantasy-800 border-fantasy-700">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medieval text-amber-400 mb-2">
                  {BACKGROUNDS[selected].name}
                </h3>
                <p className="text-sm text-gray-400">
                  Feature: {BACKGROUNDS[selected].feature}
                </p>
              </div>

              {/* Trait Selection */}
              <div className="space-y-4">
                <TraitSelector 
                  type="personality"
                  traits={BACKGROUNDS[selected].traits.personality}
                  background={selected}
                />
                <TraitSelector 
                  type="ideal"
                  traits={BACKGROUNDS[selected].traits.ideals}
                  background={selected}
                />
                <TraitSelector 
                  type="bond"
                  traits={BACKGROUNDS[selected].traits.bonds}
                  background={selected}
                />
                <TraitSelector 
                  type="flaw"
                  traits={BACKGROUNDS[selected].traits.flaws}
                  background={selected}
                />
              </div>

              {/* Equipment */}
              <div>
                <h4 className="text-sm font-medieval text-amber-400 mb-2">
                  Equipment
                </h4>
                <ul className="space-y-1">
                  {BACKGROUNDS[selected].equipment.map((item, index) => (
                    <li key={index} className="text-sm text-gray-400">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollArea>
        </Card>
      )}
    </div>
  )
}