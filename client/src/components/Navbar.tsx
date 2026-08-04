/**
 * Navbar — Exact Printwell Reference Layout & Dark Navy Studio Aesthetic.
 * Recreates the exact top-right contact links + bottom line nav bar with active HOME box.
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGES } from "@/const";
import { Menu, X, Phone, Mail, Briefcase } from "lucide-react";

const NAV_LINKS = [
  { label: "HOME", href: "#" },
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "#services" },
  { label: "CLIENTS", href: "#clients" },
  { label: "PRODUCTS", href: "#product-showcase" },
  { label: "TECHNOLOGY", href: "#technology" },
  { label: "PORTFOLIO", href: "#portfolio" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("HOME");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string, label: string) => {
    setActiveTab(label);
    setMobileOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#141d2b]/98 backdrop-blur-xl shadow-xl py-2"
            : "bg-[#172232]/95 backdrop-blur-md py-3.5"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* ── Logo on Left ── */}
            <a
              href="#"
              className="flex-shrink-0 flex items-center"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#", "HOME");
              }}
            >
              <img
                src={IMAGES.logo}
                alt="Unicorn Print Pack"
                className={`w-auto object-contain flex-shrink-0 transition-all duration-300 drop-shadow-sm ${
                  scrolled
                    ? "h-8 sm:h-9 md:h-10 lg:h-11"
                    : "h-9 sm:h-10 md:h-12 lg:h-14"
                }`}
              />
            </a>

            {/* ── Desktop Top-Right Info + Nav Menu ── */}
            <div className="hidden lg:flex flex-col items-end gap-2">
              {/* Top Contact Utility Row */}
              <div className="flex items-center gap-6 text-xs text-white/70 tracking-wide font-sans">
                <a href="mailto:info@unicornprintpack.com" className="flex items-center gap-1.5 hover:text-copper transition-colors">
                  <Mail className="w-3.5 h-3.5 text-white/60" />
                  <span>info@unicornprintpack.com</span>
                </a>

                <a href="tel:+918690354354" className="flex items-center gap-1.5 hover:text-copper transition-colors">
                  <Phone className="w-3.5 h-3.5 text-white/60" />
                  <span>+91 86903 54354</span>
                </a>

                <a
                  href="/images/UNICORN-PRINT-PACK.pdf"
                  download="Unicorn-Print-Pack-Brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-copper transition-colors"
                >
                  <Briefcase className="w-3.5 h-3.5 text-white/60" />
                  <span>Brochure</span>
                </a>
              </div>

              {/* Navigation Menu Row */}
              <nav className="flex items-center gap-1 pt-1">
                {NAV_LINKS.map((link) => {
                  const isActive = activeTab === link.label;
                  return (
                    <button
                      key={link.label}
                      onClick={() => scrollTo(link.href, link.label)}
                      className={`text-xs font-bold uppercase tracking-widest transition-all duration-200 px-3.5 py-2 ${
                        isActive
                          ? "bg-copper text-white shadow-md shadow-copper/20"
                          : "text-white/85 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* ── Mobile Toggle ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white/90 hover:text-copper transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Bottom Divider Line */}
          <div className="w-full h-[1px] bg-white/15 mt-3 hidden md:block" />
        </div>
      </motion.header>

      {/* ── Mobile Overlay Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#141d2b]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-5 lg:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => scrollTo(link.href, link.label)}
                className={`text-display text-xl font-bold tracking-widest uppercase transition-colors ${
                  activeTab === link.label ? "text-copper" : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
