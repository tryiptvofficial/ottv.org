import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type React from 'react';

// Shared responsive grids: every layout stacks to one column on phones and grows from there
const gridVariants = cva('grid grid-cols-1', {
  variants: {
    cols: {
      2: 'sm:grid-cols-2',
      3: 'sm:grid-cols-2 lg:grid-cols-3',
      4: 'sm:grid-cols-2 xl:grid-cols-4',
      // Three across on desktop, stacked below, so a lattice never leaves an empty cell
      triple: 'lg:grid-cols-3',
      // Dense lists (countries, links): two columns even on phones
      list: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
      // Main content with a 384px side column from 1024; stacked below
      aside: 'lg:grid-cols-aside',
    },
    gap: {
      tight: 'gap-2',
      default: 'gap-2',
      loose: 'gap-8 md:gap-12',
      // Modules joined by 1px hairlines inside one frame. Pair with `Card variant="cell"`.
      lattice: 'gap-px overflow-hidden rounded-card border bg-border',
    },
  },
  defaultVariants: { cols: 3, gap: 'default' },
});

interface GridProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof gridVariants> {
  as?: React.ElementType;
}

export function Grid({ className, cols, gap, as: Component = 'div', ...props }: GridProps) {
  return <Component className={cn(gridVariants({ cols, gap }), className)} {...props} />;
}
