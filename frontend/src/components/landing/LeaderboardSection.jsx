import { motion } from "framer-motion";
import { Medal, Crosshair, Star, Crown } from "lucide-react";

const players = [
  { rank: 1, name: "ShadowKiller_FF", kills: 42, score: 9850 },
  { rank: 2, name: "BlazeMaster99", kills: 38, score: 9200 },
  { rank: 3, name: "NightHunter_X", kills: 35, score: 8750 },
  { rank: 4, name: "StormBreaker07", kills: 31, score: 8100 },
  { rank: 5, name: "PhantomSniper", kills: 28, score: 7650 },
  { rank: 6, name: "IronWolf_FF", kills: 25, score: 7200 },
];

const rankStyle = {
  1: { icon: Crown, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  2: { icon: Medal, color: "text-gray-300", bg: "bg-gray-300/10" },
  3: { icon: Medal, color: "text-orange-400", bg: "bg-orange-400/10" },
};

export default function LeaderboardSection() {
  return (
    <section id="leaderboard" className="py-24 bg-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 text-sm font-bold tracking-[0.3em] uppercase mb-3 block">
            Hall of Fame
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            TOP{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400">PLAYERS</span>
          </h2>
          <p className="text-gray-400 text-lg">Global rankings updated after every match</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-dark rounded-2xl overflow-hidden border border-orange-500/10"
        >
          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-orange-500/5 border-b border-orange-500/10">
            <div className="col-span-1 text-gray-500 text-xs font-bold tracking-wider">#</div>
            <div className="col-span-5 text-gray-500 text-xs font-bold tracking-wider">PLAYER</div>
            <div className="col-span-3 text-gray-500 text-xs font-bold tracking-wider text-center">KILLS</div>
            <div className="col-span-3 text-gray-500 text-xs font-bold tracking-wider text-right">SCORE</div>
          </div>

          {players.map((p, i) => {
            const rs = rankStyle[p.rank];
            const RankIcon = rs?.icon;
            return (
              <motion.div
                key={p.rank}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 hover:bg-orange-500/5 transition-colors ${
                  p.rank <= 3 ? "bg-gradient-to-r from-orange-500/5 to-transparent" : ""
                }`}
              >
                <div className="col-span-1 flex items-center">
                  {RankIcon ? (
                    <div className={`w-7 h-7 rounded-md ${rs.bg} flex items-center justify-center`}>
                      <RankIcon className={`w-4 h-4 ${rs.color}`} />
                    </div>
                  ) : (
                    <span className="text-gray-600 font-bold text-sm w-7 text-center">{p.rank}</span>
                  )}
                </div>
                <div className="col-span-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/30 to-yellow-500/20 flex items-center justify-center text-sm font-black text-orange-400">
                    {p.name[0]}
                  </div>
                  <span className={`font-bold text-sm ${p.rank <= 3 ? "text-white" : "text-gray-400"}`}>
                    {p.name}
                  </span>
                </div>
                <div className="col-span-3 flex items-center justify-center gap-1.5">
                  <Crosshair className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-red-400 font-bold text-sm">{p.kills}</span>
                </div>
                <div className="col-span-3 flex items-center justify-end gap-1.5">
                  <Star className={`w-3.5 h-3.5 ${p.rank === 1 ? "text-yellow-400" : p.rank === 2 ? "text-gray-300" : p.rank === 3 ? "text-orange-400" : "text-gray-600"}`} />
                  <span
                    className={`font-black text-sm ${p.rank === 1 ? "text-yellow-400" : p.rank === 2 ? "text-gray-300" : p.rank === 3 ? "text-orange-400" : "text-gray-500"}`}
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {p.score.toLocaleString()}
                  </span>
                </div>
              </motion.div>
            );
          })}

          <div className="px-6 py-4 text-center">
            <p className="text-gray-600 text-sm">Showing top 6 players • Updated after each match</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
