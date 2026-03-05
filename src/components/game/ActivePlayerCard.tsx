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
  const dim = size === "sm" ? "w-9 h-9 text-sm" : "w-11 h-11 text-base";
  return (
    <button
      onClick={onClick}
      className={`${dim} rounded-full border-2 border-secondary-foreground/30 bg-secondary-foreground/10 text-secondary-foreground font-bold hover:bg-secondary-foreground/20 active:scale-90 transition-all flex items-center justify-center`}
    >
      {label}
    </button>
  );
};

const ActivePlayerCard = ({ player, onUpdateCoins, onUpdateStars, onEndTurn }: Props) => {
  return (
    <div
      className="relative h-full rounded-3xl border-[3px] border-tangerine bg-tangerine p-4 flex gap-4"
      style={{ boxShadow: "var(--pop-shadow-tangerine)" }}
    >
      {/* Left: Avatar + Action Buttons */}
      <div className="flex flex-col items-center justify-between py-2">
        <div className="w-16 h-16 rounded-2xl bg-secondary-foreground/20 flex items-center justify-center text-3xl">
          🎮
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-secondary-foreground mt-1">
            {player.label}
          </h2>
          <p className="text-xs text-secondary-foreground/70 font-semibold">
            Jogador Ativo
          </p>
        </div>
        {/* Quick Action Buttons */}
        <div className="flex gap-2 mt-auto">
          {[Zap, Shield, Swords].map((Icon, i) => (
            <button
              key={i}
              className="w-10 h-10 rounded-full bg-cobalt flex items-center justify-center border-2 border-primary-foreground/20 hover:scale-110 active:scale-90 transition-all"
            >
              <Icon className="w-4 h-4 text-primary-foreground" />
            </button>
          ))}
        </div>
      </div>

      {/* Center: Counters */}
      <div className="flex-1 flex flex-col justify-center gap-4">
        {/* Coins */}
        <div className="flex items-center gap-3">
          <Coins className="w-8 h-8 text-secondary-foreground shrink-0" />
          <span className="text-4xl font-bold text-secondary-foreground min-w-[3ch] text-center">
            {player.coins}
          </span>
          <div className="flex items-center gap-1.5 ml-auto">
            <CircleBtn label="-10" onClick={() => onUpdateCoins(-10)} size="sm" />
            <CircleBtn label="-1" onClick={() => onUpdateCoins(-1)} />
            <CircleBtn label="+1" onClick={() => onUpdateCoins(1)} />
            <CircleBtn label="+10" onClick={() => onUpdateCoins(10)} size="sm" />
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-3">
          <Star className="w-8 h-8 text-secondary-foreground shrink-0" />
          <span className="text-4xl font-bold text-secondary-foreground min-w-[3ch] text-center">
            {player.stars}
          </span>
          <div className="flex items-center gap-1.5 ml-auto">
            <CircleBtn label="-" onClick={() => onUpdateStars(-1)} />
            <CircleBtn label="+" onClick={() => onUpdateStars(1)} />
          </div>
        </div>
      </div>

      {/* Right: End Turn Button */}
      <div className="flex items-end">
        <button
          onClick={onEndTurn}
          className="px-5 py-3 rounded-2xl border-[3px] border-destructive bg-destructive text-destructive-foreground font-bold text-sm hover:scale-[1.03] active:scale-95 transition-all whitespace-nowrap"
          style={{ boxShadow: "3px 3px 0px hsl(0 70% 40%)" }}
        >
          ENCERRAR RODADA 🔄
        </button>
      </div>
    </div>
  );
};

export default ActivePlayerCard;