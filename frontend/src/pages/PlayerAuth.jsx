import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, LogIn, Mail, Lock, User, Gamepad2, Trophy, Zap, Crosshair, Users } from "lucide-react";
import { loginPlayerAccount, registerPlayerAccount } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function PlayerAuth() {
  const [tab, setTab] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "", uid: "", ign: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (tab === "login") {
      if (!form.email || !form.password) return setError("All fields required");
    } else {
      if (!form.name || !form.email || !form.password) return setError("All fields required");
      if (form.password.length < 6) return setError("Password must be at least 6 characters");
    }
    setLoading(true);
    try {
      const fn = tab === "login" ? loginPlayerAccount : registerPlayerAccount;
      const res = await fn(form);
      // Ensure it's a player account
      if (res.data.role === "host") {
        setError("This is a host account. Use Host Login instead.");
        return;
      }
      login(res.data);
      navigate("/player/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#050A05" }}>
      {/* Left branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 relative overflow-hidden p-12"
        style={{ background: "linear-gradient(135deg, #020d02 0%, #041204 50%, #050A05 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-green-500/12 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-emerald-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="absolute inset-0 opacity-5 grid-bg" />

        <div className="relative z-10 flex items-center gap-3">
          <Flame className="text-green-500 w-8 h-8" />
          <span className="text-2xl font-black tracking-widest text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            FF<span className="text-green-400"> ARENA</span>
          </span>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm font-semibold tracking-wider">PLAYER PORTAL</span>
            </div>
            <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4"
              style={{ fontFamily: "'Orbitron', sans-serif" }}>
              COMPETE &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                WIN PRIZES
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
              Join tournaments, track your registrations, and get match details all in one place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-4 mt-10"
          >
            {[
              { icon: Gamepad2, text: "Browse & join live tournaments" },
              { icon: Trophy, text: "Track your registration status" },
              { icon: Crosshair, text: "Get room ID & password instantly" },
              { icon: Zap, text: "Real-time match updates" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-gray-300 text-sm">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10">
          <p className="text-gray-600 text-sm italic">"Every champion was once a contender who refused to give up."</p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <Flame className="text-green-500 w-6 h-6" />
            <span className="text-xl font-black tracking-widest text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              FF<span className="text-green-400"> ARENA</span>
            </span>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-8 border border-white/10">
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold tracking-wider transition-all capitalize ${
                  tab === t
                    ? "bg-green-500 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {t === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              {tab === "login" ? "WELCOME BACK" : "JOIN THE ARENA"}
            </h1>
            <p className="text-gray-400 text-sm">
              {tab === "login" ? "Sign in to your player account" : "Create your player account"}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-3 mb-5 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {tab === "register" && (
                <motion.div
                  key="register-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <InputField icon={User} name="name" value={form.name} onChange={handleChange} placeholder="Your full name" label="Full Name" />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField icon={Gamepad2} name="uid" value={form.uid} onChange={handleChange} placeholder="FF UID" label="Free Fire UID" />
                    <InputField icon={Crosshair} name="ign" value={form.ign} onChange={handleChange} placeholder="In-game name" label="IGN" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <InputField icon={Mail} name="email" type="email" value={form.email} onChange={handleChange} placeholder="player@example.com" label="Email Address" />
            <InputField icon={Lock} name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" label="Password" />

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 rounded-lg text-sm tracking-wider disabled:opacity-50 mt-2 glow-green"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {tab === "login" ? <LogIn className="w-4 h-4" /> : <Users className="w-4 h-4" />}
              {loading ? "LOADING..." : tab === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center space-y-3">
            <p className="text-gray-500 text-sm">
              Are you a tournament host?{" "}
              <Link to="/host/login" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
                Host Login
              </Link>
            </p>
            <Link to="/" className="block text-gray-600 hover:text-gray-400 text-xs transition-colors">
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function InputField({ icon: Icon, name, type = "text", value, onChange, placeholder, label }) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1.5 tracking-wide">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500/60 focus:bg-white/8 transition-all text-sm"
        />
      </div>
    </div>
  );
}
