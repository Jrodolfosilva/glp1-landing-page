import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SponsorsBar from '@/components/SponsorsBar';
import ProfessorsSection from '@/components/ProfessorsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PlatformSection from '@/components/PlatformSection';
import ModulesSection from '@/components/ModulesSection';
import ScheduleSection from '@/components/ScheduleSection';
import CommunitySection from '@/components/CommunitySection';
import WebinarsSection from '@/components/WebinarsSection';
import DifferentialsSection from '@/components/DifferentialsSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <SponsorsBar />
        <ProfessorsSection />
        <TestimonialsSection />
        <PlatformSection />
        <ModulesSection />
        <ScheduleSection />
        <CommunitySection />
        <WebinarsSection />
        <DifferentialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
