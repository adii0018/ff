import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTournament } from "../services/api";

const initialForm = {
  title: "",
  mode: "Solo",
  entryFee: "",
  prizePool: "",
  date: "",
  time: "",
  maxPlayers: "",
  description: "",
  qrCodeImage: null,
};

export default function CreateTournament() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.mode || !form.date || !form.time || !form.maxPlayers || !form.entryFee) {
      return setError("Please fill all required fields");
    }
    if (!form.qrCodeImage) return setError("QR code image is required");

    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val !== null && val !== "") data.append(key, val);
    });

    setLoading(true);
    try {
      const res = await createTournament(data);
      navigate(`/tournament/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create tournament");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-primary to-neon" />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Tournament</h1>
          <p className="text-gray-400 mb-6">Fill in the details to host a new tournament</p>

          {error && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg p-3 mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <Field label="Tournament Name *" name="title" value={form.title} onChange={handleChange} placeholder="e.g. FF Pro League Season 1" />

            {/* Mode */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Game Mode *</label>
              <select
                name="mode"
                value={form.mode}
                onChange={handleChange}
                className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary"
              >
                {["Solo", "Duo", "Squad", "CS"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Fee & Prize */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Entry Fee (₹) *" name="entryFee" type="number" value={form.entryFee} onChange={handleChange} placeholder="50" />
              <Field label="Prize Pool (₹) *" name="prizePool" type="number" value={form.prizePool} onChange={handleChange} placeholder="500" />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Date *" name="date" type="date" value={form.date} onChange={handleChange} />
              <Field label="Time *" name="time" type="time" value={form.time} onChange={handleChange} />
            </div>

            {/* Max Players */}
            <Field label="Max Players *" name="maxPlayers" type="number" value={form.maxPlayers} onChange={handleChange} placeholder="100" />

            {/* Description */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Rules, requirements, prizes breakdown..."
                className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary resize-none"
              />
            </div>

            {/* QR Code */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">UPI QR Code Image *</label>
              <input
                type="file"
                name="qrCodeImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full bg-dark border border-border rounded-lg px-3 py-2 text-gray-300 text-sm file:mr-3 file:bg-primary file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:cursor-pointer"
              />
              <p className="text-gray-600 text-xs mt-1">Upload your UPI QR code for players to scan and pay</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors text-lg"
            >
              {loading ? "Creating..." : "Create Tournament"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary"
      />
    </div>
  );
}
