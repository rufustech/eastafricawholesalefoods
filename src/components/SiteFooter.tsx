import Image from "next/image";
import Link from "next/link";

const linkClass = "text-[#d64b35] transition-colors hover:text-[#f5b3a6]";

export function SiteFooter() {
  return (
    <footer className="site-footer bg-[#173b2b] py-12 text-white">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
          <div>
            <Image
              src="/eastafricawholesalefoodsLogo.png"
              alt="East Africa Wholesale Foods"
              width={240}
              height={96}
              quality={100}
              className="h-auto w-60 object-contain object-left"
            />
          </div>
          <div>
            <h2 className="mb-4 font-bold">Shop</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className={linkClass}>
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products" className={linkClass}>
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products" className={linkClass}>
                  Sale Items
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 font-bold">Company</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className={linkClass}>
                  About
                </Link>
              </li>
              <li>
                <a
                  href="mailto:info@eastafricawholesalefoods.com"
                  href="mailto:info@eastafricawholesalefoods.com"
                  href="mailto:info@eastafricawholesalefoods.com"

                  className={linkClass}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 font-bold">Support</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:info@eastafricawholesalefoods.com"
                  className={linkClass}
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@eastafricawholesalefoods.com"
                  className={linkClass}
                >
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/20 pt-8 text-center text-sm text-white">
          <p>
            &copy; {new Date().getFullYear()} East Africa Wholesale Foods. All
            rights reserved.
          </p>
          <p className="mt-3 text-xs text-white/70">
            Designed with{" "}
            <span className="text-[#f82504]" aria-label="love">
              &hearts;
            </span>{" "}
            by Rufaro Mucheri <br />{" "}
            <a
              href="https://rufarodev.com"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-[#d64b35]  transition-colors hover:text-[#f5b3a6]"
            >
              <span className="font-bold animate-bounce text-[#d64b35]">
                RufaroDev
              </span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
