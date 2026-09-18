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
  // Flours & Grains
  {
    name: "Cassava Flour",
    image: "Cassava_Flour.png",
    category: "flours-grains",
    description:
      "Fine cassava flour for baking, thickening, and traditional dishes. Perfect for everyday cooking.",
    price: 3.49,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Corn Meal 10kg",
    image: "Corn_Meal_10kg.jpg",
    category: "flours-grains",
    description:
      "Premium quality corn meal in bulk. Ideal for ugali, porridge, and baking needs.",
    price: 12.99,
    unit: "per 10kg",
    origin: "East Africa",
  },
  {
    name: "Corn Meal 2kg",
    image: "Corn_Meal_2kg.jpg",
    category: "flours-grains",
    description:
      "High-quality corn meal for family cooking and food service preparation.",
    price: 3.49,
    unit: "per 2kg",
    origin: "East Africa",
  },
  {
    name: "Corn Meal 5kg",
    image: "Corn_Meal_5kg.jpg",
    category: "flours-grains",
    description:
      "Convenient 5kg portion of nutritious corn meal for regular household use.",
    price: 7.49,
    unit: "per 5kg",
    origin: "East Africa",
  },
  {
    name: "Fermented Sorghum Flour",
    image: "Fermented_Sorghum_Flour.jpg",
    category: "flours-grains",
    description:
      "Traditional fermented sorghum flour with enhanced nutritional value and digestibility.",
    price: 4.99,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Maize Flour 10kg",
    image: "Maize_Flour_10kg.jpg",
    category: "flours-grains",
    description:
      "Bulk maize flour for professional kitchens and large families. Fine, consistent texture.",
    price: 11.99,
    unit: "per 10kg",
    origin: "East Africa",
  },
  {
    name: "Maize Flour 5kg",
    image: "Maize_Flour_5kg.jpg",
    category: "flours-grains",
    description:
      "Quality maize flour for ugali, porridge, and traditional meals. Versatile staple.",
    price: 6.99,
    unit: "per 5kg",
    origin: "East Africa",
  },
  {
    name: "Maize Flour 2kg",
    image: "Maize_Flower_2kg.jpg",
    category: "flours-grains",
    description:
      "Small pack maize flour perfect for home baking and everyday cooking needs.",
    price: 3.29,
    unit: "per 2kg",
    origin: "East Africa",
  },
  {
    name: "Millet Flour",
    image: "Millet_Flour.jpg",
    category: "flours-grains",
    description:
      "Wholesome millet flour with naturally nutty flavor. Gluten-free alternative grain.",
    price: 4.49,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Mixed Porridge Flour",
    image: "Mixed_Porridge_Flour.jpg",
    category: "flours-grains",
    description:
      "Multi-grain porridge flour blend for nutritious breakfast and family meals.",
    price: 4.99,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Red Sorghum Flour",
    image: "Red_Sorghum_Flour.jpg",
    category: "flours-grains",
    description:
      "Rich red sorghum flour packed with nutrients and traditional flavor for authentic recipes.",
    price: 5.49,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Roasted Peanut Flour",
    image: "Roasted_Peanut_Flour.jpg",
    category: "flours-grains",
    description:
      "Delicious roasted peanut flour for baking, sauces, and protein-rich dishes.",
    price: 5.99,
    unit: "per kg",
    origin: "East Africa",
  },

  // Legumes & Beans
  {
    name: "Peanut Beans",
    image: "Peanut_Beans.jpg",
    category: "legumes-beans",
    description:
      "Protein-rich peanut beans for stews, curries, and traditional legume dishes.",
    price: 4.99,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Red Beans",
    image: "Red_Beans.jpg",
    category: "legumes-beans",
    description:
      "Premium red beans loaded with fiber and nutrients for hearty family meals.",
    price: 5.49,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Yellow Beans 10kg",
    image: "Yellow_Beans_10kg.jpg",
    category: "legumes-beans",
    description:
      "Bulk yellow beans for restaurants and large-scale cooking operations.",
    price: 24.99,
    unit: "per 10kg",
    origin: "East Africa",
  },
  {
    name: "Yellow Beans 2kg",
    image: "Yellow_Beans_2kg.jpg",
    category: "legumes-beans",
    description:
      "Quality yellow beans in convenient 2kg pack for family cooking.",
    price: 5.99,
    unit: "per 2kg",
    origin: "East Africa",
  },
  {
    name: "Yellow Beans 5kg",
    image: "Yellow_Beans_5kg.jpg",
    category: "legumes-beans",
    description:
      "Mid-sized pack of yellow beans for regular household and food business use.",
    price: 13.99,
    unit: "per 5kg",
    origin: "East Africa",
  },

  // Rice & Cereals
  {
    name: "Tanzania Rice 10kg",
    image: "Tanzania_Rice_10kg.jpg",
    category: "rice-cereals",
    description:
      "Premium Tanzanian rice in bulk. Perfect for restaurants and large families.",
    price: 19.99,
    unit: "per 10kg",
    origin: "Tanzania",
  },
  {
    name: "Tanzania Rice 2kg",
    image: "Tanzania_Rice_2kg.jpg",
    category: "rice-cereals",
    description:
      "High-quality Tanzanian rice for everyday meals and special occasions.",
    price: 4.99,
    unit: "per 2kg",
    origin: "Tanzania",
  },
  {
    name: "Tanzania Rice 5kg",
    image: "Tanzania_Rice_5kg.jpg",
    category: "rice-cereals",
    description:
      "Mid-sized pack of authentic Tanzanian rice with excellent taste and texture.",
    price: 11.99,
    unit: "per 5kg",
    origin: "Tanzania",
  },

  // Dry Foods & Nuts
  {
    name: "Roasted Organic Peanuts",
    image: "Roasted_Organic_Peanuts.jpg",
    category: "dry-goods",
    description:
      "Delicious roasted organic peanuts perfect for snacking and cooking.",
    price: 6.99,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Peanut Flour",
    image: "Peanut_Flour.jpg",
    category: "dry-goods",
    description:
      "Nutrient-rich peanut flour for sauces, baking, and protein supplementation.",
    price: 5.49,
    unit: "per kg",
    origin: "East Africa",
  },

  // Spices & Seasonings
  {
    name: "African Black Salt",
    image: "African_Black_Salt.jpg",
    category: "spices",
    description:
      "Traditional African black salt with rich mineral content for authentic seasoning.",
    price: 4.99,
    unit: "per 500g",
    origin: "East Africa",
  },
  {
    name: "Green Clay",
    image: "Green_Clay.jpg",
    category: "spices",
    description:
      "Natural green clay for wellness, beauty, and traditional health practices.",
    price: 6.99,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Stinging Nettle",
    image: "Stinging_Nettle.jpg",
    category: "spices",
    description:
      "Dried stinging nettle leaves for herbal tea and traditional medicinal use.",
    price: 7.99,
    unit: "per 500g",
    origin: "East Africa",
  },
  {
    name: "Activated Charcoal Powder",
    image: "Activated_Charcoal_Powder.jpg",
    category: "spices",
    description:
      "Pure activated charcoal powder for wellness, detoxification, and health benefits.",
    price: 8.99,
    unit: "per 500g",
    origin: "East Africa",
  },

  // Cooking Oils & Fats
  {
    name: "African Palm Oil 3L",
    image: "African_Palm_Oil_3L.jpg",
    category: "oils-fats",
    description:
      "Rich, authentic African palm oil in convenient 3L container for cooking.",
    price: 8.99,
    unit: "per 3L",
    origin: "East Africa",
  },
  {
    name: "African Palm Oil 3L Premium",
    image: "African_Palm_Oil_3L_2.jpg",
    category: "oils-fats",
    description:
      "Premium quality African palm oil for traditional and contemporary cuisine.",
    price: 9.99,
    unit: "per 3L",
    origin: "East Africa",
  },
  {
    name: "African Palm Oil 5L",
    image: "African_Palm_Oil_5L.jpg",
    category: "oils-fats",
    description:
      "Bulk African palm oil in 5L size for restaurants and food businesses.",
    price: 13.99,
    unit: "per 5L",
    origin: "East Africa",
  },
  {
    name: "African Palm Oil 5L Plus",
    image: "African_Palm_Oil_5L_2.jpg",
    category: "oils-fats",
    description:
      "Extra virgin African palm oil for demanding culinary and commercial applications.",
    price: 15.99,
    unit: "per 5L",
    origin: "East Africa",
  },

  // Frozen Vegetables
  {
    name: "Frozen Cassava",
    image: "Frozen_Cassava.jpg",
    category: "frozen-vegetables",
    description:
      "Flash-frozen cassava prepared and ready for convenient cooking.",
    price: 5.99,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Frozen Chopped Pumpkin",
    image: "Frozen_Chopped_Pumpkin.jpg",
    category: "frozen-vegetables",
    description:
      "Pre-chopped frozen pumpkin for soups, stews, and traditional vegetable dishes.",
    price: 4.99,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Frozen Fresh Beans",
    image: "Frozen_Fresh_Beans.jpg",
    category: "frozen-vegetables",
    description:
      "Crisp frozen beans packed with nutrients for quick and easy meal preparation.",
    price: 5.49,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Frozen Fresh Cooked Maize",
    image: "Frozen_Fresh_Cooked_Maize.jpg",
    category: "frozen-vegetables",
    description:
      "Pre-cooked frozen maize ready to heat and serve for convenience.",
    price: 4.49,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Frozen Green Cassava Leaves",
    image: "Frozen_Green_Cassava_Leaves.jpg",
    category: "frozen-vegetables",
    description:
      "Nutritious frozen cassava leaves for authentic African cooking and stews.",
    price: 6.49,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Frozen Green Peas",
    image: "Frozen_Green_Peas.jpg",
    category: "frozen-vegetables",
    description:
      "Tender frozen peas perfect for sides, soups, and mixed vegetable dishes.",
    price: 4.99,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Frozen Peeled Fresh Banana",
    image: "Frozen_Peeled_Fresh_Banana.jpg",
    category: "frozen-vegetables",
    description:
      "Pre-peeled frozen bananas for smoothies, cooking, and convenient use.",
    price: 5.99,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Frozen Sweet Potato",
    image: "Frozen_Sweet_Potato.jpg",
    category: "frozen-vegetables",
    description:
      "Nutritious frozen sweet potato ready for quick preparation in any meal.",
    price: 5.49,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Frozen Yams",
    image: "Frozen_Yams.jpg",
    category: "frozen-vegetables",
    description:
      "Quality frozen yams prepared and ready for traditional and modern recipes.",
    price: 6.99,
    unit: "per kg",
    origin: "East Africa",
  },

  // Canned Fish & Seafood
  {
    name: "Salted Tilapia 1kg",
    image: "Salted_Tilapia_1kg.jpg",
    category: "frozen-canned-fish",
    description:
      "Premium salted tilapia in small pack for family meals and food preparation.",
    price: 8.99,
    unit: "per 1kg",
    origin: "East Africa",
  },
  {
    name: "Salted Tilapia 10kg",
    image: "Salted_Tilapia_10kg.jpg",
    category: "frozen-canned-fish",
    description:
      "Bulk salted tilapia for restaurants, food businesses, and large-scale cooking.",
    price: 59.99,
    unit: "per 10kg",
    origin: "East Africa",
  },
  {
    name: "Smoked Nile Perch",
    image: "Smoked_Nile_Perch.jpg",
    category: "frozen-canned-fish",
    description:
      "Delicious smoked Nile perch with authentic flavor for traditional dishes.",
    price: 14.99,
    unit: "per kg",
    origin: "East Africa",
  },
  {
    name: "Smoked Tilapia 10kg",
    image: "Smoked_Tilapia_10kg.jpg",
    category: "frozen-canned-fish",
    description:
      "Bulk smoked tilapia for professional kitchens and wholesale operations.",
    price: 64.99,
    unit: "per 10kg",
    origin: "East Africa",
  },
  {
    name: "Sun Dried Anchovies",
    image: "Sun_Dried_Anchovies.jpg",
    category: "frozen-canned-fish",
    description:
      "Traditional sun-dried anchovies for authentic flavoring and nutritious meals.",
    price: 9.99,
    unit: "per 500g",
    origin: "East Africa",
  },

  // Dairy & Spreads
  {
    name: "Tasty Peanut Butter",
    image: "Tasty_Peanut_Butter.jpg",
    category: "dairy-spreads",
    description:
      "Creamy peanut butter for breakfast, snacking, and culinary applications.",
    price: 6.99,
    unit: "per 500g",
    origin: "East Africa",
  },

  // Beverages & Drinks
  {
    name: "Bee Honey",
    image: "Bee_Honey.jpg",
    category: "beverages",
    description:
      "Pure natural bee honey for health, sweetening, and traditional remedies.",
    price: 12.99,
    unit: "per 500g",
    origin: "East Africa",
  },
  {
    name: "Concentrated Passion Juice",
    image: "Concerntrated_Passion_Juice.jpg",
    category: "beverages",
    description:
      "Rich concentrated passion fruit juice for refreshing drinks and recipes.",
    price: 7.99,
    unit: "per 1L",
    origin: "East Africa",
  },

  // Baking & Specialty Items
  {
    name: "Chapati",
    image: "Chapati.jpg",
    category: "baking-mixes",
    description:
      "Traditional chapati bread ready to cook for quick family meals.",
    price: 3.99,
    unit: "per pack",
    origin: "East Africa",
  },
  {
    name: "Soy Bean Flour",
    image: "Soy_Bean_Flower.jpg",
    category: "specialty",
    description:
      "Nutritious soy bean flour for baking, cooking, and protein enrichment.",
    price: 5.49,
    unit: "per kg",
    origin: "East Africa",
  },
];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export const products: Product[] = catalog.map((item, index) => ({
  id: slugify(item.name),
  slug: slugify(item.name),
  name: item.name,
  description: item.description,
  category: item.category,
  images: [{ url: `/${item.image}`, alt: item.name }],
  pricing: {
    retail: { amount: item.price, currency: "USD", unit: item.unit },
    wholesale: {
      amount: Number((item.price * 0.82).toFixed(2)),
      currency: "USD",
      unit: item.unit,
    },
  },
  inventory: {
    available: 200 + index * 75,
    reserved: 0,
    minOrderQuantity: 1,
    maxOrderQuantity: 5000,
    reorderLevel: 50,
  },
  specs: {
    origin: item.origin,
    expiryDate: "2026-12-31",
    certification: ["quality checked"],
    storageCondition: "Store in a cool, dry place",
  },
  rating: 4.5 + (index % 5) / 10,
  reviews: 24 + index * 13,
  createdAt: `2024-${String((index % 9) + 1).padStart(2, "0")}-15`,
  updatedAt: "2024-09-01",
}));
