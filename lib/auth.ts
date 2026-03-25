import { cookies } from "next/headers";

const COOKIE_NAME = "zre_role";
const AGENT_CODE_COOKIE = "zre_agent_code";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type DashboardRole = "admin" | "agent";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? process.env.DASHBOARD_PASSWORD ?? "zanzibaba2025";
}

export function getAgentPassword(): string {
  return process.env.AGENT_PASSWORD ?? process.env.DASHBOARD_PASSWORD ?? "zanzibaba2025";
}

export async function setAgentSession(
  role: DashboardRole,
  agentCode?: string | null
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  if (role === "agent" && agentCode != null && agentCode.trim() !== "") {
    cookieStore.set(AGENT_CODE_COOKIE, agentCode.trim(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
  } else {
    cookieStore.delete(AGENT_CODE_COOKIE);
  }
}

export async function clearAgentSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  cookieStore.delete(AGENT_CODE_COOKIE);
}

export async function getSessionAgentCode(): Promise<string | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(AGENT_CODE_COOKIE)?.value?.trim();
  return value ?? null;
}

export async function getSessionRole(): Promise<DashboardRole | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (value === "admin" || value === "agent") return value;
  return null;
}

export async function hasAgentSession(): Promise<boolean> {
  return (await getSessionRole()) !== null;
}

export async function isAdminSession(): Promise<boolean> {
  return (await getSessionRole()) === "admin";
}
