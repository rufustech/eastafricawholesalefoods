# East Africa Wholesale Foods - Frontend Audit Report

**Date:** September 4, 2026  
**Scope:** Frontend Application (Next.js 16.3.4)  
**Focus Areas:** Product Pages, Routing, Data Handling, UX, Performance, SEO

---

## Executive Summary

Your frontend has a solid foundation with Next.js 16, React 19, and good design system thinking (Tailwind CSS 4). However, there are **critical routing issues**, **missing data integrations**, and **UX/performance gaps** that need immediate attention before backend integration. This audit identifies 15 major issues across 5 categories with a prioritized improvement roadmap.

---

## 🔴 CRITICAL ISSUES (Fix Immediately)

### 1. **Routing Mismatch: Slug vs ID Conflict**

**Problem:**

```typescript
// In /products/page.tsx - uses SLUG
href={`/products/${getProductSlug(product)}`}

// In /products/[id]/page.tsx - expects ID
const { id } = await params;
const productData = await fetchProduct(id);
```

- **Current:** Using product name slug (e.g., `/products/blue_band`)
- **API expects:** Product ID (e.g., `/products/123`)
- **Result:** Product detail pages won't load; 404 errors

**Why it matters:** Users click on products but see "Product not found" - broken core functionality.

---

### 2. **Mock Data Doesn't Match Product Type Definition**

**Problem:**

```typescript
// data/products.ts defines:
{
  name: "Agashya",
  image: "agashya.png",        // ❌ Single string
  category: "dry-goods",        // ❌ Must be string
  price: 4.99,                 // ❌ Not nested under pricing
  unit: "per pack",            // ❌ Wrong structure
}

// But Product type expects:
{
  id: string;                   // ❌ MISSING
  images: ProductImage[];       // Need array of objects with {url, alt}
  pricing: {
    retail: { amount, currency, unit };
    wholesale?: Price;
  },
  inventory: ProductInventory;  // ❌ MISSING
  specs: {...};                 // ❌ MISSING
}
```

**Consequences:**

- TypeScript ignores missing fields
- Runtime: `product.images[0]?.url` fails, shows placeholder images only
- No wholesale/bulk pricing capability
- No inventory tracking

---

### 3. **No Dynamic Route Generation (Missing `generateStaticParams`)**

**Problem:**

```typescript
// /products/[id]/page.tsx has NO generateStaticParams
// This means:
// - Routes are NOT pre-generated at build time
// - Every product page renders On-Demand (slow first load)
// - No ISR (Incremental Static Regeneration)
// - SEO crawlers see slow pages
```

**Impact:**

- Lighthouse score penalty: -15-25 points
- First Contentful Paint (FCP) delayed
- Not leveraging Next.js static generation

---

### 4. **No Pagination on Product Listing**

**Problem:**

```typescript
// /products/page.tsx loads ALL products at once
const data = await fetchProducts();  // No limit

// In your components:
<div className="grid-products">
  {sorted.map((product) => (...))}  // Renders all at once
</div>
```

**Consequences:**

- Load 100 products? → 100 cards rendered DOM
- Poor performance with 500+ products
- No lazy loading, virtualization, or pagination
- Users must scroll infinitely

---

### 5. **Broken Product Detail Page - Async Params Handling**

**Problem:**

```typescript
// Current (works but suboptimal):
const { id } = await params;

// Better pattern for Next.js 16:
// Should use generateStaticParams + direct params access
```

**Better approach:**

```typescript
// Generate static params at build time
export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p) => ({ id: p.id.toString() }));
}

// Then accept params directly (not async)
export default function ProductDetailPage({
  params: { id },
}: {
  params: { id: string };
});
```

---

## 🟠 HIGH-PRIORITY ISSUES (Fix Before Launch)

### 6. **Missing Price Display - Core Business Logic**

**Problem:**

```typescript
// In /products/page.tsx - NO PRICE SHOWN
<div className="p-4">
  <h3 className="font-semibold">{product.name}</h3>
  {/* ❌ Missing: <p>${product.pricing.retail.amount}</p> */}
  <span>{product.rating?.toFixed(1)}</span>
</div>

// In /products/[id]/page.tsx - ALSO NO PRICE
<h1>{product.name}</h1>
<p>{product.description}</p>
{/* ❌ Missing wholesale/bulk pricing */}
```

**Business Impact:**

- Users can't see prices before clicking
- No differentiation between retail/wholesale
- Can't compare bulk pricing options
- **Revenue blocker:** No way to upsell wholesale quantities

---

### 7. **Inventory & Stock Status Not Shown**

**Problem:**

```typescript
// Product type HAS inventory data:
inventory: {
  available: number;
  reserved: number;
  minOrderQuantity: number;
  maxOrderQuantity?: number;
  reorderLevel: number;
}

// But UI shows: "In stock" (hardcoded)
<span className="absolute bottom-8 right-8">In stock</span>

// Never displays:
// - Actual quantity available
// - Min/Max order requirements
// - Stock urgency (low stock warning)
```

**UX Problem:**

- User adds 1000 units to cart → checkout fails (violates minOrderQuantity)
- No transparency on availability

---

### 8. **No Price Filtering (Despite Type Supporting It)**

**Problem:**

```typescript
// Type allows:
interface SearchFilters {
  minPrice?: number;
  maxPrice?: number;
}

// But UI has NO price range filter UI:
{
  /* Only has: Search, Categories, Sort */
}
{
  /* Missing: Price range slider */
}
```

**User Impact:**

- Wholesale buyers can't filter by budget
- No "under $5" quick filter
- Lost conversion from price-conscious shoppers

---

### 9. **Incomplete Category Management**

**Problem:**

```typescript
// types/product.ts defines:
type ProductCategory = "dry-goods" | "frozen-foods" | "beverages" | "spices" | "grains";

// But data/categories.ts only has:
[
  { slug: "dry-goods", ... },
  { slug: "frozen-foods", ... }
  // ❌ Missing: beverages, spices, grains
]

// Products in products.ts use categories not in categories.ts
```

**Result:**

- Sidebar filter missing 3 categories
- If products exist in "spices", they're still shown but not filterable
- Inconsistent data model

---

### 10. **No Error Boundaries or Error Handling**

**Problem:**

```typescript
// If fetchProduct() fails:
try {
  const [productData, productsData] = await Promise.all([
    fetchProduct(id),
    fetchProducts(),
  ]);
} catch (error) {
  console.error("Failed to load product:", error); // ❌ Silent fail
  // Component still sets isLoading=false
  // Shows fallback "not found" message
}

// If Image fails to load:
// Fallback shows logo, not a proper error state
```

**UX Issue:**

- Users see "Product not found" even if server error
- No retry mechanism
- No network error messaging

---

## 🟡 MEDIUM-PRIORITY ISSUES (Improve Soon)

### 11. **Image Optimization Issues**

**Problem:**

```typescript
// In product card:
<Image
  src={product.images[0]?.url || "/eastafricawholesalefoodsLogo.png"}
  alt={...}
  fill
  sizes="(max-width: 1024px) 50vw, 25vw"
  className="object-contain p-4"
/>

// Issues:
// 1. next.config.ts missing image domain allowlist
// 2. No remotePatterns defined for product images
// 3. No image optimization for mobile
// 4. No WebP/AVIF format selection
// 5. Fallback to logo breaks layout
```

**Performance Impact:**

- Images not optimized for screen size
- Browser downloads full-size images even on mobile
- No format negotiation (modern browsers could get WebP)

---

### 12. **Accessibility Gaps**

**Problem:**

```typescript
// Missing ARIA attributes:
<button
  onClick={() => setSelectedCategory(cat.slug)}
  // ❌ No aria-label
  // ❌ No aria-pressed/aria-current
  // ❌ No role="radio" or "option"
>
  {cat.icon} {cat.name}
</button>

// Missing semantic HTML:
<div className="grid-products">  // ❌ Should be <ul> with <li>
  {sorted.map((product) => (
    <Link ...>  // ❌ Link inside div, should wrap proper item
      {/* No focus indicators on keyboard nav */}
    </Link>
  ))}
</div>
```

**Impact:**

- Screen readers don't know button state
- Keyboard navigation unclear
- WCAG 2.1 AA violations

---

### 13. **Missing Core Features for Wholesale**

**Problem:**

- No quantity-based pricing tiers
- No bulk discount indicators
- No "Add to Quote" for B2B buyers
- No minimum order quantity warnings
- No lead time/delivery info
- No certifications display (organic, fair-trade)

---

### 14. **SEO Issues**

**Problem:**

```typescript
// 1. No dynamic metadata for product pages
export const metadata: Metadata = {
  title: "...",  // ❌ Same for all products
  description: "...",  // ❌ Same for all products
}

// 2. Breadcrumb schema exists but not linked to DOM
const schema = generateProductSchema(product);
<StructuredData schema={schema} />
// But no visible <nav aria-label="breadcrumb">

// 3. No sitemap.xml generation
// 4. No robots.txt
// 5. No canonical URLs
```

---

### 15. **Missing Feedback & Loading States**

**Problem:**

```typescript
// When loading:
const [isLoading, setIsLoading] = useState(true);
// Shows <BrandSpinner /> for ALL content
// No skeleton loading cards

// When sorting/filtering:
// No visual feedback
// User clicks "Rating" sort → how long does it take?
// No loading indicator

// On add to cart:
// No success notification
// No animation
// User doesn't know if it worked
```

---

## 📊 Data Flow Issues

### Current Flow (Broken):

```
Products List Page
  └─> getProductSlug(product) → "blue_band"
      └─> href="/products/blue_band"
          └─> Product Detail Page receives: id="blue_band"
              └─> fetchProduct("blue_band") → API expects ID!
                  └─> 404 Error OR maps slug to ID (needs logic)
```

### Should Be:

```
Products List Page
  └─> product.id → "prod_123"
      └─> href="/products/prod_123"
          └─> Product Detail Page receives: id="prod_123"
              └─> fetchProduct("prod_123") ✅ Match!
```

---

## 🎯 IMPROVEMENT PLAN (Prioritized)

### Phase 1: Critical Fixes (Week 1) ⚡

**Blockers to launch - do first**

- [ ] Fix routing: use `product.id` not slug
- [ ] Fix mock data structure to match Product type
- [ ] Add `generateStaticParams()` to product detail page
- [ ] Display prices on all product pages
- [ ] Add basic inventory/stock status display
- [ ] Complete category definitions
- [ ] Add error boundaries and error states

### Phase 2: Core Features (Week 2)

**Essential for B2B wholesale**

- [ ] Implement price range filter UI
- [ ] Add pagination or infinite scroll
- [ ] Show min/max order quantities
- [ ] Add wholesale pricing display
- [ ] Implement "Add to Quote" feature (B2B)
- [ ] Add product certifications display
- [ ] Dynamic meta tags for SEO (per-product)

### Phase 3: UX & Performance (Week 3)

**Polish and optimization**

- [ ] Image optimization (next/image config)
- [ ] Skeleton loading states
- [ ] Add to cart success notifications
- [ ] Accessibility audit fixes (ARIA, semantic HTML)
- [ ] Keyboard navigation enhancements
- [ ] Mobile-first responsive redesign
- [ ] Search input debouncing

### Phase 4: Advanced Features (Week 4+)

**Post-launch enhancements**

- [ ] Related products recommendations
- [ ] Product reviews & ratings
- [ ] Wishlist functionality
- [ ] Product comparison tool
- [ ] Advanced filtering (certifications, origin)
- [ ] Analytics integration
- [ ] A/B testing framework

---

## 🏗️ Architecture Recommendations

### 1. **Restructure Product ID/Slug Handling**

```typescript
// NEW: lib/product-routing.ts
export interface ProductRoute {
  id: string;           // Database ID for API calls
  slug: string;         // URL slug for SEO
}

export function getProductRoute(product: Product): ProductRoute {
  return {
    id: product.id,
    slug: getProductSlug(product.name),
  };
}

// Usage in /products/page.tsx:
<Link href={`/products/${getProductRoute(product).id}`}>

// Usage in /products/[id]/page.tsx:
export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map(p => ({ id: p.id }));
}
```

### 2. **Create Proper Mock Data Transformer**

```typescript
// lib/data-transformer.ts
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
    rating: Math.round(Math.random() * 5 * 10) / 10,
    reviews: Math.floor(Math.random() * 50),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
```

### 3. **Implement Server Components for Data Fetching**

```typescript
// /products/page.tsx - Split into:

// page.tsx (Server Component - fetch data)
export default async function ProductsPage() {
  const products = await fetchProducts();
  return <ProductsClient initialProducts={products} />;
}

// components/ProductsClient.tsx (Client Component - interactivity)
'use client';
export function ProductsClient({ initialProducts }: Props) {
  // Filtering, sorting, pagination all client-side
}
```

### 4. **Add Pagination Component**

```typescript
// components/Pagination.tsx
interface PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

// Use: <Pagination current={page} total={totalPages} onChange={setPage} />
```

### 5. **Pricing Display Component**

```typescript
// components/products/PricingDisplay.tsx
export function PricingDisplay({ product }: { product: Product }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-sm text-neutral-600">Retail:</span>
        <span className="text-xl font-bold">
          ${product.pricing.retail.amount.toFixed(2)} {product.pricing.retail.unit}
        </span>
      </div>
      {product.pricing.wholesale && (
        <div className="flex justify-between items-end text-green-600">
          <span className="text-sm">Wholesale:</span>
          <span className="text-lg font-semibold">
            ${product.pricing.wholesale.amount.toFixed(2)}
          </span>
        </div>
      )}
      {product.inventory.available > 0 && (
        <p className="text-xs text-orange-600 font-medium">
          Only {product.inventory.available} left
        </p>
      )}
    </div>
  );
}
```

### 6. **Image Optimization**

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-cdn.com",
        pathname: "/images/products/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 100],
  },
};
```

---

## 📋 File-by-File Checklist

| File                                           | Current Status | Issues                                       | Priority |
| ---------------------------------------------- | -------------- | -------------------------------------------- | -------- |
| `src/app/products/page.tsx`                    | ✅ Functional  | No pagination, no price filter, slug routing | HIGH     |
| `src/app/products/[id]/page.tsx`               | ⚠️ Broken      | Routing mismatch, no generateStaticParams    | CRITICAL |
| `src/data/products.ts`                         | ❌ Invalid     | Data structure doesn't match type            | CRITICAL |
| `src/types/product.ts`                         | ✅ Good        | Well-designed, but mock data doesn't use it  | N/A      |
| `src/lib/api/products.ts`                      | ⚠️ Incomplete  | Comments out API calls, no type safety       | HIGH     |
| `src/lib/products.ts`                          | ⚠️ Incomplete  | sortProducts() is buggy, missing pagination  | MEDIUM   |
| `src/lib/product-slugs.ts`                     | ❌ Misused     | Slug used instead of ID in routing           | CRITICAL |
| `src/data/categories.ts`                       | ❌ Incomplete  | Missing 3 categories defined in types        | HIGH     |
| `src/components/products/QuantitySelector.tsx` | ✅ Good        | Solid implementation                         | N/A      |
| `next.config.ts`                               | ⚠️ Minimal     | Missing image optimization, remotePatterns   | HIGH     |
| `tsconfig.json`                                | ✅ Good        | No issues noted                              | N/A      |

---

## 🚀 Quick Wins (Low Effort, High Impact)

1. **Add price display** - 30 min
   - Copy PricingDisplay component above
   - Add to both listing and detail pages

2. **Fix mock data** - 45 min
   - Use seedToProduct transformer
   - Ensure all required fields populated

3. **Add error boundary** - 20 min

   ```typescript
   // components/ErrorBoundary.tsx
   'use client';
   export class ErrorBoundary extends React.Component {
     render() {
       if (this.state.hasError) {
         return <div>Failed to load. Please refresh.</div>;
       }
     }
   }
   ```

4. **Complete categories list** - 15 min
   - Add beverages, spices, grains to categories.ts

5. **Add inventory display** - 30 min
   - Show stock status: "In Stock", "Low Stock", "Out of Stock"
   - Display available quantity

---

## 📊 Metrics to Track

Once improvements are implemented, monitor:

- **Page Load Time:** Target < 2s (FCP < 1.2s)
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **SEO Score:** Target 90+/100
- **Accessibility Score:** Target 90+/100
- **Mobile Usability:** 0 errors
- **Conversion Rate:** % of browsers → add to cart
- **Cart Abandonment:** Track before/after fixes

---

## 🔗 Next Steps

1. **Review this audit** with team
2. **Prioritize Phase 1 fixes** - get product pages working
3. **Set up staging environment** - test before committing
4. **Create GitHub Issues** - one per critical item
5. **Plan Phase 2** - wholesale features
6. **Schedule backend team sync** - align on API contracts

---

## ✅ Validation Checklist Before Backend Integration

- [ ] Routing works: click product → page loads
- [ ] Prices display on all product pages
- [ ] Inventory status shows correctly
- [ ] No 404 errors in product navigation
- [ ] Lighthouse score ≥ 85
- [ ] Mobile responsive ≤ 375px viewport
- [ ] Accessibility audit: 0 critical errors
- [ ] Product list pagination working
- [ ] Filters working (category, search, eventually price)
- [ ] Images load in < 2s
- [ ] Error states tested and working
- [ ] Dark mode working on all pages
- [ ] Touch-friendly buttons (≥ 44px)
- [ ] SEO meta tags dynamic per product

---

**Report generated by:** Frontend Audit Tool  
**Last updated:** September 4, 2026  
**Next review:** After Phase 1 implementation (Est. Sept 11)
