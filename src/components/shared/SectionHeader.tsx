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

export function SectionHeader({ title, subtitle, level = 2, align = 'start', className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-8 max-w-narrow', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}>
      <Heading level={level} size={level === 1 ? 'display-xl' : 'heading-lg'}>
        {title}
      </Heading>
      {subtitle && <Lead className={cn('mt-2 max-w-2xl text-body', align === 'center' && 'mx-auto')}>{subtitle}</Lead>}
    </div>
  );
}
