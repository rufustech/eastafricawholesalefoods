import type { Metadata } from "next";
import "@/styles/globals.css";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateWebsiteSchema, generateOrganizationSchema } from "@/lib/seo";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ConstructionGate } from "@/components/ConstructionGate";

export const metadata: Metadata = {
  title: "East Africa Wholesale Foods - Premium Quality Products",
  description:
    "Premium wholesale foods supplier serving East Africa. High-quality dry goods, grains, frozen products, and spices from Kenya, Uganda, and Tanzania.",
  keywords: [
    "wholesale foods",
    "East Africa",
    "wholesale supplier",
    "dry goods",
    "frozen foods",
    "wholesale prices",
  ],
  authors: [{ name: "East Africa Wholesale Foods" }],
  creator: "East Africa Wholesale Foods",
  publisher: "East Africa Wholesale Foods",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eastafricawholesalefoods.com",
    siteName: "East Africa Wholesale Foods",
    title: "East Africa Wholesale Foods - Premium Quality Products",
    description: "Premium wholesale foods supplier serving East Africa",
    images: [
      {
        url: "https://eastafricawholesalefoods.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "East Africa Wholesale Foods",
      },
    ],
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
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = generateWebsiteSchema({
    name: "East Africa Wholesale Foods",
    url: "https://eastafricawholesalefoods.com",
  });

  const organizationSchema = generateOrganizationSchema({
    name: "East Africa Wholesale Foods",
    url: "https://eastafricawholesalefoods.com",
    email: "info@eastafricawholesalefoods.com",
    phone: "+254-XXX-XXX-XXX",
  });

  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
        <link rel="icon" href="/favicon.ico" />
        <StructuredData schema={[websiteSchema, organizationSchema]} />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXX', { page_path: window.location.pathname });
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
        <ThemeProvider><ConstructionGate>{children}</ConstructionGate></ThemeProvider>
      </body>
    </html>
  );
}
