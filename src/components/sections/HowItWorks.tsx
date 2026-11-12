import Link from "next/link";
import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { StepList } from "../shared/StepList";
import { illustration } from "@/lib/site-data/visual-assets";

const steps = [
  {
    illustration: illustration("step-choose-plan"),
    title: "Choose your plan",
    description: "Pick 1, 3, 6 or 12 months. Every plan includes the same service; the 12-month plan costs the least per month.",
  },
  {
    illustration: illustration("step-order-chat"),
    title: "Order on WhatsApp",
    description: (
      <>
        Tap Order on WhatsApp on <Link href="#pricing" className="text-link">the plan you want</Link>. The chat opens with your
        order already written, and the purchase is completed there.
      </>
    ),
  },
  {
    illustration: illustration("step-start-watching"),
    title: "Start watching",
    description: "Install a player app with the setup guide for your device and sign in with the login details we send you.",
  },
];

interface HowItWorksProps {
  /** Set when the band above is also light (the plans, on the homepage), so the gap stays one band's padding. */
  flushTop?: boolean;
}

export function HowItWorks({ flushTop = false }: HowItWorksProps) {
  return (
    <Section id="how-it-works" tone="light" flushTop={flushTop} className="isolate overflow-x-clip">
      <Container>
        <SectionHeader
          title="How Does OTTV Work?"
          subtitle="From choosing a plan to watching on your TV, in three steps."
        />
        <StepList steps={steps} />
      </Container>
    </Section>
  );
}
