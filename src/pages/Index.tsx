import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TreatmentsGrid from "@/components/TreatmentsGrid";
import PromotionsSection from "@/components/PromotionsSection";
import AboutSection from "@/components/AboutSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Beautytech Braga — Estética Avançada & Bem-Estar de Luxo"
        description="Beautytech Braga: tratamentos de estética avançada e massagens de luxo — HIFU, depilação a laser, drenagem linfática, faciais e corporais. Liberty Fitness Center, Braga."
        canonical="/"
      />
      <Navbar />
      <HeroSection />
      <TreatmentsGrid />
      <PromotionsSection />
      <AboutSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Index;
