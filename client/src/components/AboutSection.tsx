/**
 * AboutSection — Company intro with animated counters and scroll-reveal.
 * Design: Editorial Atelier — asymmetric layout, copper accents, Playfair Display.
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { IMAGES } from "@/const";

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, inView } = useInView(0.3);
  const count = useCountUp(value, 2000, inView);

  return (
    <div ref={ref} className="text-center">
      <div className="text-display text-4xl md:text-5xl font-bold text-copper mb-2">
        {count}<span className="text-3xl">{suffix}</span>
      </div>
      <div className="text-body text-sm md:text-base text-text-muted font-medium tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { ref: sectionRef, inView } = useInView(0.1);
  const fadeInUp = {
    hidden: { y: 50, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-white" ref={sectionRef}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            variants={fadeInUp}
          >
            <span className="text-body text-sm tracking-[0.25em] uppercase text-copper font-semibold mb-4 block">
              About Us
            </span>
            <h2 className="text-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-6 leading-tight">
              Crafting Brands.
              <br />
              <span className="text-copper">Delivering Excellence.</span>
            </h2>
            <p className="text-body text-base md:text-lg text-text-muted leading-relaxed mb-6 max-w-lg">
              Unicorn Print Pack is a premier international printing and packaging manufacturer — 
              engineering precision-crafted packaging solutions for global brands across 9+ industries.
              From concept to delivery, we bring your brand vision to life with uncompromising quality.
            </p>
            <p className="text-body text-base text-text-muted leading-relaxed mb-10 max-w-lg">
              With over a decade of mastery in structural engineering, offset and digital printing, 
              and premium finishing techniques, we serve as the trusted partner for brands that 
              demand nothing less than perfection.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md">
              <StatCounter value={10} suffix="+" label="Years of Excellence" />
              <StatCounter value={500} suffix="+" label="Brands Served" />
              <StatCounter value={10} suffix="K+" label="Projects Delivered" />
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-sm overflow-hidden shadow-2xl shadow-charcoal/10">
              <img
                src={IMAGES.aboutVisual}
                alt="Premium packaging materials"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 border-2 border-copper/20 rounded-sm" />
            </div>
            {/* Decorative copper line */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-copper/20 rounded-sm -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
