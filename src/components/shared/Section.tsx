import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type React from 'react';

// The only place vertical section rhythm is defined. Sections never set their own padding.
const sectionVariants = cva('relative', {
  variants: {
    spacing: {
      none: '',
      compact: 'py-12 md:py-16',
      default: 'py-16 md:py-20',
      spacious: 'py-20 md:py-30 short:py-12',
    },
    // A hairline between sections replaces tinted background bands
    divided: {
      true: 'border-t',
      false: '',
    },
  },
  defaultVariants: { spacing: 'default', divided: false },
});

interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: React.ElementType;
}

export function Section({ className, spacing, divided, as: Component = 'section', ...props }: SectionProps) {
  return <Component className={cn(sectionVariants({ spacing, divided }), className)} {...props} />;
}
