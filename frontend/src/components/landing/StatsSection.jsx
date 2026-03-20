import { motion } from "framer-motion";
import { Users, Trophy, Coins, Zap } from "lucide-react";

const stats = [
  { icon: Users,  value: "10K+",  label: "Active Players" },
  { icon: Trophy, value: "500+",  label: "Tournaments Hosted" },
  { icon: Coins,  value: "₹5L+",  label: "Total Prize Pool" },
  { icon: Zap,    value: "24/7",  label: "Live Matches" },
];

export default function StatsSection() {
  return (
    <section className="relative z-10 py-16 grid-bg">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card-dark rounded-xl p-6 flex flex-col items-center gap-3 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <Icon className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-3xl font-black text-green-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              {value}
            </p>
            <p className="text-gray-400 text-sm tracking-wider">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
