import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useIsMobile } from "@/hooks/useMobile";
import { Play, X, Printer, Cpu, Scissors, Stamp, CheckCircle2 } from "lucide-react";

export default function TechnologySection() {
  const { ref, inView } = useInView(0.1);
  const [videoOpen, setVideoOpen] = useState(false);
  const isMobile = useIsMobile();
  const slideX = isMobile ? 15 : 40;

  return (
    <section id="technology" className="py-24 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200/80" ref={ref}>
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Machinery Info */}
          <motion.div
            initial={{ x: -slideX, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-copper px-3.5 py-1.5 bg-copper/10 rounded-full border border-copper/20 inline-block mb-4 font-semibold">
              Advanced Infrastructure
            </span>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight font-display">
              Inspiring the Next Generation of Printing Technology
            </h2>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
              With brand new printing technology CD 102 – 5 + LX Online UV Printing Press & Prepress technology from German expert Heidelberg, the Unicorn group leads the packaging and commercial printing industry.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                "Heidelberg CD 102 5-Color Press",
                "Online UV & Aqueous Varnish",
                "Automated Prepress CTP Workflow",
                "Bobst Automatic Die-Cutting",
                "High-Speed Folder Gluers",
                "100% Quality Inspection Vision",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                  <CheckCircle2 size={18} className="text-copper flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="px-8 py-3.5 bg-copper text-white font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-copper-dark transition-all duration-300 shadow-md shadow-copper/20"
              >
                Explore Machinery Specs
              </a>
            </div>
          </motion.div>

          {/* Right Column: Factory Video Card Launcher */}
          <motion.div
            initial={{ x: slideX, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-2 shadow-xl group">
              <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                {/* Background Machinery Image Overlay */}
                <img
                  src="/images/hero-products/luxury-box.png"
                  alt="Heidelberg Machinery"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-110 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                {/* Play Button Overlay */}
                <button
                  onClick={() => setVideoOpen(true)}
                  className="relative z-10 flex flex-col items-center gap-3 group/btn"
                >
                  <div className="w-20 h-20 rounded-full bg-copper/90 text-white flex items-center justify-center shadow-2xl group-hover/btn:scale-110 group-hover/btn:bg-copper transition-all duration-300">
                    <Play size={32} className="ml-1 fill-white" />
                  </div>
                  <span className="text-sm font-semibold tracking-wider text-slate-800 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
                    Play Factory Video
                  </span>
                </button>

                {/* Bottom Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-mono bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                  <span>German Engineering Heidelberg Press</span>
                  <span className="text-copper font-bold">15,000 SPH</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>
              <div className="aspect-video w-full">
                <video
                  src="/Screen Recording 2026-07-30 112730.mp4"
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
