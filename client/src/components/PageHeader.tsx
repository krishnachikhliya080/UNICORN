/**
 * PageHeader — Printwell-style sub-page header banner.
 * Features dark navy gradient background, large headline, decorative symbol, and breadcrumbs.
 */
import { motion } from "framer-motion";
import { ChevronRight, Home as HomeIcon } from "lucide-react";
import { Link } from "wouter";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb: string;
  bgImage?: string;
}

export default function PageHeader({ title, subtitle, breadcrumb, bgImage }: PageHeaderProps) {
  return (
    <div className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-[#121926] overflow-hidden select-none border-b border-white/10">
      {/* Background Gradient & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#172232] via-[#121926] to-[#0c111a] opacity-95" />
        {bgImage && (
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover opacity-20 mix-blend-overlay filter blur-[1px]"
          />
        )}
        {/* Soft Radial Spotlight Glow */}
        <div
          className="absolute -top-32 right-10 w-[700px] h-[500px] rounded-full blur-[140px] opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(212,120,60,0.4) 0%, rgba(18,25,38,0) 70%)" }}
        />
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <div className="max-w-3xl">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display leading-[1.2] drop-shadow-md"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="mt-3 text-sm md:text-base text-slate-300 max-w-xl font-medium leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-mono uppercase tracking-widest text-slate-300"
          >
            <Link href="/" className="hover:text-copper transition-colors flex items-center gap-1">
              <HomeIcon size={12} />
              <span>HOME</span>
            </Link>
            <ChevronRight size={12} className="text-copper" />
            <span className="text-copper font-bold">{breadcrumb}</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
