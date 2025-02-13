"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { FileUp, Download, RefreshCw } from "lucide-react"

export function PDFHandler({ onImport }) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState(null)
  const [showDialog, setShowDialog] = useState(false)

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      // Simulate file processing with progress
      for (let i = 0; i <= 100; i += 20) {
        setUploadProgress(i)
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      // Mock parsed character data
      const mockParsedData = {
        name: "Imported Character",
        class: "Fighter",
        race: "Human",
        level: 1,
        stats: {
          strength: 16,
          dexterity: 14,
          constitution: 15,
          intelligence: 12,
          wisdom: 13,
          charisma: 11
        }
      }

      onImport(mockParsedData)
      setShowDialog(false)
    } catch (err) {
      setError('Error processing PDF. Please try again.')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <>
      <div className="flex gap-2 mb-4">
        <Button 
          variant="outline" 
          onClick={() => setShowDialog(true)}
          className="flex items-center gap-2"
        >
          <FileUp className="h-4 w-4" />
          Import from D&D Beyond
        </Button>
        <Button 
          variant="outline"
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>Import Character Sheet</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isUploading ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Processing PDF...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-400">
                  Select your D&D Beyond character sheet PDF to import. 
                  Your character data will be automatically synchronized.
                </p>
                <div className="flex justify-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-red-500 transition-colors">
                      <FileUp className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-400">
                        Click to select PDF or drag and drop
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}