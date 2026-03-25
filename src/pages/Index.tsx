import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TreatmentsGrid from "@/components/TreatmentsGrid";
import AboutSection from "@/components/AboutSection";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TreatmentsGrid />
      <AboutSection />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Index;
