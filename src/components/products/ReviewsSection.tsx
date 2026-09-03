"use client";

import { Product } from "@/types/product";

interface ReviewsSectionProps {
  product: Product;
}

export function ReviewsSection({ product }: ReviewsSectionProps) {
  const reviewCount = product.reviews ?? 0;

  if (!product.rating || reviewCount === 0) {
    return (
      <div className="py-8 border-t border-neutral-200">
        <h3 className="text-lg font-semibold mb-4">Reviews</h3>
        <p className="text-neutral-600">
          No reviews yet. Be the first to review this product!
        </p>
      </div>
    );
  }

  const stars = Array.from({ length: 5 }).map((_, i) =>
    i < Math.round(product.rating!) ? "★" : "☆",
  );
  const ratingPercentage = (product.rating! / 5) * 100;

  return (
    <div className="py-8 border-t border-neutral-200">
      <h3 className="text-lg font-semibold mb-6">Customer Reviews</h3>

      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row gap-8 mb-8 pb-8 border-b border-neutral-200">
        <div className="shrink-0">
          <div className="text-4xl font-bold text-neutral-900 mb-2">
            {product.rating.toFixed(1)}
          </div>
          <div className="text-lg text-yellow-500 mb-2">{stars.join("")}</div>
          <p className="text-sm text-neutral-600">
            Based on {reviewCount} reviews
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="text-sm w-8">{rating}★</span>
              <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500"
                  style={{
                    width: `${Math.random() * 60 + 20}%`, // Mock breakdown
                  }}
                />
              </div>
              <span className="text-sm text-neutral-600 w-12 text-right">
                {Math.floor(reviewCount * (rating / 10 + 0.1))}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        <h4 className="font-semibold text-neutral-900">Most Helpful Reviews</h4>

        {/* Sample Reviews */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="pb-6 border-b border-neutral-200 last:border-b-0"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-semibold text-neutral-900">
                  Verified Buyer
                </div>
                <div className="text-sm text-neutral-600">
                  Purchased {i * 2} weeks ago
                </div>
              </div>
              <div className="text-yellow-500">
                {"★".repeat(5 - (i % 2))}
                {"☆".repeat(i % 2)}
              </div>
            </div>
            <div className="mb-2">
              <h5 className="font-medium text-neutral-900">
                {
                  ["Excellent quality!", "Great value", "Highly recommended"][
                    i - 1
                  ]
                }
              </h5>
            </div>
            <p className="text-neutral-700 text-sm">
              {
                [
                  "This is exactly what I was looking for. Fast delivery and excellent packaging. Will definitely order again!",
                  "Outstanding product quality at wholesale prices. The service was professional throughout.",
                  "Highly recommended for anyone looking for reliable wholesale suppliers. Great communication!",
                ][i - 1]
              }
            </p>
            <div className="flex gap-4 mt-3">
              <button className="text-sm text-primary-600 hover:text-primary-700">
                👍 Helpful
              </button>
              <button className="text-sm text-neutral-600 hover:text-neutral-700">
                Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review CTA */}
      <button className="btn btn-secondary mt-8">Write a Review</button>
    </div>
  );
}
