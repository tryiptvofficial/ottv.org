import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type React from 'react';

// Visual size is chosen independently of the semantic level, so SEO heading order never
// dictates how large a heading looks.
const headingVariants = cva('text-foreground text-balance', {
  variants: {
    size: {
      'display-2xl': 'font-display text-display-2xl',
      'display-xl': 'font-display text-display-xl',
      display: 'font-headline text-display',
      'heading-lg': 'font-headline text-heading-lg',
      heading: 'font-headline text-heading',
      'heading-sm': 'font-headline text-heading-sm',
      subheading: 'font-headline text-subheading',
      serif: 'font-serif text-serif-lg',
    },
  },
  defaultVariants: { size: 'heading' },
});

type HeadingLevel = 1 | 2 | 3 | 4;

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  level?: HeadingLevel;
}

export function Heading({ level = 2, size, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={cn(headingVariants({ size }), className)} {...props} />;
}

/** Lead paragraph under a page or section heading. */
export function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-body-lg text-muted-foreground text-balance', className)} {...props} />;
}
