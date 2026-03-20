import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getRegistrations, approveRegistration, rejectRegistration, getTournamentById,
} from "../services/api";
import Spinner from "../components/Spinner";
import StatusBadge from "../components/StatusBadge";
import { ArrowLeft, Users, CheckCircle, XCircle, Eye, Search } from "lucide-react";

export default function TournamentPlayers() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([getTournamentById(id), getRegistrations(id)])
      .then(([tRes, rRes]) => {
        setTournament(tRes.data);
        setRegistrations(rRes.data);
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load data"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAction = async (regId, action) => {
    setActionLoading(regId + action);
    try {
      const fn = action === "approve" ? approveRegistration : rejectRegistration;
      const res = await fn(regId);
      setRegistrations((prev) => prev.map((r) => (r._id === regId ? res.data.registration : r)));
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading("");
    }
  };

  const filtered = registrations
    .filter((r) => filter === "all" || r.status === filter)
    .filter((r) =>
      !search ||
      r.playerName.toLowerCase().includes(search.toLowerCase()) ||
      r.uid.includes(search) ||
      r.ign.toLowerCase().includes(search.toLowerCase())
    );

  const counts = {
    all: registrations.length,
    pending: registrations.filter((r) => r.status === "pending").length,
    approved: registrations.filter((r) => r.status === "approved").length,
    rejected: registrations.filter((r) => r.status === "rejected").length,
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-400 py-16">{error}</p>;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#050A05" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-green-400 text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            {tournament?.title}
          </h1>
          <p className="text-gray-400 text-sm">{tournament?.mode} · ₹{tournament?.entryFee} entry · {tournament?.date} {tournament?.time}</p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total", value: counts.all, color: "text-white" },
            { label: "Pending", value: counts.pending, color: "text-yellow-400" },
            { label: "Approved", value: counts.approved, color: "text-green-400" },
            { label: "Rejected", value: counts.rejected, color: "text-red-400" },
          ].map(({ label, value, color }) => (
            <div key={label} className="card-dark rounded-xl p-4 text-center">
              <p className={`text-2xl font-black ${color}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>{value}</p>
              <p className="text-gray-500 text-xs tracking-wider">{label}</p>
            </div>
          ))}
        </div>

        {/* Filters + search */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <div className="flex gap-2 flex-wrap">
            {["all", "pending", "approved", "rejected"].map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                  filter === s ? "bg-green-500 text-black" : "card-dark border border-white/10 text-gray-400 hover:text-white"
                }`}
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {s} ({counts[s]})
              </button>
            ))}
          </div>
          <div className="relative ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search player..."
              className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-green-500/60 text-sm w-48 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No registrations found</p>
          </div>
        ) : (
          <div className="card-dark rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500 text-left text-xs tracking-wider">
                    {["Player", "UID", "IGN", "Contact", "Transaction ID", "Screenshot", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((reg, i) => (
                    <motion.tr
                      key={reg._id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                      className="border-b border-white/5 hover:bg-white/3 transition-colors"
                    >
                      <td className="px-4 py-3 text-white font-semibold whitespace-nowrap">{reg.playerName}</td>
                      <td className="px-4 py-3 text-gray-300 font-mono text-xs">{reg.uid}</td>
                      <td className="px-4 py-3 text-gray-300">{reg.ign}</td>
                      <td className="px-4 py-3 text-gray-300 text-xs">{reg.contact}</td>
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs">{reg.transactionId}</td>
                      <td className="px-4 py-3">
                        {reg.screenshot ? (
                          <a href={reg.screenshot} target="_blank" rel="noreferrer"
                            className="flex items-center gap-1 text-green-400 hover:text-green-300 text-xs transition-colors">
                            <Eye className="w-3 h-3" /> View
                          </a>
                        ) : (
                          <span className="text-gray-600 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={reg.status} /></td>
                      <td className="px-4 py-3">
                        {reg.status === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAction(reg._id, "approve")}
                              disabled={actionLoading === reg._id + "approve"}
                              className="flex items-center gap-1 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 text-xs px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
                            >
                              <CheckCircle className="w-3 h-3" />
                              {actionLoading === reg._id + "approve" ? "..." : "Approve"}
                            </button>
                            <button
                              onClick={() => handleAction(reg._id, "reject")}
                              disabled={actionLoading === reg._id + "reject"}
                              className="flex items-center gap-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-xs px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
                            >
                              <XCircle className="w-3 h-3" />
                              {actionLoading === reg._id + "reject" ? "..." : "Reject"}
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-600 text-xs">—</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
