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
  const isProd = process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);
  const isAgent = await hasAgentSession();
  if (!isAgent) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return new Response(JSON.stringify({ error: "No file" }), { status: 400 });
  }

  const fileExt = path.extname(file.name).toLowerCase();
  const isVideo =
    file.type.startsWith("video/") ||
    [".mp4", ".webm", ".ogg", ".mov", ".m4v"].includes(fileExt);
  const resourceType = isVideo ? "video" : "image";

  const bytes = await file.arrayBuffer();

  if (isCloudinaryConfigured()) {
    try {
      const url = await uploadBufferToCloudinary(bytes, resourceType);
      return Response.json({ url, backend: "cloudinary" });
    } catch (e) {
      console.error("Cloudinary upload failed", e);
      // In production, better to fail loudly than return a URL that won't persist.
      if (isProd) {
        return new Response(
          JSON.stringify({
            error:
              e instanceof Error
                ? e.message
                : "Cloudinary upload failed. Check Cloudinary env vars in Vercel.",
          }),
          { status: 500 }
        );
      }
    }
  }

  if (isProd) {
    return new Response(
      JSON.stringify({
        error:
          "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in Vercel env vars.",
      }),
      { status: 500 }
    );
  }

  const safeExt = fileExt || ".jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${safeExt}`;
  await mkdir(UPLOAD_DIR, { recursive: true });
  const filePath = path.join(UPLOAD_DIR, safeName);
  await writeFile(filePath, Buffer.from(bytes));
  const url = `/uploads/${safeName}`;
  return Response.json({ url, backend: "local" });
}
