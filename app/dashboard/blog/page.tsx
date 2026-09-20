"use client";

import { useState, useEffect } from "react";

type TopicsStatus = {
  total: number;
  pending: number;
  generated: number;
  published: number;
};

type Topic = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  generatedAt?: string;
};

export default function BlogDashboard() {
  const [status, setStatus] = useState<TopicsStatus | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchStatus();
  }, []);

  async function fetchStatus() {
    try {
      const res = await fetch("/api/blog/generate");
      const data = await res.json();
      setStatus(data.topics);
    } catch {
      setMessage("Failed to fetch status");
    }
  }

  async function generatePost() {
    setGenerating(true);
    setMessage("");
    try {
      const res = await fetch("/api/blog/generate", { method: "POST" });
      const data = await res.json();
      if (data.slug) {
        setMessage("Generated: " + data.slug);
        fetchStatus();
      } else {
        setMessage(data.error || "Generation failed");
      }
    } catch {
      setMessage("Request failed");
    } finally {
      setGenerating(false);
    }
  }

  const statusColor = (s: string) => {
    switch (s) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "generated": return "bg-green-100 text-green-800";
      case "published": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="font-serif text-2xl font-semibold text-zb-navy">Blog Content Manager</h1>

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-sm border border-zb-border bg-white p-4">
          <p className="text-xs text-zb-muted">Total Topics</p>
          <p className="text-2xl font-bold text-zb-navy">{status?.total || 0}</p>
        </div>
        <div className="rounded-sm border border-zb-border bg-white p-4">
          <p className="text-xs text-zb-muted">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{status?.pending || 0}</p>
        </div>
        <div className="rounded-sm border border-zb-border bg-white p-4">
          <p className="text-xs text-zb-muted">Generated</p>
          <p className="text-2xl font-bold text-green-600">{status?.generated || 0}</p>
        </div>
        <div className="rounded-sm border border-zb-border bg-white p-4">
          <p className="text-xs text-zb-muted">Published</p>
          <p className="text-2xl font-bold text-zb-gold">{status?.published || 0}</p>
        </div>
      </div>

      <div className="rounded-sm border border-zb-border bg-white p-6">
        <h2 className="font-serif text-lg font-semibold text-zb-navy">Generate Next Post</h2>
        <p className="mt-2 text-sm text-zb-muted">
          Creates the next pending blog post using AI. Runs automatically daily at 8:00 AM EAT via
          Vercel Cron, or trigger manually below.
        </p>
        <button
          onClick={generatePost}
          disabled={generating}
          className="mt-4 rounded-sm bg-zb-navy px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-zb-navy-deep disabled:opacity-50"
        >
          {generating ? "Generating..." : "Generate Next Post"}
        </button>
        {message && <p className="mt-3 text-sm text-zb-muted">{message}</p>}
      </div>

      <div className="rounded-sm border border-zb-border bg-white p-6">
        <h2 className="font-serif text-lg font-semibold text-zb-navy">Topic Queue</h2>
        <p className="mt-1 text-sm text-zb-muted">30 topics across 7 categories</p>
        <div className="mt-4 space-y-2">
          {topics.length === 0 ? (
            <p className="text-sm text-zb-muted">Load topics from /api/blog/topics</p>
          ) : (
            topics.map((topic) => (
              <div key={topic.id} className="flex items-center justify-between rounded-sm border border-zb-border/50 p-3 text-sm">
                <div className="flex-1">
                  <p className="font-medium text-zb-navy">{topic.title}</p>
                  <p className="text-xs text-zb-muted">{topic.category}</p>
                </div>
                <span className={`ml-4 rounded-sm px-2 py-0.5 text-[0.6rem] font-semibold uppercase ${statusColor(topic.status)}`}>
                  {topic.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
