import * as React from "react"

import { cn } from "@/lib/utils"

// One field style shared by Input, Textarea and Select: transparent with a hairline, the border
// brightens on focus, and a danger edge when aria-invalid is set.
export const fieldClasses =
  "w-full rounded-input border border-input bg-field px-4 text-body text-foreground ring-offset-background transition-colors duration-fast placeholder:text-placeholder hover:border-foreground/40 focus-visible:border-brand focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive"

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
