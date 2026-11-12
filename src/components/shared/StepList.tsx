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
 * given. From 768px the steps sit three in a row as equal cards, illustration on top, like the plan cards
 * above them on the homepage. Below that the steps stack: on phones the illustration sits above the text in a
 * short 2:1 frame, and from 640px (a phone turned sideways) it sits beside the text at a fixed 224px. A frame
 * as wide as the card was 367px tall on a 667x375 sideways phone, nearly the whole screen.
 */
export function StepList({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol className={cn("grid gap-4 md:grid-cols-3", className)}>
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="reveal flex flex-col rounded-card bg-card p-4 shadow-card sm:flex-row sm:items-center sm:gap-6 sm:p-6 md:flex-col md:items-stretch md:gap-0 md:p-4 lg:p-6"
        >
          {step.illustration && (
            <div className="mb-5 flex aspect-[2/1] items-center justify-center overflow-clip rounded-control bg-background p-3 sm:mb-0 sm:aspect-[8/5] sm:w-56 sm:shrink-0 md:mb-5 md:w-auto lg:mb-6 lg:p-4">
              <Image
                src={step.illustration.src}
                alt=""
                width={step.illustration.width}
                height={step.illustration.height}
                unoptimized
                // Sized by width at every screen size, never by a percentage height. Inside the aspect-ratio frame a
                // percentage height came out differently depending on the tab's layout history: on desktop
                // 336x222 on a fresh load, but 336x210 after resizing from a phone width.
                className="h-auto w-[72%] sm:w-[92%] md:w-full"
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
            <p className="mt-2 max-w-xl text-pretty text-muted-foreground">
              {typeof step.description === "string" ? keepTogether(step.description) : step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
