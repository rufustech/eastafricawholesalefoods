"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRevealEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      "main > section:not(:first-child), main > .container > section, .grid-products > a, #categories .grid > a, #featured .grid > a",
    );

    elements.forEach((element) => element.classList.add("scroll-reveal-item"));

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
