"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Scroll, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function PDFHandler() {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGeneratePDF = async () => {
    setIsGenerating(true)
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In a real implementation, this would trigger the browser's download
      // using a blob or file URL from your backend
      
      toast({
        title: "Campaign Log Saved",
        description: "Your adventure has been documented",
        duration: 3000,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to save campaign log",
        description: "Please try again later",
        duration: 3000,
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button 
      variant="outline" 
      onClick={handleGeneratePDF}
      disabled={isGenerating}
      className="flex items-center gap-2"
    >
      {isGenerating ? (
        <Scroll className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {isGenerating ? "Saving Campaign..." : "Save Campaign Log"}
    </Button>
  )
}