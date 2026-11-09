
"use client";

import { CheckIcon } from "lucide-react";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { plans } from "@/lib/site-data/pricing";
import { BorderBeam } from "../shared/BorderBeam";
import { IndexLabel } from "../shared/IndexLabel";
import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { Reveal, blurFade } from "../shared/Reveal";
import { SectionBackdrop } from "../shared/SectionBackdrop";

export function Pricing() {
  return (
    <Section id="pricing" spacing="compact" className="isolate overflow-x-clip">
      <SectionBackdrop />

      <Container>
        <Reveal variants={blurFade}>
          <SectionHeader
            eyebrow="Pricing"
            title="Choose Your IPTVMax Package"
            subtitle="Select the perfect plan from one of the best IPTV providers. All plans come with our full feature set."
          />
        </Reveal>

        {/* Pricing grid: one column on phones, two on tablets, the four plans side by side on desktop */}
        <div className="mx-auto grid max-w-form gap-4 md:max-w-3xl md:grid-cols-2 md:gap-6 lg:max-w-none xl:grid-cols-4">
          {plans.map((plan, i) => (
            <Reveal
              key={plan.id}
              variants={blurFade}
              delay={0.15 + i * 0.08}
              // The lift pulls the featured card 1rem past the row at top and bottom, so it also needs
              // 2rem more height; otherwise its larger padding squeezes the CTA button.
              className={cn("h-full [&>div]:h-full", plan.isPopular && "xl:-my-4 xl:h-[calc(100%+2rem)]")}
            >
              <Card
                as="article"
                variant={plan.isPopular ? "accent" : "base"}
                className={cn("flex h-full flex-col p-6", plan.isPopular && "xl:py-10")}
              >
                {plan.isPopular && <BorderBeam size={120} duration={8} />}

                <div className="space-y-2">
                  <IndexLabel index={i + 1} label="Plan" />
                  <Heading level={3} size="subheading">{plan.name}</Heading>
                </div>

                <p className="mt-8 flex items-baseline gap-2 whitespace-nowrap">
                  <span className="text-stat tabular-nums text-foreground">${plan.price.toFixed(2)}</span>
                  <span className="text-caption text-muted-foreground">one-time</span>
                </p>
                <p className="mt-2 min-h-10 text-caption text-muted-foreground">
                  {plan.savings ? (
                    <>
                      <span className="font-medium text-foreground">${plan.price_monthly.toFixed(2)}/mo</span>
                      {" · "}
                      <span className="text-foreground">{plan.savings}</span> <span className="whitespace-nowrap">vs the 1-month price</span>
                    </>
                  ) : (
                    plan.description
                  )}
                </p>

                <Button
                  asChild
                  size="lg"
                  variant={plan.isPopular ? "primary" : "secondary"}
                  className="mt-6 w-full"
                >
                  <a href={plan.orderUrl} target="_blank" rel="noopener noreferrer">
                    Choose {plan.name}
                    <span className="sr-only"> — {plan.name} plan (opens WhatsApp in a new tab)</span>
                  </a>
                </Button>

                <ul className="mt-6 space-y-3 border-t pt-6 text-caption text-muted-foreground">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <CheckIcon
                        aria-hidden
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          plan.isPopular ? "text-primary" : "text-subtle",
                        )}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>

        <p className="mt-12 text-center text-caption text-muted-foreground">
          Prices in USD. Questions before you order?{" "}
          <WhatsAppLink className="text-link">
            Chat with us on WhatsApp
          </WhatsAppLink>
          .
        </p>
      </Container>
    </Section>
  );
}
