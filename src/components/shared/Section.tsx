import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type React from 'react';

// The only place vertical section rhythm is defined. Sections never set their own padding.
const sectionVariants = cva('relative', {
  variants: {
    spacing: {
      none: '',
      compact: 'py-9 md:py-16',
      default: 'py-16 md:py-28',
      spacious: 'py-16 md:py-28 short:py-12',
    },
    // One uninterrupted canvas; spacing and bordered modules separate content.
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
