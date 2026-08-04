/**
 * PortfolioSection — Filterable animated gallery with category filter, suggested search chips,
 * enhanced hover effects, product name + description, lightbox modal, and per-product quote request modal.
 * Design: Editorial Atelier — copper accent tabs with count badges, rich hover overlays,
 * smooth scale/blur transitions, and animated modals.
 */
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { IMAGES } from "@/const";
import { X, Search, Send, Check, MessageCircle } from "lucide-react";

type Category = "All" | "Rigid & Luxury" | "Food & Mono" | "Cosmetic" | "Mailer & Corrugated";

interface ProductImage {
  src: string;
  name: string;
  category: Exclude<Category, "All">;
  description: string;
}

const PRODUCTS: ProductImage[] = [
  {
    src: IMAGES.product1,
    name: "Horse Key Holder",
    category: "Rigid & Luxury",
    description: "Premium rigid box packaging with embossed detailing and magnetic closure.",
  },
  {
    src: IMAGES.product2,
    name: "Adison Box",
    category: "Rigid & Luxury",
    description: "Custom rigid box with copper foil stamping and matte lamination finish.",
  },
  {
    src: IMAGES.product3,
    name: "Adison Packaging",
    category: "Rigid & Luxury",
    description: "Luxury presentation box with velvet interior and precision die-cut inserts.",
  },
  {
    src: IMAGES.product4,
    name: "Euronics Carton",
    category: "Food & Mono",
    description: "High-quality mono carton with spot UV and food-safe printing standards.",
  },
  {
    src: IMAGES.product5,
    name: "Evolve Box",
    category: "Rigid & Luxury",
    description: "Sleek rigid packaging with embossed logo and soft-touch coating.",
  },
  {
    src: IMAGES.product6,
    name: "Jimmy Box",
    category: "Rigid & Luxury",
    description: "Compact luxury box with gold foil hot-stamping and window cut-out.",
  },
  {
    src: IMAGES.product7,
    name: "Parth Mango Box",
    category: "Food & Mono",
    description: "Vibrant food-grade packaging with high-resolution offset printing.",
  },
  {
    src: IMAGES.product8,
    name: "Shivam Box",
    category: "Rigid & Luxury",
    description: "Elegant rigid box with metallic ink accents and textured paper stock.",
  },
  {
    src: IMAGES.product9,
    name: "S.R. Hardware",
    category: "Rigid & Luxury",
    description: "Industrial-grade packaging with reinforced structural design.",
  },
  {
    src: IMAGES.product10,
    name: "Trozen Premium",
    category: "Rigid & Luxury",
    description: "Dark luxury packaging with raised UV coating and premium black board.",
  },
  {
    src: IMAGES.product11,
    name: "Trozen Variant",
    category: "Rigid & Luxury",
    description: "Variant packaging with copper gradient print and foil accents.",
  },
  {
    src: IMAGES.product12,
    name: "Cosmetic Display Box",
    category: "Cosmetic",
    description: "Full-bleed cosmetic packaging with soft-touch lamination and rose-gold foil.",
  },
  {
    src: IMAGES.product13,
    name: "Mailer Shipping Box",
    category: "Mailer & Corrugated",
    description: "Custom e-commerce mailer with self-lock base and interior printed branding.",
  },
];

const CATEGORIES: Category[] = ["All", "Rigid & Luxury", "Food & Mono", "Cosmetic", "Mailer & Corrugated"];

const gridItem = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.3 } },
};

function CategoryTab({ label, count, active, onClick }: { label: Category; count: number; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      layout
      onClick={onClick}
      className={`relative px-5 py-2.5 text-sm font-medium tracking-wide rounded-sm transition-all duration-300 flex items-center gap-2 ${
        active
          ? "bg-copper text-white shadow-md shadow-copper/20"
          : "bg-white text-text-muted hover:text-charcoal hover:shadow-sm"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded-sm font-semibold ${
          active ? "bg-white/20 text-white" : "bg-charcoal/5 text-text-muted"
        }`}
      >
        {count}
      </span>
    </motion.button>
  );
}

export default function PortfolioSection() {
  const { ref, inView } = useInView(0.05);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightbox, setLightbox] = useState<ProductImage | null>(null);
  const [quoteProduct, setQuoteProduct] = useState<ProductImage | null>(null);
  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const filtered = useMemo(() => {
    let result = PRODUCTS;
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = { All: PRODUCTS.length, "Rigid & Luxury": 0, "Food & Mono": 0, Cosmetic: 0, "Mailer & Corrugated": 0 };
    PRODUCTS.forEach((p) => { counts[p.category]++; });
    return counts;
  }, []);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => phone.replace(/\D/g, '').length >= 7;
  const isFormValid = quoteForm.name.trim() && isValidEmail(quoteForm.email) && isValidPhone(quoteForm.phone);

  const handleQuoteSubmit = useCallback(() => {
    if (!isFormValid) return;
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteProduct(null);
      setQuoteSubmitted(false);
      setQuoteForm({ name: "", email: "", phone: "", message: "" });
      setEmailTouched(false);
      setPhoneTouched(false);
    }, 2000);
  }, [isFormValid]);

  const handleWhatsAppShare = useCallback(() => {
    if (!quoteProduct) return;
    const msg = `Hi! I'm interested in the ${quoteProduct.name} (${quoteProduct.category}). ${quoteProduct.description}`;
    window.open(`https://wa.me/918690354354?text=${encodeURIComponent(msg)}`, '_blank');
  }, [quoteProduct]);

  const handleCloseQuote = useCallback(() => {
    setQuoteProduct(null);
    setQuoteSubmitted(false);
    setEmailTouched(false);
    setPhoneTouched(false);
    setQuoteForm({ name: "", email: "", phone: "", message: "" });
  }, []);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-warm-gray" ref={ref}>
      <div className="container">
        {/* Heading */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-10"
        >
          <span className="text-body text-sm tracking-[0.25em] uppercase text-copper font-semibold mb-4 block">
            Our Work
          </span>
          <h2 className="text-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Packaging Portfolio
          </h2>
          <p className="text-body text-text-muted max-w-2xl mx-auto">
            A curated selection of our precision-crafted packaging solutions for global brands.
          </p>
        </motion.div>

        {/* Search bar */}
        <div className="max-w-md mx-auto mb-6 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted/50" />
          <input
            type="text"
            placeholder="Search products by name, category, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-white border border-charcoal/10 rounded-sm text-sm text-charcoal placeholder:text-text-muted/50 focus:border-copper focus:ring-1 focus:ring-copper/20 outline-none transition-colors duration-200 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-charcoal/10 text-text-muted hover:bg-copper hover:text-white transition-all duration-200"
              aria-label="Clear search"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Suggested search terms */}
        <div className="max-w-md mx-auto mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-body text-xs text-text-muted/60 mr-1">Try:</span>
            {["foil", "embossing", "die-cut", "rigid box", "lamination"].map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className={`px-3 py-1 text-xs rounded-full border transition-all duration-200 ${
                  searchQuery === term
                    ? "bg-copper text-white border-copper"
                    : "bg-white text-text-muted border-charcoal/10 hover:border-copper hover:text-copper"
                }`}
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {CATEGORIES.map((cat) => (
            <CategoryTab
              key={cat}
              label={cat}
              count={categoryCounts[cat]}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>

        {/* Active category label */}
        <motion.p
          key={activeCategory}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center text-body text-xs text-text-muted mb-6"
        >
          {searchQuery && filtered.length === 0
            ? `No products match "${searchQuery}"`
            : searchQuery
            ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${searchQuery}"`
            : activeCategory === "All"
            ? `Showing all ${PRODUCTS.length} projects`
            : `${filtered.length} project${filtered.length !== 1 ? "s" : ""} in ${activeCategory}`}
        </motion.p>

        {/* Gallery grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.div
                key={product.src}
                layout
                variants={gridItem}
                initial="hidden"
                animate="show"
                exit="exit"
                className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-charcoal/15 transition-all duration-500"
                onClick={() => setLightbox(product)}
              >
                <img
                  src={product.src}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5">
                  <div className="translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                    <span className="inline-block px-3 py-1 bg-copper text-white text-[10px] tracking-wider uppercase font-semibold rounded-sm mb-3">
                      {product.category}
                    </span>
                    <h4 className="text-white font-semibold text-sm md:text-base mb-2 leading-tight">
                      {product.name}
                    </h4>
                    <p className="text-white/70 text-xs md:text-[13px] leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="w-8 h-[2px] bg-copper transition-all duration-300 group-hover:w-16" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuoteProduct(product);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-copper/90 hover:bg-copper text-white text-[11px] tracking-wider uppercase font-semibold rounded-sm transition-all duration-300 active:scale-95"
                      >
                        <Send size={11} />
                        Quote
                      </button>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 right-0 w-8 h-[2px] bg-copper" />
                  <div className="absolute top-0 right-0 w-[2px] h-8 bg-copper" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-charcoal/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.name}
                className="w-full max-h-[70vh] object-contain rounded-sm shadow-2xl"
              />
              <div className="mt-5 text-center">
                <h3 className="text-display text-xl md:text-2xl text-white font-semibold mb-1">
                  {lightbox.name}
                </h3>
                <p className="text-copper text-xs tracking-wider uppercase mb-2">{lightbox.category}</p>
                <p className="text-white/60 text-sm max-w-md mx-auto">{lightbox.description}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 w-10 h-10 bg-copper text-white rounded-full flex items-center justify-center hover:bg-copper-dark transition-colors shadow-lg active:scale-90"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Request Modal */}
      <AnimatePresence>
        {quoteProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleCloseQuote}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="relative bg-white rounded-sm shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-6 pb-0">
                <div className="flex items-start gap-4">
                  <img
                    src={quoteProduct.src}
                    alt={quoteProduct.name}
                    className="w-20 h-20 object-cover rounded-sm shadow-md flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-body text-xs tracking-wider uppercase text-copper font-semibold">
                      Request a Quote
                    </span>
                    <h3 className="text-display text-lg text-charcoal font-bold mt-1">
                      {quoteProduct.name}
                    </h3>
                    <p className="text-body text-xs text-text-muted mt-1">{quoteProduct.category}</p>
                    <p className="text-body text-xs text-text-muted/70 mt-1 leading-relaxed">{quoteProduct.description}</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseQuote}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-charcoal/5 text-text-muted hover:bg-copper hover:text-white transition-all duration-200"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Success state */}
              {quoteSubmitted ? (
                <div className="p-6 flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full bg-copper/10 flex items-center justify-center mb-4"
                  >
                    <Check size={32} className="text-copper" />
                  </motion.div>
                  <h4 className="text-display text-lg text-charcoal font-bold mb-2">Quote Request Sent!</h4>
                  <p className="text-body text-sm text-text-muted">We'll get back to you within 24 hours with a detailed quote for {quoteProduct.name}.</p>
                </div>
              ) : (
                /* Form */
                <div className="p-6 pt-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-body text-xs font-medium text-charcoal mb-1.5 block">Your Name</label>
                      <input
                        type="text"
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-warm-gray border border-charcoal/10 rounded-sm text-sm text-charcoal placeholder:text-text-muted/40 focus:border-copper focus:ring-1 focus:ring-copper/20 outline-none transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-body text-xs font-medium text-charcoal mb-1.5 block">Email</label>
                        <input
                          type="email"
                          value={quoteForm.email}
                          onChange={(e) => { setQuoteForm((f) => ({ ...f, email: e.target.value })); setEmailTouched(true); }}
                          onBlur={() => setEmailTouched(true)}
                          placeholder="john@company.com"
                          className={`w-full px-4 py-2.5 bg-warm-gray border rounded-sm text-sm text-charcoal placeholder:text-text-muted/40 outline-none transition-colors ${
                            emailTouched && !isValidEmail(quoteForm.email) && quoteForm.email
                              ? "border-destructive focus:ring-destructive/20"
                              : "border-charcoal/10 focus:border-copper focus:ring-copper/20"
                          }`}
                        />
                        {emailTouched && !isValidEmail(quoteForm.email) && quoteForm.email && (
                          <p className="text-destructive text-[11px] mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-destructive inline-block" /> Please enter a valid email
                          </p>
                        )}
                        {emailTouched && isValidEmail(quoteForm.email) && (
                          <p className="text-green-600 text-[11px] mt-1 flex items-center gap-1">
                            <Check size={10} className="inline" /> Valid
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-body text-xs font-medium text-charcoal mb-1.5 block">Phone</label>
                        <input
                          type="tel"
                          value={quoteForm.phone}
                          onChange={(e) => { setQuoteForm((f) => ({ ...f, phone: e.target.value })); setPhoneTouched(true); }}
                          onBlur={() => setPhoneTouched(true)}
                          placeholder="+91 98765 43210"
                          className={`w-full px-4 py-2.5 bg-warm-gray border rounded-sm text-sm text-charcoal placeholder:text-text-muted/40 outline-none transition-colors ${
                            phoneTouched && !isValidPhone(quoteForm.phone) && quoteForm.phone
                              ? "border-destructive focus:ring-destructive/20"
                              : "border-charcoal/10 focus:border-copper focus:ring-copper/20"
                          }`}
                        />
                        {phoneTouched && !isValidPhone(quoteForm.phone) && quoteForm.phone && (
                          <p className="text-destructive text-[11px] mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-destructive inline-block" /> Min 7 digits required
                          </p>
                        )}
                        {phoneTouched && isValidPhone(quoteForm.phone) && (
                          <p className="text-green-600 text-[11px] mt-1 flex items-center gap-1">
                            <Check size={10} className="inline" /> Valid
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-body text-xs font-medium text-charcoal mb-1.5 block">
                        Requirements <span className="text-text-muted/60">(quantity, material, finishing)</span>
                      </label>
                      <textarea
                        value={quoteForm.message}
                        onChange={(e) => setQuoteForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder="e.g., 5000 units, matte lamination with gold foil, 4-week delivery..."
                        rows={3}
                        className="w-full px-4 py-2.5 bg-warm-gray border border-charcoal/10 rounded-sm text-sm text-charcoal placeholder:text-text-muted/40 focus:border-copper focus:ring-1 focus:ring-copper/20 outline-none transition-colors resize-none"
                      />
                    </div>
                    <button
                      onClick={handleQuoteSubmit}
                      disabled={!isFormValid}
                      className="w-full py-3 bg-copper text-white text-sm font-semibold tracking-wider uppercase rounded-sm hover:bg-copper-dark transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <Send size={14} />
                      Submit Quote Request
                    </button>

                    {/* Divider */}
                    <div className="relative flex items-center justify-center my-1">
                      <div className="absolute w-full h-[1px] bg-charcoal/10" />
                      <span className="relative bg-white px-3 text-[10px] tracking-wider uppercase text-text-muted/50 font-medium">or</span>
                    </div>

                    {/* WhatsApp Share Button */}
                    <button
                      onClick={handleWhatsAppShare}
                      className="w-full py-3 bg-[#25D366] text-white text-sm font-semibold tracking-wider uppercase rounded-sm hover:bg-[#20BD5A] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      <MessageCircle size={16} />
                      Send via WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
