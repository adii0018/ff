import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getMyRegistrations, getTournaments } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import StatusBadge from "../components/StatusBadge";
import TournamentCard from "../components/TournamentCard";
import {
  Trophy, Gamepad2, Clock, CheckCircle, XCircle, Key, Hash,
  CalendarDays, Coins, Users, ArrowRight, Crosshair
} from "lucide-react";

export default function PlayerDashboard() {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [liveTournaments, setLiveTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("tournaments"); // "tournaments" | "registrations"

  useEffect(() => {
    Promise.all([getMyRegistrations(), getTournaments()])
      .then(([regRes, tRes]) => {
        setRegistrations(regRes.data);
        // Show upcoming + live tournaments (not completed)
        const active = tRes.data.filter(t => t.status !== "completed");
        setLiveTournaments(active.slice(0, 6));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Joined", value: registrations.length, icon: Gamepad2, color: "text-green-400" },
    { label: "Approved", value: registrations.filter(r => r.status === "approved").length, icon: CheckCircle, color: "text-emerald-400" },
    { label: "Pending", value: registrations.filter(r => r.status === "pending").length, icon: Clock, color: "text-yellow-400" },
    { label: "Rejected", value: registrations.filter(r => r.status === "rejected").length, icon: XCircle, color: "text-red-400" },
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
              <Crosshair className="w-5 h-5 text-green-400" />
              <span className="text-green-400 text-sm font-semibold tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                PLAYER DASHBOARD
              </span>
            </div>
            <h1 className="text-3xl font-black text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Welcome, <span className="text-green-400">{user?.name}</span>
            </h1>
            {user?.ign && (
              <p className="text-gray-400 text-sm mt-1">IGN: <span className="text-green-300 font-semibold">{user.ign}</span> · UID: <span className="text-green-300 font-semibold">{user.uid}</span></p>
            )}
          </div>
          <Link to="/player/dashboard#tournaments" className="btn-primary flex items-center gap-2 px-6 py-3 rounded-lg text-sm glow-green">
            <Gamepad2 className="w-4 h-4" /> Browse Tournaments
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

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "tournaments", label: "Live Tournaments", icon: Trophy },
            { key: "registrations", label: "My Registrations", icon: Gamepad2 },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                tab === key
                  ? "bg-green-500 text-black"
                  : "card-dark text-gray-400 hover:text-white border border-white/10"
              }`}
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {loading ? (
          <Spinner />
        ) : tab === "tournaments" ? (
          <div>
            {liveTournaments.length === 0 ? (
              <EmptyState icon="🏆" text="No tournaments available right now" />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveTournaments.map((t) => (
                  <TournamentCard key={t._id} tournament={t} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {registrations.length === 0 ? (
              <EmptyState icon="🎮" text="You haven't joined any tournaments yet" />
            ) : (
              registrations.map((reg) => (
                <RegistrationCard key={reg._id} reg={reg} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function RegistrationCard({ reg }) {
  const t = reg.tournamentId;
  const isApproved = reg.status === "approved";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="card-dark rounded-xl overflow-hidden"
    >
      <div className={`h-1 ${isApproved ? "bg-gradient-to-r from-green-500 to-emerald-400" : reg.status === "rejected" ? "bg-gradient-to-r from-red-600 to-red-400" : "bg-gradient-to-r from-yellow-500 to-orange-400"}`} />
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-white font-bold text-lg">{t?.title || "Tournament"}</h3>
            <p className="text-gray-400 text-sm">{t?.mode} · ₹{t?.entryFee} entry · {t?.date} {t?.time}</p>
          </div>
          <StatusBadge status={reg.status} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <InfoCell icon={Gamepad2} label="IGN" value={reg.ign} />
          <InfoCell icon={Hash} label="UID" value={reg.uid} />
          <InfoCell icon={Coins} label="Entry Fee" value={`₹${t?.entryFee}`} color="text-orange-400" />
          <InfoCell icon={Trophy} label="Prize Pool" value={`₹${t?.prizePool}`} color="text-yellow-400" />
        </div>

        {/* Room details — only for approved */}
        {isApproved && (t?.roomId || t?.roomPassword) && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mt-2">
            <p className="text-green-400 text-xs font-bold tracking-widest mb-3 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" /> MATCH DETAILS
            </p>
            <div className="grid grid-cols-2 gap-3">
              {t.roomId && (
                <div>
                  <p className="text-gray-500 text-xs mb-1">Room ID</p>
                  <p className="text-white font-black text-lg tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {t.roomId}
                  </p>
                </div>
              )}
              {t.roomPassword && (
                <div>
                  <p className="text-gray-500 text-xs mb-1">Password</p>
                  <p className="text-green-400 font-black text-lg tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {t.roomPassword}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {isApproved && !t?.roomId && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mt-2">
            <p className="text-yellow-400 text-xs flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Room details will be shared before the match starts
            </p>
          </div>
        )}

        {reg.status === "pending" && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-3 mt-2">
            <p className="text-gray-400 text-xs flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Waiting for host approval
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <p className="text-gray-600 text-xs">Transaction: <span className="text-gray-400 font-mono">{reg.transactionId}</span></p>
          {t?._id && (
            <Link to={`/tournament/${t._id}`} className="text-green-400 hover:text-green-300 text-xs flex items-center gap-1 transition-colors">
              View Tournament <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function InfoCell({ icon: Icon, label, value, color = "text-gray-300" }) {
  return (
    <div className="bg-black/30 rounded-lg p-3">
      <p className="text-gray-500 text-xs mb-1 flex items-center gap-1"><Icon className="w-3 h-3" /> {label}</p>
      <p className={`font-bold text-sm ${color}`}>{value}</p>
    </div>
  );
}

function EmptyState({ icon, text }) {
  return (
    <div className="text-center py-20 text-gray-500">
      <p className="text-5xl mb-4">{icon}</p>
      <p className="text-lg mb-4">{text}</p>
      <Link to="/" className="text-green-400 hover:text-green-300 text-sm transition-colors flex items-center gap-1 justify-center">
        Browse Tournaments <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
