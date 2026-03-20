import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTournaments } from "../../services/api";
import TournamentCard from "../TournamentCard";
import Spinner from "../Spinner";
import { Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function LiveTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTournaments()
      .then((res) => setTournaments(res.data.slice(0, 6)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="tournaments" className="relative z-10 py-20 section-bg">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent mb-16" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <span className="text-green-400 text-xs font-semibold tracking-[0.3em] uppercase">Active Now</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              LIVE TOURNAMENTS
            </h2>
          </div>
          <Link to="/player-auth" className="btn-secondary flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {loading ? (
          <Spinner />
        ) : tournaments.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No tournaments available right now. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((t, i) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <TournamentCard tournament={t} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent mt-16" />
    </section>
  );
}
