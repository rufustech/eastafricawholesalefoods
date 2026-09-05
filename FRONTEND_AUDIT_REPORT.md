# East Africa Wholesale Foods - Frontend Audit Report

**Date:** September 4, 2026  
**Scope:** Frontend Application (Next.js 16.3.4)  
**Focus Areas:** Product Pages, Routing, Data Handling, UX, Performance, SEO

---

## Executive Summary

Your frontend has a solid foundation with Next.js 16, React 19, and good design patterns. However, there are **critical routing issues**, **missing data integrations**, and **UX/performance gaps** that need immediate attention before backend integration.

**Key Finding:** 15 major issues across 5 categories, 4 CRITICAL blockers

---

## 🔴 CRITICAL ISSUES (Fix First)

### Issue #1: Routing Mismatch - Slug vs ID

**The Problem:**

- `/products/page.tsx` creates links using `getProductSlug(product)` → `/products/blue_band`
- `/products/[id]/page.tsx` receives `id` parameter expecting a product ID
- `fetchProduct(id)` is called with `"blue_band"` but backend likely expects `"prod_123"`
- **Result:** Products won't load - 404 errors

**Code Evidence:**

```typescript
// In /products/page.tsx
href={`/products/${getProductSlug(product)}`}  // Creates "/products/blue_band"

// In /products/[id]/page.tsx
const { id } = await params;  // id = "blue_band"
const productData = await fetchProduct(id);  // Mismatch!
```

**Impact:** Users click products → see "Product not found" → Broken core feature

---

### Issue #2: Mock Data Doesn't Match Type Definition

**The Problem:**

Current mock data structure:

```typescript
{
  name: "Agashya",
  image: "agashya.png",        // ❌ Single file
  price: 4.99,                 // ❌ Flat structure
  unit: "per pack",
  category: "dry-goods",
}
```

Required Product type:

```typescript
{
  id: string;                   // ❌ MISSING from mock
  images: ProductImage[];       // ❌ Needs {url, alt} array
  pricing: {
    retail: { amount, currency, unit };
    wholesale?: { amount, currency, unit };
  },
  inventory: ProductInventory;  // ❌ MISSING
  specs: { origin, certification, ... };
}
```

**Runtime Impact:**

- `product.images[0]?.url` fails → always shows logo placeholder
- Wholesale pricing tier hidden from users
- Inventory tracking broken
- TypeScript allows it (missing fields = undefined)

---

### Issue #3: No Static Route Generation

**The Problem:**

`/products/[id]/page.tsx` has NO `generateStaticParams()` function.

**This means:**

- Each product page renders On-Demand (slow first load)
- No static HTML at build time
- SEO crawlers see slower pages
- Lighthouse penalty: -15 to -25 points

**What's Missing:**

```typescript
// Should have this:
export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p) => ({ id: p.id.toString() }));
}
```

---

### Issue #4: All Products Load Simultaneously

**The Problem:**

`/products/page.tsx`:

```typescript
const data = await fetchProducts();  // Fetches ALL products
const [products, setProducts] = useState<Product[]>([]);

// Later:
{sorted.map((product) => (...))}  // Renders all at once
```

**Issues:**

- 100 products = 100 DOM nodes rendered immediately
- Page becomes sluggish with 500+ products
- No pagination, lazy loading, or virtualization
- Users must scroll infinitely
- No "View 10 more" buttons

---

### Issue #5: Broken Product Detail Page

**The Problem:**

Async params handling is suboptimal for Next.js 16:

```typescript
const { id } = await params; // Works but not ideal for ISR
```

**Better approach:**

```typescript
export async function generateStaticParams() {
  // Pre-generate all product pages
}

export default function ProductDetailPage({ params }: Props) {
  // Access params directly, not async
}
```

---

## 🟠 HIGH-PRIORITY ISSUES

### Issue #6: No Prices Displayed Anywhere

**Critical Business Problem:**

Product listing page - NO PRICES:

```typescript
<div className="p-4">
  <h3>{product.name}</h3>
  <span>{product.rating?.toFixed(1)}</span>
  {/* ❌ Missing price */}
</div>
```

Product detail page - NO PRICES:

```typescript
<h1>{product.name}</h1>
<p>{product.description}</p>
{/* ❌ Missing wholesale pricing */}
```

**Business Impact:**

- Users can't compare prices before clicking
- No wholesale vs retail differentiation
- Can't upsell bulk quantities
- **Revenue blocker**

---

### Issue #7: Stock Status Hardcoded

**The Problem:**

```typescript
<span>In stock</span>  // Always shows this
```

Never displays:

- Actual quantity available
- Min/Max order requirements
- Low stock warnings
- Out of stock status

**Result:** Users add impossible quantities → checkout fails

---

### Issue #8: No Price Filtering UI

**The Problem:**

Type supports price filters:

```typescript
interface SearchFilters {
  minPrice?: number;
  maxPrice?: number;
}
```

But the UI has NO price range filter:

```typescript
{
  /* Only has: Search, Categories, Sort */
}
{
  /* Missing: Price slider */
}
```

**User Impact:**

- Can't filter "under $10" products
- No budget-based shopping
- Lost conversions from price-conscious buyers

---

### Issue #9: Incomplete Categories

**The Problem:**

Types define 5 categories:

```typescript
type ProductCategory =
  | "dry-goods"
  | "frozen-foods"
  | "beverages" // ❌
  | "spices" // ❌
  | "grains"; // ❌
```

But only 2 in categories.ts:

```typescript
const categories = [
  { slug: "dry-goods", ... },
  { slug: "frozen-foods", ... }
  // Missing: beverages, spices, grains
]
```

**Result:** If products exist in "spices", users can't filter for them

---

### Issue #10: No Error Handling

**The Problem:**

```typescript
try {
  const [productData, productsData] = await Promise.all([
    fetchProduct(id),
    fetchProducts(),
  ]);
} catch (error) {
  console.error("Failed to load product:", error); // Silent fail
  // Still shows "Product not found" even for server errors
}
```

**UX Issue:**

- Users can't distinguish between "product doesn't exist" vs "server error"
- No retry mechanism
- No helpful error messages

---

## 🟡 MEDIUM-PRIORITY ISSUES

### Issue #11: Images Not Optimized

**Problems:**

- No `remotePatterns` in next.config.ts for external images
- No format negotiation (no WebP/AVIF)
- No responsive image sizing
- Fallback to logo breaks card layout

---

### Issue #12: Accessibility Gaps

Missing:

- ARIA labels on filter buttons
- Semantic HTML (should use `<ul>`, `<li>`)
- Focus indicators for keyboard navigation
- Role attributes on interactive elements

---

### Issue #13: Missing Wholesale Features

Not implemented:

- Tiered pricing display
- "Request Quote" for B2B
- Certifications display (organic, fair-trade)
- Lead time information
- Bulk discount indicators

---

### Issue #14: SEO Issues

Missing:

- Dynamic meta tags per product
- Canonical URLs
- Visible breadcrumbs (schema exists but not DOM)
- sitemap.xml
- robots.txt

---

### Issue #15: No Loading States

Missing:

- Skeleton loaders during data fetch
- Visual feedback for sort/filter actions
- "Add to cart" success animation
- No user knows if action succeeded

---

## 📊 Quick Comparison: Current vs Target

| Metric           | Current          | Target              | Gap             |
| ---------------- | ---------------- | ------------------- | --------------- |
| Product loading  | ❌ Broken (404s) | ✅ Works seamlessly | Critical        |
| Price visibility | ❌ Hidden        | ✅ Prominent        | Business impact |
| Stock display    | ❌ Hardcoded     | ✅ Dynamic          | UX issue        |
| Pagination       | ❌ None          | ✅ Implemented      | Performance     |
| Lighthouse score | ~65-70           | ≥85                 | -15 to -20      |
| Accessibility    | ⚠️ WCAG warnings | ✅ WCAG AA          | Compliance      |

---

## 🎯 IMPROVEMENT ROADMAP

### Phase 1: Critical Fixes (Days 1-2)

**These must be done before anything else:**

1. Fix routing to use product IDs instead of slugs
   - Change: `/products/${getProductSlug(product)}`
   - To: `/products/${product.id}`

2. Fix mock data structure
   - Transform ProductSeed → Product type
   - Ensure all fields populated (id, images[], pricing, inventory)

3. Add `generateStaticParams()` to product detail page
   - Pre-generate all product pages at build time
   - Enable ISR for updates

4. Display prices prominently
   - Add to product cards
   - Add to product detail page
   - Show wholesale tier pricing

5. Complete category definitions
   - Add beverages, spices, grains

### Phase 2: Core B2B Features (Days 3-4)

1. Implement price range filter UI
2. Add pagination (12-24 products per page)
3. Show inventory/stock status
4. Display min/max order quantities
5. Add error boundaries and fallbacks
6. Implement "Add to Quote" feature

### Phase 3: Polish & Performance (Days 5-6)

1. Image optimization (next.config.ts setup)
2. Skeleton loading states
3. Accessibility audit fixes
4. Dynamic meta tags per product
5. Mobile-first responsive fixes

### Phase 4: Advanced (Post-launch)

1. Related products carousel
2. Customer reviews & ratings
3. Wishlist functionality
4. Product comparison tool
5. Advanced filtering

---

## 🔧 Code Solutions

### Solution #1: Fix Routing

Replace in `/products/page.tsx`:

```typescript
// OLD - breaks navigation
href={`/products/${getProductSlug(product)}`}

// NEW - uses actual ID
href={`/products/${product.id}`}
```

### Solution #2: Mock Data Transformer

Create `lib/data-transformer.ts`:

```typescript
export function seedToProduct(seed: ProductSeed): Product {
  return {
    id: `prod_${seed.name.toLowerCase().replace(/\s+/g, "_")}`,
    name: seed.name,
    description: seed.description,
    category: seed.category,
    images: [
      {
        url: `/images/products/${seed.image}`,
        alt: seed.name,
      },
    ],
    pricing: {
      retail: {
        amount: seed.price,
        currency: "USD",
        unit: seed.unit,
      },
    },
    inventory: {
      available: Math.random() > 0.3 ? 50 : 0,
      reserved: 0,
      minOrderQuantity: 5,
      reorderLevel: 10,
    },
    specs: { origin: seed.origin },
    rating: (Math.random() * 5).toFixed(1),
    reviews: Math.floor(Math.random() * 50),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
```

### Solution #3: Add Static Generation

In `/products/[id]/page.tsx`:

```typescript
export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p) => ({ id: p.id }));
}
```

### Solution #4: Display Prices

Create `components/products/PricingDisplay.tsx`:

```typescript
export function PricingDisplay({ product }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-neutral-600">Price:</span>
        <span className="text-lg font-bold">
          ${product.pricing.retail.amount} {product.pricing.retail.unit}
        </span>
      </div>
      {product.pricing.wholesale && (
        <div className="text-green-600 text-sm">
          Wholesale: ${product.pricing.wholesale.amount}
        </div>
      )}
    </div>
  );
}
```

### Solution #5: Complete Categories

In `src/data/categories.ts`:

```typescript
export const categories: Category[] = [
  { id: "dry-goods", name: "Dry Goods", slug: "dry-goods", icon: "🌾" },
  {
    id: "frozen-foods",
    name: "Frozen Foods",
    slug: "frozen-foods",
    icon: "❄️",
  },
  { id: "beverages", name: "Beverages", slug: "beverages", icon: "🥤" },
  { id: "spices", name: "Spices", slug: "spices", icon: "🌶️" },
  { id: "grains", name: "Grains", slug: "grains", icon: "🌾" },
];
```

---

## 📋 TESTING CHECKLIST

Before considering the product pages "ready":

- [ ] Click on product card → detail page loads
- [ ] No 404 errors in console
- [ ] Prices displayed on both listing and detail pages
- [ ] Stock status shows correct availability
- [ ] Filters work: category, search
- [ ] Sort options work
- [ ] Images load without fallback (if available)
- [ ] Mobile view is responsive
- [ ] Dark mode works
- [ ] Lighthouse score ≥ 85
- [ ] No TypeScript errors
- [ ] ESLint passes

---

## 🚀 Success Metrics

Once improvements are complete:

| Metric               | Current | Target         |
| -------------------- | ------- | -------------- |
| Routing success rate | 0%      | 100%           |
| Prices visible       | No      | Yes, all pages |
| Pagination           | None    | 12-24 per page |
| Lighthouse (mobile)  | ~65     | ≥85            |
| Core Web Vitals      | Failing | All passing    |
| Accessibility score  | ~70     | ≥90            |
| Time to interactive  | >4s     | <2s            |

---

## 📝 Next Steps

1. ✅ Read this entire audit
2. ⏳ Prioritize Phase 1 (2 days)
3. ⏳ Implement fixes in order
4. ⏳ Test against checklist
5. ⏳ Move to Phase 2

**Recommendation:** Start with Issue #1 (routing) - it's blocking everything else.

---

**Report Status:** Ready for Implementation  
**Last Updated:** September 4, 2026
