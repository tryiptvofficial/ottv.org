import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Five card types. Before reaching for a card, check the content needs containment at all:
// spacing, a divider or a grid is often enough.
const cardVariants = cva("relative text-card-foreground", {
  variants: {
    variant: {
      // Ink surface with a hairline and the inset edge. The default information group.
      base: "rounded-card border bg-card shadow-edge",
      // Defined by its edge only; the canvas shows through.
      edge: "rounded-card border bg-transparent shadow-edge",
      // Tactile key cap: the ring replaces the border. For the most important feature blocks.
      key: "rounded-card bg-card shadow-key",
      // Rare warm tint for coral-anchored content (featured plan, closing CTA).
      accent: "rounded-card border border-brand/25 bg-gradient-to-b from-brand-tint/50 to-card shadow-edge",
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
