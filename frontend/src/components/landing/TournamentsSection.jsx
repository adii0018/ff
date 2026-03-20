import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, Clock, Users, Coins, Trophy, ArrowRight } from "lucide-react";
import Spinner from "../Spinner";

const modeBadge = {
  Solo: "bg-blue-600/20 text-blue-400 border-blue-500/30",
  Duo: "bg-green-600/20 text-green-400 border-green-500/30",
  Squad: "bg-yellow-600/20 text-yellow-400 border-yellow-500/30",
  CS: "bg-red-600/20 text-red-400 border-red-500/30",
};

function TournamentCard({ tournament, index }) {
  const { _id, title, mode, entryFee, prizePool, date, time, maxPlayers } = tournament;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card-dark rounded-xl overflow-hidden group"
    >
      <div className="h-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600" />
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-white font-bold text-base leading-tight flex-1 pr-2">{title}</h3>
          <span className={`text-xs font-bold px-2 py-1 rounded border ${modeBadge[mode] || "bg-gray-600/20 text-gray-400 border-gray-500/30"} shrink-0`}>
            {mode}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-black/30 rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1 flex items-center gap-1">
              <Coins className="w-3 h-3" /> Entry Fee
            </p>
            <p className="text-orange-400 font-black text-lg" style={{ fontFamily: "'Orbitron', sans-serif" }}>₹{entryFee}</p>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1 flex items-center gap-1">
              <Trophy className="w-3 h-3" /> Prize Pool
            </p>
            <p className="text-yellow-400 font-black text-lg" style={{ fontFamily: "'Orbitron', sans-serif" }}>₹{prizePool}</p>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1 flex items-center gap-1">
              <CalendarDays className="w-3 h-3" /> Date
            </p>
            <p className="text-gray-300 text-sm font-semibold">{date}</p>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Time
            </p>
            <p className="text-gray-300 text-sm font-semibold">{time}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600 flex items-center gap-1">
            <Users className="w-3 h-3" /> Max {maxPlayers}
          </span>
          <Link to={`/tournament/${_id}`} className="btn-primary flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm">
            Join Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function TournamentsSection({ tournaments, loading }) {
  return (
    <section id="tournaments" className="py-24 bg-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 text-sm font-bold tracking-[0.3em] uppercase mb-3 block">
            Active Now
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            LIVE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">TOURNAMENTS</span>
          </h2>
          <p className="text-gray-400 text-lg">Register now before slots fill up</p>
        </motion.div>

        {loading ? (
          <Spinner />
        ) : tournaments.length === 0 ? (
          <div className="text-center py-20">
            <Trophy className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-xl">No active tournaments right now</p>
            <p className="text-gray-600 mt-2">Check back soon or host your own!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.slice(0, 6).map((t, i) => (
              <TournamentCard key={t._id} tournament={t} index={i} />
            ))}
          </div>
        )}

        {tournaments.length > 6 && (
          <div className="text-center mt-10">
            <button className="btn-secondary flex items-center gap-2 px-8 py-3 rounded-lg mx-auto">
              View All Tournaments <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
