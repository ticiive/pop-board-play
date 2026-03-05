import type { Player } from "@/types/game";
import { Coins, Star } from "lucide-react";

interface Props {
  players: Player[];
}

const InactivePlayerRow = ({ players }: Props) => {
  return (
    <div className="h-full flex gap-3 p-3">
      {players.map((p) => (
        <div
          key={p.id}
          className="flex-1 rounded-2xl border-[3px] border-cobalt bg-card p-3 flex items-center gap-3"
          style={{ boxShadow: "var(--pop-shadow-cobalt)" }}
        >
          {/* Avatar */}
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl shrink-0">
            🎲
          </div>

          {/* Info */}
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-sm text-cobalt">{p.label}</span>
            <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
              <Coins className="w-3.5 h-3.5" />
              <span>Moedas: {p.coins}</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
              <Star className="w-3.5 h-3.5" />
              <span>Estrelas: {p.stars}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InactivePlayerRow;
