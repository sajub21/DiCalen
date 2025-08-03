'use client'

import { useState, useCallback } from 'react'
import { Calendar, dateFnsLocalizer, View, Views } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import Link from 'next/link'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

// Sample events data
const sampleEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    start: new Date(2025, 0, 15, 10, 0),
    end: new Date(2025, 0, 15, 11, 0),
    resource: { color: '#3b82f6' }
  },
  {
    id: '2',
    title: 'Project Review',
    start: new Date(2025, 0, 16, 14, 0),
    end: new Date(2025, 0, 16, 15, 30),
    resource: { color: '#10b981' }
  },
  {
    id: '3',
    title: 'Client Call',
    start: new Date(2025, 0, 17, 9, 0),
    end: new Date(2025, 0, 17, 10, 0),
    resource: { color: '#f59e0b' }
  },
]

interface CalendarViewProps {
  events?: any[]
}

export function CalendarView({ events = sampleEvents }: CalendarViewProps) {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState<View>(Views.MONTH)

  const onNavigate = useCallback((newDate: Date) => {
    setDate(newDate)
  }, [])

  const onView = useCallback((newView: View) => {
    setView(newView)
  }, [])

  const eventStyleGetter = useCallback((event: any) => {
    const backgroundColor = event.resource?.color || '#3b82f6'
    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    }
  }, [])

  const CustomToolbar = ({ label, onNavigate, onView }: any) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onNavigate('PREV')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold min-w-[200px] text-center">
          {label}
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onNavigate('NEXT')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex rounded-md border border-border">
          {[
            { key: Views.MONTH, label: 'Month' },
            { key: Views.WEEK, label: 'Week' },
            { key: Views.DAY, label: 'Day' },
            { key: Views.AGENDA, label: 'Agenda' },
          ].map((viewOption) => (
            <Button
              key={viewOption.key}
              variant={view === viewOption.key ? "default" : "ghost"}
              size="sm"
              onClick={() => onView(viewOption.key)}
              className="rounded-none first:rounded-l-md last:rounded-r-md"
            >
              {viewOption.label}
            </Button>
          ))}
        </div>
        
        <Button size="sm" asChild>
          <Link href="/events/new">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Link>
        </Button>
      </div>
    </div>
  )

  return (
    <Card className="p-6">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        date={date}
        view={view}
        onNavigate={onNavigate}
        onView={onView}
        eventPropGetter={eventStyleGetter}
        components={{
          toolbar: CustomToolbar,
        }}
        popup
        showMultiDayTimes
        step={30}
        timeslots={2}
      />
    </Card>
  )
}