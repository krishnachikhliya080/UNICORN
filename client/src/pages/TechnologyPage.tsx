/**
 * TechnologyPage — Dedicated Technology & Infrastructure page matching Printwell's technology.php.
 * Features dark header banner, machinery equipment category tabs, detailed specs cards, and ISO quality badges.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import TechnologySection from "@/components/TechnologySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { IMAGES } from "@/const";
import { Cpu, Printer, Scissors, PackageCheck, ShieldCheck, Check } from "lucide-react";

const MACHINES = [
  {
    category: "pre-press",
    name: "Heidelberg Suprasetter CTP (Computer-to-Plate)",
    speed: "24 Plates / Hour",
    format: "1050 x 790 mm",
    desc: "Fully automated thermal CTP system generating high-definition dot structures for sharp text & vivid photo reproduction.",
    specs: ["Screening: 200 LPI Staccato FM", "Laser Type: Thermal Laser 830nm", "Workflow: Heidelberg Prinect Integration"],
  },
  {
    category: "press",
    name: "Heidelberg Speedmaster CS 102 5-Color + Coater",
    speed: "15,000 Sheets / Hour",
    format: "720 x 1020 mm",
    desc: "Premier 5-color offset printing press equipped with online UV & aqueous coating unit for high-speed luxury box runs.",
    specs: ["Spectral Color Control: Prinect Inpress Control", "Inline Finish: Drip-off, Matt & Gloss UV Coating", "Substrate Range: 60 gsm paper up to 1.0 mm board"],
  },
  {
    category: "post-press",
    name: "Bobst Automatic Die-Cutting Press",
    speed: "7,500 Sheets / Hour",
    format: "760 x 1060 mm",
    desc: "High-precision automatic die-cutting and embossing press ensuring micron-accurate registration for complex folding cartons.",
    specs: ["Max Cutting Force: 250 Tons", "Stripping Station: Dynamic waste stripping", "Embossing: High-pressure 3D foil embossing"],
  },
  {
    category: "packaging",
    name: "Automatic High-Speed Folder-Gluer",
    speed: "400 Meters / Min",
    format: "Straight Line, Crash Lock & 4/6 Corner",
    desc: "Versatile automatic gluing machine equipped with electronic cold glue injection and quality inspection sensors.",
    specs: ["Glue System: Nordson Electronic Glue Guns", "Code Reader: Barcode & Braille inspection unit", "Output: Up to 100,000 cartons per shift"],
  },
];

export default function TechnologyPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = activeCategory === "all" ? MACHINES : MACHINES.filter(m => m.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Page Header */}
      <PageHeader
        title="We Believe in Cutting-Edge Technology for breakthrough excellence"
        subtitle="Our state-of-the-art European machinery fleet ensures precision, color consistency, and rapid production velocity."
        breadcrumb="TECHNOLOGY"
        bgImage={IMAGES.facilityHero}
      />

      {/* ── INTRO SECTION ── */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="container max-w-7xl mx-auto px-4 text-center max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-copper font-bold px-3.5 py-1.5 bg-copper/10 rounded-full border border-copper/20 inline-block mb-4">
            Industrial Infrastructure
          </span>
          <h2 className="text-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Our Offset Printing & Packaging Technology
          </h2>
          <p className="text-text-muted text-base leading-relaxed">
            Whether you need a short-run luxury rigid box or high-volume duplex cartons, 
            our integrated Heidelberg & Bobst production plant delivers consistent shade matching and precision finishing.
          </p>
        </div>
      </section>

      {/* Interactive Technology Component */}
      <TechnologySection />

      {/* ── MACHINERY SPECS SHOWCASE ── */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-display text-2xl md:text-3xl font-bold text-charcoal">
              Machinery Specifications
            </h3>
            <p className="text-text-muted text-sm mt-2">
              High-performance European machinery equipped with automated quality checks.
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {[
                { id: "all", label: "All Machinery" },
                { id: "pre-press", label: "Pre-Press (CTP)" },
                { id: "press", label: "Printing Press" },
                { id: "post-press", label: "Post-Press (Die-Cut)" },
                { id: "packaging", label: "Gluer & Assembly" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 text-xs font-mono uppercase font-bold rounded-full transition-all duration-200 ${
                    activeCategory === tab.id
                      ? "bg-copper text-white shadow-md shadow-copper/20"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-copper"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-copper/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-copper font-bold px-2.5 py-1 bg-copper/10 rounded-sm inline-block mb-2">
                      {item.category}
                    </span>
                    <h4 className="text-display text-lg font-bold text-charcoal">{item.name}</h4>
                  </div>
                </div>

                <p className="text-text-muted text-sm leading-relaxed mb-6">{item.desc}</p>

                {/* Specs list */}
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Max Speed:</span>
                    <span className="font-bold text-charcoal">{item.speed}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Sheet Format:</span>
                    <span className="font-bold text-charcoal">{item.format}</span>
                  </div>
                  {item.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-600">
                      <Check size={12} className="text-copper flex-shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Quote */}
      <TestimonialsSection />

      <WhatsAppButton />
      <BackToTop />
      <Footer />
    </div>
  );
}
