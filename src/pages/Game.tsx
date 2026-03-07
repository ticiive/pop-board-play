import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Player } from "@/types/game";
import ActivePlayerCard from "@/components/game/ActivePlayerCard";
import InactivePlayerRow from "@/components/game/InactivePlayerRow";

interface GameLocationState {
  players?: Array<Player | string>;
  totalRounds?: number;
  currentRound?: number;
}

const normalizePlayers = (rawPlayers: Array<Player | string> = []): Player[] =>
  rawPlayers.map((player) => {
    if (typeof player === "string") {
      return {
        id: player,
        label: player,
        coins: 0,
        stars: 0,
      };
    }

    return {
      id: player.id,
      label: player.label,
      coins: player.coins ?? 0,
      stars: player.stars ?? 0,
    };
  });

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = (location.state as GameLocationState) || {};
  const totalRounds = state.totalRounds ?? 10;
  const currentRound = state.currentRound ?? 1;

  const initialPlayers = useMemo(() => normalizePlayers(state.players), [state.players]);

  const [playerOrder, setPlayerOrder] = useState<Player[]>(initialPlayers);
  const [turnIndex, setTurnIndex] = useState(0);
  const [turnsPlayed, setTurnsPlayed] = useState(0);
  const [playedThisRound, setPlayedThisRound] = useState<string[]>([]);
  const [isFinishingRound, setIsFinishingRound] = useState(false);

  useEffect(() => {
    if (!location.state || initialPlayers.length === 0) {
      navigate("/");
      return;
    }

    setPlayerOrder(initialPlayers);
  }, [initialPlayers, location.state, navigate]);

  // Protocolo de Reset Rigoroso: sempre que a rodada mudar, zera controles de turno
  useEffect(() => {
    setTurnIndex(0);
    setTurnsPlayed(0);
    setPlayedThisRound([]);
    setIsFinishingRound(false);
  }, [currentRound]);

  const finishRound = (playersAfterRound: Player[]) => {
    if (isFinishingRound) return;

    setIsFinishingRound(true);
    const isGameOver = currentRound >= totalRounds;

    navigate("/sorteio", {
      state: {
        players: playersAfterRound,
        currentRound,
        totalRounds,
        isGameOver,
      },
    });
  };

  const activePlayer = playerOrder[0];
  const inactivePlayers = playerOrder.slice(1);

  const updateActivePlayer = (field: "coins" | "stars", delta: number) => {
    setPlayerOrder((prev) => {
      if (prev.length === 0) return prev;

      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        [field]: Math.max(0, updated[0][field] + delta),
      };
      return updated;
    });
  };

  const endTurn = () => {
    if (!activePlayer || isFinishingRound || playerOrder.length === 0) return;

    const rotated = [...playerOrder.slice(1), playerOrder[0]];
    const nextTurnIndex = turnIndex + 1;
    const nextPlayedThisRound = playedThisRound.includes(activePlayer.id)
      ? playedThisRound
      : [...playedThisRound, activePlayer.id];
    const nextTurnsPlayed = nextPlayedThisRound.length;

    console.log(
      `Rodada: ${currentRound} | Turno: ${nextTurnIndex} | Player Atual: ${activePlayer.label} | Total de Players: ${playerOrder.length}`
    );

    setPlayerOrder(rotated);
    setTurnIndex(nextTurnIndex);
    setPlayedThisRound(nextPlayedThisRound);
    setTurnsPlayed(nextTurnsPlayed);

    // Condição de saída universal por rodada
    if (nextTurnsPlayed >= playerOrder.length) {
      finishRound(rotated);
    }
  };

  if (!location.state || playerOrder.length === 0 || !activePlayer) return null;

  return (
    <div key={`round-${currentRound}`} className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      {/* Top Section - 75% - Jogador Ativo */}
      <div className="h-[75%] flex flex-col p-4 pb-2">
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="flex flex-col">
            <span className="text-xs font-black text-cobalt/40 uppercase tracking-widest">
              Status da Partida
            </span>
            <span className="text-lg font-bold text-cobalt">
              Rodada {currentRound} <span className="text-cobalt/30">/ {totalRounds}</span>
            </span>
          </div>
          <div className="bg-tangerine/10 px-3 py-1 rounded-full border border-tangerine/20">
            <span className="text-xs font-bold text-tangerine">
              Turno {Math.min(turnsPlayed + 1, playerOrder.length)} de {playerOrder.length}
            </span>
          </div>
        </div>

        <div className="flex-1 min-h-0">
          <ActivePlayerCard
            player={activePlayer}
            onUpdateCoins={(d) => updateActivePlayer("coins", d)}
            onUpdateStars={(d) => updateActivePlayer("stars", d)}
            onEndTurn={endTurn}
          />
        </div>
      </div>

      {/* Bottom Section - 25% - Próximos Jogadores */}
      <div className="h-[25%] border-t-4 border-cobalt-light/20 bg-muted/30">
        <InactivePlayerRow players={inactivePlayers} />
      </div>
    </div>
  );
};

export default Game;
