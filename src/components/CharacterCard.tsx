import { UserPlus } from "lucide-react";

interface CharacterCardProps {
  label: string;
  selected: boolean;
  order?: number; // Nova prop para a ordem de seleção
  onClick: () => void;
}

const CharacterCard = ({ label, selected, order, onClick }: CharacterCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative aspect-square w-full rounded-3xl border-[3px] transition-all duration-200
        flex flex-col items-center justify-center gap-2
        font-bold text-lg
        ${
          selected
            ? "border-tangerine bg-tangerine/15 scale-[0.96]"
            : "border-cobalt-light bg-card hover:scale-[1.03]"
        }
      `}
      style={{
        boxShadow: selected
          ? "var(--pop-shadow-tangerine)"
          : "var(--pop-shadow-cobalt)",
      }}
    >
      {/* Badge de Ordem - Aparece apenas quando selecionado */}
      {selected && order && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-cobalt text-white rounded-full border-2 border-background flex items-center justify-center text-sm font-black shadow-md animate-in zoom-in duration-300">
          {order}
        </div>
      )}

      <div
        className={`
          w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-colors duration-200
          ${selected ? "bg-tangerine text-secondary-foreground" : "bg-muted text-cobalt"}
        `}
      >
        {selected ? "🎮" : <UserPlus className="w-7 h-7" />}
      </div>
      
      <span className={`text-sm font-semibold ${selected ? "text-tangerine" : "text-cobalt"}`}>
        {label}
      </span>
    </button>
  );
};

export default CharacterCard;