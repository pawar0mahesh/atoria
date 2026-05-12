import { PageTransition } from '../components/ui/Components';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import TrustSection from '../components/sections/TrustSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import DashboardPreview from '../components/sections/DashboardPreview';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import FAQSection from '../components/sections/FAQSection';

export default function HomePage() {
  return (
    <PageTransition>
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
        <FeaturesSection />
        <HowItWorksSection />
        <DashboardPreview />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </PageTransition>
  );
}
