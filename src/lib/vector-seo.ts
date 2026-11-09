
'use server';

import { unstable_cache as cache } from 'next/cache';
import { generateTextEmbedding } from '@/ai/flows/embedding-flow';

/**
 * Generates a vector embedding for a given text string.
 * This is a fallback that returns a zero-vector.
 * @param text The text to generate an embedding for.
 * @returns A promise that resolves to an array of numbers representing the embedding.
 */
export const generateEmbedding = cache(async (text: string): Promise<number[]> => {
  try {
    const embedding = await generateTextEmbedding(text);
    return embedding;
  } catch (error) {
    console.error("Failed to generate embedding, returning zero-vector:", error);
    // Return a zero-vector as a fallback.
    // This will disable semantic similarity for related content but prevent errors.
    return new Array(768).fill(0);
  }
},
['text-embedding'],
{ revalidate: 3600 * 24 } // Embeddings for content are stable, cache for a day
);
