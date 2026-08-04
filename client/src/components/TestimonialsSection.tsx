/**
 * TestimonialsSection — Industry-Level Light Theme Design.
 * Features a crisp, light background (slate-50), subtle copper accents,
 * glass-like white cards, star ratings, verified client badges,
 * and a high-converting instant quote form.
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
  Star,
  ShieldCheck,
  Building2,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  rating: number;
  location: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Unicorn Print Pack delivered 50,000 rigid boxes with unmatched precision and zero delay. Their online UV coating finish is spectacular.",
    name: "Rajesh Maliya",
    role: "Managing Director",
    company: "Varmora Plastech",
    initials: "RM",
    rating: 5,
    location: "Morbi, Gujarat",
  },
  {
    quote:
      "Consistent quality across every batch. Their mono cartons meet our strict food-safety standards perfectly every single run.",
    name: "Vikram Patel",
    role: "Procurement Lead",
    company: "Fern Residency",
    initials: "VP",
    rating: 5,
    location: "Rajkot, Gujarat",
  },
  {
    quote:
      "The embossed logo and soft-touch coating on our cosmetics packaging elevated our entire brand perception on retail shelves.",
    name: "Priya Sharma",
    role: "Brand Director",
    company: "Adison Luxury",
    initials: "PS",
    rating: 5,
    location: "Mumbai, MH",
  },
  {
    quote:
      "From pre-press CTP setup to final post-press die-cutting, their team executed our complex multi-layer packaging flawlessly.",
    name: "Deepak Chauhan",
    role: "Operations Head",
    company: "Trozen Pack",
    initials: "DC",
    rating: 5,
    location: "Ahmedabad, GJ",
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
    const id = setInterval(() => emblaApi.scrollNext(), 5500);
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
      className="relative py-20 md:py-28 bg-[#F8FAFC] text-slate-900 overflow-hidden border-t border-b border-slate-200/80"
    >
      {/* Light subtle decorative blobs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-copper/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ── LEFT: Client Testimonials Carousel & Trust Badges (LIGHT THEME) ── */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-copper font-bold px-3.5 py-1.5 bg-copper/10 border border-copper/20 rounded-full mb-4">
                <ShieldCheck size={14} className="text-copper" />
                Trusted By Industry Leaders
              </span>

              {/* Title */}
              <h2 className="text-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                What Our Clients Say About{" "}
                <span className="text-copper">Unicorn Print Pack</span>
              </h2>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8">
                Over 500+ corporate brands trust us for zero-defect offset printing, 
                rigid gift packaging, and duplex folding cartons.
              </p>

              {/* Embla Testimonial Carousel Card */}
              <div className="relative mb-6">
                <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                  <div className="flex">
                    {TESTIMONIALS.map((t, i) => (
                      <div key={i} className="flex-[0_0_100%] min-w-0">
                        <div className="bg-white border border-slate-200 rounded-2xl p-7 md:p-8 shadow-md hover:shadow-xl transition-shadow duration-300 relative">
                          
                          {/* Quote Icon & Star Rating Row */}
                          <div className="flex items-center justify-between mb-4">
                            <Quote className="w-9 h-9 text-copper/30" />
                            <div className="flex items-center gap-1">
                              {[...Array(t.rating)].map((_, sIdx) => (
                                <Star key={sIdx} size={15} className="fill-amber-400 text-amber-400" />
                              ))}
                              <span className="text-xs font-mono font-bold text-slate-500 ml-1">5.0</span>
                            </div>
                          </div>

                          {/* Quote Text */}
                          <p className="text-slate-700 text-base md:text-lg leading-relaxed italic font-serif mb-6">
                            "{t.quote}"
                          </p>

                          {/* Author Info */}
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-3.5">
                              <div className="w-11 h-11 rounded-full bg-copper/10 border border-copper/30 flex items-center justify-center text-copper font-bold text-sm font-mono flex-shrink-0">
                                {t.initials}
                              </div>
                              <div>
                                <p className="text-slate-900 font-bold text-sm font-sans">{t.name}</p>
                                <p className="text-slate-500 text-xs font-mono">
                                  {t.role}, <span className="text-copper font-semibold">{t.company}</span>
                                </p>
                              </div>
                            </div>
                            <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md hidden sm:inline-block">
                              {t.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-copper animate-pulse" />
                    <span className="text-xs font-mono text-slate-500 font-medium">Verified Client Reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={scrollPrev}
                      className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:bg-copper hover:border-copper hover:text-white transition-all text-slate-700 flex items-center justify-center shadow-sm cursor-pointer"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={scrollNext}
                      className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:bg-copper hover:border-copper hover:text-white transition-all text-slate-700 flex items-center justify-center shadow-sm cursor-pointer"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Direct Call Helpline Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-copper/10 border border-copper/20 flex items-center justify-center text-copper flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-copper uppercase tracking-wider font-bold">
                      Direct Executive Helpline
                    </p>
                    <a
                      href="tel:+918690354354"
                      className="text-lg font-bold text-slate-900 hover:text-copper transition-colors font-mono"
                    >
                      +91 86903 54354
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Clock size={13} className="text-copper" />
                  <span>Mon – Sat (10 AM – 7 PM)</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Industry-Level Light Quote Request Card ── */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden text-slate-900"
            >
              {/* Header */}
              <div className="p-7 pb-5 bg-gradient-to-r from-slate-900 to-[#141d2b] text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-md bg-copper/20 flex items-center justify-center">
                    <Send size={14} className="text-copper" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-copper font-bold">
                    Free Instant Quotation
                  </span>
                </div>
                <h3 className="text-display text-2xl font-bold text-white">
                  Request a Custom Quote
                </h3>
                <p className="text-slate-300 text-xs mt-1">
                  Fill in below requirements & our sales engineer will send a detailed pricing breakdown.
                </p>
              </div>

              {/* Form Body */}
              <div className="p-7 bg-white">
                {submitted ? (
                  <div className="py-12 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-16 h-16 rounded-full bg-copper/10 border border-copper/30 flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle2 size={36} className="text-copper" />
                    </motion.div>
                    <h4 className="text-display text-xl font-bold text-slate-900 mb-2">
                      Quote Request Sent Successfully!
                    </h4>
                    <p className="text-slate-600 text-sm max-w-xs mx-auto">
                      Our engineering team will get back to you within 24 hours with your custom quotation.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-slate-700 mb-1.5 uppercase font-bold tracking-wider">
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
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/10 transition-all font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-slate-700 mb-1.5 uppercase font-bold tracking-wider">
                          Business / Company
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          placeholder="e.g. Adison Ltd"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/10 transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-slate-700 mb-1.5 uppercase font-bold tracking-wider">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="name@company.com"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/10 transition-all font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-slate-700 mb-1.5 uppercase font-bold tracking-wider">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+91 98765 43210"
                          className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/10 transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-700 mb-1.5 uppercase font-bold tracking-wider">
                        Product Category
                      </label>
                      <select
                        value={formData.product}
                        onChange={(e) =>
                          setFormData({ ...formData, product: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/10 transition-all cursor-pointer font-sans"
                      >
                        <option value="Packaging Cartons">Packaging Cartons (FBB / Duplex)</option>
                        <option value="Rigid Gift Boxes">Rigid Luxury Gift Boxes</option>
                        <option value="Corrugated Cartons">Corrugated Shipping Cartons</option>
                        <option value="Commercial Offset">Commercial Brochures &amp; Catalogs</option>
                        <option value="Stickers & Labels">Product Stickers &amp; Labels</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-700 mb-1.5 uppercase font-bold tracking-wider">
                        Requirements / Quantity / GSM
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="e.g. 5,000 units, matte lamination with gold foil, 350 GSM board..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/10 transition-all resize-none font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3.5 bg-copper hover:bg-copper-dark text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-copper/20 cursor-pointer disabled:opacity-50"
                      >
                        <Send size={14} />
                        {submitting ? "Submitting..." : "Submit Quote Request"}
                      </button>

                      <a
                        href="https://wa.me/918690354354?text=Hi! I would like to request a quote."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20 cursor-pointer"
                      >
                        <MessageCircle size={15} />
                        WhatsApp Quick Chat
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
