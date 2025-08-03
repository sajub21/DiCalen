import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Sparkles, Smartphone, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-8">
            <Calendar className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Meet <span className="text-primary">DiCalen</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            The AI-powered calendar that understands your schedule. Create events with natural language, 
            get smart suggestions, and never miss what matters most.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/calendar">
                Get Started
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/auth/signin">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-muted/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Everything you need in a calendar
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful features designed to make scheduling effortless
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Sparkles className="h-8 w-8 text-primary mb-2" />
                <CardTitle>AI-Powered Scheduling</CardTitle>
                <CardDescription>
                  Just tell DiCalen what you want to schedule in plain English. 
                  Our AI understands context and creates perfect events.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Smartphone className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Mobile-First Design</CardTitle>
                <CardDescription>
                  Install as a PWA on your phone or tablet. Works seamlessly 
                  across all devices with offline support.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Smart Notifications</CardTitle>
                <CardDescription>
                  Get reminded at the right time via email, push notifications, 
                  or SMS. Never miss an important meeting again.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to transform your scheduling?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of users who have made their calendars smarter with DiCalen.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Start Free Trial
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}