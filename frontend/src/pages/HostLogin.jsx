import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, LogIn, Mail, Lock, Trophy, Users, Coins } from "lucide-react";
import { loginHost } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function HostLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) return setError("All fields required");
    setLoading(true);
    try {
      const res = await loginHost(form);
      if (res.data.role === "player") {
        setError("This is a player account. Use Player Login instead.");
        return;
      }
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#0A0A0F" }}>
      {/* Left — Branding Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden p-12"
        style={{ background: "linear-gradient(135deg, #0f0a00 0%, #1a0f00 50%, #0A0A0F 100%)" }}>
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(rgba(255,107,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <Flame className="text-orange-500 w-8 h-8" />
          <span className="text-2xl font-black tracking-widest text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            FF<span className="text-orange-500">ARENA</span>
          </span>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-orange-400 text-sm font-semibold tracking-wider">HOST PORTAL</span>
            </div>
            <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              MANAGE YOUR<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">
                TOURNAMENTS
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
              Sign in to your host account and take control of your Free Fire tournaments.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="flex gap-8 mt-10"
          >
            {[
              { icon: Users, value: "10K+", label: "Players" },
              { icon: Trophy, value: "500+", label: "Tournaments" },
              { icon: Coins, value: "₹5L+", label: "Prize Pool" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className="w-4 h-4 text-orange-500" />
                  <p className="text-xl font-black text-orange-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>{value}</p>
                </div>
                <p className="text-gray-500 text-xs tracking-wider uppercase">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10">
          <p className="text-gray-600 text-sm italic">"The best tournaments start with the best hosts."</p>
        </div>
      </div>

      {/* Right — Form Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <Flame className="text-orange-500 w-6 h-6" />
            <span className="text-xl font-black tracking-widest text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              FF<span className="text-orange-500">ARENA</span>
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              WELCOME BACK
            </h1>
            <p className="text-gray-400">Sign in to your host account</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-3 mb-6 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2 tracking-wide">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="host@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/60 focus:bg-white/8 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2 tracking-wide">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/60 focus:bg-white/8 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-sm tracking-wider disabled:opacity-50 mt-2 font-bold transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #FF6B00, #FFD700)", color: "#000", fontFamily: "'Orbitron', sans-serif", boxShadow: "0 0 20px rgba(255,107,0,0.4)" }}
            >
              <LogIn className="w-4 h-4" />
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link to="/host/register" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                Register as Host
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-500 text-sm mb-3">
              Are you a player?{" "}
              <Link to="/player-auth" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
                Player Login →
              </Link>
            </p>
            <Link to="/" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
