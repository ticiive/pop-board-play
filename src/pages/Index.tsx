import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CharacterCard from "@/components/CharacterCard";
import RoundButton from "@/components/RoundButton";
import { Gamepad2 } from "lucide-react";

const players = ["P1", "P2", "P3", "P4", "P5", "P6"];
const roundOptions = [3, 5, 10];

const Index = () => {
  const navigate = useNavigate();
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [selectedRounds, setSelectedRounds] = useState<number | null>(null);

  const togglePlayer = (label: string) => {
    setSelectedPlayers((prev) =>
      prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label]
    );
  };

  const canStart = selectedPlayers.length >= 2 && selectedRounds !== null;

  const handleStart = () => {
    if (!canStart) return;
    navigate("/game", {
      state: {
        players: selectedPlayers,
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
        <h2 className="text-center text-lg font-bold text-cobalt mb-4">
          Escolha os jogadores! 🎲
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {players.map((p) => (
            <CharacterCard
              key={p}
              label={p}
              selected={selectedPlayers.includes(p)}
              onClick={() => togglePlayer(p)}
            />
          ))}
        </div>
      </section>

      {/* Rounds Section */}
      <section className="w-full mb-8">
        <h2 className="text-center text-lg font-bold text-cobalt mb-4">
          Quantas rodadas vamos jogar? 🏆
        </h2>
        <div className="flex gap-4">
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
          {canStart ? "🚀 Iniciar Jogo!" : "Selecione 2+ jogadores e rodadas"}
        </button>
      </div>
    </div>
  );
};

export default Index;
