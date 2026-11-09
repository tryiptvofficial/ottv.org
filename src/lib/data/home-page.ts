
import { weeklyBuzzItems } from "@/lib/site-data/weekly-buzz";
import { sportEvents } from "@/lib/site-data/sport-events";
import { getPlaceholderImage } from "@/lib/server/image-blur-server";
import { generateSubscriptionProductSchema } from '@/lib/schema';

// This function fetches and processes all data required for the homepage in a single, cached operation.
export async function getHomePageData() {
    // Define all data fetching and processing promises

    const weeklyBuzzPromise = Promise.all(
      weeklyBuzzItems.map(async (item) => {
        const placeholder = await getPlaceholderImage(item.src);
        return { ...item, placeholder };
      })
    );

    const sportEventsPromise = Promise.all(
      sportEvents.map(async (item) => {
        const placeholder = await getPlaceholderImage(item.src);
        return { ...item, placeholder };
      })
    );

    const productSchemaPromise = Promise.resolve(generateSubscriptionProductSchema());
    
    // Await all promises in parallel
    const [
      weeklyBuzzItemsWithPlaceholders,
      sportEventsWithPlaceholders,
      productSchema
    ] = await Promise.all([
      weeklyBuzzPromise,
      sportEventsPromise,
      productSchemaPromise
    ]);

    return { 
      weeklyBuzzItemsWithPlaceholders, 
      sportEventsWithPlaceholders,
      productSchema
    };
}
