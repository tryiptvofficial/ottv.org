import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type React from 'react';

// The only place vertical section rhythm is defined. Every section is a full-width band: black (`canvas`,
// the page) or warm off-white (`light`), and the change of colour separates them. Two bands of the same
// colour in a row pass `flushTop` to the second, so the gap between them stays one band's padding.
const sectionVariants = cva('relative', {
  variants: {
    spacing: {
      none: '',
      compact: 'py-12 md:py-16',
      default: 'py-16 md:py-24',
      spacious: 'py-20 md:py-28 short:py-12',
    },
    tone: {
      canvas: '',
      light: 'band-light',
      // An explicit black band, for call sites that sit inside a light context.
      ink: 'band-ink',
    },
    flushTop: {
      // The 1px overlap hides the hairline two same-colour bands can leave when their boundary falls on a
      // fraction of a pixel: the black page showed through between the light plans and steps bands.
      true: '-mt-px !pt-0',
      false: '',
    },
  },
  defaultVariants: { spacing: 'default', tone: 'canvas', flushTop: false },
});

interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: React.ElementType;
}

export function Section({ className, spacing, tone, flushTop, as: Component = 'section', ...props }: SectionProps) {
  return <Component className={cn(sectionVariants({ spacing, tone, flushTop }), className)} {...props} />;
}
