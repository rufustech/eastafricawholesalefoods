import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "African Food Categories | Wholesale Supply Canada",
  description:
    "Browse African food categories available for wholesale supply — grains, flours, frozen foods, spices and more — for retailers, grocery stores and restaurants in Canada.",
  alternates: {
    canonical: "/categories",
  },
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
