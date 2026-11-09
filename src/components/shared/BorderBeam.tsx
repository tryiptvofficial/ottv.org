import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  /** Length of the beam in px. */
  size?: number;
  /** Seconds for one lap around the border. */
  duration?: number;
  className?: string;
}

/**
 * A short gradient that travels around the parent's border. The parent needs
 * `position: relative` and a border radius; the beam inherits the radius and is
 * masked so only the border ring shows. Hidden for reduced-motion users.
 */
export function BorderBeam({ size = 120, duration = 8, className }: BorderBeamProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-transparent motion-reduce:hidden",
        "[mask-clip:padding-box,border-box] [mask-composite:intersect]",
        "[mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
        className,
      )}
    >
      <div
        className="absolute aspect-square animate-border-beam bg-gradient-to-l from-brand via-brand/60 to-transparent [offset-anchor:90%_50%] [offset-path:rect(0_auto_auto_0_round_24px)]"
        style={{ width: size, "--duration": duration } as CSSProperties}
      />
    </div>
  );
}
