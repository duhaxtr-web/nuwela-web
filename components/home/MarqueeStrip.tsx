import { MARQUEE_ITEMS } from "@/lib/constants";

export function MarqueeStrip() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="bg-primary text-white border-y border-primary/40 overflow-hidden py-5">
      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((item, i) => (
          <span key={i} className="font-serif text-2xl md:text-3xl italic mx-8 inline-flex items-center gap-8">
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
