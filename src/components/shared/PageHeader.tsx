import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Heading, Lead } from '@/components/ui/typography';
import { AnnouncementPill } from './AnnouncementPill';

interface Crumb {
  label: string;
  href?: string;
}

/** Breadcrumb trail; the last crumb is the current page and is not a link. */
export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-caption text-muted-foreground', className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <Link
                href={item.href}
                className="touch-target rounded-control transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">{item.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden="true" className="text-subtle">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface PageHeaderProps {
  breadcrumb?: Crumb[];
  /** A real offer shown as a chip above the H1. */
  announcement?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Extra content under the lead: actions, meta row. */
  children?: React.ReactNode;
  align?: 'center' | 'start';
  className?: string;
}

/** The top of every inner page: breadcrumb, the page's H1 and its lead paragraph. */
export function PageHeader({ breadcrumb, announcement, title, lead, children, align = 'center', className }: PageHeaderProps) {
  const centered = align === 'center';
  return (
    <header className={cn('mb-12 md:mb-16', className)}>
      {breadcrumb && <Breadcrumb items={breadcrumb} className="mb-8" />}
      <div className={cn('max-w-narrow', centered && 'mx-auto text-center')}>
        {announcement && <AnnouncementPill className="mb-8">{announcement}</AnnouncementPill>}
        <Heading level={1} size="display-xl">
          {title}
        </Heading>
        {lead && <Lead className={cn('mt-6 max-w-2xl', centered && 'mx-auto')}>{lead}</Lead>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}
