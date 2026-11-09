'use server';
/**
 * @fileoverview A flow for generating semantic content analysis for a given topic.
 *
 * - generateSemanticContentFlow - A function that analyzes a topic and returns a structured
 *   object with primary entity, related entities, semantic clusters, and keywords.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { SemanticContentSchema } from '@/lib/types/semantic-content';

const prompt = ai.definePrompt({
    name: 'semanticContentPrompt',
    input: { schema: z.string() },
    output: { schema: SemanticContentSchema },
    prompt: `You are an expert SEO analyst and entity optimization specialist. 
    Analyze the following topic and generate a comprehensive semantic content structure. 
    Your goal is to provide a deep, contextual understanding of the topic for search engines.

    Topic: "{{prompt}}"

    Generate the following:
    1.  **primaryEntity**: The single, most important subject.
    2.  **relatedEntities**: Other distinct topics or named entities directly connected to the main subject.
    3.  **semanticClusters**: Group related concepts together. Each cluster should be an array, with the first item being the main concept of that cluster.
    4.  **contextualKeywords**: A list of relevant search terms and long-tail keywords.
    
    Provide your output in the requested JSON format.`,
});


export const generateSemanticContentFlow = ai.defineFlow(
  {
    name: 'generateSemanticContentFlow',
    inputSchema: z.string(),
    outputSchema: SemanticContentSchema,
  },
  async (topic) => {
    const { output } = await prompt(topic);
    if (!output) {
      throw new Error('Failed to generate semantic content. The AI model did not return a valid output.');
    }
    return output;
  }
);
