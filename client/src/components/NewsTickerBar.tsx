/**
 * NewsTickerBar — Printwell-style news ticker bar below the hero.
 * Dark charcoal background, left: scrolling news items, right: "News and Updates" CTA.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Newspaper, ChevronRight } from "lucide-react";

const NEWS_ITEMS = [
  "Unicorn Print Pack now exports luxury packaging to UAE, UK & USA markets",
  "New 5-Color Heidelberg Speedmaster press installed — higher output & quality",
  "ISO 9001:2015 certification renewed — committed to global quality standards",
  "Launching new Eco-Friendly packaging range with FSC-certified board",
  "Special Diwali packaging designs now available — book early for festive orders",
  "Unicorn Print Pack recognized as Top Packaging Manufacturer in Gujarat 2024",
];

export default function NewsTickerBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate news every 4 seconds
  // We use a CSS marquee approach for the ticker
  return (
    <div className="relative w-full bg-[#141d2b] border-y border-white/10 overflow-hidden">
      <div className="flex items-stretch min-h-[48px]">
        {/* Left: Icon + Ticker Label */}
        <div className="flex-shrink-0 flex items-center gap-2.5 px-4 md:px-6 bg-[#0d1520] border-r border-white/10">
          <Newspaper className="w-4 h-4 text-copper flex-shrink-0" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-copper font-bold whitespace-nowrap hidden sm:block">
            Latest News
          </span>
        </div>

        {/* Center: Scrolling Marquee Ticker */}
        <div className="flex-1 overflow-hidden flex items-center relative">
          <div className="animate-ticker flex items-center gap-0 whitespace-nowrap">
            {[...NEWS_ITEMS, ...NEWS_ITEMS].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-3">
                <span className="text-[12px] md:text-[13px] text-white/75 font-sans tracking-wide px-6">
                  {item}
                </span>
                <span className="text-copper/40 text-lg font-light">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right: "News and Updates" CTA */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex-shrink-0 flex items-center gap-2 px-5 md:px-6 bg-copper hover:bg-copper-dark transition-colors duration-300 cursor-pointer group"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-white font-bold whitespace-nowrap">
            News & Updates
          </span>
          <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* Gradient fade edges */}
      <div className="pointer-events-none absolute left-[120px] sm:left-[160px] top-0 bottom-0 w-12 bg-gradient-to-r from-[#141d2b] to-transparent z-10" />
      <div className="pointer-events-none absolute right-[120px] md:right-[160px] top-0 bottom-0 w-12 bg-gradient-to-l from-[#141d2b] to-transparent z-10" />
    </div>
  );
}
