import { redirect } from "next/navigation";
import { hasAgentSession } from "@/lib/auth";
import { LoginForm } from "@/components/LoginForm";

export const metadata = {
  title: "Agent login",
  description: "Sign in to the Zanzibaba Real Estate dashboard.",
};

export default async function LoginPage() {
  const isAgent = await hasAgentSession();
  if (isAgent) redirect("/dashboard");
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-sand-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-sand-900">Agent login</h1>
        <p className="mt-1 text-sm text-sand-600">
          Enter the dashboard password to continue.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
