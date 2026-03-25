import { NextRequest } from "next/server";
import { getAdminPassword, getAgentPassword, setAgentSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const password = body?.password ?? "";
  const role = body?.role === "admin" ? "admin" : "agent";
  const agentCode = typeof body?.agentCode === "string" ? body.agentCode.trim() : null;
  const expected = role === "admin" ? getAdminPassword() : getAgentPassword();
  if (password !== expected) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid password" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  await setAgentSession(role, agentCode);
  return new Response(JSON.stringify({ ok: true, role }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
