import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale African Foods Catalogue | East Africa Wholesale Foods",
  description:
    "Browse the full catalogue of African foods available for wholesale supply to retailers, grocery stores and restaurants across Canada.",
  alternates: {
    // Filtered/searched variants (?category=, ?sort=) all canonicalise here
    // so query-string combinations don't compete for indexing.
    canonical: "/products",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
