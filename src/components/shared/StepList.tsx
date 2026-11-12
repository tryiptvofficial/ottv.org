import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Heading } from "@/components/ui/typography";
import { keepTogether } from "@/lib/keep-together";
import { cn } from "@/lib/utils";

export interface Step {
  title: string;
  description: React.ReactNode;
  icon?: LucideIcon;
  /** An original illustration from public/demo-assets (decorative). */
  illustration?: { src: string; width: number; height: number };
}

/**
 * A numbered sequence of steps: one card per step with a green number, and an illustration or icon when
 * given. Three columns from 1024px; below that the steps stack, because three columns get too narrow to read.
 * From 768px a stacked card puts its illustration beside the text, so the three steps take about one tablet
 * screen instead of three.
 */
export function StepList({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol className={cn("grid gap-4 lg:grid-cols-3", className)}>
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="reveal flex flex-col rounded-card bg-card p-4 shadow-card md:flex-row md:items-center md:gap-8 md:p-6 lg:flex-col lg:items-stretch lg:gap-0"
        >
          {step.illustration && (
            <div className="mb-6 flex aspect-[8/5] items-center justify-center overflow-clip rounded-control bg-background p-4 md:mb-0 md:w-2/5 md:shrink-0 lg:mb-6 lg:w-auto">
              <Image
                src={step.illustration.src}
                alt=""
                width={step.illustration.width}
                height={step.illustration.height}
                unoptimized
                className="h-full w-auto"
              />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-label font-semibold tabular-nums text-primary-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step.icon && <step.icon aria-hidden className="h-5 w-5 text-signal" />}
            </div>
            <Heading level={3} size="heading" className="mt-5">
              {step.title}
            </Heading>
            <p className="mt-2 text-pretty text-muted-foreground">
              {typeof step.description === "string" ? keepTogether(step.description) : step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
