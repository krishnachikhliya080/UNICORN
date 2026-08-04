/**
 * AboutPage — Unicorn Print Pack dedicated About Us page.
 * Mirrors Printwell's about-us.php structure with dark header banner, story in brief,
 * interactive company timeline, 4 pillars, vision & mission cards, and footer.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { IMAGES } from "@/const";
import { Target, Compass, Award, ShieldCheck, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";

const TIMELINE = [
  {
    year: "1994",
    title: "Inception with Single-Color Offset",
    desc: "Unicorn Print Pack started operations with a single-color offset machine and a vision to deliver premium quality print products.",
  },
  {
    year: "2005",
    title: "Expansion to Heidelberg Multi-Color",
    desc: "Upgraded facility with Heidelberg 4-color presses to cater to rapid industrial packaging demand across Gujarat.",
  },
  {
    year: "2012",
    title: "Dedicated Rigid Box Plant",
    desc: "Established specialized luxury rigid box manufacturing division with automated grooving and magnet insertion.",
  },
  {
    year: "2018",
    title: "ISO & FSC Quality Certifications",
    desc: "Achieved ISO 9001:2015 and FSC eco-friendly packaging standards for global export compliance.",
  },
  {
    year: "2024",
    title: "Next-Gen 5-Color Press & Automated CTP",
    desc: "Installed high-speed Heidelberg 5-color inline UV press and fully automated pre-press CTP workflow.",
  },
];

export default function AboutPage() {
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(4);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Page Header */}
      <PageHeader
        title="Inventive & Enthusiastic Printing Genius in the Region"
        subtitle="Delivering precision packaging and commercial offset printing excellence for over two decades."
        breadcrumb="ABOUT US"
        bgImage={IMAGES.aboutVisual}
      />

      {/* ── STORY IN BRIEF ── */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-100">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Text Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-copper font-bold px-3.5 py-1.5 bg-copper/10 rounded-full border border-copper/20 inline-block mb-4">
                Story In Brief
              </span>
              <h2 className="text-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-6 leading-tight">
                Welcome to the <br />
                <span className="text-copper">Unicorn Print Pack Studio</span>
              </h2>
              <p className="text-body text-base md:text-lg text-text-muted leading-relaxed mb-6">
                The exciting journey of Unicorn Print Pack commenced with a single vision: 
                to provide world-class offset printing and structural packaging under one roof. 
                Over the years, our commitment to technical perfection has turned us into an industry benchmark.
              </p>
              <p className="text-body text-base text-text-muted leading-relaxed mb-8">
                The key to our success lies in our unyielding commitment to client satisfaction — 
                serving with the age-old motto that <strong>Customer Satisfaction is Paramount</strong>. 
                By introducing modern contemporary technology, we deliver packaging solutions that boost brand presence and delight customers.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                <div>
                  <h4 className="text-3xl font-bold text-copper font-display">20+</h4>
                  <p className="text-xs font-mono uppercase text-slate-500 mt-1 font-semibold">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-copper font-display">500+</h4>
                  <p className="text-xs font-mono uppercase text-slate-500 mt-1 font-semibold">Global Brands</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-copper font-display">99.9%</h4>
                  <p className="text-xs font-mono uppercase text-slate-500 mt-1 font-semibold">Quality Standard</p>
                </div>
              </div>
            </motion.div>

            {/* Visual Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group">
                <img
                  src={IMAGES.aboutVisual}
                  alt="Unicorn Facility & Material Crafting"
                  className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-copper text-white text-xs font-mono uppercase rounded-sm mb-2">
                    <Award size={14} /> ISO 9001 Certified
                  </div>
                  <h3 className="text-lg font-bold font-display">State-of-the-Art Production Facility</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COMPANY TIMELINE & MILESTONES (Printwell style) ── */}
      <section className="py-20 bg-[#121926] text-white relative overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-copper font-bold px-3.5 py-1.5 bg-copper/15 border border-copper/30 rounded-full inline-block mb-3">
              Our Journey
            </span>
            <h2 className="text-display text-3xl md:text-4xl font-bold text-white">
              Milestones of Excellence
            </h2>
            <p className="mt-2 text-slate-300 text-sm">
              Explore how we grew from a single printing press to an international packaging hub.
            </p>
          </div>

          {/* Years Navigation */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-12 flex-wrap">
            {TIMELINE.map((item, idx) => (
              <button
                key={item.year}
                onClick={() => setActiveTimelineIdx(idx)}
                className={`px-5 py-2.5 rounded-full font-mono text-sm font-bold transition-all duration-300 ${
                  activeTimelineIdx === idx
                    ? "bg-copper text-white shadow-lg shadow-copper/30 scale-105"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>

          {/* Active Milestone Card */}
          <div className="max-w-3xl mx-auto bg-white/5 border border-white/15 rounded-2xl p-8 md:p-10 backdrop-blur-md shadow-2xl relative">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-copper/20 border border-copper/40 flex items-center justify-center text-copper font-mono font-bold text-2xl flex-shrink-0">
                {TIMELINE[activeTimelineIdx].year}
              </div>
              <div>
                <h3 className="text-display text-2xl font-bold text-white mb-3">
                  {TIMELINE[activeTimelineIdx].title}
                </h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  {TIMELINE[activeTimelineIdx].desc}
                </p>
              </div>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10 text-xs font-mono">
              <button
                onClick={() => setActiveTimelineIdx((prev) => (prev > 0 ? prev - 1 : TIMELINE.length - 1))}
                className="flex items-center gap-1 text-slate-400 hover:text-copper transition-colors"
              >
                <ChevronLeft size={16} /> Previous Milestone
              </button>
              <span className="text-copper">
                {activeTimelineIdx + 1} / {TIMELINE.length}
              </span>
              <button
                onClick={() => setActiveTimelineIdx((prev) => (prev < TIMELINE.length - 1 ? prev + 1 : 0))}
                className="flex items-center gap-1 text-slate-400 hover:text-copper transition-colors"
              >
                Next Milestone <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 PILLARS SECTION ── */}
      <WhyChooseUs />

      {/* ── VISION & MISSION ── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="p-8 md:p-10 rounded-2xl bg-slate-50 border border-slate-200 hover:border-copper/40 transition-all duration-300 group shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-copper/10 border border-copper/30 flex items-center justify-center text-copper mb-6 group-hover:bg-copper group-hover:text-white transition-colors duration-300">
                <Target size={28} />
              </div>
              <h3 className="text-display text-2xl font-bold text-charcoal mb-4">Our Vision</h3>
              <p className="text-text-muted text-base leading-relaxed">
                To be global pioneers in eco-friendly, high-precision structural packaging and commercial printing, 
                empowering brands worldwide with sustainable and visually stunning unboxing experiences.
              </p>
            </div>

            {/* Mission Card */}
            <div className="p-8 md:p-10 rounded-2xl bg-slate-50 border border-slate-200 hover:border-copper/40 transition-all duration-300 group shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-copper/10 border border-copper/30 flex items-center justify-center text-copper mb-6 group-hover:bg-copper group-hover:text-white transition-colors duration-300">
                <Compass size={28} />
              </div>
              <h3 className="text-display text-2xl font-bold text-charcoal mb-4">Our Mission</h3>
              <p className="text-text-muted text-base leading-relaxed">
                To continuously integrate cutting-edge printing technology, automate structural prepress, 
                and maintain strict quality controls, delivering zero-defect packaging with rapid turnaround.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      <WhatsAppButton />
      <BackToTop />
      <Footer />
    </div>
  );
}
