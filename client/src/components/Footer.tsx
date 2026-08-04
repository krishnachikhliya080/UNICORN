import { useState } from "react";
import { IMAGES } from "@/const";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

const SITEMAP = [
  { label: "About Us", href: "#about" },
  { label: "The 4P's Showcase", href: "#the-4ps" },
  { label: "Product Bento Grid", href: "#product-showcase" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Technology & Machinery", href: "#technology" },
  { label: "Client Testimonials", href: "#testimonials" },
  { label: "Get Instant Quote", href: "#contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you for subscribing to Unicorn Print Pack updates!");
    setEmail("");
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="bg-[#07090d] text-white pt-20 pb-10 border-t border-white/10">
      <div className="container">
        {/* Top Newsletter Bar */}
        <div className="bg-gradient-to-r from-[#141820] to-[#0d1117] rounded-2xl p-8 md:p-12 border border-white/10 mb-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-mono text-copper uppercase tracking-widest px-3 py-1 bg-copper/10 rounded-full border border-copper/20 inline-block mb-3">
              Stay Informed
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white font-display mb-2">
              Subscribe Our Newsletter
            </h3>
            <p className="text-white/60 text-sm">
              Receive latest packaging trends, eco-material innovations, and technological insights directly to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your business email"
              className="bg-black/60 border border-white/15 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-copper min-w-[280px]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-copper text-white font-semibold text-sm rounded-lg hover:bg-copper-dark transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-copper/20 flex-shrink-0"
            >
              <Send size={16} /> Subscribe
            </button>
          </form>
        </div>

        {/* Sitemap & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <img
              src={IMAGES.logo}
              alt="Unicorn Print Pack"
              className="h-12 w-auto object-contain mb-6 drop-shadow-sm"
            />
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Leading international printing and packaging manufacturer. Specializing in high-precision offset printing, luxury rigid boxes, duplex mono cartons, and flexible packaging solutions under one roof.
            </p>
            <div className="text-xs font-mono text-copper bg-copper/10 px-3.5 py-2 rounded-lg border border-copper/20 inline-block">
              A Passion for Excellence • Customer First
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5 font-mono text-copper">
              Sitemap Navigation
            </h4>
            <ul className="space-y-2.5">
              {SITEMAP.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    → {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Capabilities */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5 font-mono text-copper">
              Product Divisions
            </h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>5-Color Offset Press</li>
              <li>FBB & Duplex Cartons</li>
              <li>Luxury Rigid Boxes</li>
              <li>Brochures & Danglers</li>
              <li>Corrugated Cartons</li>
              <li>Self-Adhesive Labels</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5 font-mono text-copper">
              Contact Executive
            </h4>
            <div className="space-y-3.5 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-copper flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+918690354354" className="hover:text-copper transition-colors font-bold text-white block">
                    +91 86903 54354
                  </a>
                  <span className="text-xs text-white/40">Mon - Sat (10 AM - 7 PM)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-copper flex-shrink-0" />
                <a href="mailto:info@unicornprintpack.com" className="hover:text-copper transition-colors">
                  info@unicornprintpack.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-copper flex-shrink-0 mt-0.5" />
                <span>Village : Piplana, Surway No. 245 to 250, Plot No. 86/87, JK Industrial Zone, Ta. : Kotda Sangani, Dist. : RAJKOT.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <p>© {new Date().getFullYear()} Unicorn Print Pack. All Rights Reserved.</p>
          <p>The 4P's of Pre-Press, Printing, Post-Press & Packaging Under One Roof</p>
        </div>
      </div>
    </footer>
  );
}
