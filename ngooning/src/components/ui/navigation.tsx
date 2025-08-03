"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

// Navigation Bar Component
interface NavBarProps {
  className?: string
  children?: React.ReactNode
}

const NavBar = React.forwardRef<HTMLElement, NavBarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 safe-top",
          "neu-glass backdrop-blur-md border-b border-white/10",
          "h-16 flex items-center justify-between px-4 md:px-6",
          className
        )}
        {...props}
      >
        {children}
      </nav>
    )
  }
)
NavBar.displayName = "NavBar"

// Logo Component
interface LogoProps {
  className?: string
  showText?: boolean
}

const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ className, showText = true, ...props }, ref) => {
    return (
      <Link href="/" className="flex items-center space-x-2">
        <div
          ref={ref}
          className={cn(
            "flex items-center space-x-2",
            className
          )}
          {...props}
        >
          <div className="w-8 h-8 neu-flat rounded-neu-sm flex items-center justify-center">
            <span className="text-lg font-bold text-gradient-goon">G</span>
          </div>
          {showText && (
            <span className="text-xl font-bold text-gradient-goon hidden sm:block">
              NGooning
            </span>
          )}
        </div>
      </Link>
    )
  }
)
Logo.displayName = "Logo"

// Navigation Links
interface NavLinksProps {
  className?: string
  links: Array<{
    href: string
    label: string
    icon?: React.ReactNode
  }>
}

const NavLinks = React.forwardRef<HTMLDivElement, NavLinksProps>(
  ({ className, links, ...props }, ref) => {
    const pathname = usePathname()

    return (
      <div
        ref={ref}
        className={cn(
          "hidden md:flex items-center space-x-1",
          className
        )}
        {...props}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-4 py-2 rounded-neu-sm text-sm font-medium transition-all duration-200",
              "hover:text-primary",
              pathname === link.href
                ? "neu-pressed text-primary"
                : "text-muted-foreground hover:neu-flat"
            )}
          >
            <div className="flex items-center space-x-2">
              {link.icon && <span>{link.icon}</span>}
              <span>{link.label}</span>
            </div>
          </Link>
        ))}
      </div>
    )
  }
)
NavLinks.displayName = "NavLinks"

// Mobile Menu Button
interface MobileMenuButtonProps {
  open: boolean
  onToggle: () => void
  className?: string
}

const MobileMenuButton = React.forwardRef<HTMLButtonElement, MobileMenuButtonProps>(
  ({ open, onToggle, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn("md:hidden", className)}
        onClick={onToggle}
        {...props}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={cn(
              "bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm",
              open ? "rotate-45 translate-y-1" : "-translate-y-0.5"
            )}
          />
          <span
            className={cn(
              "bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5",
              open ? "opacity-0" : "opacity-100"
            )}
          />
          <span
            className={cn(
              "bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm",
              open ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
            )}
          />
        </div>
      </Button>
    )
  }
)
MobileMenuButton.displayName = "MobileMenuButton"

// Mobile Menu
interface MobileMenuProps {
  open: boolean
  onClose: () => void
  links: Array<{
    href: string
    label: string
    icon?: React.ReactNode
  }>
  className?: string
}

const MobileMenu = React.forwardRef<HTMLDivElement, MobileMenuProps>(
  ({ open, onClose, links, className, ...props }, ref) => {
    const pathname = usePathname()

    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = "unset"
      }

      return () => {
        document.body.style.overflow = "unset"
      }
    }, [open])

    if (!open) return null

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
        
        {/* Menu */}
        <div
          ref={ref}
          className={cn(
            "fixed top-16 left-0 right-0 z-50 md:hidden",
            "neu-card mx-4 mt-4 p-6 space-y-4",
            "animate-slide-in",
            className
          )}
          {...props}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-neu-sm transition-all duration-200",
                pathname === link.href
                  ? "neu-pressed text-primary"
                  : "text-foreground hover:neu-flat"
              )}
            >
              {link.icon && <span>{link.icon}</span>}
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </>
    )
  }
)
MobileMenu.displayName = "MobileMenu"

// User Menu
interface UserMenuProps {
  user?: {
    name: string
    email: string
    avatar?: string
  }
  onSignOut?: () => void
  className?: string
}

const UserMenu = React.forwardRef<HTMLDivElement, UserMenuProps>(
  ({ user, onSignOut, className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)

    if (!user) {
      return (
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button variant="primary" size="sm" asChild>
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        <Button
          variant="ghost"
          className="flex items-center space-x-2 p-1"
          onClick={() => setOpen(!open)}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:block font-medium">{user.name}</span>
        </Button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
            />
            <div className="absolute right-0 top-full mt-2 z-20 w-56 neu-card p-4 space-y-2">
              <div className="px-3 py-2 border-b border-border">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              
              <Link
                href="/profile"
                className="flex items-center space-x-2 p-2 rounded-neu-sm hover:neu-flat transition-all"
                onClick={() => setOpen(false)}
              >
                <span>Profile</span>
              </Link>
              
              <Link
                href="/settings"
                className="flex items-center space-x-2 p-2 rounded-neu-sm hover:neu-flat transition-all"
                onClick={() => setOpen(false)}
              >
                <span>Settings</span>
              </Link>
              
              <hr className="border-border" />
              
              <button
                onClick={() => {
                  onSignOut?.()
                  setOpen(false)
                }}
                className="w-full text-left p-2 rounded-neu-sm hover:neu-flat transition-all text-destructive"
              >
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    )
  }
)
UserMenu.displayName = "UserMenu"

// Bottom Navigation (Mobile)
interface BottomNavProps {
  links: Array<{
    href: string
    label: string
    icon: React.ReactNode
  }>
  className?: string
}

const BottomNav = React.forwardRef<HTMLElement, BottomNavProps>(
  ({ links, className, ...props }, ref) => {
    const pathname = usePathname()

    return (
      <nav
        ref={ref}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 md:hidden safe-bottom",
          "neu-card border-t border-white/10",
          "flex items-center justify-around p-2",
          className
        )}
        {...props}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex flex-col items-center space-y-1 p-2 rounded-neu-sm transition-all duration-200",
              "min-w-0 flex-1",
              pathname === link.href
                ? "neu-pressed text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="text-lg">{link.icon}</span>
            <span className="text-xs font-medium truncate">{link.label}</span>
          </Link>
        ))}
      </nav>
    )
  }
)
BottomNav.displayName = "BottomNav"

export {
  NavBar,
  Logo,
  NavLinks,
  MobileMenuButton,
  MobileMenu,
  UserMenu,
  BottomNav,
}