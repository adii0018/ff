import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { createTournament } from "../services/api";
import { ArrowLeft, PlusCircle, Upload } from "lucide-react";

const initialForm = {
  title: "", mode: "Solo", entryFee: "", prizePool: "",
  date: "", time: "", maxPlayers: "", description: "", qrCodeImage: null,
};

export default function CreateTournament() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.mode || !form.date || !form.time || !form.maxPlayers || !form.entryFee)
      return setError("Please fill all required fields");
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
    <div className="min-h-screen" style={{ backgroundColor: "#050A05" }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link to="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-green-400 text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="card-dark rounded-xl overflow-hidden"
        >
          <div className="h-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600" />
          <div className="p-8">
            <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              CREATE TOURNAMENT
            </h1>
            <p className="text-gray-400 text-sm mb-6">Fill in the details to host a new Free Fire tournament</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-3 mb-5 text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label="Tournament Name *" name="title" value={form.title} onChange={handleChange} placeholder="e.g. FF Pro League Season 1" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Game Mode *</label>
                  <select name="mode" value={form.mode} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500/60 transition-all text-sm">
                    {["Solo", "Duo", "Squad", "CS"].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <Field label="Max Players *" name="maxPlayers" type="number" value={form.maxPlayers} onChange={handleChange} placeholder="100" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Entry Fee (₹) *" name="entryFee" type="number" value={form.entryFee} onChange={handleChange} placeholder="50" />
                <Field label="Prize Pool (₹) *" name="prizePool" type="number" value={form.prizePool} onChange={handleChange} placeholder="500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Date *" name="date" type="date" value={form.date} onChange={handleChange} />
                <Field label="Time *" name="time" type="time" value={form.time} onChange={handleChange} />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                  placeholder="Rules, requirements, prize breakdown..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500/60 resize-none transition-all text-sm" />
              </div>

              {/* QR Code upload */}
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">UPI QR Code Image *</label>
                <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-green-500/40 hover:bg-green-500/5 transition-all relative overflow-hidden">
                  {preview ? (
                    <img src={preview} alt="QR Preview" className="h-full w-full object-contain p-2" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <Upload className="w-8 h-8" />
                      <span className="text-sm">Click to upload QR code</span>
                      <span className="text-xs">PNG, JPG up to 5MB</span>
                    </div>
                  )}
                  <input type="file" name="qrCodeImage" accept="image/*" onChange={handleChange} className="hidden" />
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 rounded-lg text-sm tracking-wider disabled:opacity-50 glow-green"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <PlusCircle className="w-4 h-4" />
                {loading ? "CREATING..." : "CREATE TOURNAMENT"}
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
