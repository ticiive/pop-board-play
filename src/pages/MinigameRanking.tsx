import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Crown } from "lucide-react";
import type { Player } from "@/types/game";

interface RankingPosition {
  position: number;
  player: Player | null;
}

const POSITION_LABELS = ["1º", "2º", "3º", "4º", "5º", "6º"];
const MEDAL_COLORS = [
  "border-tangerine bg-tangerine/15 text-tangerine",
  "border-cobalt-light bg-cobalt-light/15 text-cobalt-light",
  "border-neon-green bg-neon-green/15 text-neon-green",
];

const MinigameRanking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { players, currentRound, totalRounds, isGameOver } =
    (location.state as {
      players: Player[];
      currentRound: number;
      totalRounds: number;
      isGameOver: boolean;
    }) || {};

  const [positions, setPositions] = useState<RankingPosition[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!location.state) {
      navigate("/");
      return;
    }
    setPositions(
      players.map((_, i) => ({ position: i + 1, player: null }))
    );
  }, [location.state, navigate, players]);

  if (!location.state || !players) return null;

  const allFilled = positions.length > 0 && positions.every((p) => p.player !== null);

  const handleSelectPlayer = (player: Player) => {
    if (selectedIds.has(player.id)) return;

    const firstEmpty = positions.findIndex((p) => p.player === null);
    if (firstEmpty === -1) return;

    setPositions((prev) => {
      const updated = [...prev];
      updated[firstEmpty] = { ...updated[firstEmpty], player };
      return updated;
    });
    setSelectedIds((prev) => new Set(prev).add(player.id));
  };

  const handleUndo = () => {
    // Remove the last placed player
    const lastFilledIdx = [...positions]
      .reverse()
      .findIndex((p) => p.player !== null);
    if (lastFilledIdx === -1) return;

    const actualIdx = positions.length - 1 - lastFilledIdx;
    const removedPlayer = positions[actualIdx].player;

    setPositions((prev) => {
      const updated = [...prev];
      updated[actualIdx] = { ...updated[actualIdx], player: null };
      return updated;
    });

    if (removedPlayer) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(removedPlayer.id);
        return next;
      });
    }
  };

  const handleContinue = () => {
    if (isGameOver) {
      navigate("/ranking", { state: { players } });
    } else {
      navigate("/game", {
        state: {
          players,
          totalRounds,
          currentRound,
        },
      });
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-background px-4 gap-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Trophy className="w-7 h-7 text-tangerine" />
        <h1 className="text-2xl font-bold text-cobalt tracking-tight">
          RESULTADO DO MINIGAME
        </h1>
      </div>

      <div className="flex flex-row items-start gap-8 w-full max-w-3xl">
        {/* Ranking positions */}
        <div className="flex-1 flex flex-col gap-2">
          {positions.map((pos, i) => {
            const medalClass = i < 3 ? MEDAL_COLORS[i] : "border-muted bg-muted/30 text-muted-foreground";
            return (
              <motion.div
                key={pos.position}
                layout
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-[3px] ${medalClass} transition-all`}
                style={{
                  boxShadow: i === 0 ? "var(--pop-shadow-tangerine)" : i === 1 ? "var(--pop-shadow-cobalt)" : "none",
                }}
              >
                <span className="text-xl font-black min-w-[2.5ch]">
                  {POSITION_LABELS[i]}
                </span>

                <AnimatePresence mode="wait">
                  {pos.player ? (
                    <motion.div
                      key={pos.player.id}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -20, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      {i === 0 && <Crown className="w-5 h-5 text-tangerine" />}
                      <span className="text-lg font-bold text-foreground">
                        {pos.player.label}
                      </span>
                    </motion.div>
                  ) : (
                    <motion.span
                      key="empty"
                      className="text-sm font-semibold opacity-40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                    >
                      Aguardando...
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Player selection - circular layout */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-black text-cobalt/50 uppercase tracking-widest">
            Selecione a ordem
          </span>

          <div className="relative w-48 h-48">
            {players.map((player, i) => {
              const angle = (2 * Math.PI * i) / players.length - Math.PI / 2;
              const radius = 70;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const isSelected = selectedIds.has(player.id);

              return (
                <motion.button
                  key={player.id}
                  onClick={() => handleSelectPlayer(player)}
                  disabled={isSelected}
                  className={`absolute w-16 h-16 rounded-full border-[3px] flex items-center justify-center font-bold text-sm transition-all ${
                    isSelected
                      ? "border-muted bg-muted/30 text-muted-foreground opacity-30 cursor-not-allowed"
                      : "border-cobalt bg-card text-cobalt hover:scale-110 hover:border-tangerine hover:text-tangerine active:scale-95"
                  }`}
                  style={{
                    left: `calc(50% + ${x}px - 2rem)`,
                    top: `calc(50% + ${y}px - 2rem)`,
                    boxShadow: isSelected ? "none" : "var(--pop-shadow-cobalt)",
                  }}
                  whileHover={!isSelected ? { scale: 1.1 } : undefined}
                  whileTap={!isSelected ? { scale: 0.9 } : undefined}
                >
                  {isSelected ? "✓" : player.label.slice(0, 3)}
                </motion.button>
              );
            })}
          </div>

          {/* Undo button */}
          {selectedIds.size > 0 && !allFilled && (
            <motion.button
              onClick={handleUndo}
              className="text-sm font-bold text-muted-foreground hover:text-destructive transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              ↩ Desfazer
            </motion.button>
          )}
        </div>
      </div>

      {/* Continue button */}
      <AnimatePresence>
        {allFilled && (
          <motion.button
            onClick={handleContinue}
            className="px-10 py-4 rounded-2xl border-[3px] border-neon-green bg-neon-green text-accent-foreground font-bold text-lg tracking-wide"
            style={{ boxShadow: "var(--pop-shadow-green)" }}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
          >
            {isGameOver ? "🏆 Ver Ranking Final" : "▶ Começar Próxima Rodada"}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MinigameRanking;
