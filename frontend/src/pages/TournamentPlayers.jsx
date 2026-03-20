import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getRegistrations,
  approveRegistration,
  rejectRegistration,
  getTournamentById,
} from "../services/api";
import Spinner from "../components/Spinner";
import StatusBadge from "../components/StatusBadge";

export default function TournamentPlayers() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");
  const [filter, setFilter] = useState("all");

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
      setRegistrations((prev) =>
        prev.map((r) => (r._id === regId ? res.data.registration : r))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading("");
    }
  };

  const filtered = registrations.filter(
    (r) => filter === "all" || r.status === filter
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">{tournament?.title}</h1>
        <p className="text-gray-400">{tournament?.mode} · ₹{tournament?.entryFee} entry</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "pending", "approved", "rejected"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-colors ${
              filter === s
                ? "bg-primary text-white"
                : "bg-card border border-border text-gray-400 hover:border-primary"
            }`}
          >
            {s} ({counts[s]})
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">👥</p>
          <p>No registrations found</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-gray-400 text-left">
                  {["Player", "UID", "IGN", "Contact", "Transaction ID", "Screenshot", "Status", "Actions"].map(
                    (h) => (
                      <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((reg) => (
                  <tr key={reg._id} className="border-b border-border/50 hover:bg-dark/50 transition-colors">
                    <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{reg.playerName}</td>
                    <td className="px-4 py-3 text-gray-300 font-mono">{reg.uid}</td>
                    <td className="px-4 py-3 text-gray-300">{reg.ign}</td>
                    <td className="px-4 py-3 text-gray-300">{reg.contact}</td>
                    <td className="px-4 py-3 text-gray-300 font-mono text-xs">{reg.transactionId}</td>
                    <td className="px-4 py-3">
                      {reg.screenshot ? (
                        <a
                          href={reg.screenshot}
                          target="_blank"
                          rel="noreferrer"
                          className="text-neon hover:underline text-xs"
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-gray-600 text-xs">None</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={reg.status} />
                    </td>
                    <td className="px-4 py-3">
                      {reg.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAction(reg._id, "approve")}
                            disabled={actionLoading === reg._id + "approve"}
                            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-xs px-3 py-1 rounded transition-colors"
                          >
                            {actionLoading === reg._id + "approve" ? "..." : "Approve"}
                          </button>
                          <button
                            onClick={() => handleAction(reg._id, "reject")}
                            disabled={actionLoading === reg._id + "reject"}
                            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs px-3 py-1 rounded transition-colors"
                          >
                            {actionLoading === reg._id + "reject" ? "..." : "Reject"}
                          </button>
                        </div>
                      )}
                      {reg.status !== "pending" && (
                        <span className="text-gray-600 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
