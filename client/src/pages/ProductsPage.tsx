/**
 * ProductsPage — Dedicated Products catalog page for Unicorn Print Pack.
 * Features dark header banner, product bento showcase, and technical specifications matrix table.
 * Distinct from PortfolioPage (which focuses on finished client project photo gallery).
 */
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ProductShowcase from "@/components/ProductShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { IMAGES } from "@/const";
import { Layers, Gift, Package, FileText, Tag, Check, Send } from "lucide-react";

const PRODUCT_SPECS_TABLE = [
  {
    category: "Folding Duplex & FBB Cartons",
    icon: Layers,
    material: "FBB (Folding Box Board), Duplex Board (White/Grey Back), SBS Board",
    gsm: "230 GSM to 450 GSM",
    finishes: "Drip-off Texture, Matt/Gloss Lamination, Spot UV, Foil Stamping",
    moq: "2,000 Units",
    idealFor: "FMCG, Food Products, Pharmaceuticals, Cosmetics & Garments",
  },
  {
    category: "Luxury Rigid Gift Boxes",
    icon: Gift,
    material: "Kappa Board (1.5mm to 3.0mm) + Specialty Textured Wrap Paper",
    gsm: "800 GSM to 2000 GSM Kappa Board",
    finishes: "Mag-closure, Velvet/Satin Inlay, Gold/Rose-gold Hot Foil, Raised UV",
    moq: "500 Units",
    idealFor: "Luxury Cosmetics, Perfumes, Jewelry, Gourmet Chocolates & Corporate Gifting",
  },
  {
    category: "Corrugated Shipping Cartons",
    icon: Package,
    material: "3-Ply, 5-Ply & 7-Ply Flute Board (E-Flute, B-Flute, C-Flute)",
    gsm: "120 GSM to 250 GSM Craft / Duplex Top",
    finishes: "Flexo & High-resolution Offset Printed Top Liner",
    moq: "1,000 Units",
    idealFor: "E-Commerce Shipping Mailers, Heavy Appliance Export & Master Packaging",
  },
  {
    category: "Commercial Offset Literature",
    icon: FileText,
    material: "Art Paper, Art Card, Natural Shade Paper, Specialty Textured Stock",
    gsm: "90 GSM to 350 GSM",
    finishes: "Perfect Binding, Center Stitching, Matt/Gloss Thermal Lamination",
    moq: "1,000 Units",
    idealFor: "Corporate Catalogs, Product Brochures, Danglers, Annual Reports & Calendars",
  },
  {
    category: "Self-Adhesive Labels & Stickers",
    icon: Tag,
    material: "BOPP Clear/White Film, Chromo Paper, Metallic Foil Paper, Vinyl",
    gsm: "80 GSM to 150 GSM Release Liner",
    finishes: "Die-Cut Roll/Sheet Form, UV Varnish, Water-Resistant Lamination",
    moq: "5,000 Units",
    idealFor: "Beverage Bottles, Food Jars, Pharma Vials & Product Packaging Seals",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Page Header */}
      <PageHeader
        title="Crafted Packaging & Commercial Print Product Portfolio"
        subtitle="Explore our comprehensive range of custom duplex cartons, rigid luxury gift boxes, corrugated mailers, and commercial print collateral."
        breadcrumb="PRODUCTS"
        bgImage={IMAGES.product2}
      />

      {/* Product Bento Showcase */}
      <ProductShowcase />

      {/* ── TECHNICAL SPECIFICATIONS MATRIX ── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-copper font-bold px-3.5 py-1.5 bg-copper/10 rounded-full border border-copper/20 inline-block mb-3">
              Technical Standards
            </span>
            <h2 className="text-display text-3xl md:text-4xl font-bold text-charcoal">
              Product Specifications & Options
            </h2>
            <p className="text-text-muted text-sm mt-2">
              Compare material substrates, GSM ranges, custom finishing options, and Minimum Order Quantities (MOQ).
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-lg bg-white">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#121926] text-white text-xs font-mono uppercase tracking-wider">
                  <th className="py-4 px-6 font-bold border-b border-white/10">Product Line</th>
                  <th className="py-4 px-6 font-bold border-b border-white/10">Material Substrate</th>
                  <th className="py-4 px-6 font-bold border-b border-white/10">GSM / Thickness</th>
                  <th className="py-4 px-6 font-bold border-b border-white/10">Custom Finishes</th>
                  <th className="py-4 px-6 font-bold border-b border-white/10">Min. Order (MOQ)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {PRODUCT_SPECS_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-5 px-6 font-bold text-charcoal font-display">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-copper/10 flex items-center justify-center text-copper flex-shrink-0">
                          <row.icon size={16} />
                        </div>
                        <span>{row.category}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-slate-700 font-sans text-xs">{row.material}</td>
                    <td className="py-5 px-6 text-slate-700 font-mono text-xs font-semibold">{row.gsm}</td>
                    <td className="py-5 px-6 text-slate-700 font-sans text-xs">{row.finishes}</td>
                    <td className="py-5 px-6 font-mono text-xs font-bold text-copper">{row.moq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Client Testimonials & Quote Form */}
      <TestimonialsSection />

      <WhatsAppButton />
      <BackToTop />
      <Footer />
    </div>
  );
}
