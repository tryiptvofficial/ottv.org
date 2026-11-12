import type { LucideIcon } from "lucide-react";
import { keepTogether } from "@/lib/keep-together";
import { cn } from "@/lib/utils";

export interface Stat {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface StatStripProps {
  items: Stat[];
  /** Names the strip as a region when it has no heading of its own. */
  label?: string;
  /** `pairs` keeps two figures per row on phones; use it only for short values. */
  density?: "pairs" | "stacked";
  className?: string;
}

/**
 * Facts at a glance: an optional green icon, the figure, then its label, in that order in the page text as
 * well as on screen, so search engines, AI answers and screen readers pair them correctly. Use facts the
 * site states elsewhere, never invented counts.
 */
export function StatStrip({ items, label, density = "stacked", className }: StatStripProps) {
  const list = (
    <ul
      className={cn(
        "grid gap-3 lg:grid-cols-4 lg:gap-4",
        density === "pairs" ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2",
        !label && className
      )}
    >
      {items.map((item) => (
        <li key={item.label} className="flex flex-col gap-3 rounded-card bg-card p-4 shadow-card md:flex-row md:items-center md:gap-4 md:p-5">
          {item.icon && (
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-primary/10 text-signal shadow-[inset_0_0_0_1px_hsl(var(--signal)/0.25)]">
              <item.icon aria-hidden className="h-5 w-5" />
            </span>
          )}
          <span className="min-w-0">
            <span className="block text-stat tabular-nums text-foreground">{item.value}</span>
            <span className="mt-1 block text-caption text-muted-foreground">{keepTogether(item.label)}</span>
          </span>
        </li>
      ))}
    </ul>
  );

  if (!label) return list;
  return (
    <section aria-label={label} className={className}>
      {list}
    </section>
  );
}
