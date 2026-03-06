import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

interface CircularTimerProps {
  initialTime: number; // seconds
  onTimeUp: () => void;
  size?: number;
}

const RADIUS = 90;
const STROKE = 12;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const DANGER_THRESHOLD = 4;

const CircularTimer = ({ initialTime, onTimeUp, size = 240 }: CircularTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  const isDanger = timeLeft <= DANGER_THRESHOLD && timeLeft > 0;
  const progress = timeLeft / initialTime;
  const offset = CIRCUMFERENCE * (1 - progress);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      clearTimer();
      if (timeLeft <= 0) onTimeUpRef.current();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [isRunning, timeLeft <= 0, clearTimer]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const strokeColor = isDanger
    ? "hsl(var(--destructive))"
    : "hsl(var(--tangerine))";

  const viewBox = `0 0 ${RADIUS * 2 + STROKE} ${RADIUS * 2 + STROKE}`;
  const center = RADIUS + STROKE / 2;

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        animate={isDanger ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={isDanger ? { duration: 0.5, repeat: Infinity } : {}}
      >
        <svg
          width={size}
          height={size}
          viewBox={viewBox}
          className="rotate-[-90deg]"
        >
          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={RADIUS}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={STROKE}
          />
          {/* Progress arc */}
          <motion.circle
            cx={center}
            cy={center}
            r={RADIUS}
            fill="none"
            stroke={strokeColor}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            initial={false}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={`text-5xl font-bold tracking-tight ${
              isDanger ? "text-destructive" : "text-cobalt"
            }`}
            animate={isDanger ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
            transition={isDanger ? { duration: 0.5, repeat: Infinity } : {}}
          >
            {display}
          </motion.span>
        </div>
      </motion.div>

      {/* Play / Pause */}
      <motion.button
        onClick={() => setIsRunning((r) => !r)}
        className="w-16 h-16 rounded-full border-[3px] border-cobalt bg-card flex items-center justify-center"
        style={{ boxShadow: "var(--pop-shadow-cobalt)" }}
        whileTap={{ scale: 0.9 }}
        disabled={timeLeft <= 0}
      >
        {isRunning ? (
          <Pause className="w-7 h-7 text-cobalt" />
        ) : (
          <Play className="w-7 h-7 text-cobalt ml-1" />
        )}
      </motion.button>
    </div>
  );
};

export default CircularTimer;
