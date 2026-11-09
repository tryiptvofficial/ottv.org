
import { generateBreadcrumbSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site-config';

// This function fetches and processes all data required for the checkout page in a single, cached operation.
export async function getCheckoutPageData() {
    const baseUrl = siteConfig.url;

    // Define all data fetching and processing promises

    const breadcrumbSchemaPromise = Promise.resolve(generateBreadcrumbSchema([
        { name: "Home", item: `${baseUrl}/` },
        { name: "Checkout", item: `${baseUrl}/checkout` }
    ]));

    // Await all promises in parallel for maximum efficiency
    const [
      breadcrumbSchema,
    ] = await Promise.all([
      breadcrumbSchemaPromise,
    ]);

    return { 
      breadcrumbSchema,
    };
}
