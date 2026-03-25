"use client";

import { getYouTubeId, getVimeoId, isDirectVideoFileUrl } from "@/lib/parse-video-url";

type PropertyVideoProps = { videoUrl: string; title: string };

export function PropertyVideo({ videoUrl, title }: PropertyVideoProps) {
  const url = videoUrl.trim();
  if (!url) return null;

  const ytId = getYouTubeId(url);
  if (ytId) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-sand-100">
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?rel=0`}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  const vimeoId = getVimeoId(url);
  if (vimeoId) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-sand-100">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}`}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          allow="fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (isDirectVideoFileUrl(url)) {
    return (
      <div className="overflow-hidden rounded-xl bg-sand-100">
        <video
          src={url}
          controls
          className="w-full bg-sand-100"
          preload="metadata"
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-sand-300 bg-sand-50 px-4 py-8 text-center">
      <p className="text-sm text-sand-600">
        Could not preview this video. Open the link in YouTube, Vimeo, or use a direct .mp4 / .mov URL.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
      >
        Open video link
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}
