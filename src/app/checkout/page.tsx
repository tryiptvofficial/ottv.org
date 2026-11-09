
import { Container } from "@/components/shared/Container";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { Section } from "@/components/shared/Section";
import { Breadcrumb } from "@/components/shared/PageHeader";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/typography";
import type { Metadata } from "next";
import { SiWhatsapp } from "react-icons/si";
import { Schema } from "@/components/shared/Schema";
import { getCheckoutPageData } from "@/lib/data/checkout-page";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { plans } from "@/lib/site-data/pricing";

export function generateMetadata(): Metadata {
    return generatePageMetadata({
        title: "Order on WhatsApp | OTTV",
        description: "Complete your OTTV subscription by contacting our team on WhatsApp.",
        canonical: "/checkout",
        noIndex: true,
    });
}


// Orders are completed on WhatsApp, so this page takes no payment details.
export default async function CheckoutPage() {
    const { breadcrumbSchema } = await getCheckoutPageData();

    return (
        <>
            <Schema id="breadcrumb" schema={breadcrumbSchema} />

            <Section data-fab-avoid>
                <Container>
                    <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Checkout" }]} className="mb-8" />
                    <SectionHeader
                        level={1}
                        className="md:mb-16"
                        title="Order Your OTTV Plan on WhatsApp"
                        subtitle="Choose a plan and WhatsApp opens with your order written. The purchase is completed in that chat, and your login details arrive there."
                    />
                    <Card className="mx-auto max-w-form">
                        <CardHeader>
                            <Heading level={2} size="subheading">Plans and prices</Heading>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4 tabular-nums">
                                {plans.map((plan) => (
                                    <li key={plan.id} className="flex items-center justify-between gap-4">
                                        <span className="text-muted-foreground">{plan.name}</span>
                                        <span className="ml-auto font-medium text-foreground">${plan.price.toFixed(2)}</span>
                                        <Button asChild size="sm" variant={plan.isPopular ? "primary" : "secondary"}>
                                            <a href={plan.orderUrl} target="_blank" rel="noopener noreferrer">
                                                Order<span className="sr-only"> the {plan.name} plan on WhatsApp (opens in a new tab)</span>
                                            </a>
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-4 text-caption text-muted-foreground">
                                Prices in US dollars. Each plan is a one-time payment, and nothing renews on its own.
                            </p>
                            <Button asChild size="lg" variant="secondary" className="mt-6 w-full">
                                <WhatsAppLink>
                                    <SiWhatsapp aria-hidden />
                                    Ask a question first
                                </WhatsAppLink>
                            </Button>
                        </CardContent>
                    </Card>
                </Container>
            </Section>
        </>
    )
}
