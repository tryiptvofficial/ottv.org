import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type React from 'react';

// The only place page width and side gutters are defined: 1280px wide, 24px gutters on phones and 48px from 1024
const containerVariants = cva('mx-auto w-full px-6 lg:px-12', {
  variants: {
    size: {
      narrow: 'max-w-narrow',
      medium: 'max-w-medium',
      wide: 'max-w-page',
      full: 'max-w-none',
    },
  },
  defaultVariants: { size: 'wide' },
});

interface ContainerProps extends VariantProps<typeof containerVariants> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({ children, className, size, as: Component = 'div' }: ContainerProps) {
  return <Component className={cn(containerVariants({ size }), className)}>{children}</Component>;
}
