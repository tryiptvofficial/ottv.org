import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/typography";
import { TvGuideVisual } from "../shared/ProductVisuals";
import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { productFacts } from "@/lib/site-data/product-facts";
import { cn } from "@/lib/utils";

const lead: { title: string; body: string; href: string; cta: string; span: string; visual?: React.ReactNode }[] = [
  {
    title: `${productFacts.liveChannels} live channels`,
    body: "Live channels from around the world, with a Smart EPG TV guide and catch-up TV.",
    href: "/pricing",
    cta: "See plans",
    span: "sm:col-span-2 lg:col-span-7",
    visual: <TvGuideVisual className="mask-fade-b p-4" />,
  },
  {
    title: `${productFacts.vodTitles} movies & TV shows`,
    body: "A large on-demand library of films and series, included in every plan.",
    href: "/pricing",
    cta: "See plans",
    span: "sm:col-span-2 lg:col-span-5",
  },
];

const supporting = [
  { title: "HD and 4K streaming", body: "HD and 4K streams on the channels and titles that offer them.", href: "/pricing", cta: "See plans" },
  { title: "Pay-per-view events included", body: "PPV events come with every plan at no extra cost.", href: "/pricing", cta: "See plans" },
  { title: "Setup guides by device", body: "Step-by-step guides for Fire TV, smart TVs, Apple TV, phones, computers and MAG boxes.", href: "/#devices", cta: "Setup guides" },
  { title: "Support on WhatsApp", body: "Questions before you order and help with setup afterwards, in one WhatsApp chat.", href: "/contact", cta: "Contact us" },
];

function FeatureLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group/link mt-4 inline-flex w-fit items-center gap-2 text-link">
      {children}
      <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-fast ease-standard group-hover/link:translate-x-0.5" />
    </Link>
  );
}

export function Features() {
  return (
    <Section spacing="compact">
      <Container>
        <SectionHeader
          title="What You Get With OTTV"
          subtitle="The same service on every plan, whichever length you choose."
        />
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-12">
          {lead.map((feature) => (
            <Card as="li" key={feature.title} className={cn("flex flex-col overflow-hidden", feature.span)}>
              {feature.visual && <div className="h-44 border-b bg-deep">{feature.visual}</div>}
              <div className="flex flex-grow flex-col p-4">
                <Heading level={3} size="heading">{feature.title}</Heading>
                <p className="mt-2 flex-grow text-muted-foreground">{feature.body}</p>
                <FeatureLink href={feature.href}>{feature.cta}</FeatureLink>
              </div>
            </Card>
          ))}
          {supporting.map((feature) => (
            <Card as="li" key={feature.title} className="flex flex-col p-4 lg:col-span-3">
              <Heading level={3} size="heading">{feature.title}</Heading>
              <p className="mt-2 flex-grow text-muted-foreground">{feature.body}</p>
              <FeatureLink href={feature.href}>{feature.cta}</FeatureLink>
            </Card>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
