import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://realestate.zanzibaba.com"),
  title: {
    default: "Zanzibaba Real Estate | Land & Property in Zanzibar",
    template: "%s | Zanzibaba Real Estate",
  },
  description:
    "Find land, plots, and properties in Zanzibar. Trusted real estate partner for investment in Paje, Nungwi, Kendwa, and across the island.",
  keywords: [
    "Zanzibar real estate",
    "land for sale Zanzibar",
    "property Zanzibar",
    "plots Paje",
    "investment Zanzibar",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
