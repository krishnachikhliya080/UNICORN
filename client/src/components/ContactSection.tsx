/**
 * ContactSection — "Get Free Quote" form with react-hook-form + zod validation.
 * Fields: Name (req.), Phone (req., 7+ digits), Requirement Type (dropdown), Message (req.).
 * Submit → console.log placeholder + sonner toast.
 * Design: Editorial Atelier — copper focus rings, inline error states, slide-in reveal.
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

// ── Zod schema ─────────────────────────────────────────────────────────────
const quoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(7, "Phone must be at least 7 digits")
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number"),
  requirementType: z.string().min(1, "Please select a requirement type"),
  message: z
    .string()
    .min(10, "Please describe your requirement (min 10 characters)"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

// ── Contact info sidebar data ───────────────────────────────────────────────
const CONTACT_INFO = [
  { icon: Phone, label: "Phone", value: "+91 93161 52196" },
  { icon: Mail, label: "Email", value: "info@unicornprintpack.com" },
  { icon: MapPin, label: "Address", value: "Industrial Area, Ludhiana, Punjab, India" },
  { icon: Clock, label: "Working Hours", value: "Mon – Sat: 10:00 AM – 7:00 PM" },
];

const REQUIREMENT_TYPES = [
  "Packaging Cartons (FBB / Duplex)",
  "Rigid Luxury Gift Boxes",
  "Corrugated Shipping Cartons",
  "Brochures & Commercial Printing",
  "Product Labels & Stickers",
  "Calendar & Corporate Literature",
  "Custom Printed Bags (Paper / Non-woven)",
  "Other / Multiple Products",
];

// Shared variants
const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

// ── Component ───────────────────────────────────────────────────────────────
export default function ContactSection() {
  const { ref, inView } = useInView(0.1);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      phone: "",
      requirementType: "",
      message: "",
    },
  });

  const onSubmit = (data: QuoteFormData) => {
    // Placeholder — replace with API call when backend is ready
    console.log("[ContactSection] Quote form submission:", data);
    setSubmitted(true);
    reset();
    toast.success("Quote request received! We'll get back to you within 24 hours.", {
      description: `Requirement: ${data.requirementType}`,
    });
    // Reset success state after 5s so form can be used again
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white" ref={ref}>
      <div className="container">
        {/* Heading */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="text-body text-sm tracking-[0.25em] uppercase text-copper font-semibold mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Get a Free Quote
          </h2>
          <p className="text-body text-text-muted max-w-2xl mx-auto">
            Tell us about your packaging requirement — we'll send a customised
            quote and structural design suggestion within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* ── Sidebar: Contact details ── */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-warm-gray rounded-sm p-8">
              <h3 className="text-display text-xl font-semibold text-charcoal mb-6">
                Contact Details
              </h3>
              <div className="space-y-5">
                {CONTACT_INFO.map((info, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-copper/10 flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-copper" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-body text-xs text-text-muted uppercase tracking-wider mb-0.5">
                        {info.label}
                      </p>
                      <p className="text-body text-sm font-medium text-charcoal">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bulk order note */}
            <div className="bg-copper/5 border border-copper/15 rounded-sm p-6">
              <p className="text-body text-sm text-charcoal font-medium mb-2">
                Bulk Order Inquiry?
              </p>
              <p className="text-body text-xs text-text-muted mb-4">
                For volume pricing and custom quotations, include your estimated
                quantities in the message field.
              </p>
              <a
                href="mailto:info@unicornprintpack.com"
                className="text-copper text-sm font-semibold hover:underline"
              >
                Email us directly →
              </a>
            </div>
          </motion.div>

          {/* ── Form panel ── */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="lg:col-span-3"
          >
            {submitted ? (
              /* Success state */
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="h-full flex flex-col items-center justify-center text-center py-16 px-8 bg-warm-gray rounded-sm"
              >
                <CheckCircle2 className="w-16 h-16 text-copper mb-4" />
                <h4 className="text-display text-2xl font-bold text-charcoal mb-2">
                  Quote Request Sent!
                </h4>
                <p className="text-body text-text-muted max-w-sm">
                  Our sales team will contact you within 24 hours with a
                  detailed quote and structural design suggestions.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Row 1: Name + Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="text-body text-xs text-text-muted uppercase tracking-wider mb-2 block">
                      Your Name <span className="text-copper">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="Rajesh Maliya"
                      className={`w-full px-4 py-3 bg-warm-gray border rounded-sm text-body text-sm text-charcoal placeholder:text-text-muted/50 focus:ring-1 outline-none transition-all duration-300 ${
                        errors.name
                          ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                          : "border-charcoal/10 focus:border-copper focus:ring-copper/30"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-body text-xs text-text-muted uppercase tracking-wider mb-2 block">
                      Phone Number <span className="text-copper">*</span>
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 bg-warm-gray border rounded-sm text-body text-sm text-charcoal placeholder:text-text-muted/50 focus:ring-1 outline-none transition-all duration-300 ${
                        errors.phone
                          ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                          : "border-charcoal/10 focus:border-copper focus:ring-copper/30"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Requirement Type dropdown */}
                <div>
                  <label className="text-body text-xs text-text-muted uppercase tracking-wider mb-2 block">
                    Requirement Type <span className="text-copper">*</span>
                  </label>
                  <select
                    {...register("requirementType")}
                    className={`w-full px-4 py-3 bg-warm-gray border rounded-sm text-body text-sm text-charcoal focus:ring-1 outline-none transition-all duration-300 appearance-none cursor-pointer ${
                      errors.requirementType
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                        : "border-charcoal/10 focus:border-copper focus:ring-copper/30"
                    }`}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select product category…
                    </option>
                    {REQUIREMENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.requirementType && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                      {errors.requirementType.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="text-body text-xs text-text-muted uppercase tracking-wider mb-2 block">
                    Project Details <span className="text-copper">*</span>
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Describe your requirement — size, quantity, material, finishing (foil / UV / embossing), expected delivery timeline…"
                    className={`w-full px-4 py-3 bg-warm-gray border rounded-sm text-body text-sm text-charcoal placeholder:text-text-muted/50 focus:ring-1 outline-none transition-all duration-300 resize-none ${
                      errors.message
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                        : "border-charcoal/10 focus:border-copper focus:ring-copper/30"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-copper text-white font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-copper-dark transition-all duration-300 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-copper/20"
                >
                  <Send size={15} />
                  {isSubmitting ? "Sending…" : "Get Free Quote"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
