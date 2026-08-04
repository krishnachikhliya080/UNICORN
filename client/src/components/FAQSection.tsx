/**
 * FAQSection — Accordion-based FAQ with search functionality.
 * Design: Editorial Atelier — warm-gray section, white accordion items,
 * copper accent on hover, search input filters questions and answers.
 */
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, X, MessageCircle } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQ[] = [
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer: "Our minimum order quantity is 500 units for most packaging types. For premium rigid boxes with complex structural designs, the MOQ starts at 1,000 units. Custom die-cutting may require higher minimums depending on complexity. We're happy to discuss options for smaller trial runs.",
    category: "Ordering",
  },
  {
    question: "How long does production and delivery take?",
    answer: "Standard orders take 15–20 business days from design approval. Rush orders can be completed in 7–10 business days with a 20% surcharge. Delivery within India typically takes 3–5 business days; international shipping is 7–14 days depending on destination and logistics.",
    category: "Timeline",
  },
  {
    question: "What material and finishing options do you offer?",
    answer: "We work with kraft paper, art card, corrugated board, and specialty papers. Finishing options include gold and silver foil stamping, spot UV coating, embossing, debossing, die-cutting, matte and gloss lamination, soft-touch coating, and aqueous coating. Our design team can recommend the best combination for your brand and budget.",
    category: "Materials",
  },
  {
    question: "Do you offer custom packaging design?",
    answer: "Yes — our in-house design team creates custom packaging from concept to print-ready files. We provide 2–3 design concepts for your review, offer revisions within the agreed scope, and handle dieline creation, structural design, and 3D mockups at no extra charge. You can also supply your own ready-to-print artwork.",
    category: "Design",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes. We ship to 40+ countries worldwide. For international orders, we handle all export documentation including commercial invoices, packing lists, and HS code classification. Shipping costs are calculated based on volume, weight, and destination, and quoted separately from the packaging cost.",
    category: "Shipping",
  },
  {
    question: "Can I get a sample before placing a full order?",
    answer: "Absolutely. We offer prototype samples for $50–$150 depending on complexity and finishing, which is fully deducted from your final order value. This allows you to evaluate print quality, material feel, structural fit, and finishing before committing to full production.",
    category: "Ordering",
  },
  {
    question: "How do I get a quote for my packaging project?",
    answer: "You can request a quote three ways: (1) Fill out our contact form below with your requirements, (2) WhatsApp us at +91 93161 52196 with your specifications and quantity, or (3) Email us at hello@unicornprintpack.com. We respond within 24 hours with a detailed quotation including material options and pricing.",
    category: "Pricing",
  },
  {
    question: "Can you handle eco-friendly or sustainable packaging?",
    answer: "Yes. We offer FSC-certified kraft paper, recycled card stock, soy-based inks, and biodegradable lamination options. We can also design packaging with minimal material usage to reduce waste. Let us know your sustainability goals and we'll recommend the best eco-friendly approach.",
    category: "Materials",
  },
];

export default function FAQSection() {
  const { ref, inView } = useInView(0.1);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return FAQS;
    const q = query.toLowerCase();
    return FAQS.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section id="faq" className="py-24 md:py-32 bg-warm-gray" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-12"
        >
          <span className="text-body text-sm tracking-[0.25em] uppercase text-copper font-semibold mb-4 block">
            FAQ
          </span>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-body text-text-muted max-w-xl mx-auto">
            Everything you need to know about our packaging services, ordering process, and delivery.
          </p>
        </motion.div>

        {/* Search input */}
        <div className="max-w-2xl mx-auto mb-10 relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/50"
          />
          <input
            type="text"
            placeholder="Search questions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-charcoal/10 rounded-sm text-sm text-charcoal placeholder:text-text-muted/50 focus:border-copper focus:ring-1 focus:ring-copper/20 outline-none transition-colors duration-200 shadow-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-charcoal transition-colors"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((faq, i) => (
                  <motion.div
                    key={`faq-${i}`}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <AccordionItem
                      value={`faq-${i}`}
                      className="bg-white rounded-sm border border-charcoal/5 overflow-hidden"
                    >
                      <AccordionTrigger className="text-body text-sm font-semibold text-charcoal hover:text-copper transition-colors py-4 px-5 no-underline [&[data-state=open]>svg]:rotate-180">
                        <div className="flex items-center gap-3">
                          <span className="text-copper/40 text-xs font-mono shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-body text-sm text-text-muted leading-relaxed pb-4 pt-1 px-5 pl-14">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Accordion>
          </motion.div>

          {/* No results */}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="w-10 h-10 text-text-muted/30 mx-auto mb-4" />
              <p className="text-text-muted text-sm">
                No questions match "{query}"
              </p>
              <p className="text-text-muted text-xs mt-1">
                Try a different search term or{" "}
                <a href="#contact" className="text-copper underline">
                  ask us directly
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
