/**
 * ContactPage — Dedicated Contact page matching Printwell's contact-us.php.
 * Features dark header banner with map overlay, plant addresses, executive helpline badges,
 * detailed contact inquiry form, and embedded Google Map.
 */
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Page Header */}
      <PageHeader
        title="The Place Where your search for printing & packaging desire ends forever"
        subtitle="Have a custom packaging requirement or need a instant price estimate? Our team of print engineers is at your service."
        breadcrumb="CONTACT US"
      />

      {/* Main Contact Form, Addresses & Map */}
      <ContactSection />

      <WhatsAppButton />
      <BackToTop />
      <Footer />
    </div>
  );
}
