import { Card } from "@/components/ui/card";
import { Heading, Lead } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface CalloutProps {
  title: React.ReactNode;
  children?: React.ReactNode;
  /** Buttons under the copy. */
  action?: React.ReactNode;
  /** Heading level for the document outline; the size stays the same. */
  level?: 2 | 3;
  size?: "default" | "large";
  /** Decorative artwork placed behind the copy. */
  backdrop?: React.ReactNode;
  className?: string;
}

/**
 * The closing call to action or guarantee panel: the one inverted surface on a page.
 * Use once per page at most.
 */
export function Callout({ title, children, action, level = 2, size = "default", backdrop, className }: CalloutProps) {
  const large = size === "large";
  return (
    <Card
      variant="accent"
      size={large ? "large" : "default"}
      className={cn("overflow-hidden text-center", large ? "px-6 py-16 sm:px-12 sm:py-20" : "p-6 sm:p-8 md:p-12", className)}
    >
      {backdrop}
      <Heading level={level} size="serif" className="relative mx-auto max-w-2xl">
        {title}
      </Heading>
      {children && <Lead className="relative mx-auto mt-4 max-w-2xl">{children}</Lead>}
      {action && <div className="relative mt-8 flex flex-wrap justify-center gap-2">{action}</div>}
    </Card>
  );
}
