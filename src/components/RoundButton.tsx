interface RoundButtonProps {
  value: number;
  selected: boolean;
  onClick: () => void;
}

const RoundButton = ({ value, selected, onClick }: RoundButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 py-4 rounded-2xl border-[3px] font-bold text-2xl transition-all duration-200
        ${
          selected
            ? "border-tangerine bg-tangerine text-secondary-foreground scale-[0.96]"
            : "border-tangerine bg-card text-tangerine hover:scale-[1.03]"
        }
      `}
      style={{
        boxShadow: selected
          ? "2px 2px 0px hsl(25 90% 40%)"
          : "var(--pop-shadow-tangerine)",
      }}
    >
      {value}
    </button>
  );
};

export default RoundButton;
