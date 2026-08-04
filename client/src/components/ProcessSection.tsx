/**
 * ProcessSection — Animated horizontal timeline showing 7 manufacturing steps.
 * Design: Editorial Atelier — copper progress line, staggered reveal.
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { IMAGES } from "@/const";
import { Search, PenTool, Package, Printer, Sparkles, Box, Truck } from "lucide-react";

const STEPS = [
  { num: "01", title: "Inquiry", desc: "Brief, scope & specification review", icon: Search },
  { num: "02", title: "Design", desc: "Structural engineering & graphic design", icon: PenTool },
  { num: "03", title: "Prototype", desc: "Physical sample approval", icon: Package },
  { num: "04", title: "Printing", desc: "Heidelberg offset precision press", icon: Printer },
  { num: "05", title: "Finishing", desc: "Foil, Spot UV, Embossing, Die-Cut", icon: Sparkles },
  { num: "06", title: "Packing", desc: "Quality-checked bulk packing", icon: Box },
  { num: "07", title: "Dispatch", desc: "Global logistics & delivery", icon: Truck },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const stepItem = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function ProcessSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="process" className="py-24 md:py-32 bg-white relative overflow-hidden" ref={ref}>
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url(${IMAGES.processBg})`, backgroundSize: "cover" }} />

      <div className="container relative">
        {/* Heading */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-16"
        >
          <span className="text-body text-sm tracking-[0.25em] uppercase text-copper font-semibold mb-4 block">
            How We Work
          </span>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Manufacturing Process
          </h2>
          <p className="text-body text-text-muted max-w-2xl mx-auto">
            From inquiry to dispatch, our streamlined 7-step process ensures precision at every stage.
          </p>
        </motion.div>

        {/* Timeline grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-3 relative"
        >
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[calc(7%)] right-[calc(7%)] h-[2px] bg-copper/20 -z-10" />
          <motion.div
            className="hidden lg:block absolute top-8 left-[calc(7%)] h-[2px] bg-copper -z-10 origin-left"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" as const }}
            style={{ right: "auto", width: "86%" }}
          />

          {STEPS.map((step) => (
            <motion.div
              key={step.num}
              variants={stepItem}
              className="flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-copper/10 border-2 border-copper/30 flex items-center justify-center mb-4 group-hover:bg-copper/20 transition-colors duration-300 relative">
                <step.icon className="w-6 h-6 md:w-7 md:h-7 text-copper" strokeWidth={1.5} />
                {/* Step number badge */}
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-copper text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {step.num}
                </span>
              </div>
              <h4 className="text-body font-semibold text-charcoal text-sm md:text-base mb-1">{step.title}</h4>
              <p className="text-body text-xs text-text-muted leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Supporting image */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" as const }}
          className="mt-16 hidden md:block"
        >
          <img
            src={IMAGES.product8}
            alt="Manufacturing quality"
            className="w-full max-w-md mx-auto rounded-sm shadow-lg shadow-charcoal/10"
          />
        </motion.div>
      </div>
    </section>
  );
}
