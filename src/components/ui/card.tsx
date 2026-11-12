import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Cards sit one step above their band (#090909 on black, white on off-white) with an elegant border and a
// long, faint shadow. Before reaching for a card, check the content needs containment at all.
const cardVariants = cva("relative text-card-foreground", {
  variants: {
    variant: {
      // The default information group.
      base: "rounded-card bg-card shadow-card",
      // Defined by its edge only; the canvas shows through.
      edge: "rounded-card bg-transparent shadow-hairline",
      // Same surface as base, kept for the most important feature blocks.
      key: "rounded-card bg-card shadow-card",
      // A black card on a light band (plan cards), or a black card on black for the closing call to action.
      accent: "surface-invert rounded-card shadow-card",
      // A white card that returns to paper on a black band.
      spotlight: "surface-paper rounded-card shadow-card",
      // One cell of a `Grid gap="lattice"`: the grid draws the hairlines.
      cell: "bg-card",
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
    className={cn("flex flex-col gap-2 p-4 md:p-6", className)}
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
  <div ref={ref} className={cn("p-4 pt-0 md:p-6 md:pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4 pt-0 md:p-6 md:pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
