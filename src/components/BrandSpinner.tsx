import type { ReactNode } from "react";

interface BrandSpinnerProps {
  children?: ReactNode;
}

export function BrandSpinner({ children }: BrandSpinnerProps) {
  return (
    <div className="grid min-h-screen place-items-center bg-[#173b2b] text-[#f8f2e5]">
      <div className="flex flex-col items-center">
        <div className="relative grid h-64 w-64 place-items-center">
          <div className="absolute inset-5 rounded-full border border-[#b8d58e]/30" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-r-[#b8d58e] border-t-[#d64b35]" />
          <svg className="animate-spin-slow absolute inset-0 h-full w-full" viewBox="0 0 256 256" aria-label="East Africa Wholesale Foods loading">
            <defs><path id="brand-spinner-route" d="M 128,128 m -92,0 a 92,92 0 1,1 184,0 a 92,92 0 1,1 -184,0" /></defs>
            <text className="fill-[#f8f2e5] text-[13px] font-bold uppercase tracking-[0.28em]"><textPath href="#brand-spinner-route">East Africa Wholesale Foods · East Africa Wholesale Foods · </textPath></text>
          </svg>
          <div className="relative text-center"><span className="block font-serif text-5xl font-bold text-[#b8d58e]">EA</span><span className="mt-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-[#e8846f]">Good sourcing</span></div>
        </div>
        {children}
      </div>
    </div>
  );
}
