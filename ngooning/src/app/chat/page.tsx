"use client"

import * as React from "react"
import { useChat } from "ai/react"
import { MainLayout } from "@/components/layout/main-layout"
import { ChatInterface, ChatQuickActions } from "@/components/chat/chat-interface"
import { NeuCard } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn, generateId } from "@/lib/utils"

// Demo user
const demoUser = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
}

// Transform AI messages to our format
const transformMessages = (messages: any[]) => {
  return messages.map(msg => ({
    id: msg.id || generateId(),
    role: msg.role,
    content: msg.content,
    timestamp: new Date(msg.createdAt || Date.now()),
    metadata: msg.metadata
  }))
}

export default function ChatPage() {
  const [isListening, setIsListening] = React.useState(false)
  const [showQuickActions, setShowQuickActions] = React.useState(true)
  
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    setMessages,
  } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi! I'm Goon, your personal AI assistant for recovery and lifestyle planning. I'm here to support you on your journey to build better habits, connect with others, and create meaningful experiences. How can I help you today?",
        createdAt: new Date(),
      }
    ],
    onResponse: (response) => {
      console.log('AI Response received:', response)
    },
    onError: (error) => {
      console.error('AI Error:', error)
    }
  })

  const chatSession = {
    id: 'current-session',
    title: 'Chat with Goon',
    messages: transformMessages(messages),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const handleSendMessage = async (content: string) => {
    setShowQuickActions(false)
    await append({
      role: 'user',
      content,
    })
  }

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser.')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      handleSendMessage(transcript)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const handleQuickAction = (action: string, query: string) => {
    setShowQuickActions(false)
    handleSendMessage(query)
  }

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi! I'm Goon, your personal AI assistant for recovery and lifestyle planning. I'm here to support you on your journey to build better habits, connect with others, and create meaningful experiences. How can I help you today?",
        createdAt: new Date(),
      }
    ])
    setShowQuickActions(true)
  }

  return (
    <MainLayout user={demoUser}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">
            Chat with <span className="text-gradient-goon">Goon AI</span>
          </h1>
          <p className="text-muted-foreground">
            Your personal recovery and lifestyle assistant
          </p>
        </div>

        {/* Quick Actions (shown when no conversation) */}
        {showQuickActions && messages.length <= 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-center">
              How can Goon help you today?
            </h2>
            <ChatQuickActions onAction={handleQuickAction} />
          </div>
        )}

        {/* Chat Interface */}
        <NeuCard className="overflow-hidden">
          <ChatInterface
            session={chatSession}
            onSendMessage={handleSendMessage}
            onVoiceInput={handleVoiceInput}
            isLoading={isLoading}
            isListening={isListening}
          />
        </NeuCard>

        {/* Chat Controls */}
        {messages.length > 1 && (
          <div className="flex justify-center space-x-4">
            <Button
              variant="secondary"
              onClick={() => setShowQuickActions(!showQuickActions)}
            >
              {showQuickActions ? 'Hide' : 'Show'} Quick Actions
            </Button>
            <Button
              variant="outline"
              onClick={clearChat}
            >
              Clear Chat
            </Button>
          </div>
        )}

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <NeuCard className="p-6 text-center space-y-4">
            <div className="text-4xl">🧠</div>
            <h3 className="font-semibold">AI-Powered Support</h3>
            <p className="text-sm text-muted-foreground">
              24/7 personalized guidance and motivation for your recovery journey
            </p>
          </NeuCard>
          
          <NeuCard className="p-6 text-center space-y-4">
            <div className="text-4xl">🎯</div>
            <h3 className="font-semibold">Goal Planning</h3>
            <p className="text-sm text-muted-foreground">
              Set and track meaningful goals with intelligent recommendations
            </p>
          </NeuCard>
          
          <NeuCard className="p-6 text-center space-y-4">
            <div className="text-4xl">👥</div>
            <h3 className="font-semibold">Social Connection</h3>
            <p className="text-sm text-muted-foreground">
              Find activities, events, and people that align with your interests
            </p>
          </NeuCard>
        </div>

        {/* Tips */}
        <NeuCard className="p-6">
          <h3 className="font-semibold mb-4">💡 Tips for chatting with Goon</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Be specific about what you're looking for or struggling with</li>
            <li>• Ask about local activities, events, or groups in your area</li>
            <li>• Request help with goal setting and habit tracking</li>
            <li>• Share your recovery milestones for personalized motivation</li>
            <li>• Use voice input for a more natural conversation experience</li>
          </ul>
        </NeuCard>
      </div>
    </MainLayout>
  )
}