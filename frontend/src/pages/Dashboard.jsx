import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getMyTournaments, deleteTournament, getRegistrations } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import {
  Trophy, PlusCircle, Users, Coins, CalendarDays, Clock,
  Trash2, Eye, Settings, LayoutDashboard, Flame, Edit
} from "lucide-react";

const statusColors = {
  upcoming: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  live: "bg-green-500/20 text-green-400 border-green-500/30",
  completed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

export default function Dashboard() {
  const { user } = useAuth();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState("");
  const [totalRegistrations, setTotalRegistrations] = useState(0);

  useEffect(() => {
    getMyTournaments()
      .then(async (res) => {
        setTournaments(res.data);
        // Sum up registrations across all tournaments
        let total = 0;
        await Promise.all(
          res.data.map((t) =>
            getRegistrations(t._id)
              .then((r) => { total += r.data.length; })
              .catch(() => {})
          )
        );
        setTotalRegistrations(total);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this tournament? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await deleteTournament(id);
      setTournaments((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    } finally {
      setDeleting("");
    }
  };

  const stats = [
    { label: "Total", value: tournaments.length, icon: Trophy, color: "text-orange-400" },
    { label: "Live", value: tournaments.filter(t => t.status === "live").length, icon: Flame, color: "text-red-400" },
    { label: "Upcoming", value: tournaments.filter(t => t.status === "upcoming").length, icon: CalendarDays, color: "text-yellow-400" },
    { label: "Registrations", value: totalRegistrations, icon: Users, color: "text-orange-300" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#050A05" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400 text-sm font-semibold tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                HOST DASHBOARD
              </span>
            </div>
            <h1 className="text-3xl font-black text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Welcome, <span className="text-orange-400">{user?.name}</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
          </div>
          <Link
            to="/create-tournament"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #FF6B00, #FFD700)", color: "#000", fontFamily: "'Orbitron', sans-serif", boxShadow: "0 0 20px rgba(255,107,0,0.35)" }}
          >
            <PlusCircle className="w-4 h-4" /> New Tournament
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card-dark rounded-xl p-5 flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className={`text-2xl font-black ${color}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>{value}</p>
                <p className="text-gray-500 text-xs tracking-wider">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tournament list */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            YOUR TOURNAMENTS
          </h2>
        </div>

        {loading ? (
          <Spinner />
        ) : tournaments.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-5xl mb-4">🏆</p>
            <p className="text-xl mb-4">No tournaments yet</p>
            <Link to="/create-tournament" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm">
              <PlusCircle className="w-4 h-4" /> Create your first tournament
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {tournaments.map((t, i) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card-dark rounded-xl overflow-hidden"
              >
                <div className="h-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600" />
                <div className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-white font-bold text-lg truncate">{t.title}</h3>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded border ${statusColors[t.status] || statusColors.upcoming}`}>
                          {t.status?.toUpperCase() || "UPCOMING"}
                        </span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                          {t.mode}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><Coins className="w-3.5 h-3.5 text-orange-400" /> ₹{t.entryFee} entry</span>
                        <span className="flex items-center gap-1"><Trophy className="w-3.5 h-3.5 text-yellow-400" /> ₹{t.prizePool} prize</span>
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-blue-400" /> {t.maxPlayers} slots</span>
                        <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" /> {t.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {t.time}</span>
                      </div>
                      {(t.roomId || t.roomPassword) && (
                        <div className="flex gap-4 mt-2 text-xs">
                          {t.roomId && <span className="text-green-400">Room: <span className="font-mono font-bold">{t.roomId}</span></span>}
                          {t.roomPassword && <span className="text-green-400">Pass: <span className="font-mono font-bold">{t.roomPassword}</span></span>}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <Link
                        to={`/tournament/${t._id}`}
                        className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:border-green-500/50 hover:text-green-400 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>
                      <Link
                        to={`/tournament/${t._id}/players`}
                        className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-all"
                      >
                        <Users className="w-3.5 h-3.5" /> Players
                      </Link>
                      <Link
                        to={`/tournament/${t._id}/edit`}
                        className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:border-yellow-500/50 hover:text-yellow-400 transition-all"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(t._id)}
                        disabled={deleting === t._id}
                        className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:border-red-500/50 hover:text-red-400 transition-all disabled:opacity-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> {deleting === t._id ? "..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
