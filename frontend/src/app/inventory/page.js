"use client"

import { useState } from "react"
import { BackButton } from "@/components/ui/back-button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Search, Filter, Backpack, Sword, Shield, Ring, 
  Scroll, Potion, Coins, Weight
} from "lucide-react"

export default function InventoryPage() {
  const [inventory, setInventory] = useState({
    capacity: {
      current: 45.5,
      max: 100
    },
    gold: 250,
    items: [
      {
        id: 1,
        name: "Enchanted Longsword",
        type: "weapon",
        rarity: "rare",
        weight: 3,
        value: 150,
        description: "A finely crafted sword with magical properties",
        equipped: true,
        quantity: 1,
        image: "https://sparkstack.app/api/mocks/images?query=fantasy+sword"
      },
      // Add more mock items...
    ]
  })

  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  const ItemCard = ({ item }) => (
    <Card className={`
      relative p-2 bg-[#1a2436] border-[#2a3446] 
      hover:border-blue-500/50 transition-all duration-300
      ${item.equipped ? 'ring-2 ring-blue-500/50' : ''}
    `}>
      <div className="group cursor-pointer space-y-2">
        {/* Item Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-black/20">
          <img 
            src={item.image} 
            alt={item.name}
            className="object-cover w-full h-full transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Rarity Indicator */}
          <Badge className={`
            absolute top-2 right-2
            ${item.rarity === 'rare' ? 'bg-blue-500' : 
              item.rarity === 'epic' ? 'bg-purple-500' : 'bg-gray-500'}
          `}>
            {item.rarity}
          </Badge>

          {/* Quantity */}
          {item.quantity > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/60 rounded px-2 py-1 text-xs">
              x{item.quantity}
            </div>
          )}
        </div>

        {/* Item Details */}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-white truncate">{item.name}</h3>
          <div className="flex justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Weight className="h-3 w-3" />
              {item.weight} lb
            </div>
            <div className="flex items-center gap-1">
              <Coins className="h-3 w-3" />
              {item.value} g
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="absolute inset-0 bg-[#1a2436]/90 opacity-0 group-hover:opacity-100 
                      flex items-center justify-center gap-2 transition-opacity">
          <Button size="sm" variant="ghost" className="hover:bg-blue-500/20">
            {item.equipped ? "Unequip" : "Equip"}
          </Button>
          <Button size="sm" variant="ghost" className="hover:bg-red-500/20">
            Drop
          </Button>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-[#0d1219] text-white">
      <BackButton />

      <div className="container mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Inventory</h1>
          <div className="flex items-center gap-2 text-sm">
            <Backpack className="h-4 w-4 text-blue-400" />
            <Progress 
              value={(inventory.capacity.current / inventory.capacity.max) * 100}
              className="w-32 h-2"
            />
            <span className="text-gray-400">
              {inventory.capacity.current}/{inventory.capacity.max} lb
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-[#1a2436] border-[#2a3446]"
            />
          </div>
          <Button variant="outline" className="bg-[#1a2436] border-[#2a3446]">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Inventory Grid */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-[#1a2436] border-[#2a3446]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="weapons">Weapons</TabsTrigger>
            <TabsTrigger value="armor">Armor</TabsTrigger>
            <TabsTrigger value="potions">Potions</TabsTrigger>
            <TabsTrigger value="misc">Misc</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100vh-16rem)]">
            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {inventory.items.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
            {/* Add other tab contents */}
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  )
}