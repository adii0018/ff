import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserPlus, Search, CreditCard, Gamepad2, Trophy } from "lucide-react";

const steps = [
  { icon: UserPlus,   num: "01", title: "Register as player",   desc: "Create your host account in seconds." },
  { icon: Search,     num: "02", title: "Browse Tournaments", desc: "Find active tournaments that match your style." },
  { icon: CreditCard, num: "03", title: "Pay Entry Fee",      desc: "Scan QR & pay via any UPI app instantly." },
  { icon: Gamepad2,   num: "04", title: "Play & Win",         desc: "Drop in, dominate, and claim your prize." },
];

export default function HowToJoin() {
  return (
    <section className="relative z-10 py-20 section-bg">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent mb-16" />

      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-green-400 text-xs font-semibold tracking-[0.3em] uppercase">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            JOIN IN 4 STEPS
          </h2>
        </motion.div>

        {/* Steps with connector line */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* connector line — desktop only */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-green-500/10 via-green-500/40 to-green-500/10 z-0" />

          {steps.map(({ icon: Icon, num, title, desc }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-dark rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden z-10 cursor-default"
            >
              {/* faded step number */}
              <span
                className="absolute top-2 right-3 text-6xl font-black text-green-500/8 select-none"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {num}
              </span>

              {/* icon with active dot */}
              <div className="relative w-11 h-11">
                <div className="w-11 h-11 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-green-400" />
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#050A05]" />
              </div>

              <div>
                <p className="text-white font-bold text-base mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {title}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent mt-16" />

      {/* Bottom CTAs */}
      <div className="max-w-xl mx-auto px-4 mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/player-auth"
          className="btn-primary flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-sm glow-green"
        >
          <Gamepad2 className="w-4 h-4" /> Join as Player
        </Link>
        <Link
          to="/host/register"
          className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-sm font-bold transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, #FF6B00, #FFD700)", color: "#000", fontFamily: "'Orbitron', sans-serif", boxShadow: "0 0 20px rgba(255,107,0,0.3)" }}
        >
          <Trophy className="w-4 h-4" /> Host a Tournament
        </Link>
      </div>
    </section>
  );
}
