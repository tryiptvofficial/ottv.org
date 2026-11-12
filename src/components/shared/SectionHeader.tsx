import { cn } from '@/lib/utils';
import { Heading, Lead } from '@/components/ui/typography';

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Heading level for document outline. A page's H1 takes the display size. */
  level?: 1 | 2;
  align?: 'center' | 'start';
  /**
   * From 1024px, set the heading on the left and the subtitle on the right, sharing a baseline. On by default
   * for section headings; turn it off when the header sits inside a narrower panel.
   */
  split?: boolean;
  className?: string;
}

export function SectionHeader({ title, subtitle, level = 2, align = 'start', split, className }: SectionHeaderProps) {
  const centered = align === 'center';
  const twoZone = (split ?? level === 2) && !centered && Boolean(subtitle);

  return (
    <div
      className={cn(
        'mb-10 md:mb-12',
        centered ? 'mx-auto max-w-3xl text-center' : 'text-left',
        twoZone && 'grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-x-6',
        className
      )}
    >
      <Heading
        level={level}
        size={level === 1 ? 'display-xl' : 'heading-lg'}
        className={cn(twoZone ? 'lg:col-span-7' : 'max-w-4xl')}
      >
        {title}
      </Heading>
      {subtitle && (
        <Lead
          className={cn(
            'text-body',
            twoZone ? 'max-w-xl lg:col-span-4 lg:col-start-9 lg:pb-1' : 'mt-4 max-w-2xl',
            centered && 'mx-auto'
          )}
        >
          {subtitle}
        </Lead>
      )}
    </div>
  );
}
