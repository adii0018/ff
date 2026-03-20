import { motion } from "framer-motion";
import { Activity, MonitorPlay, ShieldCheck, BarChart3, Users, CheckCircle2 } from "lucide-react";

const features = [
  { icon: Activity, title: "Real-Time Match Updates", desc: "Live scores, kills, and match status updated instantly during gameplay." },
  { icon: MonitorPlay, title: "Easy Tournament Hosting", desc: "Create and manage tournaments in minutes with our intuitive host dashboard." },
  { icon: ShieldCheck, title: "Secure Payment System", desc: "QR-based payments with transaction verification for safe entry fees." },
  { icon: BarChart3, title: "Live Leaderboard", desc: "Dynamic rankings updated in real-time based on kills and survival." },
  { icon: Users, title: "Squad & Solo Modes", desc: "Support for Solo, Duo, Squad, and CS modes for all play styles." },
  { icon: CheckCircle2, title: "Instant Results", desc: "Winners announced immediately after match with prize distribution details." },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 section-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 text-sm font-bold tracking-[0.3em] uppercase mb-3 block">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            BUILT FOR{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">WARRIORS</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Everything you need to compete at the highest level
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="card-dark rounded-xl p-6 group cursor-default"
            >
              <div className="w-14 h-14 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                <Icon className="w-7 h-7 text-orange-400" />
              </div>
              <h3
                className="text-white font-bold mb-2 group-hover:text-orange-400 transition-colors"
                style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.85rem" }}
              >
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
