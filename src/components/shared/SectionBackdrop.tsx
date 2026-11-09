import { cn } from "@/lib/utils";

/**
 * A barely-there neutral light behind a section heading. It starts above the section so it
 * spills into the neighbour instead of stopping at an edge. Place it first inside a
 * `relative isolate overflow-x-clip` section. Colour stays out of it: the hero is the only
 * atmospheric moment on a page.
 */
export function SectionBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("ambient-glow pointer-events-none absolute inset-x-0 -top-24 bottom-0 -z-10", className)}
    />
  );
}
