'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Bot, Send, Sparkles } from 'lucide-react'

export function AIAssistant() {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([
    "Schedule a team meeting for tomorrow at 2 PM",
    "Find a good time for lunch with Sarah next week",
    "Block 2 hours for project work on Friday",
    "Remind me to call the dentist in 3 days"
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    // TODO: Implement AI processing with Vercel AI SDK
    
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false)
      setInput('')
      // TODO: Create event based on AI interpretation
    }, 2000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="h-5 w-5 text-primary" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Tell me what you want to schedule..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Sparkles className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Quick suggestions:</p>
          <div className="space-y-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left text-sm p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
                disabled={isLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}