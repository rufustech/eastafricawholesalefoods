import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-[#173b2b]/10 bg-[#fbf7ee]/90 backdrop-blur-md dark:border-white/10 dark:bg-[#10251b]/90">
      <div className="container flex items-center justify-between py-5">
        <Link href="/" className="group flex items-center gap-3 text-[#173b2b] dark:text-[#f8f2e5]">
          <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl bg-[#173b2b] shadow-lg shadow-[#1f633f]/20 transition-transform group-hover:-rotate-2">
            <Image src="/eastafricawholesalefoodsLogo.png" alt="East Africa Wholesale Foods" fill sizes="128px" quality={100} className="object-contain" />
          </span>
          <span><span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-[#d64b35]">East Africa</span><span className="block font-serif text-xl font-bold tracking-tight">Wholesale Foods</span></span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold md:flex"><Link href="/#categories" className="transition-colors hover:text-[#d64b35]">Categories</Link><Link href="/#featured" className="transition-colors hover:text-[#d64b35]">Featured</Link><Link href="/#story" className="transition-colors hover:text-[#d64b35]">Our story</Link></nav>
        <div className="flex items-center gap-3"><Link href="/products" className="hidden rounded-full bg-[#d64b35] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#d64b35]/20 transition-all hover:-translate-y-0.5 hover:bg-[#b83d2b] sm:block">Shop wholesale</Link><ThemeToggle /></div>
      </div>
    </header>
  );
}
