'use server';
/**
 * @fileOverview A flow for generating text embeddings.
 *
 * - generateTextEmbedding - A function that generates a vector embedding for a given text.
 */
import {ai} from '@/ai/genkit';
import {z} from 'zod';

const EmbeddingInputSchema = z.string();
const EmbeddingOutputSchema = z.array(z.number());

export async function generateTextEmbedding(
  text: z.infer<typeof EmbeddingInputSchema>
): Promise<z.infer<typeof EmbeddingOutputSchema>> {
  return embeddingFlow(text);
}

const embeddingFlow = ai.defineFlow(
  {
    name: 'embeddingFlow',
    inputSchema: EmbeddingInputSchema,
    outputSchema: EmbeddingOutputSchema,
  },
  // ai.embed() needs an `embedder` and none is configured, so this has never produced
  // embeddings: callers in @/lib/vector-seo catch the error and use a zero vector.
  // Pass an embedder (e.g. a googleAI embedder) to ai.embed() to switch it on.
  async () => {
    throw new Error('embeddingFlow: no embedder configured');
  }
);
