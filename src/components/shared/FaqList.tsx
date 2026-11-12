import { Plus } from "lucide-react";
import { keepTogether } from "@/lib/keep-together";
import { cn } from "@/lib/utils";

type Faq = { question: string; answer: React.ReactNode };

interface FaqListProps {
  items: Faq[];
  /** Use 2 when the list sits directly under the page's H1, so no heading level is skipped. */
  headingLevel?: 2 | 3;
  /** Two columns from 768px up. Use 1 inside a narrow reading column. */
  columns?: 1 | 2;
  className?: string;
}

/**
 * Every FAQ on the site: one ringed white panel per column, with hairlines between native disclosure rows.
 * <details> keeps each answer in the server-rendered HTML, which a Radix accordion does not.
 */
export function FaqList({ items, headingLevel = 3, columns = 2, className }: FaqListProps) {
  const Question = `h${headingLevel}` as const;
  const split = columns === 2 ? Math.ceil(items.length / 2) : items.length;
  const groups = [items.slice(0, split), items.slice(split)].filter((group) => group.length > 0);

  return (
    <div className={cn("grid items-start gap-4", columns === 2 && "md:grid-cols-2 md:gap-6", className)}>
      {groups.map((group, g) => (
        <div key={g} className="divide-y overflow-hidden rounded-card bg-card shadow-card">
          {group.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-4 py-5 text-left text-foreground transition-colors duration-fast hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:px-6 [&::-webkit-details-marker]:hidden">
                <Question className="text-balance text-body font-medium">{keepTogether(faq.question)}</Question>
                <Plus aria-hidden className="mt-1 h-4 w-4 shrink-0 text-subtle transition-transform duration-standard ease-standard group-open:rotate-45 group-open:text-foreground" />
              </summary>
              <div className="-mt-1 px-4 pb-5 text-body text-muted-foreground md:px-6">
                {typeof faq.answer === "string" ? keepTogether(faq.answer) : faq.answer}
              </div>
            </details>
          ))}
        </div>
      ))}
    </div>
  );
}
