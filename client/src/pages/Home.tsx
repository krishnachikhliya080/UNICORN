/**
 * Home page — Unicorn Print Pack corporate website.
 * Inspired by Printwell Rajkot structure with dark editorial aesthetics.
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import The4PsSection from "@/components/The4PsSection";
import ProductShowcase from "@/components/ProductShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
import TechnologySection from "@/components/TechnologySection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <The4PsSection />
      <ProductShowcase />
      <WhyChooseUs />
      <TechnologySection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <WhatsAppButton />
      <BackToTop />
      <Footer />
    </div>
  );
}
