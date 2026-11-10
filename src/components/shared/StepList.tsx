import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/typography";
import { IndexLabel } from "./IndexLabel";
import { Reveal } from "./Reveal";

export interface Step {
  title: string;
  description: string;
  icon?: LucideIcon;
}

/**
 * A numbered sequence of steps: one card per step with "01 / Step" labels. Stacks to one column below 1024px, where three columns get too
 * narrow to read.
 */
export function StepList({ steps }: { steps: Step[] }) {
  return (
    <div className="relative">
      <ol className="grid gap-px overflow-hidden rounded-card border bg-border lg:grid-cols-3 [&>li]:h-full">
        {steps.map((step, i) => (
          <li key={step.title}>
            <Reveal className="h-full [&>div]:h-full">
              <Card variant="cell" className="flex h-full flex-col p-4">
                <div className="flex items-center justify-between gap-4">
                  <IndexLabel index={i + 1} label="Step" />
                  {step.icon && (
                    <step.icon aria-hidden className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <Heading level={3} size="heading" className="mt-6">
                  {step.title}
                </Heading>
                <p className="mt-2 text-pretty text-muted-foreground">{step.description}</p>
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
