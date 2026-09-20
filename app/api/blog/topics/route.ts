import { NextResponse } from "next/server";
import { getTopicsList, getTopicsStatus } from "@/lib/blog-generator";

export async function GET() {
  const topics = getTopicsList();
  const status = getTopicsStatus();
  return NextResponse.json({ topics, status });
}
