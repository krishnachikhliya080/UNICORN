/**
 * WhyChooseUs — 4 pillars + animated stat counters in LIGHT THEME.
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { Users, Award, Truck, RefreshCw } from "lucide-react";

const PILLARS = [
  {
    icon: Users,
    title: "Experienced Team",
    desc: "Team of 100+ skilled print mastercraftsmen and domain engineers dedicated to precision packaging.",
  },
  {
    icon: Award,
    title: "Solid Foundation",
    desc: "20+ years of printing excellence blended with global ISO 9001 and FSC quality certifications.",
  },
  {
    icon: Truck,
    title: "Quick Delivery",
    desc: "Committed to on-time delivery with a proven 99.9% dispatch accuracy rate for urgent orders.",
  },
  {
    icon: RefreshCw,
    title: "Different Approach",
    desc: "SYNCED digital prepress, press, and post-press systems ensuring seamless execution and optimum output.",
  },
];

const STATS = [
  { value: 500, suffix: "+", label: "Clients Served" },
  { value: 20, suffix: "+", label: "Years Experience" },
  { value: 99, suffix: ".9%", label: "On-Time Delivery" },
  { value: 100, suffix: "+", label: "Team Members" },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function StatCounter({
  value,
  suffix,
  label,
  started,
}: {
  value: number;
  suffix: string;
  label: string;
  started: boolean;
}) {
  const count = useCountUp(value, 2000, started);
  return (
    <motion.div variants={fadeInUp} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-copper mb-1 font-display tabular-nums">
        {count}
        <span className="text-2xl md:text-3xl">{suffix}</span>
      </div>
      <div className="text-xs md:text-sm font-mono text-slate-500 uppercase tracking-widest font-semibold">
        {label}
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="why-us"
      className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200/80"
      ref={ref}
    >
      {/* Ambient background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-copper/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-copper font-semibold mb-3 block px-3.5 py-1.5 bg-copper/10 rounded-full border border-copper/20 w-fit mx-auto">
            Why Unicorn Print Pack
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 font-display">
            Which Makes Us Exclusionary In The Industry
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Four foundational pillars of excellence that guide our manufacturing precision and client commitment every single day.
          </p>
        </motion.div>

        {/* Animated stat counters (Light Theme) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16 p-8 rounded-2xl bg-white border border-slate-200 shadow-md"
        >
          {STATS.map((stat, i) => (
            <StatCounter
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              started={inView}
            />
          ))}
        </motion.div>

        {/* Pillars grid (Light Theme) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-copper/40 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-copper/10 border border-copper/30 flex items-center justify-center mb-6 group-hover:bg-copper group-hover:text-white transition-all duration-300">
                <pillar.icon
                  className="w-8 h-8 text-copper group-hover:text-white transition-colors duration-300"
                  strokeWidth={1.75}
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
