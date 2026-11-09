import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Compact metadata tags. Status colours tint the text and a faint wash, never a full fill,
// except `accent`, the coral fill reserved for a featured marker.
const badgeVariants = cva(
  "inline-flex h-5 items-center gap-1 rounded-badge border px-1.5 text-meta font-medium",
  {
    variants: {
      variant: {
        neutral: "border-transparent bg-secondary text-foreground",
        accent: "border-transparent bg-brand text-white",
        success: "border-success/20 bg-success/10 text-success",
        info: "border-info/20 bg-info/10 text-info",
        warning: "border-warning/20 bg-warning/10 text-warning",
        outline: "text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
