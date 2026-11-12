import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Tags are mono stamps in a pill: Geist Mono 11px uppercase. `accent` is the filled Obsidian tag (white on an
// inverted card, where the tokens flip).
const badgeVariants = cva(
  "stamp inline-flex h-6 items-center gap-1 rounded-badge px-2.5",
  {
    variants: {
      variant: {
        neutral: "bg-accent text-foreground",
        accent: "bg-primary text-primary-foreground",
        success: "bg-signal/10 text-signal",
        info: "bg-accent text-foreground",
        warning: "bg-warning/10 text-warning",
        outline: "text-muted-foreground shadow-hairline",
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
