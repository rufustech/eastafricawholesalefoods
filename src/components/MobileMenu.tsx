"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

interface MobileMenuProps {
  onLinkClick?: () => void;
}

export function MobileMenu({ onLinkClick }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
    onLinkClick?.();
  };

  const menuItems = [
    { label: "Categories", href: "/#categories" },
    { label: "Featured", href: "/#featured" },
    { label: "About", href: "/about" },
    { label: "Our Story", href: "/#story" },
    { label: "Shop Wholesale", href: "/products" },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative z-50 p-2 rounded-lg text-[#173b2b] dark:text-[#f8f2e5] hover:bg-[#173b2b]/5 dark:hover:bg-white/10 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <MdClose size={28} className="transition-transform" />
        ) : (
          <GiHamburgerMenu size={28} className="transition-transform" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 dark:bg-black/60 md:hidden z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
          style={{ animation: "fadeIn 0.2s ease-out" }}
        />
      )}

      {/* Mobile Menu */}
      <nav
        className={`fixed top-0 right-0 h-screen w-[85vw] max-w-xs bg-[#fbf7ee] dark:bg-[#0f2a1d] md:hidden z-40 transform transition-transform duration-300 ease-out shadow-2xl overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          paddingTop: "80px",
        }}
      >
        <div className="flex flex-col space-y-2 px-6 py-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className="group relative px-4 py-3 text-[#173b2b] dark:text-[#f8f2e5] font-semibold text-lg transition-all duration-200 rounded-lg hover:bg-[#1f633f]/10 dark:hover:bg-[#1f633f]/30 hover:translate-x-1"
            >
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#d64b35] rounded-full group-hover:h-6 transition-all duration-300" />
              {item.label}
            </Link>
          ))}

          <div className="my-6 border-t border-[#173b2b]/10 dark:border-white/10" />

          <div className="px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#d64b35] mb-2">
              Contact Us
            </p>
            <p className="text-sm text-[#173b2b] dark:text-[#f8f2e5]/80">
              Email: info@eafoods.com
            </p>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
