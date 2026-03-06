import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Player } from "@/types/game";
import ActivePlayerCard from "@/components/game/ActivePlayerCard";
import InactivePlayerRow from "@/components/game/InactivePlayerRow";

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Captura os dados vindos do Setup (Index.tsx)
  const { players: playerLabels = [], totalRounds = 10 } =
    (location.state as { players: string[]; totalRounds: number }) || {};

  // Inicializa os players mantendo a ORDEM do array playerLabels
const [playerOrder, setPlayerOrder] = useState<Player[]>(() => {
  // 1. Verifica se já existem players com dados (moedas/estrelas) vindos de outra tela
  const existingPlayers = (location.state as any)?.players;
  
  // 2. Se existirem e já forem objetos (com coins e stars), usamos eles
  if (existingPlayers && typeof existingPlayers[0] === 'object') {
    return existingPlayers;
  }

  // 3. Caso contrário (primeira vez vindo do Setup), criamos do zero usando os labels
  return playerLabels.map((label: string) => ({
    id: label,
    label,
    coins: 0,
    stars: 0,
  }));
});

const [currentRound, setCurrentRound] = useState(() => {
  return (location.state as any)?.currentRound || 1;
});
  
  // O ponto de referência do ciclo é sempre quem foi selecionado PRIMEIRO no setup
  const startingPlayerId = useRef(playerLabels[0]);

  const activePlayer = playerOrder[0];
  const inactivePlayers = playerOrder.slice(1);

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
    setPlayerOrder((prev) => {
      // Rotaciona a fila: o primeiro vai para o fim
      const rotated = [...prev.slice(1), prev[0]];
      
      // Verificamos se quem assumiu agora o posto de 'Ativo' é o primeiro jogador original
      // Se sim, significa que TODOS jogaram e o ciclo fechou.
      if (rotated[0].id === startingPlayerId.current) {
        const isGameOver = currentRound >= totalRounds;

        // Navega para /sorteio imediatamente após fechar o ciclo de todos os jogadores
        setTimeout(
          () =>
            navigate("/sorteio", {
              state: {
                players: rotated,
                currentRound,
                totalRounds,
                isGameOver,
              },
            }),
          0
        );

        return rotated;
      }
      
      return rotated;
    });
  };

  // Redireciona para o setup se não houver estado (acesso direto pela URL)
  useEffect(() => {
    if (!location.state || playerLabels.length === 0) {
      navigate("/");
    }
  }, [location.state, navigate, playerLabels.length]);

  if (!location.state || playerOrder.length === 0) return null;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
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
          {/* Badge indicando quantos faltam para o sorteio */}
          <div className="bg-tangerine/10 px-3 py-1 rounded-full border border-tangerine/20">
            <span className="text-xs font-bold text-tangerine">
              Turno {playerLabels.indexOf(activePlayer.id) + 1} de {playerLabels.length}
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