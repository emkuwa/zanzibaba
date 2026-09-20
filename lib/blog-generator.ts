import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import type { BlogPost, BlogCategory } from "./blog-types";
import { BLOG_TOPICS, type BlogTopic } from "@/data/blog-topics";
import { SEED_BLOG_POSTS } from "@/data/seed-blog";

const BLOG_FILE = path.join(process.cwd(), "data", "blog.json");
const TOPICS_FILE = path.join(process.cwd(), "data", "blog-topics.json");

function readBlogFile(): BlogPost[] {
  if (!existsSync(BLOG_FILE)) return [];
  try {
    const raw = readFileSync(BLOG_FILE, "utf-8");
    const parsed = JSON.parse(raw) as BlogPost[];
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

function readTopicsFile(): BlogTopic[] {
  if (!existsSync(TOPICS_FILE)) {
    writeFileSync(TOPICS_FILE, JSON.stringify(BLOG_TOPICS, null, 2), "utf-8");
    return [...BLOG_TOPICS];
  }
  try {
    return JSON.parse(readFileSync(TOPICS_FILE, "utf-8"));
  } catch {
    return [...BLOG_TOPICS];
  }
}

function writeTopicsFile(topics: BlogTopic[]): void {
  writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2), "utf-8");
}

function getNextPendingTopic(): BlogTopic | null {
  const topics = readTopicsFile();
  return topics.find((t) => t.status === "pending") || null;
}

function markTopicStatus(id: string, status: BlogTopic["status"]): void {
  const topics = readTopicsFile();
  const idx = topics.findIndex((t) => t.id === id);
  if (idx !== -1) {
    topics[idx].status = status;
    if (status === "generated") {
      topics[idx].generatedAt = new Date().toISOString();
    }
    writeTopicsFile(topics);
  }
}

function topicToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export interface GenerationResult {
  success: boolean;
  topicId?: string;
  blogSlug?: string;
  error?: string;
}

export async function generateNextBlogPost(): Promise<GenerationResult> {
  const topic = getNextPendingTopic();
  if (!topic) {
    return { success: false, error: "No pending topics" };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { success: false, error: "OPENAI_API_KEY not configured" };
  }

  markTopicStatus(topic.id, "generated");

  try {
    const systemPrompt = `You are a property advisor writing for Zanzibaba Real Estate, a local property advisory in Zanzibar, Tanzania.

Write a comprehensive, factual blog post about the given topic. Rules:
- Write in clear, direct English
- Use markdown formatting with ## headings
- Include specific facts, price ranges, and actionable information
- No marketing fluff or unsubstantiated claims
- Include a brief FAQ section at the end (3-5 questions)
- Write 800-1500 words
- Be helpful to someone researching Zanzibar property
- Mention Zanzibaba Real Estate naturally where relevant (as local advisors, not as sales pitch)
- Use real Zanzibar location names and context
- Include specific price ranges and numbers where relevant
- Structure with clear headings and subheadings`;

    const userPrompt = `Write a blog post titled: "${topic.title}"

Target keywords: ${topic.targetKeywords.join(", ")}

Suggested outline:
${topic.outline.map((o, i) => `${i + 1}. ${o}`).join("\n")}

Include a brief FAQ section at the end with 3-5 frequently asked questions related to the topic.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      markTopicStatus(topic.id, "pending");
      return { success: false, topicId: topic.id, error: `OpenAI API error: ${response.status} ${errText}` };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    if (!content) {
      markTopicStatus(topic.id, "pending");
      return { success: false, topicId: topic.id, error: "Empty response from OpenAI" };
    }

    // Extract FAQ from content
    const faqMatch = content.match(/(?:FAQ|Frequently Asked Questions)\s*\n([\s\S]*?)$/i);
    const faqs: { q: string; a: string }[] = [];
    if (faqMatch) {
      const faqSection = faqMatch[1];
      const faqPairs = faqSection.split(/\n(?=\d+\.|\*\*Q)/);
      for (const pair of faqPairs) {
        const qMatch = pair.match(/(?:Q\d*:?\s*)?\*?\*?(.*?)\??\*?\*?\s*[:\n]/);
        const aMatch = pair.match(/(?:A\d*:?\s*)(.*?)(?=\n\d+\.|\n\*\*Q|\n\n|$)/s);
        if (qMatch && aMatch) {
          faqs.push({
            q: qMatch[1].trim().replace(/\*\*/g, ""),
            a: aMatch[1].trim().replace(/\*\*/g, ""),
          });
        }
      }
    }

    // Clean content - remove FAQ section from main content
    const cleanContent = content.replace(/(?:FAQ|Frequently Asked Questions)\s*\n[\s\S]*$/, "").trim();

    // Generate excerpt from first paragraph
    const firstPara = cleanContent.replace(/^#+\s*.+\n*/, "").split("\n\n")[0] || "";
    const excerpt = firstPara.slice(0, 200) + (firstPara.length > 200 ? "..." : "");

    const slug = topic.slug;
    const now = new Date().toISOString();

    const blogPost: BlogPost = {
      id: `blog-${slug}`,
      slug,
      title: topic.title,
      excerpt,
      content: cleanContent,
      category: topic.category,
      tags: topic.targetKeywords,
      author: "Zanzibaba Real Estate",
      publishedAt: now,
      updatedAt: now,
      readTime: Math.ceil(cleanContent.split(/\s+/).length / 200),
      featured: false,
      faqs: faqs.length > 0 ? faqs : undefined,
    };

    const posts = readBlogFile();
    // Check if already exists
    const existingIdx = posts.findIndex((p) => p.slug === slug);
    if (existingIdx !== -1) {
      posts[existingIdx] = blogPost;
    } else {
      posts.push(blogPost);
    }
    writeBlogFile(posts);

    return {
      success: true,
      topicId: topic.id,
      blogSlug: slug,
    };
  } catch (err) {
    markTopicStatus(topic.id, "pending");
    return {
      success: false,
      topicId: topic.id,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export function getTopicsStatus(): {
  total: number;
  pending: number;
  generated: number;
  published: number;
} {
  const topics = readTopicsFile();
  return {
    total: topics.length,
    pending: topics.filter((t) => t.status === "pending").length,
    generated: topics.filter((t) => t.status === "generated").length,
    published: topics.filter((t) => t.status === "published").length,
  };
}

export function getTopicsList(): BlogTopic[] {
  return readTopicsFile();
}
