import { cn } from '@/lib/utils';
import { Heading, Lead } from '@/components/ui/typography';

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Heading level for document outline. A page's H1 takes the display face. */
  level?: 1 | 2;
  align?: 'center' | 'start';
  className?: string;
}

export function SectionHeader({ title, subtitle, level = 2, align = 'center', className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 max-w-narrow', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}>
      <Heading level={level} size={level === 1 ? 'display-xl' : 'display'}>
        {title}
      </Heading>
      {subtitle && <Lead className={cn('mt-4 max-w-2xl', align === 'center' && 'mx-auto')}>{subtitle}</Lead>}
    </div>
  );
}
