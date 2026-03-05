import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Player } from "@/types/game";
import ActivePlayerCard from "@/components/game/ActivePlayerCard";
import PlayerMiniCard from "@/components/game/PlayerMiniCard";

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { players: playerLabels = ["P1", "P2", "P3"], totalRounds = 3 } =
    (location.state as { players: string[]; totalRounds: number }) || {};

  const [playerOrder, setPlayerOrder] = useState<Player[]>(() =>
    playerLabels.map((label: string) => ({
      id: label,
      label,
      coins: 0,
      stars: 0,
    }))
  );

  const [currentRound, setCurrentRound] = useState(1);
  const [turnsInRound, setTurnsInRound] = useState(0);

  const activePlayer = playerOrder[0];
  const otherPlayers = playerOrder.slice(1);

  const updateActivePlayer = (field: "coins" | "stars", delta: number) => {
    setPlayerOrder((prev) => {
      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        [field]: Math.max(0, updated[0][field] + delta),
      };
      return updated;
    });
  };

  const endTurn = () => {
    const nextTurns = turnsInRound + 1;

    if (nextTurns >= playerOrder.length) {
      // Full round completed
      const nextRound = currentRound + 1;
      if (nextRound > totalRounds) {
        navigate("/sorteio", { state: { players: playerOrder } });
        return;
      }
      setCurrentRound(nextRound);
      setTurnsInRound(0);
    } else {
      setTurnsInRound(nextTurns);
    }

    // Rotate: first goes to end
    setPlayerOrder((prev) => [...prev.slice(1), prev[0]]);
  };

  // Redirect if no state
  useEffect(() => {
    if (!location.state) navigate("/");
  }, [location.state, navigate]);

  if (!location.state) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-2">
      {/* Landscape simulation container */}
      <div className="w-full max-w-[100vh] aspect-video flex flex-col gap-3 p-4">
        {/* Header */}
        <div className="flex items-center justify-between px-2">
          <span className="text-sm font-bold text-cobalt">
            Rodada {currentRound}/{totalRounds}
          </span>
          <span className="text-sm font-semibold text-muted-foreground">
            Turno {turnsInRound + 1}/{playerOrder.length}
          </span>
        </div>

        {/* Active Player Card */}
        <div className="flex-1 min-h-0">
          <ActivePlayerCard
            player={activePlayer}
            onUpdateCoins={(d) => updateActivePlayer("coins", d)}
            onUpdateStars={(d) => updateActivePlayer("stars", d)}
            onEndTurn={endTurn}
          />
        </div>

        {/* Bottom Grid - Other Players */}
        <div className="flex gap-3 overflow-x-auto pb-1">
          {otherPlayers.map((p) => (
            <PlayerMiniCard key={p.id} player={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
