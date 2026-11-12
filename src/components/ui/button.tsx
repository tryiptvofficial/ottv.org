import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// The one button. Primary is the main action, the strongest weight on any page: green with black text on
// black bands, ink with light text on off-white bands (the tokens switch). Secondary is a quiet
// card-coloured button with a border. No variant glows. Danger is for destructive actions only.
const buttonVariants = cva(
  "hit-44 relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-label font-medium transition-[color,background-color,box-shadow,transform] duration-standard ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        secondary: "bg-card text-foreground shadow-hairline hover:bg-accent",
        ghost: "text-muted-foreground hover:bg-accent hover:text-foreground",
        link: "h-auto px-0 text-foreground underline decoration-subtle underline-offset-4 hover:decoration-foreground",
        danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // Round floating action (the contact button): green, so it reads on black and on off-white bands.
        pill: "rounded-pill bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_rgb(0_0_0/0.6)] hover:bg-primary/90",
      },
      size: {
        sm: "h-9 rounded-control px-3.5",
        default: "h-11 rounded-control px-5",
        // 16px sides on phones, so a pair of large buttons fits one row from 360px wide.
        lg: "h-12 rounded-control px-4 sm:px-6",
        // Compact pill for the navigation bar.
        nav: "h-9 rounded-pill px-4",
        icon: "h-12 w-12 rounded-pill",
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
