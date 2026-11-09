import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type React from 'react';

// Visual size is chosen independently of the semantic level, so SEO heading order never
// dictates how large a heading looks.
const headingVariants = cva('font-headline text-foreground text-balance', {
  variants: {
    size: {
      display: 'text-display',
      'heading-lg': 'text-heading-lg',
      heading: 'text-heading',
      'heading-sm': 'text-heading-sm',
      subheading: 'text-subheading',
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

/** Geist Mono micro-label above a heading. Metadata, not decoration. */
export function Eyebrow({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('font-mono text-eyebrow uppercase text-muted-foreground', className)} {...props} />
  );
}

/** Lead paragraph under a page or section heading. */
export function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-body-lg text-muted-foreground text-balance', className)} {...props} />;
}
