"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NeuCard, FloatingCard } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { formatRelativeTime } from "@/lib/utils"

// Types
interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
  metadata?: any
}

interface ChatSession {
  id: string
  title?: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

interface ChatInterfaceProps {
  session?: ChatSession
  onSendMessage: (content: string) => void
  onVoiceInput?: () => void
  isLoading?: boolean
  isListening?: boolean
  className?: string
}

// Chat message component
const ChatMessage = React.forwardRef<
  HTMLDivElement,
  {
    message: Message
    className?: string
  }
>(({ message, className }, ref) => {
  const isUser = message.role === "user"
  const isSystem = message.role === "system"

  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-3 p-4",
        isUser ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      <Avatar size="sm" className="flex-shrink-0">
        {isUser ? (
          <AvatarFallback className="bg-primary text-primary-foreground">
            U
          </AvatarFallback>
        ) : (
          <AvatarImage src="/goon-avatar.png" alt="Goon AI" />
        )}
        {!isUser && (
          <AvatarFallback className="bg-gradient-to-r from-goon-primary to-goon-secondary text-white">
            G
          </AvatarFallback>
        )}
      </Avatar>

      <div className={cn("flex flex-col space-y-2 max-w-[70%]")}>
        <FloatingCard
          className={cn(
            "p-3",
            isUser 
              ? "bg-primary text-primary-foreground ml-auto" 
              : "neu-card",
            isSystem && "bg-muted text-muted-foreground"
          )}
        >
          <div className="text-sm whitespace-pre-wrap">
            {message.content}
          </div>
        </FloatingCard>
        
        <div
          className={cn(
            "text-xs text-muted-foreground",
            isUser ? "text-right" : "text-left"
          )}
        >
          {formatRelativeTime(message.timestamp)}
        </div>
      </div>
    </div>
  )
})
ChatMessage.displayName = "ChatMessage"

// Voice input button
const VoiceInputButton = React.forwardRef<
  HTMLButtonElement,
  {
    onVoiceInput?: () => void
    isListening?: boolean
    className?: string
  }
>(({ onVoiceInput, isListening, className }, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      onClick={onVoiceInput}
      className={cn(
        "flex-shrink-0",
        isListening && "animate-pulse text-primary",
        className
      )}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" x2="12" y1="19" y2="22"/>
        <line x1="8" x2="16" y1="22" y2="22"/>
      </svg>
    </Button>
  )
})
VoiceInputButton.displayName = "VoiceInputButton"

// Goon AI avatar with animation
const GoonAvatar = React.forwardRef<
  HTMLDivElement,
  {
    isTyping?: boolean
    className?: string
  }
>(({ isTyping, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative w-16 h-16 mx-auto mb-4",
        className
      )}
    >
      <div className={cn(
        "w-full h-full rounded-full bg-gradient-to-r from-goon-primary to-goon-secondary",
        "flex items-center justify-center text-white text-xl font-bold",
        "neu-floating transition-all duration-300",
        isTyping && "animate-pulse-gentle"
      )}>
        G
      </div>
      
      {/* Thinking indicator */}
      {isTyping && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-goon-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-goon-primary rounded-full animate-bounce animation-delay-100"></div>
            <div className="w-2 h-2 bg-goon-primary rounded-full animate-bounce animation-delay-200"></div>
          </div>
        </div>
      )}
    </div>
  )
})
GoonAvatar.displayName = "GoonAvatar"

// Main chat interface
export const ChatInterface = React.forwardRef<HTMLDivElement, ChatInterfaceProps>(
  ({ 
    session, 
    onSendMessage, 
    onVoiceInput, 
    isLoading, 
    isListening, 
    className 
  }, ref) => {
    const [input, setInput] = React.useState("")
    const messagesEndRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const messages = session?.messages || []

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    React.useEffect(() => {
      scrollToBottom()
    }, [messages])

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (input.trim() && !isLoading) {
        onSendMessage(input.trim())
        setInput("")
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSubmit(e)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col h-full max-h-[600px] min-h-[400px]",
          className
        )}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-center p-4 border-b border-border">
          <GoonAvatar isTyping={isLoading} />
        </div>

        <div className="text-center px-4 pb-4">
          <h3 className="text-lg font-semibold text-gradient-goon">
            Goon AI Assistant
          </h3>
          <p className="text-sm text-muted-foreground">
            Your personal recovery and lifestyle companion
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
              <div className="text-muted-foreground">
                <p className="text-lg font-medium mb-2">
                  👋 Hi there! I'm Goon, your AI assistant.
                </p>
                <p className="text-sm max-w-md mx-auto">
                  I'm here to support your recovery journey, help you plan activities, 
                  connect with friends, and build better habits. How can I help you today?
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => onSendMessage("How can you help me with recovery?")}
                >
                  Recovery Support
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => onSendMessage("Help me plan a social activity")}
                >
                  Plan Activity
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => onSendMessage("Show me my habit progress")}
                >
                  Check Progress
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => onSendMessage("Find local groups near me")}
                >
                  Find Groups
                </Button>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2 p-3 neu-card rounded-neu max-w-xs">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-goon-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-goon-primary rounded-full animate-bounce animation-delay-100"></div>
                      <div className="w-2 h-2 bg-goon-primary rounded-full animate-bounce animation-delay-200"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">Goon is thinking...</span>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Goon anything..."
              disabled={isLoading}
              className="flex-1"
              variant="default"
            />
            
            {onVoiceInput && (
              <VoiceInputButton
                onVoiceInput={onVoiceInput}
                isListening={isListening}
              />
            )}
            
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              variant="primary"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" x2="11" y1="2" y2="13"/>
                  <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                </svg>
              )}
            </Button>
          </form>
        </div>
      </div>
    )
  }
)
ChatInterface.displayName = "ChatInterface"

// Quick actions component
export const ChatQuickActions = React.forwardRef<
  HTMLDivElement,
  {
    onAction: (action: string, query: string) => void
    className?: string
  }
>(({ onAction, className }, ref) => {
  const quickActions = [
    {
      title: "Daily Check-in",
      description: "How are you feeling today?",
      action: "checkin",
      query: "Let's do my daily check-in. How should I start?",
      icon: "❤️"
    },
    {
      title: "Find Activities",
      description: "Discover local events and meetups",
      action: "activities",
      query: "Show me interesting activities and events near me",
      icon: "🎯"
    },
    {
      title: "Recovery Support",
      description: "Get motivation and guidance",
      action: "support",
      query: "I need some motivation and recovery support today",
      icon: "💪"
    },
    {
      title: "Plan a Trip",
      description: "Organize a group adventure",
      action: "trip",
      query: "Help me plan a trip with my friends",
      icon: "✈️"
    },
    {
      title: "Habit Check",
      description: "Review your progress",
      action: "habits",
      query: "Show me my habit progress and suggest improvements",
      icon: "📊"
    },
    {
      title: "Social Connect",
      description: "Meet new people",
      action: "social",
      query: "Help me find people with similar interests to connect with",
      icon: "👥"
    }
  ]

  return (
    <div
      ref={ref}
      className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}
    >
      {quickActions.map((action, index) => (
        <NeuCard
          key={index}
          className="p-4 cursor-pointer hover:shadow-neu-lg transition-all duration-200"
          onClick={() => onAction(action.action, action.query)}
        >
          <div className="flex items-start space-x-3">
            <div className="text-2xl">{action.icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm">{action.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {action.description}
              </p>
            </div>
          </div>
        </NeuCard>
      ))}
    </div>
  )
})
ChatQuickActions.displayName = "ChatQuickActions"