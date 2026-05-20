import type { Metadata } from "next";
import { cormorant, dmSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zanzibaba.com"),
  title: {
    default: "Zanzibaba Group | Building Today, Empowering Tomorrow",
    template: "%s | Zanzibaba Group",
  },
  description:
    "Zanzibaba Group — premium real estate, building materials, construction, digital, tours, security, and landscaping across Zanzibar and Tanzania.",
  keywords: [
    "Zanzibaba",
    "Zanzibar",
    "real estate Zanzibar",
    "building materials",
    "construction Tanzania",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Zanzibaba Group",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/brand/logos/icon-favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
