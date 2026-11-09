
import { Container } from "@/components/shared/Container";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { Section } from "@/components/shared/Section";
import { Grid } from "@/components/shared/Grid";
import { Breadcrumb } from "@/components/shared/PageHeader";
import { Field } from "@/components/ui/field";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import type { Metadata } from "next";
import { SiWhatsapp } from "react-icons/si";
import { Schema } from "@/components/shared/Schema";
import { getCheckoutPageData } from "@/lib/data/checkout-page";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";

export function generateMetadata(): Metadata {
    return generatePageMetadata({
        title: "Secure Checkout | OTTV",
        description: "Complete your OTTV subscription by contacting our team on WhatsApp.",
        canonical: "/checkout",
        noIndex: true,
    });
}


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
                        title="Contact Us to Purchase"
                        subtitle="To complete your purchase, please contact us via WhatsApp. Our team is ready to assist you."
                    />
                    <Grid cols="aside">
                        <div className="order-2 lg:order-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Payment Information</CardTitle>
                                    <CardDescription>All transactions are secure and encrypted.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <Field id="email" label="Email Address">
                                            <Input type="email" placeholder="you@example.com" disabled />
                                        </Field>
                                        <div className="relative">
                                            <Field id="card-number" label="Card Details">
                                                <Input placeholder="Card Number" disabled />
                                            </Field>
                                            <CreditCard aria-hidden className="absolute bottom-3 right-3 h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Field id="expiry" label="Expiry Date">
                                                <Input placeholder="MM / YY" disabled />
                                            </Field>
                                            <Field id="cvc" label="CVC">
                                                <Input placeholder="CVC" disabled />
                                            </Field>
                                        </div>
                                        <Field id="name" label="Cardholder Name">
                                            <Input placeholder="Full Name" disabled />
                                        </Field>
                                        <Button asChild size="lg" className="w-full">
                                            <WhatsAppLink>
                                                <SiWhatsapp aria-hidden />
                                                Contact on WhatsApp
                                            </WhatsAppLink>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="order-1 lg:sticky lg:top-24 lg:order-2 lg:self-start">
                             <Card>
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <dl className="space-y-4 tabular-nums">
                                        <div className="flex justify-between">
                                            <dt className="text-muted-foreground">12-Month Plan</dt>
                                            <dd className="font-medium text-foreground">$88.23</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-muted-foreground">Discount</dt>
                                            <dd className="font-medium text-foreground">-$101.61</dd>
                                        </div>
                                        <div className="flex justify-between border-t pt-4 text-subheading text-foreground">
                                            <dt>Total</dt>
                                            <dd>$88.23</dd>
                                        </div>
                                    </dl>
                                    <p className="mt-4 text-caption text-muted-foreground">Your subscription will renew automatically. You can cancel anytime.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                </Container>
            </Section>
        </>
    )
}
