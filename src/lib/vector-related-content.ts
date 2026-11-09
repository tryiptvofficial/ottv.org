
import { generateEmbedding } from './vector-seo';
import { cosineSimilarity } from './utils';

interface ContentWithEmbedding {
  id: string;
  title: string;
  description: string;
  embedding: number[];
}

/**
 * Finds semantically similar content from a list based on vector embeddings.
 * @param currentContent The text of the current content to find similarities for.
 * @param allContent An array of all content items, each with a pre-computed embedding.
 * @param currentId The ID of the current content to exclude it from the results.
 * @param topK The number of similar items to return.
 * @returns A promise that resolves to an array of the most semantically similar content items.
 */
export async function findSemanticallySimilarContent(
  currentContent: string,
  allContent: ContentWithEmbedding[],
  currentId: string,
  topK: number = 5
): Promise<Omit<ContentWithEmbedding, 'embedding'>[]> {
  // Generate embedding for the current content on-the-fly
  const currentEmbedding = await generateEmbedding(currentContent);
  
  // Filter out the current content item from the list
  const otherContent = allContent.filter(content => content.id !== currentId);

  // Calculate similarity scores for all other content items
  const withScores = otherContent.map(content => ({
    ...content,
    similarity: cosineSimilarity(currentEmbedding, content.embedding)
  }));
  
  // Sort by similarity and return the top K results
  const sortedContent = withScores
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);

  // Return the content without the embedding
  return sortedContent.map(({ embedding, ...rest }) => rest);
}
