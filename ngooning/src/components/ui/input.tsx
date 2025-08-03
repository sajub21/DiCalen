import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "flat" | "floating" | "ghost"
  error?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-neu border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all duration-200",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            {
              "neu-input border-none": variant === "default",
              "neu-flat border border-input": variant === "flat",
              "neu-floating shadow-neu-lg": variant === "floating",
              "bg-transparent border-none focus-visible:bg-background/50": variant === "ghost",
              "pl-10": leftIcon,
              "pr-10": rightIcon,
              "border-destructive focus-visible:ring-destructive": error,
            },
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    variant?: "default" | "flat" | "floating" | "ghost"
    error?: boolean
  }
>(({ className, variant = "default", error, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-neu border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all duration-200",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "resize-none",
        {
          "neu-input border-none": variant === "default",
          "neu-flat border border-input": variant === "flat", 
          "neu-floating shadow-neu-lg": variant === "floating",
          "bg-transparent border-none focus-visible:bg-background/50": variant === "ghost",
          "border-destructive focus-visible:ring-destructive": error,
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2", className)}
    {...props}
  >
    {children}
  </div>
))
InputGroup.displayName = "InputGroup"

const InputLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & {
    required?: boolean
  }
>(({ className, required, children, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  >
    {children}
    {required && <span className="ml-1 text-destructive">*</span>}
  </label>
))
InputLabel.displayName = "InputLabel"

const InputError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-destructive", className)}
    {...props}
  />
))
InputError.displayName = "InputError"

const InputHelp = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-muted-foreground", className)}
    {...props}
  />
))
InputHelp.displayName = "InputHelp"

// Specialized Input Components
const SearchInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type" | "leftIcon">
>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    type="search"
    leftIcon={
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
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    }
    placeholder="Search..."
    className={cn("pl-10", className)}
    {...props}
  />
))
SearchInput.displayName = "SearchInput"

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type" | "rightIcon">
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <Input
      ref={ref}
      type={showPassword ? "text" : "password"}
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="p-1 hover:bg-accent rounded-sm transition-colors"
        >
          {showPassword ? (
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
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
              <line x1="2" x2="22" y1="2" y2="22" />
            </svg>
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
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      }
      className={cn("pr-10", className)}
      {...props}
    />
  )
})
PasswordInput.displayName = "PasswordInput"

export {
  Input,
  Textarea,
  InputGroup,
  InputLabel,
  InputError,
  InputHelp,
  SearchInput,
  PasswordInput,
}