"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function GameScreen() {
  const [messages, setMessages] = useState([
    {
      type: "dm",
      content: "You find yourself at the entrance of a dimly lit tavern. The smell of oak and ale fills the air, while hushed conversations echo through the room.",
      image: "https://sparkstack.app/api/mocks/images?query=fantasy+tavern"
    }
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    
    setMessages([...messages, { type: "player", content: input }])
    setInput("")
    
    // Simulate DM response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: "dm",
        content: "The bartender nods in your direction, his weathered hands continuing to polish a worn mug.",
        image: "https://sparkstack.app/api/mocks/images?query=fantasy+bartender"
      }])
    }, 1000)
  }

  return (
    <div className="flex h-screen flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center border-b border-gray-800 p-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="ml-4 text-xl font-bold">Current Quest</h1>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <Card key={i} className="bg-gray-800 p-4">
              {msg.image && (
                <div className="mb-4 h-48 w-full overflow-hidden rounded-lg">
                  <img 
                    src={msg.image} 
                    alt="Scene visualization" 
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <p className={msg.type === "dm" ? "text-blue-400" : "text-green-400"}>
                {msg.type === "dm" ? "Dungeon Master:" : "You:"}
              </p>
              <p className="mt-2 text-gray-200">{msg.content}</p>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What would you like to do?"
            className="bg-gray-800"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}