import { redirect } from "next/navigation";
import { getSessionRole } from "@/lib/auth";
import { getAllLeads } from "@/lib/leads-store";

export const metadata = {
  title: "Leads",
  description: "Inbound WhatsApp leads captured from the public site.",
};

export default async function LeadsPage() {
  const role = await getSessionRole();
  if (role !== "admin") {
    redirect("/dashboard");
  }

  const leads = await getAllLeads();

  return (
    <div>
      <h1 className="text-2xl font-bold text-sand-900">Leads</h1>
      <p className="mt-1 text-sand-600">
        {leads.length} WhatsApp lead{leads.length === 1 ? "" : "s"} captured from the public site
      </p>

      {leads.length === 0 ? (
        <div className="mt-6 rounded-xl border border-sand-200 bg-white p-6 text-sand-600">
          No leads yet. When visitors click &quot;Chat on WhatsApp&quot; on a property page, they
          will appear here.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-sand-200 bg-white">
          <table className="min-w-full divide-y divide-sand-200 text-sm">
            <thead className="bg-sand-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-sand-600">When</th>
                <th className="px-4 py-2 text-left font-medium text-sand-600">Property</th>
                <th className="px-4 py-2 text-left font-medium text-sand-600">Location</th>
                <th className="px-4 py-2 text-left font-medium text-sand-600">Agent</th>
                <th className="px-4 py-2 text-left font-medium text-sand-600">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-sand-50/60">
                  <td className="whitespace-nowrap px-4 py-2 text-sand-700">
                    {new Date(lead.createdAt).toLocaleString("en-GB")}
                  </td>
                  <td className="px-4 py-2 text-sand-900">
                    {lead.listingTitle}
                    <div className="text-xs text-sand-500">
                      Ref: {lead.listingRefCode ?? lead.listingId.slice(-6).toUpperCase()}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sand-700">{lead.listingLocation}</td>
                  <td className="px-4 py-2 text-sand-700">
                    {lead.agentName ? (
                      <>
                        {lead.agentName}
                        {lead.agentCode ? ` (${lead.agentCode})` : ""}
                      </>
                    ) : (
                      <span className="text-sand-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sand-700">
                    {lead.source === "public_whatsapp" ? "Public site WhatsApp button" : lead.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

