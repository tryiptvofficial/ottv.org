import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A layout wrapper for grouped content. Sections no longer animate in: the hero artwork is the one moving moment. */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div>{children}</div>
    </div>
  );
}
