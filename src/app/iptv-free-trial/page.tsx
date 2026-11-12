import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/typography";
import { Callout } from "@/components/shared/Callout";
import { Container } from "@/components/shared/Container";
import { FaqList } from "@/components/shared/FaqList";
import { Grid } from "@/components/shared/Grid";
import { PageHeader } from "@/components/shared/PageHeader";
import { Schema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StepList } from "@/components/shared/StepList";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { getIptvFreeTrialPageData } from "@/lib/data/iptv-free-trial-page";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { plans } from "@/lib/site-data/pricing";
import { productFacts } from "@/lib/site-data/product-facts";
import { LastUpdated } from "@/components/shared/LastUpdated";
import { PlanCard } from "@/components/shared/PlanCard";
import { StatStrip } from "@/components/shared/StatStrip";

const trialMessage = "Hi, I would like to request the OTTV 24-hour free trial.";

export function generateMetadata(): Metadata {
  const title = "IPTV Free Trial 2026: 24 Hours Full Access, No Card | OTTV";
  const description = `IPTV free trial from OTTV: 24 hours of full access to ${productFacts.liveChannels} live channels and ${productFacts.vodTitles} movies & TV shows. No credit card, request it on WhatsApp.`;
  return {
    ...generatePageMetadata({ title, description, canonical: "/iptv-free-trial" }),
    title: { absolute: title },
  };
}

const included = [
  { title: `${productFacts.liveChannels} live channels`, body: "Channels from around the world, with none hidden from trial users." },
  { title: `${productFacts.vodTitles} movies & TV shows`, body: "The whole on-demand library is open during your trial, exactly as a subscriber sees it." },
  { title: "HD and 4K where available", body: "Trial streams play at the same quality as paid ones, so you judge the real picture." },
  { title: "Smart EPG and catch-up", body: "The TV guide and catch-up TV are switched on, so you can check listings against what is airing." },
  { title: "The devices you own", body: "TVs, streaming sticks, phones, tablets and computers. Standard plans play one stream at a time, so test one screen after another." },
  { title: "Help on WhatsApp", body: "Trial users get the same WhatsApp support as subscribers if setup gets stuck." },
];

const steps = [
  { title: "Tap Start Free Trial on WhatsApp", description: "WhatsApp opens with a trial request already written for you." },
  { title: "Send the message", description: "That is the whole request. We never ask for a card, bank details or any payment method." },
  { title: "Sign in and watch", description: "Our team replies in the chat with your login details. Install a player app with your device's setup guide, sign in, and watch with full access for 24 hours." },
];

const testTips = [
  { title: "Watch at your busiest hour", body: "Evening is when home connections carry the most traffic, so it is the most useful time to test live channels." },
  { title: "Check the channels you rely on", body: "Open the news, sports, film and kids' channels you watch most, plus any in your language, and make sure each one plays cleanly." },
  { title: "Try each screen and the guide", body: "Sign in on each device you plan to use, one at a time, compare the TV guide with what is on air, and play a 4K stream on your largest TV where 4K is available." },
];

const proofPoints = [
  { value: "$0", label: "OTTV trial cost, no card taken" },
  { value: "24 h", label: "Full access" },
  { value: productFacts.liveChannels, label: "Live channels" },
  { value: productFacts.vodTitles, label: "Movies & TV shows" },
];

function TrialButtons() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button asChild size="lg">
        <WhatsAppLink message={trialMessage}>
          <SiWhatsapp aria-hidden />
          Start Free Trial on WhatsApp
          <span className="sr-only">, opens in a new tab</span>
        </WhatsAppLink>
      </Button>
      <Button asChild size="lg" variant="secondary">
        <Link href="/pricing">See Plans and Pricing</Link>
      </Button>
    </div>
  );
}

export default function IptvFreeTrialPage() {
  const { breadcrumbSchema, faqSchema, serviceSchema, trialFaqs } = getIptvFreeTrialPageData();

  return (
    <>
      <Schema id="breadcrumb" schema={breadcrumbSchema} />
      <Schema id="faq" schema={faqSchema} />
      <Schema id="service" schema={serviceSchema} />

      <Section className="isolate overflow-x-clip">
        <Container>
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "IPTV Free Trial" }]}
            title="IPTV Free Trial: 24 Hours of Full Access, No Credit Card"
            lead={`See how OTTV plays on your own screens before you spend anything. The free trial opens all ${productFacts.liveChannels} live channels, the ${productFacts.vodTitles} movie and TV show library, HD and 4K streams where available and the full TV guide for 24 hours. You request it on WhatsApp, and no card is ever asked for.`}
            className="mb-0 md:mb-0"
          >
            <TrialButtons />
            {/* Each phrase wraps as a whole, so a line never ends on a stray word */}
            <p className="stamp mt-5 text-subtle">
              {["No credit card", "Nothing to cancel", "Full access, nothing locked"].map((item, i) => (
                <Fragment key={item}>
                  {i > 0 && " · "}
                  <span className="whitespace-nowrap">{item}</span>
                </Fragment>
              ))}
            </p>
          </PageHeader>
        </Container>
      </Section>

      <Section flushTop>
        <Container>
          <SectionHeader
            title="What Do You Get With the OTTV Free Trial?"
            subtitle="Everything a paid plan includes, for 24 hours. No channel group, library section or feature is held back for trial users."
          />
          <Grid as="ul" cols={3} gap="lattice">
            {included.map((item) => (
              <Card variant="cell" as="li" key={item.title} className="p-6 md:p-8">
                <Heading level={3} size="heading">{item.title}</Heading>
                <p className="mt-2 text-muted-foreground">{item.body}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeader
            title="How Do I Get My OTTV Free Trial?"
            subtitle="Three steps, all in WhatsApp, with no payment form anywhere."
          />
          <StepList steps={steps} />
          <p className="mt-8 max-w-narrow text-body text-muted-foreground">
            A person answers every request, so the reply is not always instant. Once you have your login, the{" "}
            <Link href="/devices/fire-tv" className="text-link">Fire TV</Link>,{" "}
            <Link href="/devices/samsung-tv" className="text-link">Samsung TV</Link>,{" "}
            <Link href="/devices/ios" className="text-link">iPhone</Link> and{" "}
            <Link href="/devices/android" className="text-link">Android</Link> setup guides show where to enter it.
            The trial is free, but some player apps charge their own fee, including those in the{" "}
            <Link href="/devices/samsung-tv" className="text-link">Samsung</Link>,{" "}
            <Link href="/devices/lg-tv" className="text-link">LG</Link>,{" "}
            <Link href="/devices/ios" className="text-link">iPhone and iPad</Link> and{" "}
            <Link href="/devices/apple-tv" className="text-link">Apple TV</Link> guides, so check yours first.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            title="How Should You Test OTTV During the 24 Hours?"
            subtitle="Test it the way your household really watches: on your own devices, on your own internet connection, at the times you usually turn the TV on."
          />
          <Grid as="ul" cols="triple" gap="lattice">
            {testTips.map((tip) => (
              <Card variant="cell" as="li" key={tip.title} className="p-6 md:p-8">
                <Heading level={3} size="heading">{tip.title}</Heading>
                <p className="mt-2 text-muted-foreground">{tip.body}</p>
              </Card>
            ))}
          </Grid>
          <p className="mt-8 max-w-narrow text-body text-muted-foreground">
            A stream stutters during your test? The{" "}
            <Link href="/devices/troubleshooting" className="text-link">buffering troubleshooting guide</Link> covers the common fixes.
          </p>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeader
            title="What Does OTTV Cost After the Free Trial?"
            subtitle="If the trial convinces you, pick a plan. Prices are in US dollars and paid once per plan."
          />
          <Grid as="ul" cols={4}>
            {plans.map((plan) => (
              <PlanCard as="li" key={plan.id} plan={plan} variant="summary" />
            ))}
          </Grid>
          <p className="mt-8 max-w-narrow text-body text-muted-foreground">
            Every plan includes the same service you tested: {productFacts.summary}. Compare them on the{" "}
            <Link href="/pricing" className="text-link">pricing page</Link> and order the one you want on WhatsApp.
          </p>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <SectionHeader
            title="What Happens When the Free Trial Ends?"
            subtitle="We never take a payment method for the trial, so there is nothing we could charge when it ends. The trial stops after 24 hours, and whether you choose a plan is entirely up to you."
          />
          <StatStrip items={proofPoints} />
        </Container>
      </Section>

      <Section id="faq" tone="light">
        <Container>
          <SectionHeader
            title="OTTV Free Trial FAQ"
            subtitle="Short answers to what people ask most before starting an IPTV free trial."
          />
          <FaqList items={trialFaqs} />
        </Container>
      </Section>

      <Section tone="light" flushTop>
        <Container>
          <Callout
            size="large"
            title="Start Your OTTV Free Trial Tonight"
            action={<TrialButtons />}
          >
            24 hours of full access on your own devices, with no card and nothing to cancel. If OTTV earns a place on your TV, pick a plan. If it does not, you owe OTTV nothing.
          </Callout>
        </Container>
      </Section>
      <LastUpdated />
    </>
  );
}
