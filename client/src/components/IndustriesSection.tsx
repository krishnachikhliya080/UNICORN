/**
 * IndustriesSection — Animated industry cards showing sectors served.
 * Design: Editorial Atelier — image cards with hover reveal, staggered entrance.
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { INDUSTRY_IMAGES } from "@/const";

const INDUSTRIES = [
  { name: "Food & Beverage", image: INDUSTRY_IMAGES.foodBeverage },
  { name: "Healthcare & Pharma", image: INDUSTRY_IMAGES.healthcare },
  { name: "Cosmetics & Beauty", image: INDUSTRY_IMAGES.cosmetics },
  { name: "Electronics", image: INDUSTRY_IMAGES.electronics },
  { name: "Retail & FMCG", image: INDUSTRY_IMAGES.retailFmcg },
  { name: "Luxury & Gifts", image: INDUSTRY_IMAGES.luxuryGifts },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardItem = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function IndustriesSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="py-24 md:py-32 bg-white" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-16"
        >
          <span className="text-body text-sm tracking-[0.25em] uppercase text-copper font-semibold mb-4 block">
            Sectors We Serve
          </span>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Industries We Serve
          </h2>
          <p className="text-body text-text-muted max-w-2xl mx-auto">
            Trusted by global brands across diverse sectors, delivering packaging that reflects 
            their brand identity and meets industry-specific standards.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {INDUSTRIES.map((industry, i) => (
            <motion.div
              key={i}
              variants={cardItem}
              className="group relative aspect-[4/3] rounded-sm overflow-hidden shadow-sm hover:shadow-xl hover:shadow-charcoal/10 transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={industry.image}
                alt={industry.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <h3 className="text-body font-semibold text-white text-sm md:text-base group-hover:text-copper transition-colors duration-300">
                  {industry.name}
                </h3>
                <div className="w-8 h-[2px] bg-copper mt-2 transition-all duration-300 group-hover:w-16" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
