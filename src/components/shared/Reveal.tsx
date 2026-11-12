import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A plain layout wrapper for grouped content. It adds no motion itself: cards that fade in as they scroll into
 * view carry the `.reveal` class (CSS scroll-driven, from 35% opacity, off under reduced motion).
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div>{children}</div>
    </div>
  );
}
