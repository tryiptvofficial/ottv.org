import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const pillClasses =
  'stamp inline-flex min-h-7 items-center gap-2 rounded-badge bg-card px-3 py-1 text-foreground shadow-hairline';

/** The one chip allowed above a headline: a real offer, optionally linked. */
export function AnnouncementPill({ href, className, children }: { href?: string; className?: string; children: React.ReactNode }) {
  if (!href) return <p className={cn(pillClasses, className)}>{children}</p>;
  return (
    <Link
      href={href}
      className={cn(pillClasses, 'touch-target transition-colors duration-fast hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', className)}
    >
      {children}
      <ChevronRight aria-hidden className="h-3.5 w-3.5 text-subtle" />
    </Link>
  );
}
