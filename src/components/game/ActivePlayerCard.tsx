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
      className="relative h-full rounded-3xl border-[3px] border-tangerine bg-tangerine p-4 flex gap-6 items-center"
      style={{ boxShadow: "var(--pop-shadow-tangerine)" }}
    >
      {/* LADO ESQUERDO: Avatar e Botões de Ação Rápida */}
      <div className="flex flex-col items-center justify-between h-full py-1 min-w-[100px]">
        <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-4xl shadow-inner">
          🎮
        </div>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl font-black text-white leading-tight uppercase">
            {player.label}
          </h2>
          <div className="px-2 py-0.5 bg-black/10 rounded-full mt-1">
            <p className="text-[10px] text-white font-black uppercase tracking-widest">
              Ativo
            </p>
          </div>
        </div>
        
        <div className="flex gap-1.5 mt-2">
          {[Zap, Shield, Swords].map((Icon, i) => (
            <button
              key={i}
              className="w-8 h-8 rounded-full bg-cobalt flex items-center justify-center border-[2px] border-black/20 hover:scale-110 active:scale-90 transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
            >
              <Icon className="w-4 h-4 text-white" />
            </button>
          ))}
        </div>
      </div>

      {/* CENTRO: Contadores com valor entre os botões */}
      <div className="flex-1 flex flex-col justify-center gap-6 items-center">
        
        {/* Layout Moedas: [-10] [-1] [VALOR] [+1] [+10] */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <CircleBtn label="-10" onClick={() => onUpdateCoins(-10)} size="sm" />
            <CircleBtn label="-1" onClick={() => onUpdateCoins(-1)} />
          </div>
          
          <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-2xl border-2 border-white/10 min-w-[120px] justify-center">
            <Coins className="w-6 h-6 text-white" />
            <span className="text-4xl font-black text-white tabular-nums">
              {player.coins}
            </span>
          </div>

          <div className="flex gap-1">
            <CircleBtn label="+1" onClick={() => onUpdateCoins(1)} />
            <CircleBtn label="+10" onClick={() => onUpdateCoins(10)} size="sm" />
          </div>
        </div>

        {/* Layout Estrelas: [-] [VALOR] [+] */}
        <div className="flex items-center gap-4">
          <CircleBtn label="-" onClick={() => onUpdateStars(-1)} />
          
          <div className="flex items-center gap-2 bg-black/20 px-6 py-2 rounded-2xl border-2 border-white/10 min-w-[120px] justify-center">
            <Star className="w-6 h-6 text-white" />
            <span className="text-4xl font-black text-white tabular-nums">
              {player.stars}
            </span>
          </div>

          <CircleBtn label="+" onClick={() => onUpdateStars(1)} />
        </div>
      </div>

      {/* DIREITA: Botão Encerrar Rodada */}
      <div className="flex items-center pr-2">
        <button
          onClick={onEndTurn}
          className="h-24 w-24 rounded-2xl border-[4px] border-black/20 bg-destructive text-white font-black text-[10px] hover:scale-[1.05] active:scale-95 transition-all flex flex-col items-center justify-center gap-2 text-center p-2 leading-none shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
        >
          <span className="text-3xl">🔄</span>
          ENCERRAR<br/>RODADA
        </button>
      </div>
    </div>
  );
};

export default ActivePlayerCard;