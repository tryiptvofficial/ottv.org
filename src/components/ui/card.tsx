import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Flat, framed by a 1px hairline. Before reaching for a card, check the content needs containment
// at all: spacing, a divider or a grid is often enough.
const cardVariants = cva("relative text-card-foreground", {
  variants: {
    variant: {
      // Forest on dark bands, Bone White on white bands. The default information group.
      base: "rounded-card border bg-card",
      // Defined by its edge only; the band shows through.
      edge: "rounded-card border bg-transparent",
      // Same surface as base, kept for the most important feature blocks.
      key: "rounded-card border bg-card",
      // Flips to the opposite tone. For the featured plan or the closing call to action.
      accent: "surface-invert rounded-card border",
    },
    size: {
      default: "",
      large: "rounded-card-lg",
    },
  },
  defaultVariants: { variant: "base", size: "default" },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: React.ElementType
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, as: Comp = "div", ...props }, ref) => (
    <Comp ref={ref} className={cn(cardVariants({ variant, size }), className)} {...props} />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-headline text-subheading text-foreground", className)}
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
    className={cn("text-caption text-muted-foreground", className)}
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

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
