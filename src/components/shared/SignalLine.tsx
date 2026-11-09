"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The brand's one stroke: a thin, slightly uneven wave that rises at the end, drawn from the
 * original hero underline. It marks the stream moving through the page and is used in exactly
 * these places: the hero underline, the Steps connector and the active carousel item (the Best
 * Value BorderBeam is the same signal in motion). Add a new use only as a deliberate identity call.
 */
const SIGNAL_PATH = "M 2,11 Q 76,2 150,9.5 Q 224,17 298,8";

interface SignalLineProps {
  className?: string;
  /** Draw the stroke once when it mounts. Skipped for reduced-motion users. */
  draw?: boolean;
  duration?: number;
  delay?: number;
}

// Decorative only, so hidden from assistive tech. The stroke keeps its 2px weight however the
// line is stretched, so one path serves a 64px marker and a full-width connector alike.
export function SignalLine({ className, draw = false, duration = 1.5, delay = 0 }: SignalLineProps) {
  const reduceMotion = useReducedMotion();
  const animate = draw && !reduceMotion;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 300 20"
      preserveAspectRatio="none"
      className={cn("block h-5 w-full overflow-visible text-brand", className)}
    >
      <motion.path
        d={SIGNAL_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={animate ? { pathLength: 0, opacity: 0 } : false}
        animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration, delay, ease: "easeInOut" }}
      />
    </svg>
  );
}
