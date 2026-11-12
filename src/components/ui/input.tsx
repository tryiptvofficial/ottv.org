import * as React from "react"

import { cn } from "@/lib/utils"

// One field style shared by Input, Textarea and Select: the card colour with an edge that passes 3:1 against
// the band, a green edge and soft ring on focus, and a danger edge when aria-invalid is set.
export const fieldClasses =
  "w-full rounded-input border border-input bg-field px-3 text-body text-foreground transition-[border-color,box-shadow] duration-fast placeholder:text-placeholder hover:border-foreground/50 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive/15"

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
