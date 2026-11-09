import * as React from "react"

import { cn } from "@/lib/utils"

// One recessed field style shared by Input, Textarea and Select: a 5% white well you type into,
// a visible white focus ring (no glow), and a danger edge when aria-invalid is set.
export const fieldClasses =
  "w-full rounded-control border border-input bg-foreground/5 px-3 text-body text-foreground ring-offset-background transition-colors duration-fast placeholder:text-muted-foreground hover:border-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11",
          fieldClasses,
          "file:border-0 file:bg-transparent file:text-label file:text-foreground",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
