import { Footer } from "@/components/portal/Footer";
import { FunnelNavbar } from "@/components/funnel/FunnelNavbar";
import { StickyWhatsApp } from "@/components/funnel/StickyWhatsApp";
import { InvestmentConcierge } from "@/components/funnel/InvestmentConcierge";

export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FunnelNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyWhatsApp />
      <InvestmentConcierge />
    </>
  );
}
