"use client"

import { useState } from "react"
import { Card } from "./card"
import { ScrollArea } from "./scroll-area"
import { Badge } from "./badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { RACES } from "@/lib/race-data"

export function RaceSelector({ onSelect, selected }) {
  const [selectedSubrace, setSelectedSubrace] = useState(null)

  const RaceCard = ({ id, race }) => (
    <Card
      className={`
        relative p-6 cursor-pointer transition-all duration-300
        ${selected === id 
          ? 'bg-fantasy-800 border-amber-400/50' 
          : 'bg-fantasy-900 border-fantasy-700 hover:bg-fantasy-800'}
      `}
      onClick={() => onSelect(id)}
    >
      {/* Ornate Border */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`
          absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2
          ${selected === id ? 'border-amber-400/50' : 'border-fantasy-700'}
          transition-colors duration-300
        `} />
        <div className={`
          absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2
          ${selected === id ? 'border-amber-400/50' : 'border-fantasy-700'}
          transition-colors duration-300
        `} />
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-medieval text-amber-400">{race.name}</h3>
          <p className="text-sm text-gray-400 mt-1">{race.description}</p>
        </div>

        {/* Racial Features Preview */}
        <div className="flex flex-wrap gap-2">
          {race.features.slice(0, 2).map((feature) => (
            <Badge 
              key={feature.name}
              className="bg-blue-500/20 text-blue-400"
            >
              {feature.name}
            </Badge>
          ))}
        </div>

        {/* Traits Preview */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
          <div>Size: {race.traits.size}</div>
          <div>Speed: {race.traits.speed}</div>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Race Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(RACES).map(([id, race]) => (
          <RaceCard key={id} id={id} race={race} />
        ))}
      </div>

      {/* Selected Race Details */}
      {selected && RACES[selected] && (
        <Card className="p-6 bg-fantasy-800 border-fantasy-700">
          <ScrollArea className="h-[400px] pr-4">
            <Tabs defaultValue="features" className="space-y-6">
              <TabsList className="bg-fantasy-900">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="traits">Traits</TabsTrigger>
                <TabsTrigger value="lore">Lore</TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="space-y-4">
                {RACES[selected].features.map((feature) => (
                  <div key={feature.name} className="space-y-1">
                    <h4 className="font-medieval text-amber-400">
                      {feature.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="traits">
                <div className="space-y-4">
                  {Object.entries(RACES[selected].traits).map(([trait, value]) => (
                    <div key={trait} className="space-y-1">
                      <h4 className="font-medieval text-amber-400 capitalize">
                        {trait}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {Array.isArray(value) ? value.join(", ") : value}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="lore" className="space-y-4">
                {RACES[selected].lore.map((text, index) => (
                  <p key={index} className="text-sm text-gray-400">
                    {text}
                  </p>
                ))}
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </Card>
      )}
    </div>
  )
}