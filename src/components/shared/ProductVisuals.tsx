import { cn } from "@/lib/utils";

/**
 * Illustrations of the player interface, drawn in CSS. They use generic labels only, so they never
 * imply that a specific channel or programme is available.
 */
const guideRows: { label: string; blocks: number[]; live: number }[] = [
  { label: "News", blocks: [3, 5, 2, 4], live: 1 },
  { label: "Sports", blocks: [5, 3, 4, 2], live: 0 },
  { label: "Movies", blocks: [2, 6, 3, 3], live: 1 },
  { label: "Kids", blocks: [4, 2, 5, 3], live: 2 },
  { label: "Music", blocks: [3, 3, 3, 5], live: 0 },
];

export function TvGuideVisual({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("space-y-1", className)}>
      {guideRows.map((row) => (
        <div key={row.label} className="flex items-center gap-2">
          <span className="w-14 shrink-0 text-caption text-muted-foreground">{row.label}</span>
          <div className="flex min-w-0 flex-1 gap-1">
            {row.blocks.map((grow, i) => (
              <span
                key={i}
                style={{ flexGrow: grow }}
                className={cn("h-7 basis-0 rounded-tab border", i === row.live ? "border-steel bg-secondary" : "bg-accent")}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
