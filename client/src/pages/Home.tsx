/**
 * Home page — Unicorn Print Pack corporate website.
 * Section order mirrors Printwell Rajkot's website layout.
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NewsTickerBar from "@/components/NewsTickerBar";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ClientsSection from "@/components/ClientsSection";
import The4PsSection from "@/components/The4PsSection";
import ProductShowcase from "@/components/ProductShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
import TechnologySection from "@/components/TechnologySection";
import CTAVideoSection from "@/components/CTAVideoSection";
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
      <NewsTickerBar />
      <AboutSection />
      <ServicesSection />
      <ClientsSection />
      <The4PsSection />
      <ProductShowcase />
      <WhyChooseUs />
      <TechnologySection />
      <CTAVideoSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <WhatsAppButton />
      <BackToTop />
      <Footer />
    </div>
  );
}
