/**
 * ProductShowcase — Bento-grid with Framer Motion staggered reveal + RAF parallax in LIGHT THEME.
 */
import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useIsMobile } from "@/hooks/useMobile";

interface ProductItem {
  id: string;
  name: string;
  image: string;
  colSpan: string;
  rowSpan: string;
  speed: number;
  filter?: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: "t-shirt",
    name: "T-SHIRT",
    image: "/images/hero-products/t-shirt.png",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-2",
    speed: 0.06,
  },
  {
    id: "mug",
    name: "MUG",
    image: "/images/hero-products/mug.png",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-1",
    speed: -0.05,
  },
  {
    id: "luxury-box",
    name: "LUXURY BOX",
    image: "/images/hero-products/luxury-box.png",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-2",
    speed: 0.08,
  },
  {
    id: "business-card",
    name: "BUSINESS CARD",
    image: "/images/hero-products/business-card.png",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-1",
    speed: -0.07,
  },
  {
    id: "corrugated-box",
    name: "CORRUGATED BOX",
    image: "/images/hero-products/corrugated-box.png",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-2",
    speed: -0.06,
  },
  {
    id: "tote-bag",
    name: "TOTE BAG",
    image: "/images/hero-products/tote-bag.png",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-1",
    speed: 0.05,
    filter: "contrast(1.22) saturate(1.30) brightness(0.95)",
  },
  {
    id: "brochure",
    name: "BROCHURE",
    image: "/images/hero-products/brochure.png",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-2",
    speed: 0.07,
  },
  {
    id: "sticker-roll",
    name: "STICKER ROLL",
    image: "/images/hero-products/sticker-roll.png",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-1",
    speed: -0.08,
  },
  {
    id: "shopping-bag",
    name: "SHOPPING BAG",
    image: "/images/hero-products/shopping-bag.png",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-2",
    speed: 0.09,
  },
  {
    id: "pen",
    name: "PEN",
    image: "/images/hero-products/pen.png",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-1",
    speed: -0.04,
  },
  {
    id: "notebook",
    name: "NOTEBOOK",
    image: "/images/hero-products/notebook.png",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-1",
    speed: 0.06,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.93 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 0.84, 0.44, 1] as const,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const isMobile = useIsMobile();
  const { ref: inViewRef, inView } = useInView<HTMLElement>(0.1);

  const mergeRefs = useCallback(
    (el: HTMLElement | null) => {
      sectionRef.current = el;
      if (typeof inViewRef === "object" && inViewRef !== null) {
        (inViewRef as { current: HTMLElement | null }).current = el;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    let animationFrameId: number | null = null;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (isMobile || prefersReducedMotion) {
        imgRefs.current.forEach((img) => {
          if (img) img.style.transform = "scale(1.05)";
        });
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.bottom < -100 || rect.top > viewportHeight + 100) return;

      const progress = (rect.top - viewportHeight / 2) / viewportHeight;

      PRODUCTS.forEach((product, index) => {
        const img = imgRefs.current[index];
        if (img) {
          const translateY = progress * product.speed * 220;
          img.style.transform = `translateY(${translateY.toFixed(2)}px) scale(1.12)`;
        }
      });
    };

    const onScroll = () => {
      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(() => {
          handleScroll();
          animationFrameId = null;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <section
      ref={mergeRefs}
      id="product-showcase"
      className="relative w-full py-24 px-4 md:px-8 bg-white text-slate-900 overflow-hidden border-t border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={headerVariants}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-copper px-3.5 py-1.5 rounded-full bg-copper/10 border border-copper/20 inline-block mb-3 font-semibold">
            Crafted Excellence
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 font-display">
            Product Showcase
          </h2>
          <p className="mt-3 text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our premium range of custom print and packaging solutions built for maximum brand impact.
          </p>
        </motion.div>

        {/* Bento Grid (Light Theme) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5 auto-rows-[220px] md:auto-rows-[240px]"
        >
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              className={`group relative overflow-hidden bg-slate-50 border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-copper/40 transition-all duration-300 ${product.colSpan} ${product.rowSpan}`}
            >
              {/* Image with parallax ref */}
              <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center p-6 bg-gradient-to-b from-slate-100/40 to-slate-200/50">
                <img
                  ref={(el) => {
                    imgRefs.current[index] = el;
                  }}
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-contain max-h-[85%] transition-transform duration-300 ease-out group-hover:scale-115 filter drop-shadow-md"
                  style={{
                    transform: "scale(1.12)",
                    willChange: "transform",
                    filter: product.filter || undefined,
                  }}
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Caption label */}
              <div className="absolute bottom-3 left-3 z-10">
                <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-mono tracking-widest uppercase text-slate-800 bg-white/90 backdrop-blur-md rounded-full border border-slate-200 shadow-sm select-none pointer-events-none font-semibold">
                  {product.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
