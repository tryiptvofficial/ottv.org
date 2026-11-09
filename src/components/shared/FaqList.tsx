import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FaqListProps {
  items: { question: string; answer: React.ReactNode }[];
  /** Use 2 when the list sits directly under the page's H1, so no heading level is skipped. */
  headingLevel?: 2 | 3;
  className?: string;
}

/**
 * Every FAQ on the site: one card, native disclosure rows, the reading width of the page.
 * <details> keeps each answer in the server-rendered HTML, which a Radix accordion does not.
 */
export function FaqList({ items, headingLevel = 3, className }: FaqListProps) {
  const Question = `h${headingLevel}` as const;
  return (
    <Card className={cn("mx-auto max-w-narrow px-4 sm:px-6", className)}>
      {items.map((faq, i) => (
        <details key={i} className="group border-b last:border-b-0">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-control py-5 text-left text-foreground transition-colors duration-fast hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-details-marker]:hidden">
            <Question className="text-pretty text-body font-medium">{faq.question}</Question>
            <ChevronDown aria-hidden className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-standard ease-standard group-open:rotate-180" />
          </summary>
          <div className="pb-5 pr-8 text-body text-muted-foreground">{faq.answer}</div>
        </details>
      ))}
    </Card>
  );
}
