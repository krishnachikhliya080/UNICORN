/**
 * Home page — Unicorn Print Pack corporate website.
 * Exact Printwell Rajkot index.php lean & elegant section layout.
 * Streamlined to avoid duplicating deep content that lives on sub-pages (/about, /products, /technology, /portfolio, /contact).
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NewsTickerBar from "@/components/NewsTickerBar";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ClientsSection from "@/components/ClientsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      {/* 1. Hero 3D Studio Stage */}
      <HeroSection />
      
      {/* 2. News Ticker Bar */}
      <NewsTickerBar />
      
      {/* 3. Story & Craftsmanship Intro */}
      <AboutSection />
      
      {/* 4. Interactive Product Capabilities Selector */}
      <ServicesSection />
      
      {/* 5. Our Prestigious Clients */}
      <ClientsSection />
      
      {/* 6. Testimonials & Instant Quote Sky-Blue Banner */}
      <TestimonialsSection />
      
      <WhatsAppButton />
      <BackToTop />
      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
