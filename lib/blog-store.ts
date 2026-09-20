import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import type { BlogPost } from "./blog-types";
import { SEED_BLOG_POSTS } from "@/data/seed-blog";

const BLOG_FILE = path.join(process.cwd(), "data", "blog.json");

function readBlogFile(): BlogPost[] {
  if (!existsSync(BLOG_FILE)) {
    writeFileSync(BLOG_FILE, "[]", "utf-8");
    return [];
  }
  try {
    const raw = readFileSync(BLOG_FILE, "utf-8");
    const parsed = JSON.parse(raw) as BlogPost[];
    // If blog.json is empty, return seed data
    if (parsed.length === 0) {
      return SEED_BLOG_POSTS.map((p) => ({
        ...p,
        id: `blog-${p.slug}`,
        updatedAt: ("updatedAt" in p ? (p as { updatedAt: string }).updatedAt : p.publishedAt) || p.publishedAt,
      }));
    }
    return parsed;
  } catch {
    return SEED_BLOG_POSTS.map((p) => ({
      ...p,
      id: `blog-${p.slug}`,
      updatedAt: ("updatedAt" in p ? (p as { updatedAt: string }).updatedAt : p.publishedAt) || p.publishedAt,
    }));
  }
}

function writeBlogFile(posts: BlogPost[]): void {
  writeFileSync(BLOG_FILE, JSON.stringify(posts, null, 2), "utf-8");
}

export function getAllBlogPosts(): BlogPost[] {
  return readBlogFile().filter((p) => !p.featured || true);
}

export function getPublishedBlogPosts(): BlogPost[] {
  return readBlogFile()
    .filter((p) => new Date(p.publishedAt) <= new Date())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return readBlogFile().find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getPublishedBlogPosts().filter((p) => p.category === category);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getPublishedBlogPosts().filter((p) => p.tags.includes(tag));
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return getPublishedBlogPosts().filter((p) => p.featured);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const all = getPublishedBlogPosts().filter((p) => p.id !== post.id);
  const scored = all.map((p) => {
    let score = 0;
    if (p.category === post.category) score += 3;
    const commonTags = p.tags.filter((t) => post.tags.includes(t));
    score += commonTags.length;
    return { post: p, score };
  });
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.post);
}

export function createBlogPost(post: Omit<BlogPost, "id" | "updatedAt">): BlogPost {
  const posts = readBlogFile();
  const newPost: BlogPost = {
    ...post,
    id: `blog-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    updatedAt: post.publishedAt,
  };
  posts.push(newPost);
  writeBlogFile(posts);
  return newPost;
}

export function updateBlogPost(
  id: string,
  updates: Partial<BlogPost>
): BlogPost | null {
  const posts = readBlogFile();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  posts[idx] = { ...posts[idx], ...updates, updatedAt: new Date().toISOString() };
  writeBlogFile(posts);
  return posts[idx];
}

export function deleteBlogPost(id: string): boolean {
  const posts = readBlogFile();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  posts.splice(idx, 1);
  writeBlogFile(posts);
  return true;
}
