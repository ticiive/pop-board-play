import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CircularTimer from "@/components/game/CircularTimer";

const DEFAULT_TIME = 30; // seconds

const Timer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { players, currentRound, totalRounds, isGameOver } =
    (location.state as {
      players: any[];
      currentRound: number;
      totalRounds: number;
      isGameOver: boolean;
    }) || {};

  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!location.state) navigate("/");
  }, [location.state, navigate]);

  if (!location.state) return null;

  const handleTimeUp = () => setFinished(true);

  const handleContinue = () => {
    navigate("/minigame-ranking", {
      state: { players, currentRound, totalRounds, isGameOver },
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-background px-4 gap-6">
      <h1 className="text-2xl font-bold text-cobalt tracking-tight">
        ⏱ MINIGAME
      </h1>

      <CircularTimer initialTime={DEFAULT_TIME} onTimeUp={handleTimeUp} />

      {finished && (
        <motion.button
          onClick={handleContinue}
          className="px-10 py-4 rounded-2xl border-[3px] border-tangerine bg-tangerine text-secondary-foreground font-bold text-lg tracking-wide"
          style={{ boxShadow: "var(--pop-shadow-tangerine)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.95 }}
        >
          {isGameOver ? "🏆 Ver Ranking" : "▶ Continuar Jogo"}
        </motion.button>
      )}
    </div>
  );
};

export default Timer;
