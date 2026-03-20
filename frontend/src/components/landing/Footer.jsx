import { Link } from "react-router-dom";
import { Flame, MessageCircle, PlayCircle, Camera, Send, LogIn, UserPlus, ArrowRight, Trophy, Gamepad2 } from "lucide-react";

const socials = [
  { label: "Discord",   icon: MessageCircle, href: "#" },
  { label: "YouTube",   icon: PlayCircle,    href: "#" },
  { label: "Instagram", icon: Camera,        href: "#" },
  { label: "Telegram",  icon: Send,          href: "#" },
];

const links = [
  { label: "Join as Player", href: "/player-auth",   icon: Gamepad2,  internal: true },
  { label: "Host Login",     href: "/host/login",     icon: LogIn,     internal: true },
  { label: "Sign Up as Host",href: "/host/register",  icon: UserPlus,  internal: true },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-green-500/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="text-green-500 w-6 h-6" />
              <span className="text-xl font-black tracking-widest text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                FF<span className="text-green-400"> ARENA</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              The ultimate Free Fire tournament platform. Compete, survive, and win real rewards.
            </p>
            <div className="flex gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-green-500/50 hover:bg-green-500/10 transition-all group"
                >
                  <Icon className="w-4 h-4 text-gray-500 group-hover:text-green-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              {links.map(({ label, href, icon: Icon, internal }) => (
                <li key={label}>
                  {internal ? (
                    <Link to={href} className="flex items-center gap-2 text-gray-500 hover:text-green-400 text-sm transition-colors group">
                      <Icon className="w-3.5 h-3.5 group-hover:text-green-400" /> {label}
                    </Link>
                  ) : (
                    <a href={href} className="flex items-center gap-2 text-gray-500 hover:text-green-400 text-sm transition-colors group">
                      <Icon className="w-3.5 h-3.5 group-hover:text-green-400" /> {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              GET STARTED
            </h4>
            <p className="text-gray-500 text-sm mb-5 leading-relaxed">
              Ready to compete? Join thousands of players in daily tournaments.
            </p>
            <Link to="/player-auth" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm group">
              <Trophy className="w-4 h-4" />
              Join Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">© 2026 FF Arena. All rights reserved.</p>
          <p className="text-gray-600 text-sm flex items-center gap-1.5">
            Powered by <Flame className="w-3.5 h-3.5 text-green-500" />
            <span className="text-green-400 font-bold">A S R   !!</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
