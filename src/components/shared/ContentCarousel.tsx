
import { ClientCarousel } from "./ClientCarousel";
import { Container } from "./Container";
import { Section } from "./Section";
import { Reveal, blurFade } from "./Reveal";
import { Skeleton } from "../ui/skeleton";
import { SectionHeader } from "./SectionHeader";

type CarouselItem = {
  title: string;
  src: string;
  href?: string;
  placeholder: string;
};

interface ContentCarouselProps {
  items: CarouselItem[];
  /** Small label above the heading, e.g. "Top 10". */
  title: string;
  /** The section heading, e.g. "Movies". */
  subtitle: string;
  showHoverContent?: boolean;
}

export function ContentCarouselSkeleton() {
  return (
    <Section spacing="compact">
      <Container>
        <div className="mb-12 space-y-4">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-8 w-40" />
        </div>
        <div className="flex gap-3 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="aspect-poster w-40 shrink-0 rounded-card sm:w-48" />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function ContentCarousel({
  items,
  title,
  subtitle,
  showHoverContent = false,
}: ContentCarouselProps) {
  return (
    <Section spacing="compact">
      <Container>
        <Reveal variants={blurFade}>
          <SectionHeader align="start" eyebrow={title} title={subtitle} />
        </Reveal>
        <Reveal variants={blurFade} delay={0.1}>
          <ClientCarousel items={items} showHoverContent={showHoverContent} />
        </Reveal>
      </Container>
    </Section>
  );
}
