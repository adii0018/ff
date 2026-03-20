import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Menu, X, LayoutDashboard, PlusCircle, LogOut, LogIn, UserPlus, Trophy, Zap } from "lucide-react";

export default function Navbar() {
  const { host, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Flame className="text-orange-500 w-6 h-6" />
          <span className="text-xl font-black tracking-widest text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            FF<span className="text-orange-500">ARENA</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <Link to="/" className="flex items-center gap-1.5 text-gray-300 hover:text-orange-400 transition-colors tracking-wide">
            <Trophy className="w-4 h-4" /> Tournaments
          </Link>
          <a href="#features" className="flex items-center gap-1.5 text-gray-300 hover:text-orange-400 transition-colors tracking-wide">
            <Zap className="w-4 h-4" /> Features
          </a>
          <a href="#leaderboard" className="flex items-center gap-1.5 text-gray-300 hover:text-orange-400 transition-colors tracking-wide">
            <LayoutDashboard className="w-4 h-4" /> Leaderboard
          </a>
          {host ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-1.5 text-gray-300 hover:text-orange-400 transition-colors">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/create-tournament" className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded text-sm">
                <PlusCircle className="w-4 h-4" /> Create
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/host/login" className="btn-secondary flex items-center gap-1.5 px-4 py-2 rounded text-sm">
                <LogIn className="w-4 h-4" /> Host Login
              </Link>
              <Link to="/host/register" className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded text-sm">
                <UserPlus className="w-4 h-4" /> Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-orange-400" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-t border-orange-500/20 px-4 py-4 flex flex-col gap-4"
          >
            <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-orange-400">
              <Trophy className="w-4 h-4" /> Tournaments
            </Link>
            <a href="#features" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-orange-400">
              <Zap className="w-4 h-4" /> Features
            </a>
            <a href="#leaderboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-orange-400">
              <LayoutDashboard className="w-4 h-4" /> Leaderboard
            </a>
            {host ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-orange-400">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <Link to="/create-tournament" onClick={() => setMenuOpen(false)} className="btn-primary flex items-center gap-2 px-4 py-2 rounded justify-center">
                  <PlusCircle className="w-4 h-4" /> Create
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-400">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/host/login" onClick={() => setMenuOpen(false)} className="btn-secondary flex items-center gap-2 px-4 py-2 rounded justify-center">
                  <LogIn className="w-4 h-4" /> Host Login
                </Link>
                <Link to="/host/register" onClick={() => setMenuOpen(false)} className="btn-primary flex items-center gap-2 px-4 py-2 rounded justify-center">
                  <UserPlus className="w-4 h-4" /> Sign Up
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
