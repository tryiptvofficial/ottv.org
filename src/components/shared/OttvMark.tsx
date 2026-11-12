import { cn } from "@/lib/utils";

/** The play symbol cut out of the mark, in the 64-unit box shared with public/favicon.svg. */
export const PLAY_PATH =
  "M27 22.8C27 21.55 28.38 20.79 29.44 21.46L43.14 30.16C44.12 30.78 44.12 32.22 43.14 32.84L29.44 41.54C28.38 42.21 27 41.45 27 40.2V22.8Z";

/**
 * The OTTV mark: a rounded diamond in Carbon with the play symbol in the canvas colour. Pure black is
 * reserved for this mark; everything else on the page is Obsidian or lighter.
 */
export function OttvMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden focusable="false" className={cn("shrink-0", className)}>
      <rect x="10" y="10" width="44" height="44" rx="10" transform="rotate(45 32 32)" style={{ fill: "hsl(var(--brand))" }} />
      <path d={PLAY_PATH} style={{ fill: "hsl(var(--background))" }} />
    </svg>
  );
}
