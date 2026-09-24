import type { Metadata } from "next";
import "@/styles/globals.css";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
} from "@/lib/seo";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ConstructionGate } from "@/components/ConstructionGate";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollRevealEffects } from "@/components/ScrollRevealEffects";
import { GtmHead, GtmNoScript, GA4 } from "@/components/analytics/Analytics";
import { SITE_URL, BUSINESS } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "African Food Wholesaler & Distributor Canada | East Africa Wholesale Foods",
    template: "%s | East Africa Wholesale Foods",
  },
  description:
    "East Africa Wholesale Foods is an Edmonton-based African food wholesaler and distributor supplying grocery stores, retailers, restaurants and food-service businesses across Canada.",
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: BUSINESS.name,
    title:
      "African Food Wholesaler & Distributor Canada | East Africa Wholesale Foods",
    description:
      "Edmonton-based African food wholesaler and distributor supplying retailers, grocery stores, restaurants and food-service businesses across Canada.",
    images: [
      {
        url: "/eastafricawholesalefoodsLogo.png",
        width: 1200,
        height: 630,
        alt: "East Africa Wholesale Foods",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "African Food Wholesaler & Distributor Canada | East Africa Wholesale Foods",
    description:
      "Edmonton-based African food wholesaler and distributor supplying retailers, restaurants and food businesses across Canada.",
    images: ["/eastafricawholesalefoodsLogo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className="scroll-smooth bg-[#f8f2e5] dark:bg-[#0f2a1d]"
    >
      <head>
        {/* Google Tag Manager */}
        <GtmHead />

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1f633f" />
        <link rel="icon" href="/favicon.ico" />
        <StructuredData
          schema={[websiteSchema, organizationSchema, localBusinessSchema]}
        />

        {/* Apply dark mode BEFORE rendering starts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const stored = localStorage.getItem('theme-preference-v2');
              const initial = stored || 'light';
              const html = document.documentElement;
              if (initial === 'dark') {
                html.classList.add('dark');
                html.style.backgroundColor = '#0f2a1d';
                html.style.color = '#f8f2e5';
              } else {
                html.classList.remove('dark');
                html.style.backgroundColor = '#f8f2e5';
                html.style.color = '#173b2b';
              }
            `,
          }}
        />

        {/* Google Analytics 4 — loads only when NEXT_PUBLIC_GA4_ID is set */}
        <GA4 />
      </head>
      <body className="min-h-screen bg-[#f8f2e5] text-[#173b2b] dark:bg-[#0f2a1d] dark:text-[#f8f2e5]">
        {/* Google Tag Manager (noscript) */}
        <GtmNoScript />

        <ThemeProvider>
          <ConstructionGate>
            <>
              <ScrollRevealEffects />
              {children}
              <SiteFooter />
            </>
          </ConstructionGate>
        </ThemeProvider>
      </body>
    </html>
  );
}
