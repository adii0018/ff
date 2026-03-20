import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTournamentById, registerPlayer } from "../services/api";
import Spinner from "../components/Spinner";

const initialForm = {
  playerName: "",
  uid: "",
  ign: "",
  contact: "",
  transactionId: "",
  screenshot: null,
};

export default function TournamentPage() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getTournamentById(id)
      .then((res) => setTournament(res.data))
      .catch(() => setError("Tournament not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!form.playerName || !form.uid || !form.ign || !form.contact || !form.transactionId) {
      return setError("Please fill all required fields");
    }

    const data = new FormData();
    data.append("tournamentId", id);
    Object.entries(form).forEach(([key, val]) => {
      if (val) data.append(key, val);
    });

    setSubmitting(true);
    try {
      await registerPlayer(data);
      setSuccess("Registration submitted! Waiting for host approval.");
      setForm(initialForm);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;
  if (!tournament) return <p className="text-center text-red-400 py-16">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Tournament Details */}
      <div className="bg-card border border-border rounded-xl overflow-hidden mb-8">
        <div className="h-1 bg-gradient-to-r from-primary to-neon" />
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{tournament.title}</h1>
              <p className="text-gray-400">Hosted by {tournament.hostId?.name}</p>
            </div>
            <span className="bg-primary text-white font-bold px-4 py-1.5 rounded-full text-sm">
              {tournament.mode}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Entry Fee", value: `₹${tournament.entryFee}`, color: "text-neon" },
              { label: "Prize Pool", value: `₹${tournament.prizePool}`, color: "text-yellow-400" },
              { label: "Date", value: tournament.date, color: "text-white" },
              { label: "Time", value: tournament.time, color: "text-white" },
              { label: "Max Players", value: tournament.maxPlayers, color: "text-white" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-dark rounded-lg p-3">
                <p className="text-gray-500 text-xs mb-1">{label}</p>
                <p className={`font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          {tournament.description && (
            <p className="text-gray-400 text-sm mb-6">{tournament.description}</p>
          )}

          {/* QR Code */}
          <div className="flex flex-col items-center bg-dark rounded-xl p-6">
            <p className="text-neon font-bold text-lg mb-3">Scan to Pay Entry Fee</p>
            <img
              src={tournament.qrCodeImage}
              alt="Payment QR Code"
              className="w-48 h-48 object-contain rounded-lg border-2 border-primary"
            />
            <p className="text-gray-400 text-sm mt-3">
              Pay ₹{tournament.entryFee} via PhonePe / GPay / Paytm
            </p>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-neon to-primary" />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Register for Tournament</h2>

          {success && (
            <div className="bg-green-500/20 border border-green-500/40 text-green-400 rounded-lg p-4 mb-4">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg p-4 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Player Name *" name="playerName" value={form.playerName} onChange={handleChange} placeholder="Your real name" />
              <Field label="Free Fire UID *" name="uid" value={form.uid} onChange={handleChange} placeholder="e.g. 123456789" />
              <Field label="In-Game Name (IGN) *" name="ign" value={form.ign} onChange={handleChange} placeholder="Your FF username" />
              <Field label="Contact / Discord *" name="contact" value={form.contact} onChange={handleChange} placeholder="Phone or Discord ID" />
              <Field label="Transaction ID *" name="transactionId" value={form.transactionId} onChange={handleChange} placeholder="UPI transaction ID" />
            </div>

            {/* Screenshot upload */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Payment Screenshot (optional)</label>
              <input
                type="file"
                name="screenshot"
                accept="image/*"
                onChange={handleChange}
                className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-gray-300 text-sm file:mr-3 file:bg-primary file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors text-lg"
            >
              {submitting ? "Submitting..." : "Submit Registration"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Reusable input field
function Field({ label, name, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}
