import { z } from 'zod';

// Define the schema for the output of the semantic content generation
export const SemanticContentSchema = z.object({
  primaryEntity: z.string().describe('The main subject or central topic of the content.'),
  relatedEntities: z
    .array(z.string())
    .describe('A list of people, places, organizations, or concepts that are directly related to the primary entity.'),
  semanticClusters: z
    .array(z.array(z.string()))
    .describe("Groups of closely related concepts. Each inner array represents a cluster, with the cluster's main topic as the first element, followed by related sub-topics."),
  contextualKeywords: z
    .array(z.string())
    .describe('A list of keywords and long-tail phrases that are semantically relevant and likely to be used in searches related to the primary entity.'),
});

export type SemanticContent = z.infer<typeof SemanticContentSchema>;
