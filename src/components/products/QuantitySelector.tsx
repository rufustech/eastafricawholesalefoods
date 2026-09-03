"use client";

import { Product } from "@/types/product";

interface QuantitySelectorProps {
  product: Product;
  value: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
}

export function QuantitySelector({
  product,
  value,
  onChange,
  disabled = false,
}: QuantitySelectorProps) {
  const minOrder = product.inventory.minOrderQuantity;
  const available = product.inventory.available;
  const isOutOfStock = available === 0;

  const handleDecrease = () => {
    if (value > minOrder) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < available) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-neutral-700">Quantity:</label>
      <div className="flex items-center border border-neutral-300 rounded-lg">
        <button
          onClick={handleDecrease}
          disabled={disabled || isOutOfStock || value <= minOrder}
          className="px-3 py-2 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          −
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const num = parseInt(e.target.value, 10);
            if (!isNaN(num) && num >= minOrder && num <= available) {
              onChange(num);
            }
          }}
          disabled={disabled || isOutOfStock}
          className="w-16 text-center border-0 py-2 disabled:bg-neutral-50 disabled:cursor-not-allowed"
          min={minOrder}
          max={available}
        />
        <button
          onClick={handleIncrease}
          disabled={disabled || isOutOfStock || value >= available}
          className="px-3 py-2 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
      <span className="text-xs text-neutral-600">
        (Min: {minOrder}, Available: {available})
      </span>
    </div>
  );
}
