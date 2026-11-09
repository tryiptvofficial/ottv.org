
'use server';

import { getRelatedPosts } from '@/lib/linking';

export async function getRelatedPostsAction(currentId: string) {
    try {
        const posts = await getRelatedPosts(currentId);
        return posts;
    } catch (error) {
        console.error("Error fetching related posts:", error);
        return [];
    }
}
