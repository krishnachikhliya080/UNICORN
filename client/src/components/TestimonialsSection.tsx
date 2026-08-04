import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ChevronLeft, ChevronRight, Quote, Phone, Send, CheckCircle2 } from "lucide-react";
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
    quote: "Unicorn Print Pack delivered 50,000 rigid boxes with unmatched precision and zero delay. Their online UV coating finish is spectacular.",
    name: "Rajesh Maliya",
    role: "Managing Director",
    company: "Varmora Plastech",
    initials: "RM",
  },
  {
    quote: "Consistent quality across every batch. Their mono cartons meet our strict food-safety standards perfectly every single run.",
    name: "Vikram Patel",
    role: "Procurement Lead",
    company: "Fern Residency",
    initials: "VP",
  },
  {
    quote: "The embossed logo and soft-touch coating on our cosmetics packaging elevated our entire brand perception on retail shelves.",
    name: "Priya Sharma",
    role: "Brand Director",
    company: "Adison Luxury",
    initials: "PS",
  },
  {
    quote: "From pre-press CTP setup to final post-press die-cutting, their team executed our complex multi-layer packaging flawlessly.",
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
    <section id="testimonials" className="py-24 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200/80" ref={ref}>
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Testimonials Slider & Direct Call Helpline */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-copper px-3.5 py-1.5 bg-copper/10 rounded-full border border-copper/20 inline-block mb-4 font-semibold">
                What Our Clients Say
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 font-display">
                Delivering Excellence To Industry Leaders
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Trusted by top corporate brands for reliable offset printing, folding cartons, and luxury packaging solutions.
              </p>

              {/* Embla Carousel Slider */}
              <div className="relative mb-8">
                <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 p-8 shadow-md" ref={emblaRef}>
                  <div className="flex">
                    {TESTIMONIALS.map((t, i) => (
                      <div key={i} className="flex-[0_0_100%] min-w-0 pr-4">
                        <Quote className="w-10 h-10 text-copper/40 mb-4" />
                        <p className="text-slate-700 text-lg leading-relaxed italic mb-6">
                          "{t.quote}"
                        </p>
                        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                          <div className="w-12 h-12 rounded-full bg-copper/10 border border-copper/30 flex items-center justify-center text-copper font-bold">
                            {t.initials}
                          </div>
                          <div>
                            <p className="text-slate-900 font-bold text-base">{t.name}</p>
                            <p className="text-slate-500 text-xs font-mono">{t.role}, {t.company}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 justify-end">
                  <button
                    onClick={scrollPrev}
                    className="p-2.5 rounded-full bg-white border border-slate-200 hover:bg-copper hover:text-white transition-all text-slate-700 shadow-sm"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="p-2.5 rounded-full bg-white border border-slate-200 hover:bg-copper hover:text-white transition-all text-slate-700 shadow-sm"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Helpline Badge */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-copper/10 via-amber-500/10 to-orange-500/10 border border-copper/30 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-copper flex items-center justify-center text-white shadow-md">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-mono text-copper uppercase tracking-wider font-semibold">For Delivery & Urgent Queries</p>
                  <a href="tel:+919576333210" className="text-xl font-bold text-slate-900 hover:text-copper transition-colors">
                    +91 95763 33210
                  </a>
                </div>
              </div>
              <span className="hidden sm:inline-block text-xs font-mono text-slate-600 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                10 AM - 7 PM
              </span>
            </div>
          </div>

          {/* Right Column: Free Instant Quote Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xl relative">
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-display">
                Get Detailed Instant Quote
              </h3>
              <p className="text-slate-600 text-sm mb-6">
                Fill in your project requirements to receive a customized pricing quote and sample box kit.
              </p>

              {submitted ? (
                <div className="py-12 text-center">
                  <CheckCircle2 size={48} className="text-copper mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Quote Request Received!</h4>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Our sales executive will contact you shortly with your custom quotation and structural design suggestions.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1.5 uppercase font-semibold">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rajesh Maliya"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-copper transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1.5 uppercase font-semibold">Company Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Adison Ltd"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-copper transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1.5 uppercase font-semibold">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-copper transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1.5 uppercase font-semibold">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-copper transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1.5 uppercase font-semibold">Product Category</label>
                    <select
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-copper transition-colors cursor-pointer"
                    >
                      <option value="Packaging Cartons">Packaging Cartons (FBB / Duplex)</option>
                      <option value="Rigid Gift Boxes">Rigid Luxury Gift Boxes</option>
                      <option value="Corrugated Cartons">Corrugated Shipping Cartons</option>
                      <option value="Commercial Offset">Commercial Brochures & Catalogs</option>
                      <option value="Stickers & Labels">Product Stickers & Labels</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1.5 uppercase font-semibold">Project Details / Quantity</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify dimensions, box style, estimated quantity, foil/UV requirements..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-copper transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-copper text-white font-bold rounded-lg hover:bg-copper-dark transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-copper/20 uppercase tracking-wider text-xs"
                  >
                    {submitting ? (
                      "Submitting Request..."
                    ) : (
                      <>
                        <Send size={16} /> GET DETAILED QUOTE
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
