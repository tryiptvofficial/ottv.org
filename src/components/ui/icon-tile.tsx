import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import type React from "react"

// Circular backing for feature icons and step numbers
const iconTileVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full bg-secondary text-brand",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-meta [&_svg]:size-4",
        md: "h-10 w-10 text-label [&_svg]:size-5",
        lg: "h-12 w-12 text-label [&_svg]:size-6",
      },
    },
    defaultVariants: { size: "md" },
  }
)

interface IconTileProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof iconTileVariants> {}

export function IconTile({ className, size, ...props }: IconTileProps) {
  return <span className={cn(iconTileVariants({ size }), className)} {...props} />
}
