import { Readable } from "node:stream";
import { v2 as cloudinary } from "cloudinary";

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

function configure(): void {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

/**
 * Upload file bytes to Cloudinary (images + video). Returns HTTPS URL (secure_url).
 */
export async function uploadBufferToCloudinary(
  bytes: ArrayBuffer,
  resourceType: "image" | "video" | "auto" = "auto"
): Promise<string> {
  configure();
  const buffer = Buffer.from(bytes);
  const folder =
    process.env.CLOUDINARY_FOLDER?.trim() || "zanzibaba/listings";

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        use_filename: true,
        unique_filename: true,
      },
      (err, res) => {
        if (err) reject(err);
        else if (!res?.secure_url) reject(new Error("Cloudinary: missing secure_url"));
        else resolve({ secure_url: res.secure_url });
      }
    );
    Readable.from(buffer).pipe(stream);
  });

  return result.secure_url;
}
