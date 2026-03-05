import { Trophy } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Player } from "@/types/game";

const Ranking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const players: Player[] = (location.state as any)?.players || [];

  const sorted = [...players].sort((a, b) => b.stars - a.stars || b.coins - a.coins);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-5 py-6 max-w-md mx-auto">
      <Trophy className="w-16 h-16 text-tangerine mb-4" />
      <h1 className="text-3xl font-bold text-cobalt mb-6">Ranking Final 🏆</h1>

      <div className="w-full flex flex-col gap-3 mb-8">
        {sorted.map((p, i) => (
          <div
            key={p.id}
            className="flex items-center gap-4 p-4 rounded-2xl border-[3px] border-cobalt bg-card"
            style={{ boxShadow: "var(--pop-shadow-cobalt)" }}
          >
            <span className="text-2xl font-bold text-tangerine min-w-[2ch]">
              {i + 1}º
            </span>
            <span className="text-lg font-bold text-cobalt flex-1">{p.label}</span>
            <span className="text-sm font-semibold text-muted-foreground">
              ⭐ {p.stars} · 🪙 {p.coins}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/")}
        className="px-8 py-4 rounded-2xl border-[3px] border-neon-green bg-neon-green text-accent-foreground font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
        style={{ boxShadow: "var(--pop-shadow-green)" }}
      >
        Novo Jogo 🎮
      </button>
    </div>
  );
};

export default Ranking;
