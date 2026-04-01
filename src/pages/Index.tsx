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
        title="BeautyTech Braga — Estética Avançada & Bem-Estar"
        description="Tratamentos de estética avançada em Braga: HIFU, depilação a laser, drenagem linfática, massagens, faciais e corporais. No Liberty Fitness Center."
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
