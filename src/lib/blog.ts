import { blogPosts } from "@/content/blogPosts";
import type { BlogPost } from "@/lib/types";

/** Returns all posts with a `publishedAt` date in the past, newest first. */
export function getPublishedBlogPosts(): BlogPost[] {
  const now = new Date();
  return blogPosts
    .filter((post) => new Date(post.publishedAt) <= now)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

/** Returns a single published post by slug, or undefined if not found/unpublished. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  const now = new Date();
  return blogPosts.find(
    (post) => post.slug === slug && new Date(post.publishedAt) <= now,
  );
}

/** Returns related posts based on shared tags, excluding the given post. */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const published = getPublishedBlogPosts();
  const tagSet = new Set(post.tags);

  return published
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      overlap: p.tags.filter((t) => tagSet.has(t)).length,
    }))
    .filter((p) => p.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map((p) => p.post);
}

/** Returns all unique tags from published posts, sorted alphabetically. */
export function getAllTags(): string[] {
  const posts = getPublishedBlogPosts();
  const tags = new Set(posts.flatMap((p) => p.tags));
  return [...tags].sort();
}
