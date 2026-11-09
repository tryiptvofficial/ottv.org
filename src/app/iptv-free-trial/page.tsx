import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, Clock, Film, ListChecks, MessageCircle, MonitorPlay, MonitorSmartphone, Smartphone, Tv } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { Heading } from "@/components/ui/typography";
import { Callout } from "@/components/shared/Callout";
import { Container } from "@/components/shared/Container";
import { FaqList } from "@/components/shared/FaqList";
import { Grid } from "@/components/shared/Grid";
import { PageHeader } from "@/components/shared/PageHeader";
import { Schema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { SectionBackdrop } from "@/components/shared/SectionBackdrop";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StepList } from "@/components/shared/StepList";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { getIptvFreeTrialPageData } from "@/lib/data/iptv-free-trial-page";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { plans } from "@/lib/site-data/pricing";
import { productFacts } from "@/lib/site-data/product-facts";

const trialMessage = "Hi, I would like to request the IPTVMax 24-hour free trial.";

export function generateMetadata(): Metadata {
  const title = "IPTV Free Trial 2026: 24 Hours Full Access, No Card | IPTVMax";
  const description = `IPTV free trial from IPTVMax: 24 hours of full access to ${productFacts.liveChannels} live channels and ${productFacts.vodTitles} movies & TV shows. No credit card, request it on WhatsApp.`;
  return {
    ...generatePageMetadata({ title, description, canonical: "/iptv-free-trial" }),
    title: { absolute: title },
  };
}

const included = [
  { icon: Tv, title: `${productFacts.liveChannels} live channels`, body: "Channels from around the world, with none hidden from trial users." },
  { icon: Film, title: `${productFacts.vodTitles} movies & TV shows`, body: "The whole on-demand library is open during your trial, exactly as a subscriber sees it." },
  { icon: MonitorPlay, title: "HD and 4K where available", body: "Trial streams play at the same quality as paid ones, so you judge the real picture." },
  { icon: CalendarClock, title: "Smart EPG and catch-up", body: "The TV guide and catch-up TV are switched on, so you can check listings against what is airing." },
  { icon: Smartphone, title: "Every device you own", body: "TVs, streaming sticks, phones, tablets and computers. Test on the screens your household uses." },
  { icon: MessageCircle, title: "Help on WhatsApp", body: "Trial users get the same WhatsApp support as subscribers if setup gets stuck." },
];

const steps = [
  { title: "Tap Start my free trial", description: "WhatsApp opens with a trial request already written for you." },
  { title: "Send the message", description: "That is the whole request. We never ask for a card, bank details or any payment method." },
  { title: "Sign in and watch", description: "Our team replies in the chat with your login details. Install a player app with your device's setup guide, sign in, and watch with full access for 24 hours." },
];

const testTips = [
  { icon: Clock, title: "Watch at your busiest hour", body: "Evening is when home connections carry the most traffic, so it is the most useful time to test live channels." },
  { icon: ListChecks, title: "Check the channels you rely on", body: "Open the news, sports, film and kids' channels you watch most, plus any in your language, and make sure each one plays cleanly." },
  { icon: MonitorSmartphone, title: "Try every screen and the guide", body: "Sign in on each device you plan to use, compare the TV guide with what is on air, and play a 4K stream on your largest TV where 4K is available." },
];

const proofPoints = [
  { value: "$0", label: "Trial cost, no card taken" },
  { value: "24 h", label: "Full access" },
  { value: productFacts.liveChannels, label: "Live channels" },
  { value: productFacts.vodTitles, label: "Movies & TV shows" },
];

function TrialButtons() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Button asChild size="lg">
        <WhatsAppLink message={trialMessage}>
          <SiWhatsapp aria-hidden />
          Start my free trial
        </WhatsAppLink>
      </Button>
      <Button asChild size="lg" variant="secondary">
        <Link href="/pricing">See plans and pricing</Link>
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
        <SectionBackdrop />
        <Container>
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "IPTV Free Trial" }]}
            eyebrow="IPTVMax · 24 hours · Full access · No card"
            title="IPTV Free Trial: 24 Hours of Full Access, No Credit Card"
            lead={`See how IPTVMax plays on your own screens before you spend anything. The free trial opens all ${productFacts.liveChannels} live channels, the ${productFacts.vodTitles} movie and TV show library, HD and 4K streams where available and the full TV guide for 24 hours. You request it on WhatsApp, and no card is ever asked for.`}
            className="mb-0 md:mb-0"
          >
            <TrialButtons />
            {/* Each phrase wraps as a whole, so a line never ends on a stray word */}
            <p className="mt-4 font-mono text-meta text-muted-foreground">
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

      <Section divided>
        <Container>
          <SectionHeader
            eyebrow="What's included"
            title="What Do You Get With the IPTVMax Free Trial?"
            subtitle="Everything a paid plan includes, for 24 hours. No channel group, library section or feature is held back for trial users."
          />
          <Grid as="ul" cols={3}>
            {included.map((item) => (
              <Card as="li" key={item.title} className="p-6">
                <IconTile className="mb-6">
                  <item.icon aria-hidden />
                </IconTile>
                <Heading level={3} size="subheading">{item.title}</Heading>
                <p className="mt-2 text-muted-foreground">{item.body}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section divided>
        <Container>
          <SectionHeader
            eyebrow="How it works"
            title="How Do I Get My IPTVMax Free Trial?"
            subtitle="Three steps, all in WhatsApp, with no payment form anywhere."
          />
          <StepList steps={steps} />
          <p className="mx-auto mt-10 max-w-narrow text-center text-body text-muted-foreground">
            A person answers every request, so the reply is not always instant. Once you have your login, the{" "}
            <Link href="/devices/fire-tv" className="text-link">Fire TV</Link>,{" "}
            <Link href="/devices/samsung-tv" className="text-link">Samsung TV</Link>,{" "}
            <Link href="/devices/ios" className="text-link">iPhone</Link> and{" "}
            <Link href="/devices/android" className="text-link">Android</Link> setup guides show where to enter it.
          </p>
        </Container>
      </Section>

      <Section divided>
        <Container>
          <SectionHeader
            eyebrow="Make the most of it"
            title="How Should You Test IPTVMax During the 24 Hours?"
            subtitle="Test it the way your household really watches: on your own devices, on your own internet connection, at the times you usually turn the TV on."
          />
          <Grid as="ul" cols={3}>
            {testTips.map((tip) => (
              <Card as="li" key={tip.title} className="p-6">
                <IconTile className="mb-6">
                  <tip.icon aria-hidden />
                </IconTile>
                <Heading level={3} size="subheading">{tip.title}</Heading>
                <p className="mt-2 text-muted-foreground">{tip.body}</p>
              </Card>
            ))}
          </Grid>
          <p className="mx-auto mt-10 max-w-narrow text-center text-body text-muted-foreground">
            A stream stutters during your test? The{" "}
            <Link href="/devices/troubleshooting" className="text-link">buffering troubleshooting guide</Link> covers the common fixes.
          </p>
        </Container>
      </Section>

      <Section divided>
        <Container>
          <SectionHeader
            eyebrow="After the trial"
            title="What Does IPTVMax Cost After the Free Trial?"
            subtitle="If the trial convinces you, pick a plan. Prices are in US dollars and paid once per plan."
          />
          <Grid as="ul" cols={4}>
            {plans.map((plan) => (
              <Card as="li" key={plan.id} variant={plan.isPopular ? "accent" : "base"} className="flex flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <Heading level={3} size="subheading">{plan.name}</Heading>
                  {plan.isPopular && <Badge>Best value</Badge>}
                </div>
                <p className="mt-6 text-stat tabular-nums text-foreground">${plan.price.toFixed(2)}</p>
                <p className="mt-2 text-caption text-muted-foreground">
                  {plan.savings ? `$${plan.price_monthly.toFixed(2)} a month · ${plan.savings}` : "One month of full service"}
                </p>
              </Card>
            ))}
          </Grid>
          <p className="mx-auto mt-10 max-w-narrow text-center text-body text-muted-foreground">
            Every plan includes the same service you tested: {productFacts.summary}. Compare them on the{" "}
            <Link href="/pricing" className="text-link">pricing page</Link> and order the one you want on WhatsApp.
          </p>
        </Container>
      </Section>

      <Section divided>
        <Container>
          <SectionHeader
            eyebrow="Why IPTVMax"
            title="Why Is the IPTVMax Free Trial Risk-Free?"
            subtitle="We never take a payment method for the trial, so there is nothing we could charge when it ends. The trial stops after 24 hours, and whether you choose a plan is entirely up to you."
          />
          <Grid as="ul" cols={4}>
            {proofPoints.map((point) => (
              <Card as="li" key={point.label} className="p-6 text-center">
                <p className="text-stat tabular-nums text-foreground">{point.value}</p>
                <p className="mt-2 text-caption text-muted-foreground">{point.label}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section id="faq" divided>
        <Container>
          <SectionHeader
            eyebrow="Questions & answers"
            title="IPTVMax Free Trial FAQ"
            subtitle="Short answers to what people ask most before starting an IPTV free trial."
          />
          <FaqList items={trialFaqs} />
        </Container>
      </Section>

      <Section divided>
        <Container>
          <Callout
            size="large"
            title="Start Your IPTVMax Free Trial Tonight"
            action={<TrialButtons />}
          >
            24 hours of full access on every device you own, with no card and nothing to cancel. If IPTVMax earns a place on your TV, pick a plan. If it does not, you owe nothing.
          </Callout>
        </Container>
      </Section>
    </>
  );
}
