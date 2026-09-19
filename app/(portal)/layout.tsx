import { Navbar } from "@/components/portal/Navbar";
import { Footer } from "@/components/portal/Footer";
import { MobileContactBar } from "@/components/layout/MobileContactBar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-14 sm:pb-0">{children}</main>
      <Footer />
      <MobileContactBar />
    </>
  );
}
