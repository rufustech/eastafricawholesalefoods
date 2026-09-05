/**
 * Comprehensive East African Foods Categories
 * Exhaustive listing of food product categories
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
}

export const categories: Category[] = [
  // Grains & Flours
  {
    id: "cat-001",
    name: "Flours & Grains",
    slug: "flours-grains",
    description:
      "Traditional grains and flours including maize, cassava, millet, and sorghum",
    icon: "🌾",
  },
  {
    id: "cat-002",
    name: "Legumes & Beans",
    slug: "legumes-beans",
    description:
      "Dried beans, lentils, chickpeas, and other protein-rich legumes",
    icon: "🫘",
  },
  {
    id: "cat-003",
    name: "Rice & Cereals",
    slug: "rice-cereals",
    description: "Various rice varieties and breakfast cereals",
    icon: "🍚",
  },
  {
    id: "cat-004",
    name: "Dry Goods",
    slug: "dry-goods",
    description: "Dried staples including nuts, seeds, and dried fruits",
    icon: "🥜",
  },
  {
    id: "cat-005",
    name: "Spices & Seasonings",
    slug: "spices",
    description:
      "Authentic East African spice blends, curry powders, and aromatics",
    icon: "🌶️",
  },
  {
    id: "cat-006",
    name: "Condiments",
    slug: "condiments",
    description: "Hot sauces, peppers, chutneys, and seasoning pastes",
    icon: "🫑",
  },
  {
    id: "cat-007",
    name: "Cooking Oils & Fats",
    slug: "oils-fats",
    description: "Sunflower, palm, and other cooking oils",
    icon: "🍶",
  },
  {
    id: "cat-008",
    name: "Fresh Produce",
    slug: "fresh-produce",
    description: "Fresh vegetables, fruits, and produce",
    icon: "🥬",
  },
  {
    id: "cat-009",
    name: "Frozen Vegetables",
    slug: "frozen-vegetables",
    description:
      "Flash-frozen vegetables including greens, beans, and root vegetables",
    icon: "❄️",
  },
  {
    id: "cat-010",
    name: "Dairy & Spreads",
    slug: "dairy-spreads",
    description: "Butter, margarine, spreads, and dairy products",
    icon: "🧈",
  },
  {
    id: "cat-011",
    name: "Canned Dairy",
    slug: "canned-dairy",
    description: "Canned milk, coconut milk, and dairy products",
    icon: "🥛",
  },
  {
    id: "cat-012",
    name: "Canned Fish",
    slug: "canned-fish",
    description: "Sardines, mackerel, and other canned seafood",
    icon: "🐟",
  },
  {
    id: "cat-013",
    name: "Canned Legumes",
    slug: "canned-legumes",
    description: "Pre-cooked beans, lentils, and ready-to-eat legumes",
    icon: "🫕",
  },
  {
    id: "cat-014",
    name: "Tea & Coffee",
    slug: "beverages",
    description: "Premium tea blends, coffee, and traditional brews",
    icon: "☕",
  },
  {
    id: "cat-015",
    name: "Soft Drinks",
    slug: "soft-drinks",
    description: "Sodas, juices, and other bottled beverages",
    icon: "🥤",
  },
  {
    id: "cat-016",
    name: "Baking Mixes",
    slug: "baking-mixes",
    description: "Pre-made mixes for mandazi, chapati, and traditional breads",
    icon: "🥐",
  },
  {
    id: "cat-017",
    name: "Baking Essentials",
    slug: "baking-essentials",
    description: "Yeast, baking powder, sugar, and baking ingredients",
    icon: "🍬",
  },
  {
    id: "cat-018",
    name: "Baby Foods & Formula",
    slug: "baby-foods",
    description: "Infant nutrition, cereals, and baby food",
    icon: "👶",
  },
  {
    id: "cat-019",
    name: "Specialty Items",
    slug: "specialty",
    description: "Specialty imported and artisanal food products",
    icon: "⭐",
  },
  {
    id: "cat-020",
    name: "Whole Foods",
    slug: "whole-foods",
    description: "Organic, unprocessed, and whole grain products",
    icon: "🌱",
  },
];

/**
 * Get category by slug for filtering
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

/**
 * Get all category slugs for validation
 */
export function getAllCategorySlugs(): string[] {
  return categories.map((cat) => cat.slug);
}
