import StarField from "../components/landing/StarField";
import HeroSection from "../components/landing/HeroSection";
import StatsSection from "../components/landing/StatsSection";
import HowToJoin from "../components/landing/HowToJoin";
import LiveTournaments from "../components/landing/LiveTournaments";
import CTABanner from "../components/landing/CTABanner";
import Footer from "../components/landing/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-dark overflow-x-hidden" style={{ backgroundColor: "#050A05" }}>
      <StarField />
      <HeroSection />
      <StatsSection />
      <LiveTournaments />
      <HowToJoin />
      <CTABanner />
      <Footer />
    </div>
  );
}
