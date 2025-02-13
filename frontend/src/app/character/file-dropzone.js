"use client"

import { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileUp, File, Folder } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function FileDropzone() {
  const { toast } = useToast()
  const [isDragging, setIsDragging] = useState(false)
  const [savedFiles, setSavedFiles] = useState([
    { name: 'Eldric_Level5.pdf', date: '2024-01-20' },
    { name: 'Eldric_Level1.pdf', date: '2024-01-15' },
    // Mock saved files - in production this would come from your file system
  ])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'application/pdf') {
      handleFile(file)
    } else {
      toast({
        variant: "destructive",
        title: "Invalid file",
        description: "Please upload a PDF file",
      })
    }
  }, [])

  const handleFile = (file) => {
    // In production, handle file saving here
    toast({
      title: "Character Sheet Imported",
      description: `Successfully imported ${file.name}`,
    })
    
    // Mock adding to saved files
    setSavedFiles(prev => [{
      name: file.name,
      date: new Date().toISOString().split('T')[0]
    }, ...prev])
  }

  return (
    <div className="space-y-4">
      {/* Drag & Drop Zone */}
      <Card
        className={`
          relative p-8 border-2 border-dashed
          ${isDragging ? 'border-red-500 bg-red-500/10' : 'border-gray-700 bg-gray-800/50'}
          transition-colors duration-200
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center text-center">
          <FileUp className={`h-12 w-12 mb-4 ${isDragging ? 'text-red-500' : 'text-gray-400'}`} />
          <p className="text-lg font-semibold mb-2">Drop your character sheet here</p>
          <p className="text-sm text-gray-400">or click to select PDF file</p>
        </div>
      </Card>

      {/* Saved Files Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Folder className="h-4 w-4" />
            View Saved Character Sheets
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>Saved Character Sheets</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px] w-full pr-4">
            <div className="space-y-2">
              {savedFiles.map((file, index) => (
                <Card 
                  key={index}
                  className="p-3 bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer flex items-center gap-3"
                >
                  <File className="h-5 w-5 text-red-500" />
                  <div className="flex-1">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-400">{file.date}</p>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}