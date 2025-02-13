"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed top-4 right-4 z-50 bg-black/20 backdrop-blur-sm 
                 hover:bg-red-950/30 transition-all duration-300
                 text-gray-400 hover:text-red-400
                 ring-1 ring-gray-800 hover:ring-red-800"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  )
}