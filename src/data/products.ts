import { Product, ProductCategory } from "@/types/product";

type ProductSeed = {
  name: string;
  image: string;
  category: ProductCategory;
  description: string;
  price: number;
  unit: string;
  origin: string;
};

const catalog: ProductSeed[] = [
  { name: "Agashya", image: "agashya.jpg", category: "dry-goods", description: "Authentic East African pantry favourite for everyday meals.", price: 4.99, unit: "per pack", origin: "East Africa" },
  { name: "Akabanga Chilli Oil", image: "akabanga_chilli_oil.jpg", category: "spices", description: "A vibrant chilli oil that brings depth and heat to every dish.", price: 6.99, unit: "per bottle", origin: "Rwanda" },
  { name: "Ala Damiano Cassava Leaves", image: "ala_damiano_cassava_leaves.jpg", category: "frozen-foods", description: "Carefully prepared cassava leaves, ready for traditional recipes.", price: 5.99, unit: "per pack", origin: "East Africa" },
  { name: "Bananas", image: "bananas.jpg", category: "dry-goods", description: "Sweet, versatile bananas selected for quality and freshness.", price: 3.99, unit: "per bunch", origin: "East Africa" },
  { name: "Blue Band", image: "blue_band.jpg", category: "dry-goods", description: "A smooth everyday spread for breakfast, baking, and cooking.", price: 4.49, unit: "per tub", origin: "East Africa" },
  { name: "Cassava Flour", image: "cassava_flour.jpg", category: "grains", description: "Fine cassava flour for baking, thickening, and traditional dishes.", price: 3.49, unit: "per kg", origin: "East Africa" },
  { name: "Curry Powder", image: "curry_powder.jpg", category: "spices", description: "A balanced aromatic blend for curries, stews, and marinades.", price: 5.49, unit: "per pack", origin: "East Africa" },
  { name: "Fanta", image: "fanta.jpg", category: "beverages", description: "Bright, refreshing fruit soda for shops, restaurants, and events.", price: 1.49, unit: "per bottle", origin: "East Africa" },
  { name: "Green Beans", image: "greenbeans.jpg", category: "frozen-foods", description: "Crisp green beans prepared for quick, convenient cooking.", price: 4.99, unit: "per pack", origin: "East Africa" },
  { name: "Kinazi Cassava Flour", image: "kinazi_cassava_flour.jpg", category: "grains", description: "Quality cassava flour with a smooth texture for home and professional kitchens.", price: 3.99, unit: "per kg", origin: "Rwanda" },
  { name: "Kisubi Tea", image: "kisubi_tea.jpg", category: "beverages", description: "Rich, comforting tea selected for a full-bodied daily cup.", price: 7.99, unit: "per pack", origin: "East Africa" },
  { name: "Maganjo Maize Flour", image: "maganjo_maize_flour.jpg", category: "grains", description: "Fine maize flour for ugali, porridge, baking, and family meals.", price: 2.99, unit: "per kg", origin: "Uganda" },
  { name: "Millet Karo", image: "millet_karo.jpg", category: "grains", description: "Wholesome millet staple with a naturally nutty flavour.", price: 4.49, unit: "per pack", origin: "East Africa" },
  { name: "Mochaberry Coffee", image: "mochaberry_coffee.jpg", category: "beverages", description: "A fragrant coffee blend made for a rich, smooth brew.", price: 12.99, unit: "per pack", origin: "East Africa" },
  { name: "Nestle Cerelac", image: "nestle_cerelac.jpg", category: "dry-goods", description: "Convenient nutrition for growing families.", price: 8.99, unit: "per box", origin: "East Africa" },
  { name: "Nestle Nido", image: "nestle_nido.jpg", category: "dry-goods", description: "Trusted milk powder for households, cafés, and food service.", price: 14.99, unit: "per tin", origin: "East Africa" },
  { name: "Royco Mchuzi Mix", image: "royco_mchuzi_mix.jpg", category: "spices", description: "Savory seasoning mix for richer stews, sauces, and everyday cooking.", price: 3.99, unit: "per pack", origin: "East Africa" },
  { name: "Salsa", image: "salsa.jpg", category: "spices", description: "Fresh-tasting salsa for snacks, sides, and quick service.", price: 5.99, unit: "per jar", origin: "East Africa" },
  { name: "Sosoma", image: "sosoma1.jpg", category: "grains", description: "A dependable East African staple for everyday cooking.", price: 4.49, unit: "per pack", origin: "East Africa" },
  { name: "Tilapia Fish", image: "talapia_fish.jpg", category: "frozen-foods", description: "Quality tilapia prepared for convenient cooking and food service.", price: 14.99, unit: "per kg", origin: "East Africa" },
  { name: "Yellow Corn", image: "yellow_corn.jpg", category: "grains", description: "Golden corn selected for consistent quality and flavour.", price: 3.49, unit: "per kg", origin: "East Africa" },
];

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}

export const products: Product[] = catalog.map((item, index) => ({
  id: slugify(item.name),
  name: item.name,
  description: item.description,
  category: item.category,
  images: [{ url: `/${item.image}`, alt: item.name }],
  pricing: {
    retail: { amount: item.price, currency: "USD", unit: item.unit },
    wholesale: { amount: Number((item.price * 0.82).toFixed(2)), currency: "USD", unit: item.unit },
  },
  inventory: { available: 200 + index * 75, reserved: 0, minOrderQuantity: 1, maxOrderQuantity: 5000, reorderLevel: 50 },
  specs: { origin: item.origin, expiryDate: "2026-12-31", certification: ["quality checked"], storageCondition: "Store in a cool, dry place" },
  rating: 4.5 + (index % 5) / 10,
  reviews: 24 + index * 13,
  createdAt: `2024-${String((index % 9) + 1).padStart(2, "0")}-15`,
  updatedAt: "2024-09-01",
}));
