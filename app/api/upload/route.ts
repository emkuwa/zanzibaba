import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { hasAgentSession } from "@/lib/auth";
import {
  isCloudinaryConfigured,
  uploadBufferToCloudinary,
} from "@/lib/cloudinary-upload";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const isAgent = await hasAgentSession();
  if (!isAgent) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return new Response(JSON.stringify({ error: "No file" }), { status: 400 });
  }

  const bytes = await file.arrayBuffer();

  if (isCloudinaryConfigured()) {
    try {
      const url = await uploadBufferToCloudinary(bytes);
      return Response.json({ url });
    } catch (e) {
      console.error("Cloudinary upload failed", e);
      return new Response(
        JSON.stringify({
          error:
            e instanceof Error ? e.message : "Cloudinary upload failed. Check env and dashboard.",
        }),
        { status: 500 }
      );
    }
  }

  const ext = path.extname(file.name) || ".jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  await mkdir(UPLOAD_DIR, { recursive: true });
  const filePath = path.join(UPLOAD_DIR, safeName);
  await writeFile(filePath, Buffer.from(bytes));
  const url = `/uploads/${safeName}`;
  return Response.json({ url });
}
