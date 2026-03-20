import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gamepad2, ChevronDown, Users, Trophy, Coins } from "lucide-react";
import ffImg from "../../ff_img.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg grid-bg">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-3xl" />
      </div>

      {/* Top/bottom accent lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-orange-400 text-sm font-semibold tracking-wider">LIVE TOURNAMENTS ACTIVE</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="text-white">JOIN THE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 fire-text">
              ULTIMATE
            </span>
            <br />
            <span className="text-white">FREE FIRE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              TOURNAMENT
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-xl md:text-2xl mb-8 font-semibold tracking-wide"
          >
            Compete. Survive.{" "}
            <span className="text-yellow-400">Win Real Rewards.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a href="#tournaments" className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg glow-orange">
              <Gamepad2 className="w-5 h-5" /> Join Tournament
            </a>
            <Link to="/host/register" className="btn-secondary flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg">
              <Trophy className="w-5 h-5" /> Host Tournament
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex gap-8 mt-10 justify-center lg:justify-start"
          >
            {[
              { icon: Users, value: "10K+", label: "Players" },
              { icon: Trophy, value: "500+", label: "Tournaments" },
              { icon: Coins, value: "₹5L+", label: "Prize Pool" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Icon className="w-4 h-4 text-orange-500" />
                  <p className="text-2xl font-black text-orange-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {value}
                  </p>
                </div>
                <p className="text-gray-500 text-sm tracking-wider">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — character visual */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex justify-center items-center relative"
        >
          {/* Outer glow ring */}
          <div className="absolute w-80 h-80 md:w-[420px] md:h-[420px] rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/10 blur-3xl animate-pulse-slow" />

          {/* Rotating border ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-72 h-72 md:w-[380px] md:h-[380px] rounded-full border border-dashed border-orange-500/20"
          />

          {/* Character container */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Image crop container — shows top 80% of image (character body, cuts bottom) */}
            <div
              className="relative overflow-hidden rounded-2xl border border-orange-500/20"
              style={{
                width: "260px",
                height: "320px",
                boxShadow: "0 0 40px rgba(255,107,0,0.35), 0 0 80px rgba(255,107,0,0.15)",
              }}
            >
              {/* Dark vignette overlay — fades edges */}
              <div className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,15,0.7) 100%)",
                }}
              />
              {/* Bottom fade — blends into background */}
              <div className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to top, #0A0A0F 0%, transparent 100%)" }}
              />
              {/* Top fade */}
              <div className="absolute top-0 left-0 right-0 h-10 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, #0A0A0F 0%, transparent 100%)" }}
              />

              <img
                src={ffImg}
                alt="Free Fire Character"
                style={{
                  width: "100%",
                  height: "140%",        /* taller than container = crops bottom */
                  objectFit: "cover",
                  objectPosition: "top center",  /* keep face/upper body */
                  filter: "contrast(1.1) saturate(1.2) brightness(0.95)",
                }}
              />
            </div>

            {/* Ground glow */}
            <div className="w-48 h-3 bg-orange-500/30 blur-xl rounded-full -mt-2" />
          </motion.div>


        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-gray-500 text-xs tracking-widest">SCROLL DOWN</span>
        <ChevronDown className="w-5 h-5 text-orange-500" />
      </motion.div>
    </section>
  );
}
