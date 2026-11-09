
import { pricingPageFaqs } from "@/lib/site-data/pricing-page-faq";
import { generateSubscriptionProductSchema, generateBreadcrumbSchema, generateFAQPageSchema } from "@/lib/schema";
import { siteConfig } from '../site-config';

// This function fetches and processes all data required for the pricing page in a single, cached operation.
export async function getPricingPageData() {
    const baseUrl = siteConfig.url;

    // Define all data fetching and processing promises
    
    const productSchemaPromise = Promise.resolve(generateSubscriptionProductSchema());

    const breadcrumbSchemaPromise = Promise.resolve(generateBreadcrumbSchema([
        { name: "Home", item: `${baseUrl}/` },
        { name: "Pricing", item: `${baseUrl}/pricing` }
    ]));
    
    const faqSchemaPromise = Promise.resolve(generateFAQPageSchema(pricingPageFaqs));

    // Await all promises in parallel for maximum efficiency
    const [
      productSchema,
      breadcrumbSchema,
      faqSchema,
    ] = await Promise.all([
      productSchemaPromise,
      breadcrumbSchemaPromise,
      faqSchemaPromise,
    ]);

    return { 
      productSchema,
      breadcrumbSchema,
      faqSchema,
      pricingPageFaqs, // Pass static data through as well
    };
}
