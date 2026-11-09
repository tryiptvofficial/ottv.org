
import articles from '@/lib/site-data/how-to.json';

// Export the raw article data for use in server components
export const howToArticles = articles;

// A lightweight, dependency-free function to get article data for client/edge use.
// This function does NOT include the processed image blur data.
export const getSafeArticleData = (deviceId: string) => {
    return articles.find((p) => p.id === deviceId);
}
