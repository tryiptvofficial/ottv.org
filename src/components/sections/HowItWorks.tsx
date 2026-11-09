import { MessageCircle, Package, Tv } from "lucide-react";
import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { StepList } from "../shared/StepList";

const steps = [
  {
    icon: Package,
    title: "Choose Your Plan",
    description: "Pick 1, 3, 6 or 12 months. Every plan includes the same service; the 12-month plan costs the least per month.",
  },
  {
    icon: MessageCircle,
    title: "Order on WhatsApp",
    description: "Tap your plan's Choose button. WhatsApp opens with the order already written, and the purchase is completed in that chat.",
  },
  {
    icon: Tv,
    title: "Start Watching",
    description: "Install a player app with the setup guide for your device and sign in with the login details we send you.",
  },
];

export function HowItWorks() {
  return (
    <Section tone="light" id="how-it-works" spacing="compact" className="isolate overflow-x-clip">
      <Container>
        <SectionHeader
          title="Get Started in 3 Simple Steps"
          subtitle="From choosing a plan to watching on your TV, in three steps."
        />
        <StepList steps={steps} />
      </Container>
    </Section>
  );
}
