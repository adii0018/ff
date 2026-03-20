import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, UserPlus, Mail, Lock, User, Trophy, Shield, Zap } from "lucide-react";
import { registerHost } from "../services/api";

export default function HostRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) return setError("All fields required");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    setLoading(true);
    try {
      await registerHost(form);
      navigate("/host/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-yellow-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
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
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-yellow-400 text-sm font-semibold tracking-wider">BECOME A HOST</span>
            </div>
            <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              START HOSTING<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                TOURNAMENTS
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
              Create your host account and start organizing epic Free Fire tournaments for your community.
            </p>
          </motion.div>

          {/* Perks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-4 mt-10"
          >
            {[
              { icon: Trophy, text: "Create unlimited tournaments" },
              { icon: Shield, text: "Secure payment management" },
              { icon: Zap, text: "Real-time player tracking" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-orange-400" />
                </div>
                <span className="text-gray-300 text-sm">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <p className="text-gray-600 text-sm italic">"Join hundreds of hosts already on FF Arena."</p>
        </div>
      </div>

      {/* Right — Form Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl" />
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
              CREATE ACCOUNT
            </h1>
            <p className="text-gray-400">Register to start hosting tournaments</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-3 mb-6 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2 tracking-wide">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/60 focus:bg-white/8 transition-all"
                />
              </div>
            </div>

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
                  placeholder="Min 6 characters"
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
              <UserPlus className="w-4 h-4" />
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{" "}
              <Link to="/host/login" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                Sign In
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
