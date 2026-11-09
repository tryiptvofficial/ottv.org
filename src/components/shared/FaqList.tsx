import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Faq = { question: string; answer: React.ReactNode };

interface FaqListProps {
  items: Faq[];
  /** Use 2 when the list sits directly under the page's H1, so no heading level is skipped. */
  headingLevel?: 2 | 3;
  /** Two columns from 1024px up. Use 1 inside a narrow reading column. */
  columns?: 1 | 2;
  className?: string;
}

/**
 * Every FAQ on the site: solid panels with native disclosure rows.
 * <details> keeps each answer in the server-rendered HTML, which a Radix accordion does not.
 */
export function FaqList({ items, headingLevel = 3, columns = 2, className }: FaqListProps) {
  const Question = `h${headingLevel}` as const;
  const split = columns === 2 ? Math.ceil(items.length / 2) : items.length;
  const groups = [items.slice(0, split), items.slice(split)].filter((group) => group.length > 0);

  return (
    <div className={cn("grid items-start gap-2", columns === 2 && "lg:grid-cols-2", className)}>
      {groups.map((group, g) => (
        <div key={g} className="grid gap-2">
          {group.map((faq) => (
            <details key={faq.question} className="group bg-muted">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-foreground transition-colors duration-fast hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-details-marker]:hidden">
                <Question className="text-pretty text-subheading">{faq.question}</Question>
                <Plus aria-hidden className="h-6 w-6 shrink-0 transition-transform duration-standard ease-standard group-open:rotate-45" />
              </summary>
              <div className="border-t border-background px-6 py-5 text-body text-foreground">{faq.answer}</div>
            </details>
          ))}
        </div>
      ))}
    </div>
  );
}
