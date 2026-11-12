import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "../shared/Container";
import { GuideCard } from "../shared/GuideCard";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { getSafeArticleData, howToArticles } from "@/lib/how-to";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { guideGroups } from "@/lib/site-data/devices";

// One row of guides with a drawing, one per kind of screen: a smart TV, a streaming box, phones and tablets. The
// device grid above already links every device's guide and the footer links them all, so the rest are one button
// away on /devices instead of a second list here.
const featuredGuideIds = ["samsung-tv", "apple-tv", "ios"];

const categoryOf = (id: string) => guideGroups.find((group) => group.guides.some((guide) => guide.id === id))?.label;

const featuredGuides = featuredGuideIds.flatMap((id) => {
  const article = getSafeArticleData(id);
  if (!article) return [];
  const image = PlaceHolderImages.find((img) => img.id === `guide-image-${id}`);
  return [{
    href: `/devices/${id}`,
    title: article.title,
    description: article.description,
    category: categoryOf(id),
    image: image ? { src: image.imageUrl, alt: article.imageAlt } : undefined,
  }];
});

interface SetupGuidesProps {
  /** Set when the band above is also black (the devices, on the homepage), so the gap stays one band's padding. */
  flushTop?: boolean;
}

export function SetupGuides({ flushTop = false }: SetupGuidesProps) {
  return (
    <Section flushTop={flushTop}>
      <Container>
        <SectionHeader
          title="IPTV Setup Guides"
          subtitle="Step-by-step setup for each device we support, plus fixes for buffering."
        />
        {/* Compact rows below 1024px, one row of three full cards from 1024px. */}
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
          {featuredGuides.map((guide) => (
            <GuideCard key={guide.href} compact {...guide} />
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="secondary">
            <Link href="/devices">
              See All {howToArticles.length} Setup Guides
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
