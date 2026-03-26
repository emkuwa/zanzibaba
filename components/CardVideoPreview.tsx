"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_LISTING_IMAGE } from "@/lib/default-listing-image";
import {
  getCloudinaryVideoPosterUrl,
  getYouTubeId,
  getVimeoId,
  isDirectVideoFileUrl,
} from "@/lib/parse-video-url";

const DEFAULT_IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

export function CardVideoPreview({
  videoUrl,
  title,
  imageSizes = DEFAULT_IMAGE_SIZES,
  compact = false,
}: {
  videoUrl: string;
  title: string;
  /** e.g. `"112px"` for small dashboard thumbnails */
  imageSizes?: string;
  /** Smaller play icon (dashboard row) */
  compact?: boolean;
}) {
  const url = videoUrl.trim();
  const yt = getYouTubeId(url);
  const vimeo = getVimeoId(url);
  const [ytIdx, setYtIdx] = useState(0);

  useEffect(() => {
    setYtIdx(0);
  }, [url]);

  if (yt) {
    const ids = ["mqdefault", "hqdefault", "sddefault", "default"].map(
      (s) => `https://img.youtube.com/vi/${yt}/${s}.jpg`
    );
    if (ytIdx >= ids.length) {
      return <VideoFallback compact={compact} />;
    }
    return (
      <div className="absolute inset-0">
        <Image
          src={ids[ytIdx]}
          alt=""
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          sizes={imageSizes}
          unoptimized
          onError={() => setYtIdx((i) => i + 1)}
        />
      </div>
    );
  }

  if (vimeo) {
    return (
      <div className="absolute inset-0">
        <Image
          src={`https://vumbnail.com/${vimeo}.jpg`}
          alt=""
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          sizes={imageSizes}
          unoptimized
        />
      </div>
    );
  }

  // Cloudinary: use derived JPEG frame (reliable); <video> poster on cards often stays blank
  const cloudinaryPoster = getCloudinaryVideoPosterUrl(url);
  if (cloudinaryPoster) {
    return (
      <CloudinaryPosterOrVideo
        posterUrl={cloudinaryPoster}
        videoUrl={url}
        title={title}
        imageSizes={imageSizes}
        compact={compact}
      />
    );
  }

  // Local /uploads/ paths do not exist on Vercel — avoid broken <video> (beige fallback)
  if (url.startsWith("/uploads/")) {
    return (
      <div className="absolute inset-0">
        <Image
          src={DEFAULT_LISTING_IMAGE}
          alt=""
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          sizes={imageSizes}
        />
      </div>
    );
  }

  if (isDirectVideoFileUrl(url)) {
    return <DirectVideoPoster src={url} title={title} compact={compact} />;
  }

  return <VideoFallback compact={compact} />;
}

function CloudinaryPosterOrVideo({
  posterUrl,
  videoUrl,
  title,
  imageSizes,
  compact,
}: {
  posterUrl: string;
  videoUrl: string;
  title: string;
  imageSizes: string;
  compact?: boolean;
}) {
  const [posterFailed, setPosterFailed] = useState(false);
  if (posterFailed) {
    return <DirectVideoPoster src={videoUrl} title={title} compact={compact} />;
  }
  return (
    <div className="absolute inset-0">
      <Image
        src={posterUrl}
        alt=""
        fill
        className="object-cover transition duration-300 group-hover:scale-[1.03]"
        sizes={imageSizes}
        unoptimized
        onError={() => setPosterFailed(true)}
      />
    </div>
  );
}

function VideoFallback({ compact }: { compact?: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-sand-200 via-sand-100 to-sand-200">
      <span
        className={
          compact
            ? "flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white shadow"
            : "flex h-14 w-14 items-center justify-center rounded-full bg-black/75 text-white shadow-lg"
        }
      >
        <svg
          className={compact ? "h-4 w-4" : "h-7 w-7"}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M8 5v14l11-7-11-7z" />
        </svg>
      </span>
      {!compact && (
        <span className="text-xs font-medium text-sand-600">Tap to watch</span>
      )}
    </div>
  );
}

function DirectVideoPoster({
  src,
  title,
  compact,
}: {
  src: string;
  title: string;
  compact?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    setBroken(false);
  }, [src]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onMeta = () => {
      if (v.duration && !Number.isNaN(v.duration)) {
        const t = Math.min(0.75, Math.max(0.05, v.duration * 0.08));
        try {
          v.currentTime = t;
        } catch {
          /* ignore */
        }
      }
    };
    v.addEventListener("loadedmetadata", onMeta);
    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, [src]);

  if (broken) {
    return <VideoFallback compact={compact} />;
  }

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      preload="metadata"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
      aria-label={title}
      onError={() => setBroken(true)}
    />
  );
}
