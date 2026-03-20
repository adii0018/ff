import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getTournamentById, registerPlayer } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import {
  CalendarDays, Clock, Users, Coins, Trophy, QrCode,
  CheckCircle, ArrowRight, Gamepad2, User, Hash, Phone, CreditCard, Upload
} from "lucide-react";

const initialForm = {
  playerName: "", uid: "", ign: "", contact: "", transactionId: "", screenshot: null,
};

export default function TournamentPage() {
  const { id } = useParams();
  const { user, isPlayer } = useAuth();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [screenshotPreview, setScreenshotPreview] = useState(null);

  useEffect(() => {
    getTournamentById(id)
      .then((res) => setTournament(res.data))
      .catch(() => setError("Tournament not found"))
      .finally(() => setLoading(false));
  }, [id]);

  // Pre-fill form if player is logged in
  useEffect(() => {
    if (isPlayer && user) {
      setForm((prev) => ({
        ...prev,
        playerName: user.name || "",
        uid: user.uid || "",
        ign: user.ign || "",
        contact: user.contact || "",
      }));
    }
  }, [isPlayer, user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      setScreenshotPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.playerName || !form.uid || !form.ign || !form.contact || !form.transactionId)
      return setError("Please fill all required fields");

    const data = new FormData();
    data.append("tournamentId", id);
    Object.entries(form).forEach(([key, val]) => { if (val) data.append(key, val); });

    setSubmitting(true);
    try {
      await registerPlayer(data);
      setSuccess("Registration submitted! Waiting for host approval.");
      setForm(initialForm);
      setScreenshotPreview(null);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;
  if (!tournament) return <p className="text-center text-red-400 py-16">{error}</p>;

  const statusColor = {
    upcoming: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    live: "bg-green-500/20 text-green-400 border-green-500/30",
    completed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#050A05" }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tournament Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="card-dark rounded-xl overflow-hidden mb-6"
        >
          <div className="h-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600" />
          <div className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="text-3xl font-black text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {tournament.title}
                  </h1>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusColor[tournament.status] || statusColor.upcoming}`}>
                    {(tournament.status || "UPCOMING").toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">Hosted by <span className="text-green-400 font-semibold">{tournament.hostId?.name}</span></p>
              </div>
              <span className="bg-white/5 border border-white/10 text-gray-300 font-bold px-4 py-1.5 rounded-lg text-sm">
                {tournament.mode}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: Coins, label: "Entry Fee", value: `₹${tournament.entryFee}`, color: "text-orange-400" },
                { icon: Trophy, label: "Prize Pool", value: `₹${tournament.prizePool}`, color: "text-yellow-400" },
                { icon: CalendarDays, label: "Date", value: tournament.date, color: "text-gray-300" },
                { icon: Clock, label: "Time", value: tournament.time, color: "text-gray-300" },
                { icon: Users, label: "Max Players", value: tournament.maxPlayers, color: "text-blue-400" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="bg-black/30 rounded-xl p-4">
                  <p className="text-gray-500 text-xs mb-1.5 flex items-center gap-1"><Icon className="w-3 h-3" /> {label}</p>
                  <p className={`font-black text-lg ${color}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>{value}</p>
                </div>
              ))}
            </div>

            {tournament.description && (
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">{tournament.description}</p>
            )}

            {/* QR Code */}
            <div className="flex flex-col items-center bg-black/30 rounded-xl p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <QrCode className="w-5 h-5 text-green-400" />
                <p className="text-green-400 font-bold text-sm tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  SCAN TO PAY ENTRY FEE
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl mb-3">
                <img src={tournament.qrCodeImage} alt="Payment QR Code"
                  className="w-44 h-44 object-contain" />
              </div>
              <p className="text-gray-400 text-sm">Pay ₹{tournament.entryFee} via PhonePe / GPay / Paytm</p>
            </div>
          </div>
        </motion.div>

        {/* Registration Form */}
        {tournament.status !== "completed" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="card-dark rounded-xl overflow-hidden"
          >
            <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h2 className="text-xl font-black text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    REGISTER FOR TOURNAMENT
                  </h2>
                  {isPlayer && (
                    <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Logged in as {user.name} — fields pre-filled
                    </p>
                  )}
                </div>
                {!user && (
                  <Link to="/player-auth" className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1 transition-colors">
                    Sign in for faster registration <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>

              {success && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg p-4 mb-5 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" /> {success}
                </div>
              )}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-4 mb-5 text-sm">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RegField icon={User} label="Player Name *" name="playerName" value={form.playerName} onChange={handleChange} placeholder="Your real name" />
                  <RegField icon={Hash} label="Free Fire UID *" name="uid" value={form.uid} onChange={handleChange} placeholder="e.g. 123456789" />
                  <RegField icon={Gamepad2} label="In-Game Name (IGN) *" name="ign" value={form.ign} onChange={handleChange} placeholder="Your FF username" />
                  <RegField icon={Phone} label="Contact / Discord *" name="contact" value={form.contact} onChange={handleChange} placeholder="Phone or Discord ID" />
                  <RegField icon={CreditCard} label="Transaction ID *" name="transactionId" value={form.transactionId} onChange={handleChange} placeholder="UPI transaction ID" className="md:col-span-2" />
                </div>

                {/* Screenshot upload */}
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Payment Screenshot (optional)</label>
                  <label className="flex items-center gap-3 w-full border border-dashed border-white/10 rounded-xl p-4 cursor-pointer hover:border-green-500/40 hover:bg-green-500/5 transition-all">
                    {screenshotPreview ? (
                      <img src={screenshotPreview} alt="Screenshot" className="w-16 h-16 object-cover rounded-lg" />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                        <Upload className="w-6 h-6 text-gray-500" />
                      </div>
                    )}
                    <div>
                      <p className="text-gray-300 text-sm">{screenshotPreview ? "Screenshot selected" : "Upload payment screenshot"}</p>
                      <p className="text-gray-600 text-xs">PNG, JPG up to 5MB</p>
                    </div>
                    <input type="file" name="screenshot" accept="image/*" onChange={handleChange} className="hidden" />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 rounded-lg text-sm tracking-wider disabled:opacity-50 glow-green"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  <Gamepad2 className="w-4 h-4" />
                  {submitting ? "SUBMITTING..." : "SUBMIT REGISTRATION"}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function RegField({ icon: Icon, label, name, value, onChange, placeholder, className = "" }) {
  return (
    <div className={className}>
      <label className="block text-xs text-gray-400 mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500/60 transition-all text-sm" />
      </div>
    </div>
  );
}
