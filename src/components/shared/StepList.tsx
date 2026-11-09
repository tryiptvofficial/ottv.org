import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
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
      <ol className="mx-auto grid max-w-form gap-4 lg:max-w-none lg:grid-cols-3 lg:gap-6 [&>li]:h-full">
        {steps.map((step, i) => (
          <li key={step.title}>
            <Reveal delay={0.15 + i * 0.08} className="h-full [&>div]:h-full">
              <Card className="flex h-full flex-col p-6">
                <div className="flex min-h-10 items-center justify-between gap-4">
                  <IndexLabel index={i + 1} label="Step" />
                  {step.icon && (
                    <IconTile>
                      <step.icon aria-hidden />
                    </IconTile>
                  )}
                </div>
                <Heading level={3} size="subheading" className="mt-6">
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
