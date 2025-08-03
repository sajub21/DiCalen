"use client"

import * as React from "react"
import { 
  NavBar, 
  Logo, 
  NavLinks, 
  MobileMenuButton, 
  MobileMenu, 
  UserMenu, 
  BottomNav 
} from "@/components/ui/navigation"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

// Icons (using simple SVGs for now)
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
)

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

const MapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
    <line x1="8" y1="2" x2="8" y2="18"/>
    <line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
)

const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

// Navigation links configuration
const mainNavLinks = [
  { href: "/", label: "Dashboard", icon: <HomeIcon /> },
  { href: "/calendar", label: "Calendar", icon: <CalendarIcon /> },
  { href: "/social", label: "Social", icon: <UsersIcon /> },
  { href: "/trips", label: "Trips", icon: <MapIcon /> },
  { href: "/chat", label: "Goon AI", icon: <ChatIcon /> },
]

const bottomNavLinks = [
  { href: "/", label: "Home", icon: <HomeIcon /> },
  { href: "/calendar", label: "Calendar", icon: <CalendarIcon /> },
  { href: "/social", label: "Social", icon: <UsersIcon /> },
  { href: "/trips", label: "Trips", icon: <MapIcon /> },
  { href: "/chat", label: "Goon", icon: <ChatIcon /> },
]

interface MainLayoutProps {
  children: React.ReactNode
  user?: {
    name: string
    email: string
    avatar?: string
  }
  onSignOut?: () => void
}

export function MainLayout({ children, user, onSignOut }: MainLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <NavBar>
        <Logo />
        
        <NavLinks links={mainNavLinks} />
        
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleTheme}
            className="hidden sm:flex"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>
          
          {/* User Menu / Auth Buttons */}
          <UserMenu user={user} onSignOut={onSignOut} />
          
          {/* Mobile Menu Button */}
          <MobileMenuButton
            open={mobileMenuOpen}
            onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </NavBar>

      {/* Mobile Menu */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={[
          ...mainNavLinks,
          { 
            href: "#", 
            label: theme === "dark" ? "Light Mode" : "Dark Mode",
            icon: theme === "dark" ? <SunIcon /> : <MoonIcon />
          }
        ]}
      />

      {/* Main Content */}
      <main 
        className={cn(
          "pt-16 pb-20 md:pb-8 min-h-screen",
          "transition-all duration-200"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 py-6">
          {children}
        </div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <BottomNav links={bottomNavLinks} />
    </div>
  )
}

// Theme Toggle Component (standalone)
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}