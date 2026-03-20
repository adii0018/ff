import { Link } from "react-router-dom";
import { CalendarDays, Clock, Users, Coins, Trophy, ArrowRight } from "lucide-react";

const modeBadge = {
  Solo: "bg-blue-600/20 text-blue-400 border-blue-500/30",
  Duo: "bg-green-600/20 text-green-400 border-green-500/30",
  Squad: "bg-yellow-600/20 text-yellow-400 border-yellow-500/30",
  CS: "bg-red-600/20 text-red-400 border-red-500/30",
};

export default function TournamentCard({ tournament }) {
  const { _id, title, mode, entryFee, prizePool, date, time, maxPlayers } = tournament;

  return (
    <div className="card-dark rounded-xl overflow-hidden group">
      <div className="h-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600" />
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-white font-bold text-base leading-tight flex-1 pr-2">{title}</h3>
          <span className={`text-xs font-bold px-2 py-1 rounded border ${modeBadge[mode] || "bg-gray-600/20 text-gray-400 border-gray-500/30"} shrink-0`}>
            {mode}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-black/30 rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1 flex items-center gap-1"><Coins className="w-3 h-3" /> Entry Fee</p>
            <p className="text-orange-400 font-black text-lg" style={{ fontFamily: "'Orbitron', sans-serif" }}>₹{entryFee}</p>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1 flex items-center gap-1"><Trophy className="w-3 h-3" /> Prize Pool</p>
            <p className="text-yellow-400 font-black text-lg" style={{ fontFamily: "'Orbitron', sans-serif" }}>₹{prizePool}</p>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1 flex items-center gap-1"><CalendarDays className="w-3 h-3" /> Date</p>
            <p className="text-gray-300 text-sm font-semibold">{date}</p>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <p className="text-gray-500 text-xs mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Time</p>
            <p className="text-gray-300 text-sm font-semibold">{time}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600 flex items-center gap-1">
            <Users className="w-3 h-3" /> Max {maxPlayers}
          </span>
          <Link to={`/tournament/${_id}`} className="btn-primary flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm">
            Join Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
