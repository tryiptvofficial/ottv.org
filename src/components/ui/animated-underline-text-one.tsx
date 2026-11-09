
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SignalLine } from "@/components/shared/SignalLine";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  textClassName?: string;
  underlineClassName?: string;
  underlineDuration?: number;
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      textClassName,
      underlineClassName,
      underlineDuration = 1.5,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center gap-2", props.className)}
      >
        <div className="relative">
          <h1 className={cn("text-center text-heading-lg motion-safe:animate-hero-drop", textClassName)}>
            {text}
          </h1>

          {/* The canonical Signal Line, centred under the headline */}
          <SignalLine
            draw
            duration={underlineDuration}
            className={cn("absolute -bottom-4 left-1/2 w-72 max-w-full -translate-x-1/2", underlineClassName)}
          />
        </div>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
