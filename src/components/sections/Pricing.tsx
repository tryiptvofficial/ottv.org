import Link from "next/link";
import { Check, Clock, Info, MessageCircle, MonitorSmartphone, ShieldCheck } from "lucide-react";
import { Heading } from "@/components/ui/typography";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { planFeatures, planLimits, plans } from "@/lib/site-data/pricing";
import { cn } from "@/lib/utils";
import { Container } from "../shared/Container";
import { PlanCard } from "../shared/PlanCard";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { Reveal } from "../shared/Reveal";

interface PricingProps {
  /** Set when the band above is also light, so the gap stays one band's padding. */
  flushTop?: boolean;
  /** List what every plan includes under the cards. /pricing turns this off: it has its own section for it. */
  showIncluded?: boolean;
}

// What a visitor wants to know at the order button, said once beside the plans: right after the featured plan on
// phones, in a row under the cards from 768px. How ordering works is in the subtitle above the cards. Each line
// repeats a fact the pricing, FAQ, device guides, refund policy and free trial pages already state. How to pay is
// left out until the owner confirms the payment methods.
const beforeYouOrder = [
  { icon: ShieldCheck, text: <>One payment, nothing renews, and a <span className="whitespace-nowrap">7-day money-back</span> guarantee on paid plans.</> },
  { icon: Clock, text: <>Not sure yet? <Link href="/iptv-free-trial" className="text-link">Try OTTV free for 24 hours</Link>, no card needed.</> },
  {
    icon: MonitorSmartphone,
    text: <>Some devices need a player app that charges its own fee. <Link href="/#devices" className="text-link">See which devices</Link>.</>,
  },
  { icon: MessageCircle, text: "A person handles each order, so allow a short wait for the reply." },
];

export function Pricing({ flushTop = false, showIncluded = true }: PricingProps) {
  return (
    <Section id="pricing" tone="light" flushTop={flushTop} className="isolate overflow-x-clip">
      <Container>
        <Reveal>
          <SectionHeader
            title="Choose Your IPTV Plan"
            subtitle="Every plan includes the same channels, movies and features. Tap Order on WhatsApp: the chat opens with your plan written, and a person replies with your login."
          />
        </Reveal>

        {/* Pricing grid: one column on phones, two on tablets, the four plans side by side on desktop, always
            starting at the heading's left edge. Black cards on the off-white band; the featured plan carries the
            green glow. On phones the plans stack, so the featured plan moves to the top of the stack; from two
            columns up the plans run shortest to longest. The source order, which screen readers and the Tab key
            follow, stays shortest first. "Before you order" sits in the grid too: on phones it comes right after the
            featured plan (both are order-first, and the source order puts the plan ahead), from 768px it is a full row
            under the cards. The floating contact button steps aside while the plans are on screen, so it never sits
            on an order button. */}
        <div data-fab-avoid className="grid max-w-form gap-4 md:max-w-none md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <Reveal key={plan.id} className={cn("h-full [&>div]:h-full", plan.isPopular && "order-first md:order-none")}>
              <PlanCard plan={plan} />
            </Reveal>
          ))}
          <div className="order-first py-4 md:order-last md:col-span-2 md:pb-0 md:pt-6 xl:col-span-4">
            <Heading level={3} size="subheading">Before you order</Heading>
            <ul className="mt-4 grid gap-x-8 gap-y-3 text-label text-muted-foreground md:grid-cols-2 xl:grid-cols-4">
              {beforeYouOrder.map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex gap-3">
                  <Icon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Under the plans: what every plan includes, said once instead of on each card. It keeps id="features" for
            older links to /#features. /pricing turns it off: that page has its own section for it. */}
        {showIncluded && (
          <div id="features" className="mt-12 max-w-form md:max-w-none">
            <Heading level={3} size="subheading">Included in every plan</Heading>
            <ul className="mt-4 grid gap-x-8 gap-y-3 text-label text-foreground sm:grid-cols-2 xl:grid-cols-4">
              {planFeatures.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                  {feature}
                </li>
              ))}
            </ul>
            {/* Limits sit apart from the list, under a neutral icon, so they never read as a benefit. */}
            {planLimits.map((limit) => (
              <p key={limit} className="mt-4 flex gap-3 text-label text-muted-foreground">
                <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-subtle" />
                {limit}
              </p>
            ))}
          </div>
        )}

        <p className="mt-10 max-w-form text-caption text-muted-foreground md:max-w-none">
          Prices in US dollars. Questions before you order?{" "}
          <WhatsAppLink className="text-link">
            Chat with us on WhatsApp
          </WhatsAppLink>
          .
        </p>
      </Container>
    </Section>
  );
}
