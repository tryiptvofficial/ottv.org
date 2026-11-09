import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Compact pills. Sprout Wash is the soft default; `accent` is the Electric Sprout fill.
const badgeVariants = cva(
  "inline-flex h-6 items-center gap-1 rounded-badge border px-3 text-meta font-medium",
  {
    variants: {
      variant: {
        neutral: "border-transparent bg-secondary text-secondary-foreground",
        accent: "border-transparent bg-primary text-primary-foreground",
        success: "border-transparent bg-secondary text-secondary-foreground",
        info: "border-transparent bg-secondary text-secondary-foreground",
        warning: "border-warning/20 bg-warning/10 text-warning",
        outline: "border-subtle text-muted-foreground",
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
