import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "flat" | "floating" | "pressed" | "glass"
  }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-card-foreground transition-all duration-200",
      {
        "neu-card": variant === "default",
        "neu-flat": variant === "flat", 
        "neu-floating": variant === "floating",
        "neu-pressed": variant === "pressed",
        "neu-glass": variant === "glass",
      },
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  }
>(({ className, as: Comp = "h3", ...props }, ref) => (
  <Comp
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Specialized Neumorphic Cards
const NeuCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    interactive?: boolean
    hoverable?: boolean
  }
>(({ className, interactive = false, hoverable = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "neu-card",
      {
        "cursor-pointer active:neu-pressed hover:shadow-neu-lg": interactive,
        "hover:shadow-neu-lg hover:-translate-y-1": hoverable && !interactive,
      },
      className
    )}
    {...props}
  />
))
NeuCard.displayName = "NeuCard"

const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "neu-glass backdrop-blur-md border border-white/20 dark:border-white/10",
      className
    )}
    {...props}
  />
))
GlassCard.displayName = "GlassCard"

const FloatingCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    level?: 1 | 2 | 3
  }
>(({ className, level = 1, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "neu-floating",
      {
        "shadow-neu": level === 1,
        "shadow-neu-lg": level === 2,
        "shadow-neu-xl": level === 3,
      },
      className
    )}
    {...props}
  />
))
FloatingCard.displayName = "FloatingCard"

const InteractiveCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    selected?: boolean
  }
>(({ className, selected = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "neu-card cursor-pointer transition-all duration-200",
      "hover:shadow-neu-lg hover:-translate-y-1",
      "active:shadow-neu-inset active:translate-y-0",
      {
        "neu-pressed border-2 border-primary/50": selected,
      },
      className
    )}
    {...props}
  />
))
InteractiveCard.displayName = "InteractiveCard"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  NeuCard,
  GlassCard,
  FloatingCard,
  InteractiveCard,
}