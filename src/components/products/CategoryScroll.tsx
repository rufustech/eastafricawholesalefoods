"use client";

import { useRef, useEffect, useState } from "react";
import { categories } from "@/data/categories";

interface CategoryScrollProps {
  selectedCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
}

const ITEM_HEIGHT = 70;

export function CategoryScroll({
  selectedCategory,
  onCategoryChange,
}: CategoryScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // All items including "All"
  const allItems = [
    { id: "all", name: "All", slug: null, icon: "🏠" },
    ...categories,
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const middleIndex = Math.round(scrollTop / ITEM_HEIGHT);
      const centerItem =
        allItems[Math.max(0, Math.min(middleIndex, allItems.length - 1))];

      if (centerItem) {
        onCategoryChange(centerItem.slug);
      }

      setScrollProgress(scrollTop);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [allItems, onCategoryChange]);

  const getItemScale = (index: number) => {
    const middleIndex = Math.round(scrollProgress / ITEM_HEIGHT);
    const distance = Math.abs(index - middleIndex);
    if (distance === 0) return 1.15;
    if (distance === 1) return 0.95;
    return 0.85;
  };

  const getItemOpacity = (index: number) => {
    const middleIndex = Math.round(scrollProgress / ITEM_HEIGHT);
    const distance = Math.abs(index - middleIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.7;
    return 0.4;
  };

  return (
    <div className="mb-8 lg:hidden flex justify-center">
      <div className="relative w-[calc(100%-2rem)] max-w-sm">
        {/* Scroll Wheel - Magical Design */}
        <div className="relative rounded-3xl overflow-hidden bg-linear-to-b from-[#f8f2e5]/50 to-[#f8f2e5]/20 dark:from-neutral-800/50 dark:to-neutral-900/20 backdrop-blur-sm border border-[#1f633f]/20 dark:border-[#b8d58e]/20 shadow-2xl">
          {/* Vertical scroll container */}
          <div
            ref={scrollContainerRef}
            className="h-72 overflow-y-scroll scroll-smooth relative"
            style={{
              scrollBehavior: "smooth",
              scrollSnapType: "y proximity",
            }}
          >
            {/* Top padding */}
            <div style={{ height: `${ITEM_HEIGHT * 1.5}px` }} />

            {/* Category items */}
            {allItems.map((item, idx) => {
              const isSelected =
                item.slug === selectedCategory ||
                (selectedCategory === null && item.slug === null);
              const scale = getItemScale(idx);
              const opacity = getItemOpacity(idx);

              return (
                <div
                  key={item.id}
                  style={{
                    height: ITEM_HEIGHT,
                    scrollSnapAlign: "center",
                    scrollSnapStop: "always",
                  }}
                  className="flex items-center justify-center"
                >
                  <button
                    onClick={() => {
                      onCategoryChange(item.slug);
                      const scrollTop = idx * ITEM_HEIGHT;
                      scrollContainerRef.current?.scrollTo({
                        top: scrollTop,
                        behavior: "smooth",
                      });
                    }}
                    className="relative w-4/5 mx-auto transition-all duration-300 ease-out"
                    style={{
                      transform: `scale(${scale})`,
                      opacity: opacity,
                    }}
                  >
                    <div
                      className={`px-6 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 ${
                        isSelected
                          ? "bg-[#1f633f] dark:bg-[#1f633f] text-white shadow-2xl shadow-[#1f633f]/40"
                          : "bg-white/60 dark:bg-neutral-700/40 text-[#173b2b] dark:text-[#f8f2e5]/70 backdrop-blur-sm"
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span
                        className={`font-semibold ${
                          isSelected ? "text-base" : "text-sm"
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}

            {/* Bottom padding */}
            <div style={{ height: `${ITEM_HEIGHT * 1.5}px` }} />
          </div>

          {/* Center Highlight Indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-20 rounded-2xl border-2 border-[#1f633f]/30 dark:border-[#b8d58e]/30 pointer-events-none shadow-inner" />
        </div>

        {/* Helper Text */}
        <p className="text-center text-xs text-[#1f633f] dark:text-[#b8d58e] mt-4 font-medium opacity-70">
          Scroll to select
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
