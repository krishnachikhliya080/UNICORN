/**
 * CTAVideoSection — Printwell-style dark CTA banner.
 * Left: Tagline + brochure download button. Right: Circular play icon + link.
 * Dark teal / charcoal full-width banner with ambient glow.
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Download, PlayCircle, ArrowRight } from "lucide-react";

export default function CTAVideoSection() {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      ref={ref}
      className="relative py-0 overflow-hidden bg-[#0d1520]"
    >
      {/* Ambient background blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-copper/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/6 blur-[100px] pointer-events-none" />

      <div className="container relative z-10 py-16 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
          {/* Left: Tagline + CTA */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1 text-center md:text-left"
          >
            <span className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-copper font-bold px-4 py-1.5 bg-copper/15 border border-copper/30 rounded-full mb-5">
              Start Your Project
            </span>
            <h2 className="text-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-snug">
              Precision Packaging.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-copper to-amber-400">
                Delivered On Time.
              </span>
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-md mx-auto md:mx-0 mb-8 leading-relaxed font-sans">
              Partner with Unicorn Print Pack — where industrial scale meets artisan precision.
              Download our product brochure or get a customised quote today.
            </p>
            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <a
                href="/images/UNICORN-PRINT-PACK.pdf"
                download="Unicorn-Print-Pack-Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-copper hover:bg-copper-dark text-white font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 shadow-lg shadow-copper/25 group"
              >
                <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                Download Brochure
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/8 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 group"
              >
                Get a Quote
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Right: Play Button / Video CTA */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex-shrink-0 flex flex-col items-center gap-4"
          >
            {/* Circular animated play button */}
            <div className="relative">
              {/* Pulsing rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-copper/30"
                animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-copper/20"
                animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              {/* Core button */}
              <a
                href="https://wa.me/918690354354?text=Hi! I'd like to learn more about Unicorn Print Pack's products."
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-copper hover:bg-copper-dark flex items-center justify-center shadow-2xl shadow-copper/30 transition-all duration-300 group"
              >
                <PlayCircle
                  size={40}
                  className="text-white group-hover:scale-110 transition-transform duration-300"
                />
              </a>
            </div>
            <div className="text-center">
              <p className="text-white/70 text-xs font-mono uppercase tracking-widest">
                Talk to an Expert
              </p>
              <a
                href="tel:+918690354354"
                className="text-copper font-bold text-sm md:text-base hover:text-copper-light transition-colors"
              >
                +91 86903 54354
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-copper/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10" />
    </section>
  );
}
