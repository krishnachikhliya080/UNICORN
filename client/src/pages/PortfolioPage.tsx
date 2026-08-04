/**
 * PortfolioPage — Dedicated Portfolio page matching Printwell's portfolio.php.
 * Features dark header banner, category filter tabs, interactive search, product gallery lightbox & quote modal.
 */
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { IMAGES } from "@/const";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Page Header */}
      <PageHeader
        title="Innovative & Out of the Box Foiling with UV Printing / Packaging"
        subtitle="Explore our comprehensive showcase of custom rigid boxes, duplex mono cartons, corrugated shipping mailers, and luxury foil stamped packaging."
        breadcrumb="PORTFOLIO"
        bgImage={IMAGES.product1}
      />

      {/* Main Filterable Gallery */}
      <PortfolioSection />

      {/* Client Testimonials & Free Quote */}
      <TestimonialsSection />

      <WhatsAppButton />
      <BackToTop />
      <Footer />
    </div>
  );
}
