import LoadingScreen from "./components/LoadingScreen";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import JourneySection from "./components/JourneySection";
import AchievementsSection from "./components/AchievementsSection";
import ToolsSection from "./components/ToolsSection";
import ScrollGridSection from "./components/ScrollGridSection";
import ContactSection from "./components/ContactSection";
import JourneyModal from "./components/JourneyModal";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import { ToastProvider } from "./components/Toast";

export default function Home() {
  return (
    <ToastProvider>
      <SmoothScrollProvider>
        <LoadingScreen />
        <Navigation />
        <JourneyModal />

        <main id="main" className="overflow-x-clip w-full max-w-full bg-[#070707]">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <JourneySection />
          <AchievementsSection />
          <ToolsSection />
          <ScrollGridSection />
          <ContactSection />
        </main>
      </SmoothScrollProvider>
    </ToastProvider>
  );
}
