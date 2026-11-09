import { cn } from "@/lib/utils";

interface IndexLabelProps {
  /** 1-based position; shown as two digits, like a channel number. */
  index: number;
  label: string;
  className?: string;
}

/**
 * The site's channel-style numbering ("01 / Plan", "01 / Step"). Only for content that is a real
 * sequence. The number is white, the word muted; Geist Mono marks it as metadata.
 */
export function IndexLabel({ index, label, className }: IndexLabelProps) {
  return (
    <p className={cn("font-mono text-eyebrow uppercase text-muted-foreground tabular-nums", className)}>
      <span className="text-foreground">{String(index).padStart(2, "0")}</span> / {label}
    </p>
  );
}
