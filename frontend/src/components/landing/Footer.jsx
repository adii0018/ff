import { Link } from "react-router-dom";
import { Flame, MessageCircle, Youtube, Instagram, Twitter, Trophy, Zap, LayoutDashboard, LogIn, UserPlus, ArrowRight } from "lucide-react";

const socials = [
  { label: "Discord", icon: MessageCircle, href: "#" },
  { label: "YouTube", icon: Youtube, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "Twitter", icon: Twitter, href: "#" },
];

const links = [
  { label: "Tournaments", href: "#tournaments", icon: Trophy },
  { label: "Features", href: "#features", icon: Zap },
  { label: "Leaderboard", href: "#leaderboard", icon: LayoutDashboard },
  { label: "Host Login", href: "/host/login", icon: LogIn, internal: true },
  { label: "Sign Up", href: "/host/register", icon: UserPlus, internal: true },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-orange-500/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="text-orange-500 w-6 h-6" />
              <span className="text-xl font-black tracking-widest text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                FF<span className="text-orange-500">ARENA</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              The ultimate Free Fire tournament platform. Compete, survive, and win real rewards.
            </p>
            <div className="flex gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-orange-500/50 hover:bg-orange-500/10 transition-all group"
                >
                  <Icon className="w-4 h-4 text-gray-500 group-hover:text-orange-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              QUICK LINKS
            </h4>
            <ul className="space-y-2">
              {links.map(({ label, href, icon: Icon, internal }) => (
                <li key={label}>
                  {internal ? (
                    <Link to={href} className="flex items-center gap-2 text-gray-500 hover:text-orange-400 text-sm transition-colors group">
                      <Icon className="w-3.5 h-3.5 group-hover:text-orange-400" />
                      {label}
                    </Link>
                  ) : (
                    <a href={href} className="flex items-center gap-2 text-gray-500 hover:text-orange-400 text-sm transition-colors group">
                      <Icon className="w-3.5 h-3.5 group-hover:text-orange-400" />
                      {label}
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
            <p className="text-gray-500 text-sm mb-4">
              Ready to compete? Join thousands of players in daily tournaments.
            </p>
            <a href="#tournaments" className="btn-primary flex items-center gap-2 px-6 py-3 rounded-lg inline-flex text-sm">
              <Trophy className="w-4 h-4" /> Join Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">© 2025 FF Arena. All rights reserved.</p>
          <p className="text-gray-600 text-sm flex items-center gap-1.5">
            Powered by <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-orange-400 font-bold">Ignite Coders</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
