/**
 * ClientsSection — Printwell-style "Our Prestigious Clients" auto-scroll logo carousel.
 * Clean white background with embla auto-scroll and prev/next arrow controls.
 */
import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CLIENTS = [
  { name: "Varmora Plastech", abbr: "VP", color: "#2e3192" },
  { name: "Fern Residency", abbr: "FR", color: "#00afab" },
  { name: "Adison Luxury", abbr: "AL", color: "#94368d" },
  { name: "Trozen Pack", abbr: "TP", color: "#C8693E" },
  { name: "S.R. Hardware", abbr: "SH", color: "#2588d4" },
  { name: "Euronics India", abbr: "EI", color: "#f97f2c" },
  { name: "Parth Agro", abbr: "PA", color: "#4caf50" },
  { name: "Jimmy Jewels", abbr: "JJ", color: "#b68250" },
  { name: "Shivam Corp", abbr: "SC", color: "#f4436d" },
  { name: "Evolve Brands", abbr: "EB", color: "#1a1a2e" },
];

export default function ClientsSection() {
  const { ref, inView } = useInView(0.1);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Auto-advance every 2.5 seconds
  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 2500);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section
      id="clients"
      ref={ref}
      className="py-16 md:py-20 bg-white border-t border-slate-100 overflow-hidden"
    >
      <div className="container">
        {/* Heading */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2 className="text-display text-2xl md:text-3xl lg:text-4xl font-bold text-charcoal">
            Our Prestigious Clients
          </h2>
          <div className="mt-3 flex items-center justify-center gap-3">
            <div className="h-[1px] w-16 bg-copper/40" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-copper font-semibold">
              Trusted by Leading Brands
            </span>
            <div className="h-[1px] w-16 bg-copper/40" />
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 md:gap-6">
              {CLIENTS.map((client, i) => (
                <div
                  key={i}
                  className="flex-[0_0_calc(50%-8px)] sm:flex-[0_0_calc(33.33%-11px)] md:flex-[0_0_calc(25%-12px)] lg:flex-[0_0_calc(20%-12px)] min-w-0"
                >
                  <div className="group flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-slate-200 bg-white hover:border-copper/40 hover:shadow-lg hover:shadow-copper/10 transition-all duration-300 cursor-default h-[110px]">
                    {/* Logo placeholder — monogram circle */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm font-mono flex-shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: client.color }}
                    >
                      {client.abbr}
                    </div>
                    <span className="text-[12px] font-semibold text-charcoal/80 text-center leading-tight font-sans">
                      {client.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-charcoal hover:bg-copper hover:text-white hover:border-copper transition-all duration-200 z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-charcoal hover:bg-copper hover:text-white hover:border-copper transition-all duration-200 z-10"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
