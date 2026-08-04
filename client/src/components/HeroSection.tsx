/**
 * HeroSection — Option A Full-Screen 3D Tabletop Studio Render Stage (Printwell Reference Match)
 * Displays the high-resolution 3D tabletop product render (`IMAGES.brandMockup`) in full studio glory
 * with 3D mouse-tilt perspective tracking, smooth scroll-parallax depth, and brand typography.
 */

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { IMAGES } from "@/const";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, translateX: 0, translateY: 0 });

  // Scroll parallax logic
  const { scrollY } = useScroll();
  const cardParallaxY = useTransform(scrollY, [0, 600], [0, 75]);
  const textParallaxY = useTransform(scrollY, [0, 600], [0, -35]);

  // Mouse 3D perspective tilt logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const normY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      // Max 2.2 deg rotateX, 2.5 deg rotateY & 4px translation
      setTilt({
        rotateX: -normY * 2.2,
        rotateY: normX * 2.5,
        translateX: normX * 4,
        translateY: normY * 4,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-10px)] flex flex-col items-center justify-between overflow-hidden bg-[#121926] pt-28 md:pt-24 pb-6 select-none"
    >
      {/* STUDIO BACKGROUND & LIGHTING */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Dark Navy Studio Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#172232] via-[#121926] to-[#0c111a]" />

        {/* Soft Overhead Spotlight Glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] rounded-full blur-[160px] opacity-35 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(212,120,60,0.35) 0%, rgba(18,25,38,0) 75%)" }}
        />

        {/* Subtle Floor Vignette Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0c111a] via-[#0c111a]/85 to-transparent pointer-events-none z-10" />
      </div>

      {/* HERO HEADLINE & BRANDING OVERLAY */}
      <motion.div
        style={{ y: textParallaxY }}
        className="relative z-30 max-w-4xl mx-auto text-center px-4 pt-2 md:pt-4"
      >
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-copper/15 border border-copper/30 backdrop-blur-md mb-3 shadow-md"
        >
          <Sparkles className="w-4 h-4 text-copper animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-copper font-semibold">
            Unicorn Print Pack Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display leading-[1.12] drop-shadow-lg"
        >
          Your Vision. Our Precision.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-copper via-amber-400 to-copper">
            Perfect Print.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2.5 text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed drop-shadow-sm font-medium"
        >
          Premium custom packaging & high-precision commercial printing engineered for industry-leading global brands.
        </motion.p>

        {/* HIGH CONTRAST ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#product-showcase"
            className="px-6 py-3 rounded-full bg-copper hover:bg-copper-dark text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-copper/25 flex items-center gap-2 group"
          >
            <span>Explore Products</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/20 text-white border-2 border-white/40 hover:border-white font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-300 shadow-md"
          >
            Get Custom Quote
          </a>
        </motion.div>
      </motion.div>

      {/* MAIN 3D TABLETOP STUDIO RENDER STAGE (OPTION A SINGLE COMPOSITE IMAGE) */}
      <div className="relative z-20 w-full max-w-[1320px] mx-auto px-3 sm:px-6 my-auto flex items-center justify-center perspective-[1200px]">
        <motion.div
          style={{
            y: cardParallaxY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[1200px] rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.9)] border border-white/10 group transition-transform duration-150 ease-out"
        >
          {/* Subtle Mouse 3D Tilt Wrapper */}
          <div
            style={{
              transform: `rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg) translate3d(${tilt.translateX.toFixed(2)}px, ${tilt.translateY.toFixed(2)}px, 0px)`,
              transition: "transform 0.15s ease-out",
            }}
            className="relative w-full h-full"
          >
            {/* High-Resolution 3D Tabletop Composition Image */}
            <img
              src={IMAGES.brandMockup}
              alt="Unicorn Print Pack 3D Packaging Studio Composition"
              className="w-full h-auto object-cover max-h-[68vh] md:max-h-[72vh] mx-auto block filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]"
            />

            {/* Subtle Ambient Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c111a]/70 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* SCROLL DOWN INDICATOR */}
      <motion.div
        className="relative z-30 pt-2 flex flex-col items-center gap-1 cursor-pointer"
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 0.8 },
          y: { duration: 2.0, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
        }}
      >
        <ChevronDown className="text-copper w-6 h-6 hover:scale-110 transition-transform" />
      </motion.div>
    </section>
  );
}
