import { CalendarView } from '@/components/calendar/calendar-view'
import { AIAssistant } from '@/components/ai/ai-assistant'

export default function CalendarPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Your Calendar</h1>
            <p className="text-muted-foreground">
              Manage your schedule with AI-powered assistance
            </p>
          </div>
          <CalendarView />
        </div>
        
        <div className="lg:w-80">
          <div className="sticky top-8">
            <AIAssistant />
          </div>
        </div>
      </div>
    </div>
  )
}