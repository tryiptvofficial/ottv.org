import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { Heading } from "@/components/ui/typography";
import { IndexLabel } from "./IndexLabel";
import { Reveal, blurFade } from "./Reveal";
import { SignalLine } from "./SignalLine";

export interface Step {
  title: string;
  description: string;
  icon?: LucideIcon;
}

/**
 * A numbered sequence of steps: one card per step, "01 / Step" labels, and the Signal Line
 * joining the cards on desktop. Stacks to one column below 1024px, where three columns get too
 * narrow to read.
 */
export function StepList({ steps }: { steps: Step[] }) {
  return (
    <div className="relative">
      {/* Runs from the centre of the first card to the centre of the last, in the gap above them */}
      <SignalLine className="pointer-events-none absolute -top-8 left-1/2 hidden h-3 w-2/3 -translate-x-1/2 text-brand/40 lg:block" />
      <ol className="mx-auto grid max-w-form gap-4 lg:max-w-none lg:grid-cols-3 lg:gap-6 [&>li]:h-full">
        {steps.map((step, i) => (
          <li key={step.title}>
            <Reveal variants={blurFade} delay={0.15 + i * 0.08} className="h-full [&>div]:h-full">
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
