"use client";

import { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { BrandSpinner } from "@/components/BrandSpinner";

const ACCESS_KEY = "eawf-admin-access";

export function ConstructionGate({ children }: { children: React.ReactNode }) {
  const [promptVisible, setPromptVisible] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const configuredPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD?.trim();

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(ACCESS_KEY) === "true");
  }, []);

  if (unlocked) return <>{children}</>;

  const revealPrompt = () => {
    setPromptVisible(true);
    setError("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!promptVisible && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      revealPrompt();
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 150));
      if (!configuredPassword || password.trim() !== configuredPassword) {
        throw new Error("Incorrect password");
      }
      sessionStorage.setItem(ACCESS_KEY, "true");
      setUnlocked(true);
    } catch {
      setError("That password is not correct.");
      setPassword("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div onPointerDown={!promptVisible ? revealPrompt : undefined} onKeyDown={handleKeyDown} role={!promptVisible ? "button" : undefined} tabIndex={!promptVisible ? 0 : undefined}>
      <BrandSpinner>
        <div className="mt-8 w-[min(90vw,360px)] text-center" onPointerDown={(event) => event.stopPropagation()}>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e8846f]">Website under construction</p>
          <p className="mt-3 text-sm text-[#d8e7c9]">Coming soon. Touch or click to continue.</p>
          {promptVisible && <form onSubmit={handleSubmit} className="mt-6 space-y-3 text-left"><label htmlFor="admin-password" className="block text-xs font-bold uppercase tracking-widest text-[#b8d58e]">Admin password</label><input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoFocus required className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-[#f8f2e5] outline-none placeholder:text-white/40 focus:border-[#b8d58e]" placeholder="Enter password" /><button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-[#d64b35] px-6 py-3 font-bold text-white transition-colors hover:bg-[#b83d2b] disabled:opacity-60">{isSubmitting ? "Checking..." : "Enter website"}</button>{error && <p className="text-center text-sm text-[#f5b3a6]">{error}</p>}</form>}
        </div>
      </BrandSpinner>
    </div>
  );
}
