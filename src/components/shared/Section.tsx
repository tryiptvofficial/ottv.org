import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type React from 'react';

// The only place vertical section rhythm is defined. Sections never set their own padding.
const sectionVariants = cva('relative', {
  variants: {
    spacing: {
      none: '',
      compact: 'py-8 md:py-10',
      default: 'py-10 md:py-14',
      spacious: 'py-24 md:py-30 short:py-12',
    },
    // Every band is black; generous spacing separates them.
    tone: {
      dark: '',
      light: 'tone-light',
    },
  },
  defaultVariants: { spacing: 'default', tone: 'dark' },
});

interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: React.ElementType;
}

export function Section({ className, spacing, tone, as: Component = 'section', ...props }: SectionProps) {
  return <Component className={cn(sectionVariants({ spacing, tone }), className)} {...props} />;
}
