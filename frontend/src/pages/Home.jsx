import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getTournaments } from "../services/api";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import TournamentsSection from "../components/landing/TournamentsSection";
import PaymentSection from "../components/landing/PaymentSection";
import LeaderboardSection from "../components/landing/LeaderboardSection";
import Footer from "../components/landing/Footer";

export default function Home() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTournaments()
      .then((res) => setTournaments(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-dark overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <TournamentsSection tournaments={tournaments} loading={loading} />
      <PaymentSection />
      <LeaderboardSection />
      <Footer />
    </div>
  );
}
