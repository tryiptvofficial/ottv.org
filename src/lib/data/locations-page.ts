
import { generateBreadcrumbSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site-config';

// This function fetches and processes all data required for the locations page in a single, cached operation.
export async function getLocationsPageData() {
    const baseUrl = siteConfig.url;

    // Define all data fetching and processing promises

    const breadcrumbSchemaPromise = Promise.resolve(generateBreadcrumbSchema([
        { name: "Home", item: `${baseUrl}/` },
        { name: "Service Locations", item: `${baseUrl}/locations` }
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
