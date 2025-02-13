"use client"

import { useState } from "react"
import { BackButton } from "@/components/ui/back-button"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  Book, Users, MapPin, Calendar, Plus, 
  Scroll, Sword, Crown, Shield 
} from "lucide-react"

export default function CampaignPage() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "The Curse of Strahd",
      description: "A gothic horror campaign set in the realm of Barovia",
      status: "active",
      players: 4,
      level: "5-10",
      sessions: 12,
      lastPlayed: "2024-01-20",
      image: "https://sparkstack.app/api/mocks/images?query=dark+fantasy+castle"
    },
    // Add more mock campaigns...
  ])

  const CampaignCard = ({ campaign }) => (
    <Card className="relative overflow-hidden group">
      {/* Campaign Image */}
      <div className="relative h-48">
        <img 
          src={campaign.image} 
          alt={campaign.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2436] to-transparent" />
        
        {/* Status Badge */}
        <Badge className={`
          absolute top-4 right-4
          ${campaign.status === 'active' ? 'bg-green-500' : 
            campaign.status === 'planned' ? 'bg-blue-500' : 'bg-gray-500'}
        `}>
          {campaign.status}
        </Badge>
      </div>

      {/* Campaign Info */}
      <div className="p-4 space-y-4 bg-[#1a2436]">
        <h3 className="text-xl font-bold text-white">{campaign.name}</h3>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Users className="h-4 w-4" />
            {campaign.players} Players
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Sword className="h-4 w-4" />
            Level {campaign.level}
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="h-4 w-4" />
            {campaign.sessions} Sessions
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Crown className="h-4 w-4" />
            DM: You
          </div>
        </div>

        {/* Quick Actions */}
        <div className="absolute inset-0 bg-[#1a2436]/90 opacity-0 group-hover:opacity-100 
                      flex items-center justify-center gap-4 transition-opacity">
          <Button variant="outline" className="bg-blue-500/20 hover:bg-blue-500/40">
            Continue
          </Button>
          <Button variant="outline" className="bg-red-500/20 hover:bg-red-500/40">
            Manage
          </Button>
        </div>
      </div>
    </Card>
  )

  const NewCampaignDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="relative h-full min-h-[300px] flex items-center justify-center
                       border-2 border-dashed border-[#2a3446] hover:border-blue-500/50
                       transition-colors cursor-pointer bg-[#1a2436]/50">
          <div className="text-center space-y-2">
            <Plus className="h-8 w-8 mx-auto text-blue-400" />
            <p className="text-gray-400">Create New Campaign</p>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-[#1a2436] border-[#2a3446]">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Campaign Name</label>
            <Input className="bg-[#0d1219] border-[#2a3446]" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Description</label>
            <Textarea className="bg-[#0d1219] border-[#2a3446]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Starting Level</label>
              <Input type="number" className="bg-[#0d1219] border-[#2a3446]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Player Limit</label>
              <Input type="number" className="bg-[#0d1219] border-[#2a3446]" />
            </div>
          </div>
          <Button className="w-full">Create Campaign</Button>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="min-h-screen bg-[#0d1219] text-white">
      <BackButton />

      <div className="container mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-[#1a2436] border-[#2a3446]">
              <Shield className="h-4 w-4 mr-2" />
              Import Campaign
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="bg-[#1a2436] border-[#2a3446]">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="planned">Planned</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            <TabsContent value="active" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
                <NewCampaignDialog />
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  )
}