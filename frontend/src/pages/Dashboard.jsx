import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyTournaments } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

export default function Dashboard() {
  const { host } = useAuth();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyTournaments()
      .then((res) => setTournaments(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Welcome back, {host?.name}</p>
        </div>
        <Link
          to="/create-tournament"
          className="bg-primary hover:bg-purple-700 text-white font-bold px-6 py-2.5 rounded-lg transition-colors"
        >
          + New Tournament
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Tournaments" value={tournaments.length} color="text-neon" />
        <StatCard label="Active" value={tournaments.length} color="text-green-400" />
        <StatCard label="Account" value="Host" color="text-primary" />
      </div>

      {/* Tournament list */}
      {loading ? (
        <Spinner />
      ) : tournaments.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-5xl mb-4">🏆</p>
          <p className="text-xl mb-4">No tournaments yet</p>
          <Link to="/create-tournament" className="text-neon hover:underline">
            Create your first tournament
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {tournaments.map((t) => (
            <div
              key={t._id}
              className="bg-card border border-border rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 hover:border-primary transition-colors"
            >
              <div>
                <h3 className="text-lg font-bold text-white">{t.title}</h3>
                <p className="text-gray-400 text-sm">
                  {t.mode} · ₹{t.entryFee} entry · {t.date} {t.time}
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/tournament/${t._id}`}
                  className="text-sm text-neon border border-neon/40 hover:bg-neon/10 px-4 py-1.5 rounded transition-colors"
                >
                  View Page
                </Link>
                <Link
                  to={`/tournament/${t._id}/players`}
                  className="text-sm bg-primary hover:bg-purple-700 text-white px-4 py-1.5 rounded transition-colors"
                >
                  Manage Players
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <p className="text-gray-500 text-sm mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
