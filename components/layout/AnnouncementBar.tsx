"use client";
import { ANNOUNCEMENT } from "@/lib/constants";

export function AnnouncementBar() {
  return (
    <div className="bg-primary text-white overflow-hidden">
      <div className="flex items-center whitespace-nowrap animate-marquee py-2.5">
        {[...ANNOUNCEMENT, ...ANNOUNCEMENT, ...ANNOUNCEMENT, ...ANNOUNCEMENT].map((text, i) => (
          <span key={i} className="mx-8 text-[10px] tracking-[0.3em] uppercase">
            {text} <span className="ml-8 opacity-60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
