
import { ClientCarousel } from "./ClientCarousel";
import { Container } from "./Container";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
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
  /** The section heading, e.g. "Movies". */
  subtitle: string;
  showHoverContent?: boolean;
  tone?: "dark" | "light";
}

export function ContentCarouselSkeleton({ tone }: { tone?: "dark" | "light" }) {
  return (
    <Section spacing="compact" tone={tone}>
      <Container>
        <div className="mb-12 space-y-4">
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
  subtitle,
  showHoverContent = false,
  tone,
}: ContentCarouselProps) {
  return (
    <Section spacing="compact" tone={tone}>
      <Container>
        <Reveal>
          <SectionHeader align="start" title={subtitle} />
        </Reveal>
        <Reveal delay={0.1}>
          <ClientCarousel items={items} showHoverContent={showHoverContent} label={subtitle} />
        </Reveal>
      </Container>
    </Section>
  );
}
