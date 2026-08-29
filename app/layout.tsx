import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { SITE, SEO_KEYWORDS } from "@/data/site";
import { FUNNEL_IMAGES } from "@/data/funnel-images";
import { GlobalRealEstateSchema } from "@/components/seo/RealEstateJsonLd";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Zanzibar Investment Properties | Luxury Villas & Off-Plan | Zanzibaba",
    template: "%s | Zanzibaba Real Estate",
  },
  description:
    "Zanzibar real estate for international investors — beachfront villas, off-plan developments, investment land, and luxury property for sale in Zanzibar.",
  keywords: [...SEO_KEYWORDS],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE.url,
    siteName: SITE.name,
    title: "Zanzibar Investment Properties | Zanzibaba Real Estate",
    description:
      "High-return Zanzibar investment properties — villas, off-plan programmes, and beachfront assets for foreign buyers.",
    images: [
      {
        url: FUNNEL_IMAGES.og,
        width: 1200,
        height: 630,
        alt: "Zanzibar luxury property investment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zanzibar Investment Properties | Zanzibaba",
    description:
      "Luxury villas and Zanzibar investment opportunities for international buyers.",
    images: [FUNNEL_IMAGES.og],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: SITE.url },
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
    <html lang="en" className={fontVariables}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="image" href={FUNNEL_IMAGES.hero} />
        <GlobalRealEstateSchema />
      </head>
      <body className="flex min-h-screen flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
