import { useLocation, useNavigate } from "react-router-dom";
import { Dices } from "lucide-react";

const Sorteio = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 py-6">
      <Dices className="w-16 h-16 text-tangerine mb-4" />
      <h1 className="text-3xl font-bold text-cobalt mb-2">Sorteio</h1>
      <p className="text-muted-foreground font-semibold mb-8">Em breve...</p>
      <button
        onClick={() => navigate("/ranking", { state: location.state })}
        className="px-8 py-4 rounded-2xl border-[3px] border-tangerine bg-tangerine text-secondary-foreground font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
        style={{ boxShadow: "var(--pop-shadow-tangerine)" }}
      >
        Ir para Ranking 🏆
      </button>
    </div>
  );
};

export default Sorteio;
