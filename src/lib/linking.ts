


import { getSafeArticleData } from '@/lib/how-to';
import { getArticlesWithEmbeddings } from '@/lib/server/how-to-server';
import { findSemanticallySimilarContent } from './vector-related-content';
import { unstable_cache as cache } from 'next/cache';

export type Post = ReturnType<typeof getSafeArticleData>;

// In a real app, this would fetch from a database or CMS.
export async function getAllPosts(): Promise<Post[]> {
  return (await getArticlesWithEmbeddings()).map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    primaryKeyword: p.primaryKeyword,
    keywords: p.keywords,
    datePublished: p.datePublished,
    dateModified: p.dateModified,
    totalTime: p.totalTime,
    steps: p.steps,
    faqs: p.faqs,
    extraSections: p.extraSections,
  }));
}

/**
 * Gets a list of related posts for a given slug, based on semantic similarity.
 * @param currentId The slug/ID of the current post.
 * @param minLinks The maximum number of related links to return.
 * @returns An array of semantically related posts.
 */
export const getRelatedPosts = cache(async (currentId: string, minLinks = 3) => {
  // Use the function that generates embeddings on the server at request time
  const allPostsWithEmbeddings = await getArticlesWithEmbeddings();
  
  if (!allPostsWithEmbeddings || allPostsWithEmbeddings.length === 0) {
    return [];
  }
  
  const currentPost = allPostsWithEmbeddings.find(p => p.id === currentId);

  if (!currentPost) {
    return [];
  }
  
  // Create a single text block for the current post to generate its embedding for comparison
  const currentContentText = [
    currentPost.title,
    currentPost.description,
    ...currentPost.steps.map(step => `${step.title}: ${step.description}`),
    ...(currentPost.faqs ? currentPost.faqs.map(faq => `${faq.question} ${faq.answer}`) : [])
  ].join('\n\n');

  // Find semantically similar content
  const related = await findSemanticallySimilarContent(
    currentContentText,
    allPostsWithEmbeddings,
    currentId,
    minLinks
  );
  
  return related.map(post => ({
      ...post,
      href: `/devices/${post.id}`
  }));
},
['related-posts'],
{ revalidate: 3600, tags: ['posts'] }
);
