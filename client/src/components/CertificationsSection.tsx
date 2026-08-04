/**
 * CertificationsSection — Animated certification badges.
 * Design: Editorial Atelier — centered badges with copper accent, fade-in animation.
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Shield, Award, Globe, Leaf } from "lucide-react";

const CERTS = [
  { icon: Shield, title: "ISO 9001:2015", desc: "Quality Management" },
  { icon: Award, title: "FSC Certified", desc: "Sustainable Forestry" },
  { icon: Globe, title: "BSCI Audit", desc: "Ethical Compliance" },
  { icon: Leaf, title: "Eco-Friendly", desc: "Sustainable Practices" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const badge = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function CertificationsSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="py-20 bg-charcoal relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(200,105,62,0.3),transparent_60%)]" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-12"
        >
          <span className="text-body text-sm tracking-[0.25em] uppercase text-copper font-semibold mb-4 block">
            Trust & Quality
          </span>
          <h2 className="text-display text-3xl md:text-4xl font-bold text-white mb-4">
            Certifications & Compliance
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {CERTS.map((cert, i) => (
            <motion.div
              key={i}
              variants={badge}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 border-2 border-copper/30 flex items-center justify-center mb-3 group-hover:border-copper/60 group-hover:bg-copper/10 transition-all duration-300">
                <cert.icon className="w-10 h-10 md:w-12 md:h-12 text-copper" strokeWidth={1.5} />
              </div>
              <h4 className="text-body font-semibold text-white text-sm">{cert.title}</h4>
              <p className="text-body text-xs text-white/50">{cert.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
