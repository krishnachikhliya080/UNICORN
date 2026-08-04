/**
 * ServicesSection — Printwell-inspired interactive split-panel product category selector.
 * Left: Large product image that changes per active category.
 * Right: Vertical category menu — each row slides in a unique colored background on hover/active.
 * Matches Printwell Rajkot's signature home page section layout.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { IMAGES } from "@/const";
import {
  Printer,
  Package,
  Gift,
  Layers,
  BookOpen,
  Tag,
  Palette,
  ExternalLink,
} from "lucide-react";

interface ServiceCategory {
  id: string;
  icon: React.ElementType;
  label: string;
  tagline: string;
  color: string;          // panel accent color
  image: string;
}

const CATEGORIES: ServiceCategory[] = [
  {
    id: "offset",
    icon: Printer,
    label: "Offset Printing",
    tagline: "Heidelberg Precision — CMYK + Pantone spot colors",
    color: "#2e3192",
    image: IMAGES.product4,
  },
  {
    id: "cartons",
    icon: Layers,
    label: "FBB & Mono Cartons",
    tagline: "Food-safe duplex & FBB folding cartons for FMCG brands",
    color: "#f97f2c",
    image: IMAGES.product7,
  },
  {
    id: "rigid",
    icon: Gift,
    label: "Rigid Luxury Boxes",
    tagline: "Magnetic closures, velvet inlay, foil & embossing",
    color: "#94368d",
    image: IMAGES.product2,
  },
  {
    id: "corrugated",
    icon: Package,
    label: "Corrugated Cartons",
    tagline: "Heavy-duty shipping & e-commerce mailer boxes",
    color: "#00897b",
    image: IMAGES.product13,
  },
  {
    id: "brochures",
    icon: BookOpen,
    label: "Brochures & Catalogs",
    tagline: "High-gloss & matte catalogs, danglers, and leaflets",
    color: "#f4436d",
    image: IMAGES.product9,
  },
  {
    id: "labels",
    icon: Tag,
    label: "Self-Adhesive Labels",
    tagline: "Bopp, paper & metallic labels with die-cut precision",
    color: "#b68250",
    image: IMAGES.product12,
  },
  {
    id: "design",
    icon: Palette,
    label: "Packaging Design",
    tagline: "Structural dielines, print-ready artwork & mockups",
    color: "#1565c0",
    image: IMAGES.product1,
  },
];

export default function ServicesSection() {
  const { ref, inView } = useInView(0.1);
  const [activeId, setActiveId] = useState<string>(CATEGORIES[0].id);
  const activeCategory = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0];

  return (
    <section id="services" className="py-0 bg-[#f5f6f8] overflow-hidden" ref={ref}>
      <div className="container py-16 md:py-24">
        {/* Section Header */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-copper font-bold px-4 py-1.5 bg-copper/10 border border-copper/20 rounded-full mb-3">
            What We Offer
          </span>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal">
            Our Products & Capabilities
          </h2>
          <p className="mt-3 text-body text-base text-text-muted max-w-xl mx-auto">
            Hover or tap a category below to explore our full-service print & packaging capabilities.
          </p>
        </motion.div>
      </div>

      {/* Split Panel — Full Width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col lg:flex-row w-full min-h-[520px] md:min-h-[580px]"
      >
        {/* ── LEFT: Product Image Panel ── */}
        <div className="relative w-full lg:w-[58%] flex-shrink-0 min-h-[300px] lg:min-h-0 bg-[#141d2b] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeCategory.id}
              src={activeCategory.image}
              alt={activeCategory.label}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c111a]/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0c111a]/30 pointer-events-none" />

          {/* Active category label on image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id + "-label"}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-6 left-6"
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm text-white text-sm font-bold font-mono uppercase tracking-wider shadow-lg"
                style={{ backgroundColor: activeCategory.color }}
              >
                <activeCategory.icon size={15} />
                {activeCategory.label}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* "Explore Products" button */}
          <div className="absolute bottom-6 right-6">
            <a
              href="#product-showcase"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#product-showcase")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/40 text-white text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all duration-300 rounded-sm"
            >
              <ExternalLink size={13} />
              Explore Products
            </a>
          </div>
        </div>

        {/* ── RIGHT: Category Menu Panel ── */}
        <div className="w-full lg:w-[42%] flex flex-col bg-white border-l border-slate-200/80">
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeId;
            return (
              <button
                key={cat.id}
                onMouseEnter={() => setActiveId(cat.id)}
                onClick={() => setActiveId(cat.id)}
                className="relative group flex items-center gap-4 px-6 md:px-8 py-[18px] md:py-5 text-left transition-all duration-300 overflow-hidden border-b border-slate-100 last:border-b-0 outline-none"
                style={{ borderLeftWidth: "4px", borderLeftColor: isActive ? cat.color : "transparent" }}
              >
                {/* Colored slide-in background on hover/active */}
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    x: isActive ? 0 : "-100%",
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ backgroundColor: cat.color }}
                />

                {/* Icon */}
                <div
                  className={`relative z-10 w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isActive ? "bg-white/20" : "bg-charcoal/5 group-hover:bg-charcoal/10"
                  }`}
                >
                  <cat.icon
                    size={20}
                    className={`transition-colors duration-300 ${
                      isActive ? "text-white" : "text-charcoal/70"
                    }`}
                    style={isActive ? { color: "#fff" } : { color: cat.color }}
                  />
                </div>

                {/* Text */}
                <div className="relative z-10 min-w-0">
                  <div
                    className={`font-bold text-sm md:text-base tracking-wide transition-colors duration-300 font-sans uppercase leading-snug ${
                      isActive ? "text-white" : "text-charcoal"
                    }`}
                  >
                    {cat.label}
                  </div>
                  <div
                    className={`text-[11px] md:text-xs font-sans mt-0.5 leading-relaxed transition-all duration-300 ${
                      isActive ? "text-white/80 max-h-10 opacity-100" : "text-text-muted max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    {cat.tagline}
                  </div>
                </div>

                {/* Right arrow indicator */}
                <div
                  className={`relative z-10 ml-auto flex-shrink-0 transition-all duration-300 ${
                    isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <ExternalLink size={12} className="text-white" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
