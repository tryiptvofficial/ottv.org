import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/typography";
import { keepTogether } from "@/lib/keep-together";
import { cn } from "@/lib/utils";
import type { plans } from "@/lib/site-data/pricing";

type Plan = (typeof plans)[number];

interface PlanCardProps {
  plan: Plan;
  /**
   * `full`: price, monthly price and the order button, for pricing grids.
   * `summary`: name and price only, for the plan overview on the free trial page.
   */
  variant?: "full" | "summary";
  as?: React.ElementType;
  className?: string;
}

/**
 * One subscription plan: a black card (it reads on the off-white pricing band and, through its border, on
 * black). The featured plan (`isPopular`) carries the green ring and glow and a "Best value" tag.
 * The button says where it goes: ordering happens in a WhatsApp chat, not on a checkout page. Every plan
 * includes the same service, so the features are listed once under the grid (see `Pricing`), not on each card.
 */
export function PlanCard({ plan, variant = "full", as = "article", className }: PlanCardProps) {
  const full = variant === "full";

  return (
    <Card as={as} variant="accent" className={cn("flex h-full flex-col p-6 transition-transform duration-standard ease-standard hover:-translate-y-0.5", plan.isPopular && "shadow-glow", className)}>
      <div className="flex items-center justify-between gap-3">
        <Heading level={3} size="heading">{plan.name}</Heading>
        {plan.isPopular && <Badge variant="accent">Best value</Badge>}
      </div>

      <p className="mt-10 flex items-baseline gap-2 whitespace-nowrap">
        <span className="text-stat tabular-nums text-foreground">${plan.price.toFixed(2)}</span>
        {full && <span className="text-label text-muted-foreground">one payment</span>}
      </p>

      {/* Longer plans show their monthly price and saving. The 1-month price already is a monthly price, so that
          card says what it is instead of repeating the same figure. */}
      {full ? (
        plan.savings ? (
          <p className="mt-3 text-body text-foreground">
            <span className="tabular-nums">${plan.price_monthly.toFixed(2)}</span> a month
            <span className="block text-caption text-muted-foreground">
              {keepTogether(`${plan.savings} vs the 1-month price`)}
            </span>
          </p>
        ) : (
          <p className="mt-3 text-body text-foreground">{plan.description}</p>
        )
      ) : (
        <p className="mt-3 text-caption text-muted-foreground">
          {plan.savings ? `$${plan.price_monthly.toFixed(2)} a month · ${plan.savings}` : plan.description}
        </p>
      )}

      {full && (
        // mt-auto keeps the buttons level across a row of cards; pt-6 is the minimum gap above them.
        <div className="mt-auto pt-6">
          <Button asChild size="lg" variant={plan.isPopular ? "primary" : "secondary"} className="w-full">
            <a href={plan.orderUrl} target="_blank" rel="noopener noreferrer">
              Order on WhatsApp
              <span className="sr-only">: {plan.name} plan, opens in a new tab</span>
              <ArrowUpRight aria-hidden />
            </a>
          </Button>
        </div>
      )}
    </Card>
  );
}
