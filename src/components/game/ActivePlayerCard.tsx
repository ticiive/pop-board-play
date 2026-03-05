import type { Player } from "@/types/game";
import { Coins, Star, Zap, Shield, Swords, Heart } from "lucide-react";

interface Props {
  player: Player;
  onUpdateCoins: (delta: number) => void;
  onUpdateStars: (delta: number) => void;
  onEndTurn: () => void;
}

const CounterButton = ({
  label,
  onClick,
  variant = "default",
}: {
  label: string;
  onClick: () => void;
  variant?: "default" | "small";
}) => (
  <button
    onClick={onClick}
    className="w-10 h-10 rounded-xl border-2 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground font-bold text-lg hover:bg-primary-foreground/20 active:scale-95 transition-all"
  >
    {label}
  </button>
);

const ActivePlayerCard = ({ player, onUpdateCoins, onUpdateStars, onEndTurn }: Props) => {
  return (
    <div
      className="relative h-full rounded-3xl border-[3px] border-tangerine bg-tangerine p-5 flex flex-col gap-4"
      style={{ boxShadow: "var(--pop-shadow-tangerine)" }}
    >
      {/* Player Name */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center text-2xl">
          🎮
        </div>
        <div>
          <h2 className="text-2xl font-bold text-secondary-foreground">
            {player.label}
          </h2>
          <p className="text-sm text-secondary-foreground/70 font-semibold">
            Jogador Ativo
          </p>
        </div>
      </div>

      {/* Counters */}
      <div className="flex-1 flex flex-col gap-3 justify-center">
        {/* Coins */}
        <div className="flex items-center gap-3">
          <Coins className="w-7 h-7 text-secondary-foreground" />
          <span className="text-3xl font-bold text-secondary-foreground min-w-[3ch] text-center">
            {player.coins}
          </span>
          <div className="flex gap-1.5 ml-auto">
            <CounterButton label="-10" onClick={() => onUpdateCoins(-10)} />
            <CounterButton label="-1" onClick={() => onUpdateCoins(-1)} />
            <CounterButton label="+1" onClick={() => onUpdateCoins(1)} />
            <CounterButton label="+10" onClick={() => onUpdateCoins(10)} />
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-3">
          <Star className="w-7 h-7 text-secondary-foreground" />
          <span className="text-3xl font-bold text-secondary-foreground min-w-[3ch] text-center">
            {player.stars}
          </span>
          <div className="flex gap-1.5 ml-auto">
            <CounterButton label="-" onClick={() => onUpdateStars(-1)} />
            <CounterButton label="+" onClick={() => onUpdateStars(1)} />
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {[
            { icon: Zap, color: "bg-accent" },
            { icon: Shield, color: "bg-cobalt" },
            { icon: Swords, color: "bg-cobalt-light" },
            { icon: Heart, color: "bg-destructive" },
          ].map(({ icon: Icon, color }, i) => (
            <button
              key={i}
              className={`w-12 h-12 rounded-full ${color} flex items-center justify-center border-2 border-primary-foreground/20 hover:scale-110 active:scale-95 transition-all`}
            >
              <Icon className="w-5 h-5 text-primary-foreground" />
            </button>
          ))}
        </div>

        {/* End Turn */}
        <button
          onClick={onEndTurn}
          className="px-6 py-3 rounded-2xl border-[3px] border-destructive bg-destructive text-destructive-foreground font-bold text-sm hover:scale-[1.03] active:scale-[0.97] transition-all"
          style={{ boxShadow: "3px 3px 0px hsl(0 70% 40%)" }}
        >
          Encerrar Rodada 🔄
        </button>
      </div>
    </div>
  );
};

export default ActivePlayerCard;
