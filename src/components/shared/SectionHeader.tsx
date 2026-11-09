import { cn } from '@/lib/utils';
import { Eyebrow, Heading, Lead } from '@/components/ui/typography';

interface SectionHeaderProps {
  /** Small label above the title, e.g. "Pricing". */
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Heading level for document outline; the visual size stays the section size. */
  level?: 1 | 2;
  align?: 'center' | 'start';
  className?: string;
}

export function SectionHeader({ eyebrow, title, subtitle, level = 2, align = 'center', className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 max-w-narrow', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <Heading level={level} size="heading">
        {title}
      </Heading>
      {subtitle && <Lead className={cn('mt-4 max-w-2xl', align === 'center' && 'mx-auto')}>{subtitle}</Lead>}
    </div>
  );
}
