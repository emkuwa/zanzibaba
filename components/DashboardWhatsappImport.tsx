"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DashboardWhatsappImport() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function handleImport() {
    if (!file) return;
    setLoading(true);
    setMessage(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/import/whatsapp-chat", {
        method: "POST",
        body: form,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage({ type: "err", text: data.error ?? "Import failed" });
        return;
      }
      const created = data.createdDrafts ?? data.listings?.length ?? 0;
      setMessage({
        type: "ok",
        text: `Processed ${data.totalMessages ?? "?"} messages, detected ${
          data.candidateMessages ?? "?"
        } potential listings, created ${created} draft listing(s). Review them below before publishing.`,
      });
      router.refresh();
    } catch {
      setMessage({ type: "err", text: "Network error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-8 rounded-xl border border-sand-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-sand-900">Import from WhatsApp chat</h2>
      <p className="mt-1 text-sm text-sand-600">
        Export a WhatsApp chat (without media) from your phone, then upload the <code
          className="rounded bg-sand-100 px-1 text-xs"
        >
          .txt
        </code>{" "}
        file here. We&apos;ll detect listing-style messages and create draft listings for review.
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="block">
          <span className="block text-xs font-medium text-sand-600">WhatsApp chat file (.txt)</span>
          <input
            type="file"
            accept=".txt"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-0.5 block w-64 text-sm text-sand-900"
          />
        </label>
        <button
          type="button"
          onClick={handleImport}
          disabled={loading || !file}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {loading ? "Importing…" : "Import WhatsApp listings"}
        </button>
      </div>
      {message && (
        <p
          className={`mt-3 text-sm ${message.type === "ok" ? "text-green-700" : "text-red-700"}`}
          role="alert"
        >
          {message.text}
        </p>
      )}
    </div>
  );
}

