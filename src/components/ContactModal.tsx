"use client";

import { FormEvent, useState } from "react";

interface ContactModalProps {
  productName?: string;
  buttonLabel?: string;
  buttonClassName?: string;
}

export function ContactModal({
  productName,
  buttonLabel = "Contact us for details",
  buttonClassName = "rounded-full bg-[#d64b35] px-6 py-3 text-sm font-bold text-white hover:bg-[#b83d2b]",
}: ContactModalProps) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = productName ? `Enquiry about ${productName}` : "Wholesale enquiry";
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nProduct: ${productName || "General enquiry"}\n\n${data.get("message")}`;
    window.location.href = `mailto:info@eastafricawholesalefoods.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <button type="button" onClick={() => { setSent(false); setOpen(true); }} className={buttonClassName}>{buttonLabel}</button>
      {open && <div className="fixed inset-0 z-[100] grid place-items-center bg-[#173b2b]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Contact us"><div className="relative w-full max-w-lg rounded-[2rem] bg-[#fbf7ee] p-7 text-[#173b2b] shadow-2xl dark:bg-[#f8f2e5]"><button type="button" onClick={() => setOpen(false)} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-[#173b2b]/10 text-xl" aria-label="Close contact form">×</button><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d64b35]">Let&apos;s talk wholesale</p><h2 className="mt-3 max-w-sm font-serif text-3xl font-bold">Get the details for {productName || "our catalogue"}.</h2><p className="mt-3 text-sm leading-6 opacity-70">Call <a href="tel:+254700000000" className="font-bold text-[#1f633f]">+254 700 000 000</a> or send an enquiry below.</p>{sent ? <div className="mt-7 rounded-2xl bg-[#d8e7c9] p-5 text-sm font-semibold">Your email app should open with the enquiry ready to send. You can also email us at info@eastafricawholesalefoods.com.</div> : <form onSubmit={handleSubmit} className="mt-7 space-y-4"><input name="name" required placeholder="Your name" className="w-full rounded-xl border border-[#173b2b]/15 bg-white px-4 py-3" /><input name="email" type="email" required placeholder="Email address" className="w-full rounded-xl border border-[#173b2b]/15 bg-white px-4 py-3" /><textarea name="message" required rows={4} placeholder="Tell us what you need..." className="w-full rounded-xl border border-[#173b2b]/15 bg-white px-4 py-3" /><button type="submit" className="w-full rounded-full bg-[#1f633f] px-6 py-3.5 font-bold text-white hover:bg-[#174d30]">Send enquiry</button></form>}</div></div>}
    </>
  );
}
