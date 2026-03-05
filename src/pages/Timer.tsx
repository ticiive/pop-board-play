import { Timer as TimerIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Timer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 py-6">
      <TimerIcon className="w-16 h-16 text-tangerine mb-4" />
      <h1 className="text-3xl font-bold text-cobalt mb-2">Timer</h1>
      <p className="text-muted-foreground font-semibold">Em breve...</p>
    </div>
  );
};

export default Timer;
