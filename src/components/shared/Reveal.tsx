import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Staggers items in a row, in seconds. */
  delay?: number;
}

/** Fades content in on scroll with CSS only, so it is visible without JavaScript and in browsers without scroll timelines. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="reveal" style={{ "--reveal-start": `${Math.round(delay * 200)}px` } as CSSProperties}>
        {children}
      </div>
    </div>
  );
}
