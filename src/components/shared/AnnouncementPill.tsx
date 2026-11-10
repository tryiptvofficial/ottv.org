import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const pillClasses =
  'inline-flex items-center gap-2 rounded-badge border bg-recessed px-4 py-1 text-caption text-foreground';

/** The one chip allowed above a headline: a real offer, optionally linked. */
export function AnnouncementPill({ href, className, children }: { href?: string; className?: string; children: React.ReactNode }) {
  if (!href) return <p className={cn(pillClasses, className)}>{children}</p>;
  return (
    <Link
      href={href}
      className={cn(pillClasses, 'touch-target transition-colors duration-fast hover:border-steel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', className)}
    >
      {children}
      <ChevronRight aria-hidden className="h-4 w-4 text-subtle" />
    </Link>
  );
}
