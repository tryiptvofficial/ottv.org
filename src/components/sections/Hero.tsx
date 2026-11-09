import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { AnnouncementPill } from "@/components/shared/AnnouncementPill";
import { Heading, Lead } from "@/components/ui/typography";
import { productFacts } from "@/lib/site-data/product-facts";

export function Hero() {
  return (
    <Section spacing="spacious" className="min-h-hero flex w-full items-center overflow-hidden">
      <div aria-hidden className="hero-orb pointer-events-none" />
      <Container className="relative z-10 flex flex-col items-center text-center">
        <div className="w-full max-w-4xl motion-safe:animate-hero-rise">
          <AnnouncementPill href="/iptv-free-trial" className="mb-10">
            <span><span className="text-brand">Free 24-hour trial</span>, no card needed</span>
          </AnnouncementPill>
          <Heading level={1} size="display-2xl">
            IPTV Service With a <span className="text-brand">24h</span> Free Trial
          </Heading>
          <Lead className="mx-auto mt-10 max-w-xl text-pretty">
            Get access to {productFacts.liveChannels} live TV channels worldwide and a library of {productFacts.vodTitles} on-demand movies and TV shows. Watch in HD or 4K where available, on the devices you already own.
          </Lead>
          <div data-fab-avoid className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/iptv-free-trial">Get IPTV Free Trial</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/#pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
