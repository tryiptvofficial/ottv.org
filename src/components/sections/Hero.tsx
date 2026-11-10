import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Heading, Lead } from "@/components/ui/typography";
import { productFacts } from "@/lib/site-data/product-facts";

export function Hero() {
  return (
    <Section spacing="spacious" className="min-h-hero flex w-full items-center overflow-hidden">
      <Container className="relative z-10">
        <div className="motion-safe:animate-hero-rise">
          <Heading level={1} size="display-2xl">
            Best IPTV Service With a 24h Free Trial
          </Heading>
          <Lead className="mt-6 max-w-xl text-pretty">
            Get access to {productFacts.liveChannels} live TV channels worldwide and a library of {productFacts.vodTitles} on-demand movies and TV shows. Watch in HD or 4K where available, on the devices you already own.
          </Lead>
          <div data-fab-avoid className="mt-8 flex flex-wrap gap-2">
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
