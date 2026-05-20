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
    "Zanzibaba Group — premium real estate, building materials, construction, digital, tours, security, and landscaping throughout Zanzibar.",
  keywords: [
    "Zanzibaba",
    "Zanzibar",
    "real estate Zanzibar",
    "building materials",
    "construction Zanzibar",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Zanzibaba Group",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/brand/favicons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicons/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/brand/favicons/favicon-180.png",
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
