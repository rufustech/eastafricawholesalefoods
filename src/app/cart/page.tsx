"use client";

import Link from "next/link";
import { useCart } from "@/lib/hooks/useCart";
import { formatPrice } from "@/lib/products";
import { getProductSlug } from "@/lib/product-slugs";
import { SiteHeader } from "@/components/SiteHeader";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    tax,
    total,
  } = useCart();

  if (items.length === 0) {
    return (
      <>
        <SiteHeader />
        <header className="hidden bg-white border-b border-neutral-200 sticky top-0 z-50">
          <div className="container flex-between py-4">
            <h1 className="text-2xl font-bold text-primary-600">
              🌾 East Africa Wholesale Foods
            </h1>
            <Link href="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </header>

        <main className="min-h-screen py-12">
          <div className="container">
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-12 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-3xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-neutral-600 mb-8">
                Start shopping and add some amazing products to your cart!
              </p>
              <Link
                href="/products"
                className="btn btn-primary px-8 py-3 text-lg"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <header className="hidden bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="container flex-between py-4">
          <h1 className="text-2xl font-bold text-primary-600">
            🌾 Shopping Cart
          </h1>
          <div className="flex gap-4">
            <Link href="/products" className="btn btn-secondary">
              Continue Shopping
            </Link>
            <button onClick={clearCart} className="btn btn-outline">
              Clear Cart
            </button>
          </div>
        </div>
      </header>

      <main className="min-h-screen py-12 bg-neutral-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-lg p-6 flex gap-6"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-neutral-100 rounded flex-center text-3xl shrink-0">
                    📦
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <Link
                      href={`/products/${getProductSlug(item.product)}`}
                      className="text-lg font-semibold text-neutral-900 hover:text-primary-600 block mb-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-neutral-600 mb-4">
                      {item.product.description}
                    </p>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-neutral-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="px-3 py-1 hover:bg-neutral-100"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="px-3 py-1 hover:bg-neutral-100"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-neutral-600 mb-1">
                          {formatPrice(
                            item.product.pricing.retail.amount,
                            item.product.pricing.retail.currency,
                          )}{" "}
                          each
                        </div>
                        <div className="text-lg font-bold text-primary-600">
                          {formatPrice(
                            item.product.pricing.retail.amount * item.quantity,
                            item.product.pricing.retail.currency,
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-neutral-400 hover:text-red-600 text-2xl shrink-0 h-fit"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 space-y-4 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-3 pb-4 border-b border-neutral-200">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">
                      Items ({itemCount})
                    </span>
                    <span className="font-semibold">
                      {formatPrice(subtotal, "USD")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Tax (16%)</span>
                    <span className="font-semibold text-orange-600">
                      +{formatPrice(tax, "USD")}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold py-4">
                  <span>Total</span>
                  <span className="text-primary-600">
                    {formatPrice(total, "USD")}
                  </span>
                </div>

                <button className="w-full btn btn-primary py-3 text-lg">
                  Proceed to Checkout
                </button>

                <button className="w-full btn btn-outline py-2">
                  Continue Shopping
                </button>

                {/* Promo Code */}
                <div className="pt-4 border-t border-neutral-200">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm mb-2"
                  />
                  <button className="w-full btn btn-secondary text-sm">
                    Apply Code
                  </button>
                </div>

                {/* Benefits */}
                <div className="pt-4 space-y-2 text-xs text-neutral-600">
                  <div>✓ Free shipping on orders over $100</div>
                  <div>✓ 30-day money back guarantee</div>
                  <div>✓ Expert customer support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 py-12 mt-12">
        <div className="container text-center text-sm">
          <p>&copy; {new Date().getFullYear()} East Africa Wholesale Foods. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
