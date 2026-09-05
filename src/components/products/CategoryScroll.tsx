"use client";

import { useRef, useEffect, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { categories } from "@/data/categories";

interface CategoryScrollProps {
  selectedCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
}

const ITEM_HEIGHT = 60;

export function CategoryScroll({
  selectedCategory,
  onCategoryChange,
}: CategoryScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [displayedItems, setDisplayedItems] = useState([
    null,
    ...categories.slice(0, 2),
  ]);

  // All items including "All"
  const allItems = [
    { id: "all", name: "All", slug: null, icon: "🏠" },
    ...categories,
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Find which item is in the middle
      const scrollTop = container.scrollTop;
      const middleIndex = Math.round(scrollTop / ITEM_HEIGHT);
      const centerItem =
        allItems[Math.max(0, Math.min(middleIndex, allItems.length - 1))];

      if (centerItem) {
        onCategoryChange(centerItem.slug);
      }

      // Update displayed items (3 visible)
      const displayStart = Math.max(0, middleIndex - 1);
      const displayEnd = Math.min(allItems.length, displayStart + 3);
      setDisplayedItems(allItems.slice(displayStart, displayEnd));
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [allItems, onCategoryChange]);

  return (
    <div className="mb-8 lg:hidden flex justify-center px-4">
      <div className="relative w-full max-w-sm">
        {/* Top Arrow */}
        <div className="flex justify-center mb-3">
          <FaChevronUp className="text-[#1f633f] dark:text-[#b8d58e] text-lg opacity-70" />
        </div>

        {/* Scroll Wheel - Clean Design */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-[#1f633f]/30 dark:border-[#b8d58e]/30 bg-white dark:bg-neutral-800/50">
          {/* Vertical scroll container */}
          <div
            ref={scrollContainerRef}
            className="h-56 overflow-y-scroll scroll-smooth"
            style={{
              scrollBehavior: "smooth",
              scrollSnapType: "y mandatory",
            }}
          >
            {/* Top padding */}
            <div style={{ height: `${ITEM_HEIGHT}px` }} />

            {/* Category items */}
            {allItems.map((item, idx) => {
              const isSelected =
                item.slug === selectedCategory ||
                (selectedCategory === null && item.slug === null);

              return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      onCategoryChange(item.slug);
                      const index = allItems.indexOf(item);
                      scrollContainerRef.current?.scrollTo({
                        top: index * ITEM_HEIGHT,
                        behavior: "smooth",
                      });
                    }}
                    className={`w-full px-6 py-4 text-left transition-all duration-200 flex items-center gap-3 ${
                      isSelected
                        ? "bg-[#d4e8e3] dark:bg-[#1f633f]/40 text-[#1f633f] dark:text-[#b8d58e]"
                        : "bg-transparent text-[#173b2b] dark:text-[#f8f2e5]/70"
                    }`}
                    style={{
                      height: ITEM_HEIGHT,
                      scrollSnapAlign: "center",
                    }}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span
                      className={`font-medium ${isSelected ? "text-base font-semibold" : "text-sm"}`}
                    >
                      {item.name}
                    </span>
                  </button>
                  {idx < allItems.length - 1 && (
                    <div className="h-px bg-[#1f633f]/10 dark:bg-[#b8d58e]/10" />
                  )}
                </div>
              );
            })}

            {/* Bottom padding */}
            <div style={{ height: `${ITEM_HEIGHT}px` }} />
          </div>
        </div>

        {/* Bottom Arrow */}
        <div className="flex justify-center mt-3">
          <FaChevronDown className="text-[#1f633f] dark:text-[#b8d58e] text-lg opacity-70" />
        </div>

        {/* Helper Text */}
        <p className="text-center text-xs text-[#1f633f] dark:text-[#b8d58e] mt-3 font-medium">
          Scroll to browse
        </p>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
