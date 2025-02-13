"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { FireTransition } from "@/components/ui/fire-transition"
import { PlayCircle, UserPlus, BookOpen, Settings, LogOut } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [showTransition, setShowTransition] = useState(false)
  const [nextRoute, setNextRoute] = useState("")
  const [showQuitDialog, setShowQuitDialog] = useState(false)

  const handleNavigation = (route) => {
    setNextRoute(route)
    setShowTransition(true)
  }

  const handleTransitionComplete = () => {
    router.push(nextRoute)
  }

  const MenuButton = ({ icon: Icon, label, onClick, variant = "ghost" }) => (
    <Button
      variant={variant}
      onClick={onClick}
      className={`
        w-full max-w-xs text-lg py-8
        bg-black/20 hover:bg-red-950/30
        border border-gray-800 hover:border-red-800
        transform transition-all duration-300
        hover:scale-105 hover:text-red-400
        group relative
        ${variant === "default" ? "bg-red-950/20" : ""}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent 
                    translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      <Icon className="mr-3 h-5 w-5" />
      {label}
    </Button>
  )

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <FireTransition 
        show={showTransition} 
        onComplete={handleTransitionComplete} 
      />
      
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
          <MenuButton
            icon={PlayCircle}
            label="START ADVENTURE"
            onClick={() => handleNavigation("/game")}
            variant="default"
          />
          <MenuButton
            icon={UserPlus}
            label="CREATE CHARACTER"
            onClick={() => handleNavigation("/character")}
          />
          <MenuButton
            icon={BookOpen}
            label="CAMPAIGN"
            onClick={() => handleNavigation("/campaign")}
          />
          <MenuButton
            icon={Settings}
            label="SETTINGS"
            onClick={() => handleNavigation("/settings")}
          />
          <MenuButton
            icon={LogOut}
            label="QUIT"
            onClick={() => setShowQuitDialog(true)}
          />
        </div>

        {/* Quit Dialog */}
        <Dialog open={showQuitDialog} onOpenChange={setShowQuitDialog}>
          <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Quit Game</DialogTitle>
            </DialogHeader>
            <p className="text-gray-400">Are you sure you want to quit? Any unsaved progress will be lost.</p>
            <DialogFooter className="flex space-x-2">
              <Button
                variant="ghost"
                onClick={() => setShowQuitDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => window.close()}
              >
                Quit Game
              </Button>
            </DialogFooter>
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