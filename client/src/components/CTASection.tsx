/**
 * CTASection — Bold call-to-action banner before the footer.
 * Design: Editorial Atelier — copper gradient bg, centered text, animated entrance.
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { IMAGES } from "@/const";

export default function CTASection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-copper via-copper-dark to-copper" />
      <div className="absolute inset-0 opacity-10">
        <img
          src={IMAGES.product5}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container relative">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Elevate Your Packaging?
          </h2>
          <p className="text-body text-base md:text-lg text-white/80 mb-10 max-w-xl mx-auto">
            Partner with a manufacturer that understands global brands. 
            Get a custom quote for your packaging project today.
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-copper font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-white/90 transition-all duration-300 active:scale-[0.97] shadow-xl shadow-charcoal/20"
          >
            Get a Free Quote
            <span className="transition-transform duration-300 hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
