import { NextResponse } from "next/server";
import { generateNextBlogPost, getTopicsStatus } from "@/lib/blog-generator";

export async function POST() {
  // Check for admin session or cron secret
  const result = await generateNextBlogPost();
  const status = getTopicsStatus();

  if (result.success) {
    return NextResponse.json({
      message: "Blog post generated successfully",
      slug: result.blogSlug,
      topics: status,
    });
  } else {
    return NextResponse.json(
      {
        error: result.error,
        topics: status,
      },
      { status: result.error === "No pending topics" ? 200 : 500 }
    );
  }
}

export async function GET() {
  const status = getTopicsStatus();
  return NextResponse.json({
    message: "Blog generation endpoint",
    topics: status,
    usage: "POST to generate next blog post",
  });
}
