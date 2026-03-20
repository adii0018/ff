import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy, Gamepad2, ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative z-10 py-20 overflow-hidden">
      {/* glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-40 bg-green-500/10 blur-3xl rounded-full" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-40 bg-orange-500/8 blur-3xl rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Player CTA */}
          <div
            className="card-dark rounded-2xl p-8 border border-green-500/20 flex flex-col items-start gap-5"
            style={{ boxShadow: "0 0 40px rgba(0,255,136,0.07)" }}
          >
            <span className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-semibold tracking-widest">FOR PLAYERS</span>
            </span>
            <div>
              <h2 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                READY TO<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500">
                  COMPETE?
                </span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Join thousands of players competing for real cash prizes every day.
              </p>
            </div>
            <Link
              to="/player-auth"
              className="btn-primary flex items-center gap-2 px-6 py-3 rounded-lg text-sm glow-green group mt-auto"
            >
              <Gamepad2 className="w-4 h-4" /> Join as Player
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Host CTA */}
          <div
            className="card-dark rounded-2xl p-8 border border-orange-500/20 flex flex-col items-start gap-5"
            style={{ boxShadow: "0 0 40px rgba(255,107,0,0.07)" }}
          >
            <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <span className="text-orange-400 text-xs font-semibold tracking-widest">FOR HOSTS</span>
            </span>
            <div>
              <h2 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                START<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                  HOSTING?
                </span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Create and manage tournaments, track registrations, and grow your community.
              </p>
            </div>
            <Link
              to="/host/register"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all hover:-translate-y-0.5 group mt-auto"
              style={{ background: "linear-gradient(135deg, #FF6B00, #FFD700)", color: "#000", fontFamily: "'Orbitron', sans-serif", boxShadow: "0 0 20px rgba(255,107,0,0.35)" }}
            >
              <Trophy className="w-4 h-4" /> Host a Tournament
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
