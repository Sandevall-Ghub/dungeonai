"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Volume2, VolumeX, Settings, PlayCircle, Save, FileDown, Power } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [showSettings, setShowSettings] = useState(false)
  const [volume, setVolume] = useState(80)
  const [settings, setSettings] = useState({
    music: true,
    sfx: true,
    fullscreen: false,
    autoSave: true
  })

  const MenuButton = ({ href, onClick, children, variant = "ghost" }) => (
    <Button
      variant={variant}
      className={`
        w-full max-w-xs text-lg py-6
        bg-black/20 hover:bg-red-950/30
        border border-gray-800 hover:border-red-800
        transform transition-all duration-300
        hover:scale-105 hover:text-red-400
        focus:scale-105 focus:text-red-400
        ${variant === "default" ? "bg-red-950/20" : ""}
      `}
      asChild={!!href}
      onClick={onClick}
    >
      {href ? <Link href={href}>{children}</Link> : <div>{children}</div>}
    </Button>
  )

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{
          backgroundImage: "url('https://sparkstack.app/api/mocks/images?query=dark+fantasy+dragon')",
        }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-6">
        {/* Title */}
        <h1 className="mb-20 text-center font-serif">
          <div className="text-7xl font-bold tracking-wider text-white">
            DARK
          </div>
          <div className="text-6xl font-bold tracking-wider text-red-500">
            FANTASY
          </div>
        </h1>

        {/* Menu Options */}
        <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
          <MenuButton href="/game" variant="default">
            CONTINUE
          </MenuButton>
          <MenuButton href="/character">
            NEW GAME
          </MenuButton>
          <MenuButton onClick={() => setShowSettings(true)}>
            SETTINGS
          </MenuButton>
        </div>

        {/* Settings Dialog */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Settings</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                {/* Audio Settings */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-red-400">Audio</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="music">Music</Label>
                      <Switch
                        id="music"
                        checked={settings.music}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({...prev, music: checked}))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Volume</Label>
                        <span className="text-sm text-gray-400">{volume}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <VolumeX className="h-4 w-4 text-gray-400" />
                        <Slider
                          values={[volume]}
                          min={0}
                          max={100}
                          step={1}
                          className="flex-1"
                          onValueChange={([value]) => setVolume(value)}
                        />
                        <Volume2 className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Game Settings */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-red-400">Game</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="fullscreen">Fullscreen</Label>
                      <Switch
                        id="fullscreen"
                        checked={settings.fullscreen}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({...prev, fullscreen: checked}))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autosave">Auto-Save</Label>
                      <Switch
                        id="autosave"
                        checked={settings.autoSave}
                        onCheckedChange={(checked) => 
                          setSettings(prev => ({...prev, autoSave: checked}))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* Copyright */}
        <div className="absolute bottom-4 text-sm text-gray-500">
          ©2024 DungeonAI. All rights reserved.
        </div>
      </div>
    </div>
  )
}