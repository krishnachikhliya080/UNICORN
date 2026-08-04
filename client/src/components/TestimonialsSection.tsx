/**
 * TestimonialsSection — Printwell-inspired layout.
 * Full-width sky-blue/copper-gradient banner with large italic testimonial on the left.
 * White floating quote form card on the right, overlapping the banner.
 * "Speak with our Executive" phone/WhatsApp contact badges.
 */
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Phone,
  MessageCircle,
  Send,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Unicorn Print Pack delivered 50,000 rigid boxes with unmatched precision and zero delay. Their online UV coating finish is spectacular.",
    name: "Rajesh Maliya",
    role: "Managing Director",
    company: "Varmora Plastech",
    initials: "RM",
  },
  {
    quote:
      "Consistent quality across every batch. Their mono cartons meet our strict food-safety standards perfectly every single run.",
    name: "Vikram Patel",
    role: "Procurement Lead",
    company: "Fern Residency",
    initials: "VP",
  },
  {
    quote:
      "The embossed logo and soft-touch coating on our cosmetics packaging elevated our entire brand perception on retail shelves.",
    name: "Priya Sharma",
    role: "Brand Director",
    company: "Adison Luxury",
    initials: "PS",
  },
  {
    quote:
      "From pre-press CTP setup to final post-press die-cutting, their team executed our complex multi-layer packaging flawlessly.",
    name: "Deepak Chauhan",
    role: "Operations Head",
    company: "Trozen Pack",
    initials: "DC",
  },
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const { ref, inView } = useInView(0.1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "Packaging Cartons",
    message: "",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [emblaApi]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error("Please fill in your name, phone number, and email.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Thank you! Your quote request has been submitted.");
    }, 1200);
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative overflow-hidden"
    >
      {/* ── BLUE BANNER BACKGROUND (Printwell-style) ── */}
      <div
        className="relative w-full py-16 md:py-20"
        style={{
          background:
            "linear-gradient(135deg, #1a3a6e 0%, #2563a8 40%, #1e90c8 75%, #00b4d8 100%)",
        }}
      >
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-10 items-start">
            {/* ── LEFT: Section Label + Testimonial Slider ── */}
            <div className="lg:col-span-6 flex flex-col gap-6 pb-8 lg:pb-0">
              {/* Label */}
              <div>
                <span className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-white/70 font-semibold mb-4">
                  — What Our Clients Say
                </span>
                <h2 className="text-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                  Delivering Excellence To<br className="hidden md:block" />
                  <span className="text-white/90">Industry Leaders</span>
                </h2>
                <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-md">
                  Trusted by top corporate brands for reliable offset printing,
                  folding cartons, and luxury packaging solutions.
                </p>
              </div>

              {/* Embla Testimonial Slider */}
              <div className="relative">
                <div
                  className="overflow-hidden rounded-xl"
                  ref={emblaRef}
                >
                  <div className="flex">
                    {TESTIMONIALS.map((t, i) => (
                      <div key={i} className="flex-[0_0_100%] min-w-0">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/20">
                          <Quote className="w-10 h-10 text-white/30 mb-4" />
                          <p className="text-white text-base md:text-lg leading-relaxed italic mb-6 font-serif">
                            "{t.quote}"
                          </p>
                          <div className="flex items-center gap-3 pt-4 border-t border-white/15">
                            <div className="w-11 h-11 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                              {t.initials}
                            </div>
                            <div>
                              <p className="text-white font-bold text-sm">{t.name}</p>
                              <p className="text-white/60 text-xs font-mono">
                                {t.role}, {t.company}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel controls */}
                <div className="flex items-center gap-3 mt-4 justify-start">
                  <button
                    onClick={scrollPrev}
                    className="w-9 h-9 rounded-full bg-white/10 border border-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-200"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="w-9 h-9 rounded-full bg-white/10 border border-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-200"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Executive Contact Badges (Printwell style) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <a
                  href="tel:+918690354354"
                  className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    <Phone size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-white/70 text-[10px] font-mono uppercase tracking-widest font-bold">
                      Call Our Executive
                    </p>
                    <p className="text-white font-bold text-sm">
                      +91 86903 54354
                    </p>
                    <p className="text-white/50 text-[10px]">Mon–Sat, 10 AM–7 PM</p>
                  </div>
                </a>
                <a
                  href="https://wa.me/918690354354?text=Hi! I need a quote for packaging."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-[#25D366]/15 backdrop-blur-sm rounded-xl border border-[#25D366]/30 hover:bg-[#25D366]/25 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    <MessageCircle size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-[10px] font-mono uppercase tracking-widest font-bold">
                      WhatsApp Query
                    </p>
                    <p className="text-white font-bold text-sm">
                      Instant Response
                    </p>
                    <p className="text-white/50 text-[10px]">For delivery & urgent orders</p>
                  </div>
                </a>
              </div>
            </div>

            {/* ── RIGHT: White Floating Quote Form Card ── */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
              >
                {/* Card header */}
                <div className="px-7 pt-7 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-sm bg-copper/10 flex items-center justify-center">
                      <Send size={15} className="text-copper" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-copper font-bold">
                      Free Quote Request
                    </span>
                  </div>
                  <h3 className="text-display text-xl font-bold text-charcoal">
                    Get Your Free Quote
                  </h3>
                  <p className="text-text-muted text-xs mt-1">
                    Fill in the form below and our executive will be in touch shortly.
                  </p>
                </div>

                {/* Card body */}
                <div className="px-7 py-6">
                  {submitted ? (
                    <div className="py-10 text-center">
                      <CheckCircle2 size={48} className="text-copper mx-auto mb-4" />
                      <h4 className="text-display text-xl font-bold text-charcoal mb-2">
                        Quote Request Received!
                      </h4>
                      <p className="text-text-muted text-sm max-w-xs mx-auto">
                        Our sales executive will contact you with a custom quotation and structural
                        design suggestions.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono text-charcoal mb-1 uppercase font-bold tracking-wider">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="e.g. Rajesh Maliya"
                            className="w-full bg-warm-gray border border-charcoal/10 rounded-sm px-3 py-2.5 text-sm text-charcoal placeholder:text-text-muted/40 focus:outline-none focus:border-copper transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-charcoal mb-1 uppercase font-bold tracking-wider">
                            Business Name
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) =>
                              setFormData({ ...formData, company: e.target.value })
                            }
                            placeholder="e.g. Adison Ltd"
                            className="w-full bg-warm-gray border border-charcoal/10 rounded-sm px-3 py-2.5 text-sm text-charcoal placeholder:text-text-muted/40 focus:outline-none focus:border-copper transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono text-charcoal mb-1 uppercase font-bold tracking-wider">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder="name@company.com"
                            className="w-full bg-warm-gray border border-charcoal/10 rounded-sm px-3 py-2.5 text-sm text-charcoal placeholder:text-text-muted/40 focus:outline-none focus:border-copper transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-charcoal mb-1 uppercase font-bold tracking-wider">
                            Phone No. *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            placeholder="+91 98765 43210"
                            className="w-full bg-warm-gray border border-charcoal/10 rounded-sm px-3 py-2.5 text-sm text-charcoal placeholder:text-text-muted/40 focus:outline-none focus:border-copper transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-charcoal mb-1 uppercase font-bold tracking-wider">
                          Looking For
                        </label>
                        <select
                          value={formData.product}
                          onChange={(e) =>
                            setFormData({ ...formData, product: e.target.value })
                          }
                          className="w-full bg-warm-gray border border-charcoal/10 rounded-sm px-3 py-2.5 text-sm text-charcoal focus:outline-none focus:border-copper transition-colors cursor-pointer"
                        >
                          <option value="Packaging Cartons">Packaging Cartons (FBB / Duplex)</option>
                          <option value="Rigid Gift Boxes">Rigid Luxury Gift Boxes</option>
                          <option value="Corrugated Cartons">Corrugated Shipping Cartons</option>
                          <option value="Commercial Offset">Commercial Brochures &amp; Catalogs</option>
                          <option value="Stickers & Labels">Product Stickers &amp; Labels</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-charcoal mb-1 uppercase font-bold tracking-wider">
                          Approx. Budget / Quantity
                        </label>
                        <textarea
                          rows={2}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          placeholder="e.g. 5000 units, matte lamination, 4-week delivery..."
                          className="w-full bg-warm-gray border border-charcoal/10 rounded-sm px-3 py-2.5 text-sm text-charcoal placeholder:text-text-muted/40 focus:outline-none focus:border-copper transition-colors resize-none"
                        />
                      </div>

                      {/* Submit row */}
                      <div className="flex gap-3 pt-1">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="flex-1 py-3 bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                        >
                          <Send size={13} />
                          {submitting ? "Submitting..." : "Submit"}
                        </button>
                        <a
                          href="#contact"
                          onClick={(e) => {
                            e.preventDefault();
                            document
                              .querySelector("#contact")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="flex-1 py-3 bg-copper hover:bg-copper-dark text-white font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                        >
                          Get Detailed Quote →
                        </a>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
