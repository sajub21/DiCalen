"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, NeuCard, GlassCard, FloatingCard } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MainLayout } from "@/components/layout/main-layout"
import { cn } from "@/lib/utils"

// Demo user for layout
const demoUser = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
}

// Feature icons
const BrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
    <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
    <path d="M6 18a4 4 0 0 1-1.967-.516"/>
    <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
  </svg>
)

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

const MapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
    <line x1="8" y1="2" x2="8" y2="18"/>
    <line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
)

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
  </svg>
)

// Stats data
const stats = [
  { label: "Active Users", value: "10K+", icon: <UsersIcon /> },
  { label: "Success Rate", value: "85%", icon: <ZapIcon /> },
  { label: "Days Clean", value: "1.2M+", icon: <ShieldIcon /> },
  { label: "Friendships", value: "25K+", icon: <UsersIcon /> },
]

// Features data
const features = [
  {
    title: "Goon AI Assistant",
    description: "Your personal AI companion providing 24/7 support, motivation, and guidance on your recovery journey.",
    icon: <BrainIcon />,
    color: "from-blue-500 to-purple-600"
  },
  {
    title: "Social Recovery Network",
    description: "Connect with like-minded individuals, join verified groups, and build meaningful friendships in real life.",
    icon: <UsersIcon />,
    color: "from-green-500 to-teal-600"
  },
  {
    title: "Smart Calendar Sync",
    description: "Seamlessly integrate with Google and Apple Calendar. Plan activities, set goals, and track your progress.",
    icon: <CalendarIcon />,
    color: "from-orange-500 to-red-600"
  },
  {
    title: "Trip & Experience Planner",
    description: "Discover new places, plan group trips, and create real-world experiences that matter.",
    icon: <MapIcon />,
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "Habit Tracking",
    description: "Build better habits, track streaks, and celebrate milestones with our comprehensive tracking system.",
    icon: <ShieldIcon />,
    color: "from-indigo-500 to-blue-600"
  },
  {
    title: "Real-time Support",
    description: "Voice chat, group discussions, and instant support when you need it most from our community.",
    icon: <ZapIcon />,
    color: "from-yellow-500 to-orange-600"
  },
]

export default function HomePage() {
  return (
    <MainLayout user={demoUser}>
      <div className="space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-8 pt-12 pb-16">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Transform Your Life with{" "}
              <span className="text-gradient-goon">NGooning</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              AI-powered social recovery and lifestyle planning. Break free, build connections, and create the life you deserve.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="xl" variant="primary" className="px-8">
              Start Your Journey
            </Button>
            <Button size="xl" variant="secondary" className="px-8">
              Learn More
            </Button>
          </div>
          
          {/* Hero Visual */}
          <div className="mt-16">
            <NeuCard className="max-w-4xl mx-auto p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FloatingCard className="p-6 text-center space-y-4" level={1}>
                  <BrainIcon />
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-sm text-muted-foreground">24/7 support</p>
                </FloatingCard>
                <FloatingCard className="p-6 text-center space-y-4" level={2}>
                  <UsersIcon />
                  <h3 className="font-semibold">Social Network</h3>
                  <p className="text-sm text-muted-foreground">Real connections</p>
                </FloatingCard>
                <FloatingCard className="p-6 text-center space-y-4" level={1}>
                  <MapIcon />
                  <h3 className="font-semibold">Trip Planning</h3>
                  <p className="text-sm text-muted-foreground">Real experiences</p>
                </FloatingCard>
              </div>
            </NeuCard>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Thousands on Their Journey
            </h2>
            <p className="text-lg text-muted-foreground">
              Real people, real results, real transformation
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <NeuCard key={index} className="p-6 text-center space-y-4">
                <div className="flex justify-center text-primary">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-gradient-goon">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </NeuCard>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and support you need for lasting transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <NeuCard 
                key={index} 
                className="p-6 space-y-4 hover:shadow-neu-lg transition-all duration-300"
              >
                <div className={cn(
                  "w-12 h-12 rounded-neu flex items-center justify-center text-white",
                  "bg-gradient-to-r", feature.color
                )}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </NeuCard>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <GlassCard className="p-8 md:p-12 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Transform Your Life?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join NGooning today and start your journey towards a healthier, more connected, and fulfilling life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Input 
                placeholder="Enter your email"
                className="flex-1"
                variant="floating"
              />
              <Button variant="primary" size="lg" className="px-8">
                Get Started
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              30-day free trial • £10/month after • Cancel anytime
            </p>
          </GlassCard>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-gradient-goon">NGooning</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered social recovery and lifestyle planning for a better tomorrow.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <div className="space-y-2 text-sm">
                <Link href="/features" className="block text-muted-foreground hover:text-foreground">Features</Link>
                <Link href="/pricing" className="block text-muted-foreground hover:text-foreground">Pricing</Link>
                <Link href="/download" className="block text-muted-foreground hover:text-foreground">Download</Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-sm">
                <Link href="/help" className="block text-muted-foreground hover:text-foreground">Help Center</Link>
                <Link href="/contact" className="block text-muted-foreground hover:text-foreground">Contact</Link>
                <Link href="/community" className="block text-muted-foreground hover:text-foreground">Community</Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <div className="space-y-2 text-sm">
                <Link href="/privacy" className="block text-muted-foreground hover:text-foreground">Privacy</Link>
                <Link href="/terms" className="block text-muted-foreground hover:text-foreground">Terms</Link>
                <Link href="/cookies" className="block text-muted-foreground hover:text-foreground">Cookies</Link>
              </div>
            </div>
          </div>
          
          <div className="pt-8 mt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 NGooning. All rights reserved.
          </div>
        </footer>
      </div>
    </MainLayout>
  )
}
