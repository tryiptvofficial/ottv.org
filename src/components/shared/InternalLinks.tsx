
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getRelatedPostsAction } from '@/app/actions';
import { Skeleton } from '../ui/skeleton';

interface RelatedLink {
  href: string;
  title: string;
}

const RelatedLinksSkeleton = () => (
    <div className="space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-5 w-5/6" />
    </div>
);

export default function InternalLinks({ currentId }: { currentId: string }) {
  const [relatedLinks, setRelatedLinks] = useState<RelatedLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      setIsLoading(true);
      const posts = await getRelatedPostsAction(currentId);
      const links = posts.map(post => ({
        href: `/devices/${post.id}`,
        title: post.title,
      }));
      setRelatedLinks(links);
      setIsLoading(false);
    };

    fetchRelatedPosts();
  }, [currentId]);

  if (!isLoading && relatedLinks.length === 0) {
    return null;
  }
  
  return (
    <Card className="not-prose">
      <CardHeader>
        <CardTitle>Related Articles</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
            <RelatedLinksSkeleton />
        ) : (
            <ul className="space-y-3">
                {relatedLinks.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            title={link.title}
                            className="group flex items-center justify-between rounded-control text-muted-foreground transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <span>{link.title}</span>
                            <ArrowRight aria-hidden className="h-4 w-4 opacity-0 transition-opacity duration-fast group-hover:opacity-100" />
                        </Link>
                    </li>
                ))}
            </ul>
        )}
      </CardContent>
    </Card>
  );
}
