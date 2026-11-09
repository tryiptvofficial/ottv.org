
import { faqs } from "@/lib/site-data/faq";
import { generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site-config';


// This function fetches and processes all data required for the FAQ page in a single, cached operation.
export async function getFaqPageData() {
    const baseUrl = siteConfig.url;

    // Define all data fetching and processing promises

    const faqSchemaPromise = Promise.resolve(generateFAQPageSchema(faqs));

    const breadcrumbSchemaPromise = Promise.resolve(generateBreadcrumbSchema([
        { name: "Home", item: `${baseUrl}/` },
        { name: "FAQ", item: `${baseUrl}/faq` }
    ]));

    // Await all promises in parallel
    const [
      faqSchema,
      breadcrumbSchema
    ] = await Promise.all([
      faqSchemaPromise,
      breadcrumbSchemaPromise
    ]);

    return { 
      faqSchema,
      breadcrumbSchema
    };
}
