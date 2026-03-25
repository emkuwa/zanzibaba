import { clearAgentSession } from "@/lib/auth";

export async function POST() {
  await clearAgentSession();
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
