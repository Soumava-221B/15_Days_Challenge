export function Card({
  item,
  onClick,
  revealed = false,
  found = false,
}: {
  item: string;
  onClick: () => void;
  revealed?: boolean;
  found?: boolean;
}) {
  const cardTransitionClasses = "transition duration-500";
  const cardContentTransitionClasses = "transition duration-300";
  const contentClasses = "bg-blue-500 w-full h-full absolute top-0 left-0 rounded-lg shadow-md";
  const flipUpClasses = "scale-x-100 opacity-100";
  const flipDownClasses = "-scale-x-100 opacity-0";

  return (
    <button
      className={`w-20 h-32 relative ${cardTransitionClasses} ${
        found ? "opacity-0" : ""
      }`}
      onClick={() => {
        if (!found && !revealed) {
          onClick();
        }
      }}
    >
      <div
        className={`${contentClasses} ${cardTransitionClasses} ${
          revealed ? flipDownClasses : flipUpClasses
        }`}
      />

      <div
        className={`flex items-center justify-center ${contentClasses} ${cardTransitionClasses} ${
          revealed ? flipUpClasses : flipDownClasses
        }`}
      >
        <p
          className={`text-3xl ${cardContentTransitionClasses} ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
        >
          {item}
        </p>
      </div>
    </button>
  );
}