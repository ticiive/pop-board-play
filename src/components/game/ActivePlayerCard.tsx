import type { Player } from "@/types/game";
import { Coins, Star, Zap, Shield, Swords } from "lucide-react";

interface Props {
  player: Player;
  onUpdateCoins: (delta: number) => void;
  onUpdateStars: (delta: number) => void;
  onEndTurn: () => void;
}

const CircleBtn = ({
  label,
  onClick,
  size = "md",
}: {
  label: string;
  onClick: () => void;
  size?: "sm" | "md";
}) => {
  const dim = size === "sm" ? "w-9 h-9 text-xs" : "w-11 h-11 text-base";
  return (
    <button
      onClick={onClick}
      className={`${dim} rounded-full border-[3px] border-black/20 bg-white/20 text-white font-black hover:bg-white/30 active:scale-90 transition-all flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,0.2)]`}
    >
      {label}
    </button>
  );
};

const ActivePlayerCard = ({ player, onUpdateCoins, onUpdateStars, onEndTurn }: Props) => {
  return (
    <div
      className="relative h-full rounded-3xl border-[3px] border-tangerine bg-tangerine p-4 flex gap-6"
      style={{ boxShadow: "var(--pop-shadow-tangerine)" }}
    >
      {/* Left: Avatar + Action Buttons */}
      <div className="flex flex-col items-center justify-between py-1">
        <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-4xl shadow-inner">
          🎮
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-black text-white leading-tight uppercase tracking-tight">
            {player.label}
          </h2>
          <div className="px-2 py-0.5 bg-black/10 rounded-full">
            <p className="text-[10px] text-white font-black uppercase tracking-widest">
              Ativo
            </p>
          </div>
        </div>
        
        {/* Quick Action Buttons */}
        <div className="flex gap-1.5 mt-auto">
          {[Zap, Shield, Swords].map((Icon, i) => (
            <button
              key={i}
              className="w-9 h-9 rounded-full bg-cobalt flex items-center justify-center border-[3px] border-black/20 hover:scale-110 active:scale-90 transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
            >
              <Icon className="w-4 h-4 text-white" />
            </button>
          ))}
        </div>
      </div>

      {/* Center: Counters (Ajustados para valor entre botões) */}
      <div className="flex-1 flex flex-col justify-center gap-6">
        
        {/* Coins Layout: [-10] [-1] [ICON + VALUE] [+1] [+10] */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-1">
            <CircleBtn label="-10" onClick={() => onUpdateCoins(-10)} size="sm" />
            <CircleBtn label="-1" onClick={() => onUpdateCoins(-1)} />
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-black/10 rounded-2xl border-2 border-white/10">
            <Coins className="w-7 h-7 text-white fill-white/20" />
            <span className="text-4xl font-black text-white tabular-nums">
              {player.coins}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <CircleBtn label="+1" onClick={() => onUpdateCoins(1)} />
            <CircleBtn label="+10" onClick={() => onUpdateCoins(10)} size="sm" />
          </div>
        </div>

        {/* Stars Layout: [-] [ICON + VALUE] [+] */}
        <div className="flex items-center justify-center gap-3">
          <CircleBtn label="-" onClick={() => onUpdateStars(-1)} />
          
          <div className="flex items-center gap-2 px-6 py-2 bg-black/10 rounded-2xl border-2 border-white/10">
            <Star className="w-7 h-7 text-white fill-white/20" />
            <span className="text-4xl font-black text-white tabular-nums">
              {player.stars}
            </span>
          </div>

          <CircleBtn label="+" onClick={() => onUpdateStars(1)} />
        </div>
      </div>

      {/* Right: End Turn Button */}
      <div className="flex items-center">
        <button
          onClick={onEndTurn}
          className="h-24 w-24 rounded-2xl border-[4px] border-black/20 bg-destructive text-white font-black text-xs hover:scale-[1.05] active:scale-95 transition-all flex flex-col items-center justify-center gap-2 text-center p-2 leading-none"
          style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.2)" }}
        >
          <span className="text-2xl">🔄</span>
          ENCERRAR<br/>RODADA
        </button>
      </div>
    </div>
  );
};

export default ActivePlayerCard;