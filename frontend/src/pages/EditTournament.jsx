import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getTournamentById, updateTournament } from "../services/api";
import Spinner from "../components/Spinner";
import { ArrowLeft, Save, Key } from "lucide-react";

export default function EditTournament() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getTournamentById(id)
      .then((res) => {
        const t = res.data;
        setForm({
          title: t.title,
          mode: t.mode,
          entryFee: t.entryFee,
          prizePool: t.prizePool,
          date: t.date,
          time: t.time,
          maxPlayers: t.maxPlayers,
          description: t.description || "",
          roomId: t.roomId || "",
          roomPassword: t.roomPassword || "",
          status: t.status || "upcoming",
        });
      })
      .catch(() => setError("Tournament not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await updateTournament(id, form);
      setSuccess("Tournament updated successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;
  if (!form) return <p className="text-center text-red-400 py-16">{error}</p>;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#050A05" }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link to="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-green-400 text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="card-dark rounded-xl overflow-hidden"
        >
          <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
          <div className="p-8">
            <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              EDIT TOURNAMENT
            </h1>
            <p className="text-gray-400 text-sm mb-6">Update tournament details and room credentials</p>

            {error && <Alert type="error" msg={error} />}
            {success && <Alert type="success" msg={success} />}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label="Tournament Name" name="title" value={form.title} onChange={handleChange} />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Game Mode</label>
                  <select name="mode" value={form.mode} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/60 transition-all text-sm">
                    {["Solo", "Duo", "Squad", "CS"].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Status</label>
                  <select name="status" value={form.status} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/60 transition-all text-sm">
                    {["upcoming", "live", "completed"].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Entry Fee (₹)" name="entryFee" type="number" value={form.entryFee} onChange={handleChange} />
                <Field label="Prize Pool (₹)" name="prizePool" type="number" value={form.prizePool} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Date" name="date" type="date" value={form.date} onChange={handleChange} />
                <Field label="Time" name="time" type="time" value={form.time} onChange={handleChange} />
              </div>

              <Field label="Max Players" name="maxPlayers" type="number" value={form.maxPlayers} onChange={handleChange} />

              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500/60 resize-none transition-all text-sm"
                  placeholder="Rules, requirements, prize breakdown..." />
              </div>

              {/* Room credentials section */}
              <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5">
                <p className="text-green-400 text-xs font-bold tracking-widest mb-4 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" /> ROOM CREDENTIALS
                </p>
                <p className="text-gray-500 text-xs mb-4">Set these before the match. Approved players will see them in their dashboard.</p>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Room ID" name="roomId" value={form.roomId} onChange={handleChange} placeholder="e.g. 123456" />
                  <Field label="Room Password" name="roomPassword" value={form.roomPassword} onChange={handleChange} placeholder="e.g. ff2026" />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 rounded-lg text-sm tracking-wider disabled:opacity-50 glow-green"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <Save className="w-4 h-4" />
                {saving ? "SAVING..." : "SAVE CHANGES"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1.5">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500/60 transition-all text-sm" />
    </div>
  );
}

function Alert({ type, msg }) {
  const styles = type === "error"
    ? "bg-red-500/10 border-red-500/30 text-red-400"
    : "bg-green-500/10 border-green-500/30 text-green-400";
  return (
    <div className={`border rounded-lg p-3 mb-5 text-sm ${styles}`}>{msg}</div>
  );
}
