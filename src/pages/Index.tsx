import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CharacterCard from "@/components/CharacterCard";
import RoundButton from "@/components/RoundButton";
import { Gamepad2 } from "lucide-react";

const players = ["P1", "P2", "P3", "P4", "P5", "P6"];
const roundOptions = [10, 15, 20];
const MAX_PLAYERS = 4; // Definindo o limite máximo

const Index = () => {
  const navigate = useNavigate();
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [selectedRounds, setSelectedRounds] = useState<number | null>(null);

  const togglePlayer = (label: string) => {
    setSelectedPlayers((prev) => {
      // Se já estiver selecionado, remove
      if (prev.includes(label)) {
        return prev.filter((p) => p !== label);
      }
      
      // Se não estiver selecionado e já atingiu o limite, não faz nada
      if (prev.length >= MAX_PLAYERS) {
        return prev;
      }

      // Adiciona ao final da lista (preservando a ordem de clique)
      return [...prev, label];
    });
  };

  const canStart = selectedPlayers.length >= 2 && selectedRounds !== null;

  const handleStart = () => {
    if (!canStart) return;
    navigate("/game", {
      state: {
        players: selectedPlayers, // Enviando na ordem que foram clicados
        totalRounds: selectedRounds,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-5 py-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Gamepad2 className="w-8 h-8 text-tangerine" />
        <h1 className="text-2xl font-bold text-cobalt">Game Setup</h1>
      </div>

      {/* Character Grid */}
      <section className="w-full mb-8">
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold text-cobalt">
            Escolha os jogadores! 
          </h2>
          <p className="text-sm text-cobalt/60">
            {selectedPlayers.length} de {MAX_PLAYERS} selecionados
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {players.map((p) => {
            // Encontra a posição do jogador na fila (1, 2, 3 ou 4)
            const orderIndex = selectedPlayers.indexOf(p);
            return (
              <CharacterCard
                key={p}
                label={p}
                selected={orderIndex !== -1}
                // Dica: Você pode atualizar seu CharacterCard para receber essa prop 'order'
                // e exibir um número pequeno no canto do card
                order={orderIndex !== -1 ? orderIndex + 1 : undefined}
                onClick={() => togglePlayer(p)}
              />
            );
          })}
        </div>
      </section>

      {/* Rounds Section */}
      <section className="w-full mb-8">
        <h2 className="text-center text-lg font-bold text-cobalt mb-4">
          Quantas rodadas vamos jogar? 
        </h2>
        <div className="flex justify-center gap-4">
          {roundOptions.map((r) => (
            <RoundButton
              key={r}
              value={r}
              selected={selectedRounds === r}
              onClick={() => setSelectedRounds(r)}
            />
          ))}
        </div>
      </section>

      {/* Start Button */}
      <div className="w-full mt-auto pb-4">
        <button
          disabled={!canStart}
          onClick={handleStart}
          className={`
            w-full py-5 rounded-2xl border-[3px] font-bold text-xl transition-all duration-300
            ${
              canStart
                ? "border-neon-green bg-neon-green text-accent-foreground hover:scale-[1.02] active:scale-[0.98]"
                : "border-muted bg-muted text-muted-foreground cursor-not-allowed opacity-50"
            }
          `}
          style={
            canStart
              ? { boxShadow: "var(--pop-shadow-green)" }
              : undefined
          }
        >
          {canStart 
            ? `Iniciar com ${selectedPlayers.length} jogadores` 
            : "Selecione 2-4 jogadores e rodadas"}
        </button>
      </div>
    </div>
  );
};

export default Index;