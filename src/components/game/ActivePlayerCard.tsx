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
      className={`${dim} rounded-full border-2 border-secondary-foreground/30 bg-secondary-foreground/10 text-secondary-foreground font-bold hover:bg-secondary-foreground/20 active:scale-90 transition-all flex items-center justify-center shrink-0`}
    >
      {label}
    </button>
  );
};

const ActivePlayerCard = ({ player, onUpdateCoins, onUpdateStars, onEndTurn }: Props) => {
  return (
    <div
      className="relative h-full rounded-3xl border-[3px] border-tangerine bg-tangerine p-4 flex justify-between items-stretch"
      style={{ boxShadow: "var(--pop-shadow-tangerine)" }}
    >
      {/* COLUNA ESQUERDA: AVATAR */}
      <div className="flex flex-col items-center justify-between min-w-[100px]">
        <div className="w-16 h-16 rounded-2xl bg-secondary-foreground/20 flex items-center justify-center text-3xl">
          🎮
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-secondary-foreground leading-none">
            {player.label}
          </h2>
          <p className="text-[10px] text-secondary-foreground/70 font-bold uppercase tracking-tighter">
            Ativo
          </p>
        </div>
        <div className="flex gap-1.5">
          {[Zap, Shield, Swords].map((Icon, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-cobalt flex items-center justify-center border border-white/20">
              <Icon className="w-4 h-4 text-white" />
            </div>
          ))}
        </div>
      </div>

      {/* COLUNA CENTRAL: CONTADORES (O FOCO DO AJUSTE) */}
      <div className="flex-1 flex flex-col justify-around px-2">
        
        {/* MOEDAS */}
        <div className="flex items-center gap-2">
          <Coins className="w-8 h-8 text-secondary-foreground shrink-0" />
          <div className="flex items-center gap-1 bg-black/10 rounded-full p-1 pr-2 ml-auto">
            {/* BOTÕES DE MENOS */}
            <CircleBtn label="-10" onClick={() => onUpdateCoins(-10)} size="sm" />
            <CircleBtn label="-1" onClick={() => onUpdateCoins(-1)} />
            
            {/* VALOR NO MEIO */}
            <span className="text-3xl font-black text-secondary-foreground min-w-[45px] text-center">
              {player.coins}
            </span>
            
            {/* BOTÕES DE MAIS */}
            <CircleBtn label="+1" onClick={() => onUpdateCoins(1)} />
            <CircleBtn label="+10" onClick={() => onUpdateCoins(10)} size="sm" />
          </div>
        </div>

        {/* ESTRELAS */}
        <div className="flex items-center gap-2">
          <Star className="w-8 h-8 text-secondary-foreground shrink-0" />
          <div className="flex items-center gap-2 bg-black/10 rounded-full p-1 pr-2 ml-auto">
            <CircleBtn label="-" onClick={() => onUpdateStars(-1)} />
            
            <span className="text-3xl font-black text-secondary-foreground min-w-[45px] text-center">
              {player.stars}
            </span>
            
            <CircleBtn label="+" onClick={() => onUpdateStars(1)} />
          </div>
        </div>
      </div>

      {/* COLUNA DIREITA: BOTÃO */}
      <div className="flex items-center pl-2">
        <button
          onClick={onEndTurn}
          className="px-4 py-6 rounded-2xl border-[3px] border-destructive bg-destructive text-destructive-foreground font-black text-xs hover:scale-105 transition-all leading-tight shadow-[3px_3px_0px_rgba(0,0,0,0.2)]"
        >
          ENCERRAR<br/>RODADA 🔄
        </button>
      </div>
    </div>
  );
};

export default ActivePlayerCard;