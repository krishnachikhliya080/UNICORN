/**
 * ServicesSection — Animated service cards with icons.
 * Design: Editorial Atelier — clean cards, copper accents, scroll-triggered reveal.
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { IMAGES } from "@/const";
import { Palette, Printer, Fingerprint, PrinterIcon, Monitor, Camera } from "lucide-react";

const SERVICES = [
  { icon: Palette, title: "Packaging Design", desc: "Structural & graphic design for all formats", color: "#C8693E" },
  { icon: Printer, title: "Commercial Printing", desc: "High-volume offset & digital runs", color: "#2D2D2D" },
  { icon: Fingerprint, title: "Brand Identity", desc: "Logo, stationery & brand collateral", color: "#D4A574" },
  { icon: PrinterIcon, title: "Offset Printing", desc: "Heidelberg precision, CMYK + Pantone", color: "#C8693E" },
  { icon: Monitor, title: "Digital Printing", desc: "Short-run, variable data, rapid delivery", color: "#2D2D2D" },
  { icon: Camera, title: "Photography", desc: "Premium product & packaging photography", color: "#D4A574" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function ServicesSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="services" className="py-24 md:py-32 bg-white" ref={ref}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Heading + image */}
          <div>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" as const }}
            >
              <span className="text-body text-sm tracking-[0.25em] uppercase text-copper font-semibold mb-4 block">
                What We Do
              </span>
              <h2 className="text-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-6 leading-tight">
                Our Services
              </h2>
              <p className="text-body text-base text-text-muted leading-relaxed mb-8 max-w-md">
                From structural packaging design to high-volume commercial printing, 
                we offer a complete suite of services under one roof.
              </p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
              className="relative hidden lg:block"
            >
              <img
                src={IMAGES.product4}
                alt="Euronics packaging"
                className="w-full max-w-sm rounded-sm shadow-xl shadow-charcoal/10"
              />
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-2 border-copper/20 rounded-sm -z-10" />
            </motion.div>
          </div>

          {/* Right: Service cards */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="space-y-4"
          >
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                variants={item}
                className="group flex items-start gap-5 p-5 rounded-sm bg-warm-gray/50 hover:bg-warm-gray transition-all duration-300 border-l-2 border-copper/0 hover:border-copper/60"
              >
                <div className="w-10 h-10 rounded-sm bg-copper/10 flex items-center justify-center shrink-0 group-hover:bg-copper/20 transition-colors">
                  <service.icon className="w-5 h-5 text-copper" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-body font-semibold text-charcoal mb-1">{service.title}</h3>
                  <p className="text-body text-sm text-text-muted">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
