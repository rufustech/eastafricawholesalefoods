/**
 * Product Categories Data
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
}

export const categories: Category[] = [
  {
    id: "cat-dry-goods",
    name: "Dry Goods & Grains",
    slug: "dry-goods",
    description:
      "High-quality rice, beans, flour, and cereals sourced from across East Africa",
    icon: "🌾",
  },
  {
    id: "cat-frozen",
    name: "Frozen Products",
    slug: "frozen-foods",
    description: "Premium frozen vegetables, meats, and prepared foods",
    icon: "❄️",
  },
];
