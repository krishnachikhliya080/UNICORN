import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Printer, Box, FileText, Layers, Calendar, Tag, Package, ChevronRight, CheckCircle2 } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  image: string;
  highlights: string[];
}

const SERVICES_4P: ServiceItem[] = [
  {
    id: "offset",
    title: "5 Color Offset Printing with Online Coater",
    description:
      "Ultra-high precision German Heidelberg press delivering vibrant color accuracy, spot UV coating, and protective aqueous varnish in a single pass.",
    icon: Printer,
    image: "/images/hero-products/t-shirt.png",
    highlights: ["State-of-the-art Heidelberg CD 102", "Online UV & Matte Coater", "High-speed 15,000 sheets/hour"],
  },
  {
    id: "fbb-packaging",
    title: "FBB, SBB & Duplex Board Packaging",
    description:
      "Premium folding boxboard and solid bleached board folding cartons engineered for luxury retail, pharmaceuticals, cosmetics, and food products.",
    icon: Box,
    image: "/images/hero-products/luxury-box.png",
    highlights: ["Custom Structural Engineering", "Foil Stamping & Embossing", "Eco-friendly Recyclable Stock"],
  },
  {
    id: "brochure-flyer",
    title: "Brochure, Flyer & Dangler",
    description:
      "High-impact marketing collateral with crisp typography, metallic foiling, custom die-cuts, and premium texture finishes.",
    icon: FileText,
    image: "/images/hero-products/brochure.png",
    highlights: ["Corporate Profiles & Catalogs", "Custom Gate-fold & Tri-folds", "Vibrant Color Fidelity"],
  },
  {
    id: "plastic-transparent",
    title: "Plastic Transparent Packaging",
    description:
      "Clear PET and PVC transparent folding boxes providing crystal-clear product visibility for cosmetics, electronics, and gifts.",
    icon: Layers,
    image: "/images/hero-products/corrugated-box.png",
    highlights: ["High-clarity Scratch-resistant PET", "Soft-crease Automatic Folding", "Custom Printed Overlay"],
  },
  {
    id: "calendar-literature",
    title: "Calendar & Literature",
    description:
      "Custom desk calendars, wall calendars, corporate diaries, and hardcover publication printing designed to last all year.",
    icon: Calendar,
    image: "/images/hero-products/notebook.png",
    highlights: ["Spiral & Wire-O Binding", "Custom Date Grid Formatting", "Hardcover & Softcover Options"],
  },
  {
    id: "labels-stickers",
    title: "Product Labels & Stickers",
    description:
      "Roll-fed and sheet-fed self-adhesive labels for FMCG, pharmaceuticals, beverages, and industrial packaging applications.",
    icon: Tag,
    image: "/images/hero-products/sticker-roll.png",
    highlights: ["Waterproof Vinyl & Chromo", "Automated Roll Dispensing", "Custom Die-Cut Shapes"],
  },
  {
    id: "corrugated-box",
    title: "Corrugated Carton & Specialized Box",
    description:
      "Heavy-duty corrugated shipping boxes, e-commerce mailers, and rigid gift boxes built for maximum protection and elegance.",
    icon: Package,
    image: "/images/hero-products/shopping-bag.png",
    highlights: ["3-Ply & 5-Ply Strength", "Custom Inner Inserts & Trays", "Custom Printed Branding"],
  },
];

const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export default function The4PsSection() {
  const [activeId, setActiveId] = useState<string>("offset");
  const activeService = SERVICES_4P.find((s) => s.id === activeId) || SERVICES_4P[0];
  const { ref, inView } = useInView(0.1);

  return (
    <section id="the-4ps" className="py-24 bg-slate-100 text-slate-900 relative overflow-hidden border-b border-slate-200/80" ref={ref}>
      {/* Background Accent Gradient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-copper/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest text-copper bg-copper/10 border border-copper/20 uppercase font-semibold mb-4">
            Integrated Manufacturing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 font-display">
            The 4P's of Pre-Press, Printing, Post-Press & Packaging
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600">
            Everything under one roof — from pre-press digital CTP technology to offset printing, automated post-press finishing, and luxury packaging creation.
          </p>
        </motion.div>

        {/* 4Ps Interactive Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left Column: Category Selector List */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 flex flex-col gap-2.5">
            {SERVICES_4P.map((service) => {
              const Icon = service.icon;
              const isActive = service.id === activeId;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveId(service.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                    isActive
                      ? "bg-white border-copper/50 shadow-md shadow-copper/10 text-slate-900 font-bold"
                      : "bg-white/60 border-slate-200/80 text-slate-700 hover:bg-white hover:text-slate-900 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3.5 pr-2">
                    <div
                      className={`p-2.5 rounded-lg transition-colors ${
                        isActive
                          ? "bg-copper text-white"
                          : "bg-slate-100 text-slate-600 group-hover:text-copper group-hover:bg-copper/10"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <span className="text-sm font-semibold tracking-wide leading-tight">
                      {service.title}
                    </span>
                  </div>
                  <ChevronRight
                    size={18}
                    className={`transition-transform duration-300 flex-shrink-0 ${
                      isActive ? "translate-x-1 text-copper" : "opacity-40 group-hover:opacity-100 text-slate-400"
                    }`}
                  />
                </button>
              );
            })}
          </motion.div>

          {/* Right Column: Active Category Showcase Card */}
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full bg-white rounded-2xl border border-slate-200 p-6 md:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-copper uppercase tracking-widest px-3 py-1 bg-copper/10 rounded-full border border-copper/20 font-semibold">
                      Featured Capability
                    </span>
                    <activeService.icon className="text-copper/40" size={32} />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-snug font-display">
                    {activeService.title}
                  </h3>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                    {activeService.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2.5 mb-8">
                    {activeService.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-copper flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview Image */}
                <div className="relative w-full h-56 md:h-64 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 flex items-center justify-center p-4">
                  <img
                    src={activeService.image}
                    alt={activeService.title}
                    className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3 text-xs font-mono text-slate-600 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                    Unicorn Manufacturing
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
