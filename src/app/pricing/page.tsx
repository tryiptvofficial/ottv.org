import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, Check, CircleDollarSign, MessageCircle, MonitorPlay, Smartphone, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { Heading } from "@/components/ui/typography";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pricing } from "@/components/sections/Pricing";
import { Callout } from "@/components/shared/Callout";
import { Container } from "@/components/shared/Container";
import { FaqList } from "@/components/shared/FaqList";
import { Grid } from "@/components/shared/Grid";
import { PageHeader } from "@/components/shared/PageHeader";
import { Schema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StepList } from "@/components/shared/StepList";
import { getPricingPageData } from "@/lib/data/pricing-page";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { plans } from "@/lib/site-data/pricing";
import { productFacts } from "@/lib/site-data/product-facts";
import { LastUpdated } from "@/components/shared/LastUpdated";

const shortest = plans[0];
const longest = plans[plans.length - 1];
const lowestMonthly = longest.price_monthly.toFixed(2);

export function generateMetadata(): Metadata {
  const title = `IPTV Subscription Plans & Pricing 2026: From $${lowestMonthly}/mo | OTTV`;
  const description = `IPTV subscription plans from OTTV: 1, 3, 6 or 12 months from $${lowestMonthly}/mo, with ${productFacts.liveChannels} live channels and ${productFacts.vodTitles} movies & TV shows. Order on WhatsApp.`;
  return {
    ...generatePageMetadata({ title, description, canonical: "/pricing" }),
    title: { absolute: title },
  };
}

const steps = [
  { title: "Pick your plan", description: `Choose 1, 3, 6 or 12 months. Plans start at $${shortest.price.toFixed(2)} for one month.` },
  { title: "Order on WhatsApp", description: "Tap the plan's Choose button. WhatsApp opens with your order already written, and the purchase is completed in that chat." },
  { title: "Start streaming", description: "Install a player app with the setup guide for your device and sign in with the login details you receive." },
];

const benefits = [
  { icon: Smartphone, title: "Play on the devices you own", body: "Fire TV models running Fire OS, Samsung and LG smart TVs, Apple TV, iPhone, Android, Windows, Mac and MAG boxes, each with a setup guide. One stream plays at a time." },
  { icon: MonitorPlay, title: "HD and 4K where available", body: "HD and 4K streams on the channels and titles that offer them." },
  { icon: CalendarClock, title: "Smart EPG and catch-up", body: "A TV guide shows what is on now and next, and catch-up TV lets you go back to programmes you missed on channels that offer it." },
  { icon: Wifi, title: "Help when streams buffer", body: "The buffering guide walks through the usual fixes, from restarting your devices to a wired Ethernet connection." },
  { icon: CircleDollarSign, title: "Clear prices in US dollars", body: "Every plan shows its full price and monthly equivalent. Each plan is one payment, with nothing renewing on its own." },
  { icon: MessageCircle, title: "Support on WhatsApp", body: "Questions before you order, or help with setup afterwards, go to the same WhatsApp chat." },
];

export default async function PricingPage() {
  const { productSchema, breadcrumbSchema, faqSchema, pricingPageFaqs } = await getPricingPageData();

  return (
    <>
      <Schema id="product" schema={productSchema} />
      <Schema id="breadcrumb" schema={breadcrumbSchema} />
      <Schema id="faq" schema={faqSchema} />

      <Section>
        <Container>
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
            title="IPTV Subscription Plans & Pricing"
            lead={`Every plan includes ${productFacts.summary}; only the length and the price change.`}
            className="mb-0 md:mb-0"
          >
            <p className="text-body text-foreground">
              ${shortest.price.toFixed(2)} for 1 month, or ${longest.price.toFixed(2)} paid once for 12 months (${lowestMonthly} a month).
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link href="#pricing">See all {plans.length} plans</Link>
            </Button>
            <p className="mt-4 text-meta text-muted-foreground">Some devices need a player app that charges its own fee. Each setup guide says which.</p>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-caption text-muted-foreground">
              {[`${productFacts.liveChannels} live channels`, `${productFacts.vodTitles} movies & shows`, "One payment per plan", "7-day money-back guarantee"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check aria-hidden className="h-4 w-4 text-foreground" /> {item}
                </li>
              ))}
            </ul>
          </PageHeader>
        </Container>
      </Section>

      <Pricing />

      <Section spacing="compact">
        <Container>
          <SectionHeader title="Compare IPTV Plan Prices" subtitle={`The 12-month plan costs $${longest.price.toFixed(2)}, or $${lowestMonthly} a month. A single month costs $${shortest.price.toFixed(2)}.`} />
          <div>
            <Table>
              <TableCaption>Prices in US dollars. Each plan is a one-time payment.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan</TableHead>
                  <TableHead>Total price</TableHead>
                  <TableHead>Price per month</TableHead>
                  <TableHead>Saving vs 1 month</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="text-foreground">{plan.name}</TableCell>
                    <TableCell>${plan.price.toFixed(2)}</TableCell>
                    <TableCell>${plan.price_monthly.toFixed(2)}</TableCell>
                    <TableCell>{plan.savings?.replace("Save ", "") ?? "None"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeader
            title="How Does an OTTV Subscription Work?"
            subtitle="Pick a plan, order it on WhatsApp and start watching on your own devices."
          />
          <StepList steps={steps} />
        </Container>
      </Section>

      <Section>
        <Container>
          <Grid cols="aside" gap="loose">
            <div>
              <Heading level={2} size="heading">What Every OTTV Plan Includes</Heading>
              <p className="mt-4 text-body text-muted-foreground">
                OTTV plans start at ${shortest.price.toFixed(2)} for one month and come down to ${lowestMonthly} a month on the 12-month plan.
                Every plan includes {productFacts.summary}, with the TV guide, catch-up TV and HD or 4K streams where available.
              </p>
              <Heading level={3} size="subheading" className="mt-8">What you get</Heading>
              <ul className="mt-4 space-y-3 text-body text-muted-foreground">
                {shortest.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-foreground" />
                    {feature}
                  </li>
                ))}
                <li className="flex gap-3">
                  <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-foreground" />
                  Setup guides for 10 kinds of device
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <Card className="p-6">
                <Heading level={3} size="subheading">Try it free first</Heading>
                <p className="mt-2 text-body text-muted-foreground">
                  Test OTTV with a free 24-hour trial before you buy. It opens the full service, you request it on WhatsApp, and no card is needed.
                </p>
                <Button asChild variant="secondary" className="mt-4">
                  <Link href="/iptv-free-trial">See how the free trial works</Link>
                </Button>
              </Card>
              <Card className="p-6">
                <Heading level={3} size="subheading">Billing terms at a glance</Heading>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-body text-muted-foreground">
                  <li>Each plan is one payment in US dollars.</li>
                  <li>Nothing renews on its own, so there is nothing to cancel.</li>
                  <li>Paid plans have a 7-day money-back guarantee. Message us on WhatsApp within 7 days of ordering.</li>
                  <li>A standard plan allows one stream at a time.</li>
                </ul>
              </Card>
              <Card className="p-6">
                <Heading level={3} size="subheading">Paying in another currency?</Heading>
                <p className="mt-2 text-body text-muted-foreground">
                  Prices are set in US dollars. If you pay in another currency, your payment provider converts the amount at its own exchange rate.
                </p>
              </Card>
            </div>
          </Grid>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeader
            title="Everything You Need to Stream"
            subtitle="The same service on every plan, whichever length you choose."
          />
          <Grid as="ul" cols={3}>
            {benefits.map((item) => (
              <Card as="li" key={item.title} className="p-6">
                <IconTile className="mb-6">
                  <item.icon aria-hidden />
                </IconTile>
                <Heading level={3} size="subheading">{item.title}</Heading>
                <p className="mt-2 text-muted-foreground">{item.body}</p>
              </Card>
            ))}
          </Grid>
          <p className="mx-auto mt-10 max-w-narrow text-center text-body text-muted-foreground">
            Setup guides: <Link href="/devices/fire-tv" className="text-link">Fire TV</Link>,{" "}
            <Link href="/devices/samsung-tv" className="text-link">Samsung TV</Link>,{" "}
            <Link href="/devices/ios" className="text-link">iPhone and iPad</Link>,{" "}
            <Link href="/devices/android" className="text-link">Android</Link> and the{" "}
            <Link href="/devices/troubleshooting" className="text-link">buffering guide</Link>.
          </p>
        </Container>
      </Section>

      <Section id="faq">
        <Container>
          <SectionHeader
            title="IPTV Subscription Pricing FAQ"
            subtitle="Short answers to what people ask before choosing a plan."
          />
          <FaqList items={pricingPageFaqs} />
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <Callout
            title="Ready to Order Your OTTV Plan?"
            action={
              <>
                <Button asChild size="lg">
                  <Link href="#pricing">Compare the plans</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/iptv-free-trial">Start a free trial</Link>
                </Button>
              </>
            }
          >
            Every plan includes the full service. Paid plans come with a 7-day money-back guarantee, and you can try OTTV free for 24 hours first.
          </Callout>
        </Container>
      </Section>
      <LastUpdated />
    </>
  );
}
