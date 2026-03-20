import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Gamepad2, Users, Trophy, Coins, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getTournaments } from "../../services/api";
import ffImg from "../../ff_img.jpg";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const BADGE_MESSAGES = [
  "LIVE TOURNAMENTS ACTIVE",
  "REAL CASH PRIZES EVERY DAY",
  "SOLO · DUO · SQUAD MODES",
  "JOIN 10,000+ PLAYERS NOW",
  "WIN UP TO ₹5 LAKH PRIZE POOL",
];

export default function HeroSection() {
  const [liveCount, setLiveCount] = useState(null);
  const [badgeIndex, setBadgeIndex] = useState(0);

  useEffect(() => {
    getTournaments()
      .then((res) => {
        const live = res.data.filter(
          (t) => t.status === "active" || t.status === "ongoing"
        ).length;
        setLiveCount(live);
      })
      .catch(() => setLiveCount(0));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBadgeIndex((prev) => (prev + 1) % BADGE_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg grid-bg">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/8 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/6 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
      </div>

      {/* Accent lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Left content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Live badge — rotating text */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-6 overflow-hidden"
            style={{ minWidth: "260px" }}
          >
            <span className="w-2 h-2 flex-shrink-0 bg-green-400 rounded-full animate-pulse" />
            <AnimatePresence mode="wait">
              <motion.span
                key={badgeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="text-green-400 text-sm font-semibold tracking-wider whitespace-nowrap"
              >
                {BADGE_MESSAGES[badgeIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="text-white">JOIN THE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-white to-green-400 fire-text">
              ULTIMATE
            </span>
            <br />
            <span className="text-white">FREE FIRE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-green-300">
              TOURNAMENT
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p variants={fadeUp} className="text-gray-400 text-xl md:text-2xl mb-8 font-semibold tracking-wide">
            Compete. Survive.{" "}
            <span className="text-green-400">Win Real Rewards.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/player-auth"
              className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg glow-green group"
            >
              <Gamepad2 className="w-5 h-5" />
              Join as Player
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/host/register"
              className="btn-secondary flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg"
            >
              <Trophy className="w-5 h-5" />
              Host Tournament
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="flex gap-8 mt-10 justify-center lg:justify-start">
            {[
              { icon: Users,  value: "10K+", label: "Players" },
              { icon: Trophy, value: liveCount !== null ? `${liveCount}` : "...", label: "Live Now" },
              { icon: Coins,  value: "₹5L+", label: "Prize Pool" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center group cursor-default">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Icon className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                  <p className="text-2xl font-black text-green-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {value}
                  </p>
                </div>
                <p className="text-gray-500 text-sm tracking-wider">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — character visual */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 flex justify-center items-center relative"
        >
          <div className="absolute w-80 h-80 md:w-[420px] md:h-[420px] rounded-full bg-gradient-to-br from-green-500/15 to-emerald-500/8 blur-3xl animate-pulse-slow" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-72 h-72 md:w-[380px] md:h-[380px] rounded-full border border-dashed border-green-500/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-56 h-56 md:w-[300px] md:h-[300px] rounded-full border border-dotted border-green-500/10"
          />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            <div
              className="relative overflow-hidden rounded-2xl border border-green-500/30"
              style={{
                width: "260px",
                height: "320px",
                boxShadow: "0 0 40px rgba(0,200,83,0.35), 0 0 80px rgba(0,200,83,0.12)",
              }}
            >
              <div className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,10,5,0.7) 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to top, #050A05 0%, transparent 100%)" }} />
              <div className="absolute top-0 left-0 right-0 h-10 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, #050A05 0%, transparent 100%)" }} />
              <img
                src={ffImg}
                alt="Free Fire Character"
                style={{
                  width: "100%",
                  height: "140%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  filter: "contrast(1.1) saturate(1.2) brightness(0.95)",
                }}
              />
            </div>
            <div className="w-48 h-4 bg-green-500/30 blur-xl rounded-full -mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
