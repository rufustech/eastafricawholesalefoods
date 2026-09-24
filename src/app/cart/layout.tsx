import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enquiry List",
  description: "Review the items in your enquiry list.",
  // The cart is a transactional utility page, not a landing page.
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/cart",
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
