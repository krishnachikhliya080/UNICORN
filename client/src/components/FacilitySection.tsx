/**
 * FacilitySection — Showcase the manufacturing facility with key stats.
 * Design: Editorial Atelier — full-width image with overlay stats, parallax feel.
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { IMAGES } from "@/const";

function FacilityStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, inView } = useInView(0.3);
  const count = useCountUp(value, 2000, inView);

  return (
    <div ref={ref} className="text-center">
      <div className="text-display text-3xl md:text-4xl font-bold text-copper mb-1">
        {count}{suffix}
      </div>
      <div className="text-body text-xs md:text-sm text-white/60 tracking-wider uppercase">
        {label}
      </div>
    </div>
  );
}

export default function FacilitySection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="facility" className="relative" ref={ref}>
      {/* Full-width facility image */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden">
        <img
          src={IMAGES.facilityHero}
          alt="Unicorn Print Pack Manufacturing Facility"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/70" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container text-center">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
            >
              <span className="text-body text-sm tracking-[0.25em] uppercase text-copper font-semibold mb-4 block">
                Our Facility
              </span>
              <h2 className="text-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                50,000+ sq.ft. of
                <br />
                <span className="text-copper">Manufacturing Excellence</span>
              </h2>
              <p className="text-body text-white/60 max-w-xl mx-auto mb-10">
                Our state-of-the-art facility in India houses the latest Heidelberg and HP Indigo 
                machinery, enabling us to serve global brands with precision and speed.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" as const }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              <FacilityStat value={50000} suffix="+ sq.ft" label="Factory Area" />
              <FacilityStat value={200} suffix="+" label="Team Members" />
              <FacilityStat value={30} suffix="+" label="Countries Served" />
              <FacilityStat value={24} suffix="/7" label="Operations" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Client logos bar */}
      <div className="bg-white py-12 border-b border-charcoal/5">
        <div className="container">
          <p className="text-body text-xs tracking-[0.2em] uppercase text-text-muted text-center mb-8">
            Trusted by brands worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40">
            {["ADISON", "EURONICS", "EVOLVE", "JIMMY", "Trozen", "Parth"].map((name) => (
              <span key={name} className="text-body font-bold text-lg md:text-xl text-charcoal tracking-wider">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
