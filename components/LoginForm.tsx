"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "agent">("agent");
  const [agentCode, setAgentCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          role,
          ...(role === "agent" && { agentCode: agentCode.trim() || undefined }),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Login failed");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <fieldset className="flex gap-3 text-sm">
        <legend className="sr-only">Login as</legend>
        <button
          type="button"
          onClick={() => setRole("agent")}
          className={`flex-1 rounded-lg border px-3 py-2 ${
            role === "agent"
              ? "border-brand-600 bg-brand-50 text-brand-700"
              : "border-sand-200 bg-sand-50 text-sand-700"
          }`}
        >
          Agent
        </button>
        <button
          type="button"
          onClick={() => setRole("admin")}
          className={`flex-1 rounded-lg border px-3 py-2 ${
            role === "admin"
              ? "border-brand-600 bg-brand-50 text-brand-700"
              : "border-sand-200 bg-sand-50 text-sand-700"
          }`}
        >
          Admin
        </button>
      </fieldset>
      {role === "agent" && (
        <label className="block text-sm font-medium text-sand-700">
          Agent code
          <input
            type="text"
            value={agentCode}
            onChange={(e) => setAgentCode(e.target.value)}
            placeholder="Your agent code (to see only your listings)"
            className="mt-1 w-full rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sand-900 placeholder:text-sand-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </label>
      )}
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sand-900 placeholder:text-sand-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        autoFocus={role !== "agent"}
        required
      />
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-brand-600 py-2 font-medium text-white hover:bg-brand-700 disabled:opacity-50"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
