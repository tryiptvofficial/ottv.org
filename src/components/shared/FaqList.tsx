import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FaqListProps {
  items: { question: string; answer: React.ReactNode }[];
  className?: string;
}

/**
 * Every FAQ on the site: one card, native disclosure rows, the reading width of the page.
 * <details> keeps each answer in the server-rendered HTML, which a Radix accordion does not.
 */
export function FaqList({ items, className }: FaqListProps) {
  return (
    <Card className={cn("mx-auto max-w-narrow px-4 sm:px-6", className)}>
      {items.map((faq, i) => (
        <details key={i} className="group border-b last:border-b-0">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-control py-5 text-left text-foreground transition-colors duration-fast hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-details-marker]:hidden">
            <h3 className="text-pretty text-body font-medium">{faq.question}</h3>
            <ChevronDown aria-hidden className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-standard ease-standard group-open:rotate-180" />
          </summary>
          <div className="pb-5 pr-8 text-body text-muted-foreground">{faq.answer}</div>
        </details>
      ))}
    </Card>
  );
}
