import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame, Menu, X, LayoutDashboard, PlusCircle, LogOut, LogIn,
  Gamepad2, Crosshair, Sword, Trophy, Zap, Target, UserPlus, Gamepad
} from "lucide-react";

export default function Navbar() {
  const { user, isHost, isPlayer, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Flame className="text-green-500 w-6 h-6" />
          <span className="text-xl font-black tracking-widest text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            FF<span className="text-green-400"> ARENA</span>
          </span>
        </Link>

        {/* Gaming icons — desktop only */}
        <div className="hidden md:flex items-center gap-4">
          {[
            { Icon: Gamepad2, label: "Play" },
            { Icon: Crosshair, label: "Aim" },
            { Icon: Sword, label: "Fight" },
            { Icon: Trophy, label: "Win" },
            { Icon: Zap, label: "Speed" },
            { Icon: Target, label: "Target" },
          ].map(({ Icon, label }, i) => (
            <motion.div key={label}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
              className="text-green-500/50 hover:text-green-400 transition-colors cursor-default" title={label}
            >
              <Icon className="w-5 h-5" />
            </motion.div>
          ))}
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 text-sm font-semibold">
          {isHost && (
            <>
              <Link to="/dashboard" className="flex items-center gap-1.5 text-gray-300 hover:text-green-400 transition-colors">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/create-tournament" className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded text-sm">
                <PlusCircle className="w-4 h-4" /> Create
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          )}
          {isPlayer && (
            <>
              <Link to="/player/dashboard" className="flex items-center gap-1.5 text-gray-300 hover:text-green-400 transition-colors">
                <Gamepad className="w-4 h-4" /> My Tournaments
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          )}
          {!user && (
            <div className="flex items-center gap-3">
              <Link to="/player-auth" className="btn-primary flex items-center gap-1.5 px-4 py-2 rounded text-sm">
                <Gamepad2 className="w-4 h-4" /> Join as Player
              </Link>
              <Link to="/host/login" className="btn-secondary flex items-center gap-1.5 px-4 py-2 rounded text-sm">
                <LogIn className="w-4 h-4" /> Host Login
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-green-400" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
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
            className="md:hidden bg-black/95 border-t border-green-500/20 px-4 py-4 flex flex-col gap-4"
          >
            {isHost && (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-green-400">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <Link to="/create-tournament" onClick={() => setMenuOpen(false)} className="btn-primary flex items-center gap-2 px-4 py-2 rounded justify-center">
                  <PlusCircle className="w-4 h-4" /> Create Tournament
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-400">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            )}
            {isPlayer && (
              <>
                <Link to="/player/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-green-400">
                  <Gamepad className="w-4 h-4" /> My Tournaments
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-400">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <Link to="/player-auth" onClick={() => setMenuOpen(false)} className="btn-primary flex items-center gap-2 px-4 py-2 rounded justify-center">
                  <Gamepad2 className="w-4 h-4" /> Join as Player
                </Link>
                <Link to="/host/login" onClick={() => setMenuOpen(false)} className="btn-secondary flex items-center gap-2 px-4 py-2 rounded justify-center">
                  <LogIn className="w-4 h-4" /> Host Login
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
