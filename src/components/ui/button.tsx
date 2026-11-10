import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// The one button. Conversion controls stay monochrome: Paper White for the primary action, Graphite for the
// secondary. 8px corners throughout. Danger is for destructive actions only.
const buttonVariants = cva(
  "hit-44 relative active:translate-y-px inline-flex items-center justify-center gap-2 whitespace-nowrap text-label ring-offset-background transition-colors duration-fast ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "border border-foreground/10 bg-primary text-primary-foreground shadow-button-primary hover:bg-foreground active:bg-primary/85",
        secondary: "border border-steel bg-secondary text-secondary-foreground shadow-button-secondary hover:bg-steel/70 active:bg-steel",
        ghost: "border border-foreground/10 text-muted-foreground hover:bg-accent hover:text-foreground",
        link: "h-auto px-0 text-foreground underline decoration-subtle underline-offset-4 hover:decoration-foreground",
        danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // Dark circular control for carousels and floating actions.
        pill: "border bg-accent text-foreground shadow-nav hover:bg-secondary",
      },
      size: {
        sm: "h-9 rounded-control px-4",
        default: "h-9 rounded-control px-4",
        lg: "h-9 rounded-control px-4",
        icon: "h-8 w-8 rounded-pill",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
