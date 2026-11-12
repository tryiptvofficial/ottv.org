import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { StatStrip } from "@/components/shared/StatStrip";
import { Heading, Lead } from "@/components/ui/typography";
import { plans } from "@/lib/site-data/pricing";
import { productFacts } from "@/lib/site-data/product-facts";
import { illustration } from "@/lib/site-data/visual-assets";

const longest = plans[plans.length - 1];
const orderFlow = illustration("hero-order-flow");

// Offer facts only: every figure appears elsewhere on the site, and none is a channel, user or review count.
const facts = [
  { value: "24 h", label: "Free trial, no card needed" },
  { value: `$${longest.price_monthly.toFixed(2)}`, label: "A month on the 12-month plan" },
  { value: "11", label: "Devices with a setup guide" },
  { value: "7 days", label: "Money-back guarantee on paid plans" },
];

// The value proposition on the left; on the right, a drawing of how ordering works (the order sent in a chat, the
// reply with the login details, the TV playing), since a chat order is what newcomers do not expect. The facts
// strip under both.
export function Hero() {
  return (
    <Section spacing="none" className="overflow-hidden pb-16 pt-12 md:pb-24 md:pt-16 lg:pt-20 short:py-10">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(60%_55%_at_70%_10%,hsl(var(--green)/0.12),transparent)]" />
      <Container className="relative">
        <div className="grid items-center gap-y-12 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-7">
            {/* "Best" stays in the page title, where searchers look for it; the heading states the offer without it. */}
            <Heading level={1} size="display-2xl">
              IPTV Service With a 24h Free Trial
            </Heading>
            {/* What sets OTTV apart comes first, in the lead's full voice: a person in a WhatsApp chat, and one payment
                with nothing renewing. The size of the service follows in quieter body text. */}
            <Lead className="mt-6 max-w-xl text-foreground">
              Order in a WhatsApp chat, where a person replies with your login and helps if setup gets stuck. You pay once per plan, and nothing renews.
            </Lead>
            <p className="mt-4 max-w-xl text-body text-muted-foreground">
              Watch {productFacts.liveChannels} live TV channels worldwide and {productFacts.vodTitles} on-demand movies and TV shows, in HD or 4K where available.
            </p>
            <div data-fab-avoid className="mt-8 flex flex-wrap gap-3 sm:mt-10">
              <Button asChild size="lg">
                <Link href="/iptv-free-trial" aria-describedby="hero-trial-note">
                  Get IPTV Free Trial
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
            {/* The trial button leads to a page that explains the trial; this line says up front that it starts in
                WhatsApp, like an order, so the chat on the next step is no surprise. It also describes the button to
                screen readers. */}
            <p id="hero-trial-note" className="mt-4 max-w-md text-caption text-muted-foreground">
              The free trial starts the same way, in a WhatsApp chat. No card needed.
            </p>
          </div>
          <div className="mx-auto w-full max-w-[22rem] overflow-clip rounded-card-lg md:col-span-5 md:max-w-none lg:mr-0 lg:max-w-[30rem]">
            <Image
              src={orderFlow.src}
              alt={orderFlow.alt}
              width={orderFlow.width}
              height={orderFlow.height}
              unoptimized
              loading="eager"
              fetchPriority="high"
              className="h-auto w-full"
            />
          </div>
        </div>
        <StatStrip label="Key facts" density="pairs" items={facts} className="mt-14 md:mt-20" />
      </Container>
    </Section>
  );
}
