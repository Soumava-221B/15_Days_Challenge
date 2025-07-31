"use client";

import { MATCHING_CARDS } from "../lib/Constants";
import { useGame } from "./UseGame";
import { isGameOver } from "../lib/Utils";



function Card({
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

export function Board() {
  const { state, handler } = useGame();

  return (
    <div className="flex w-full min-h-screen items-center justify-center gap-6 flex-col text-blue-950 bg-gradient-to-br from-blue-100 to-indigo-100" 
      aria-label="Memory Board"
    >
      <div className="flex flex-col bg-white p-6 rounded-xl shadow-lg">
        <p className="text-lg">Find all the matching pair of cards.</p>
        <div className="flex justify-between my-2">
          <p>Cards Found: {Number(state.found.length) * MATCHING_CARDS}</p>
          <p>Moves: {state.moves}</p>
        </div>
        {isGameOver(state.found) ? (
          <p className="font-bold text-center text-green-600">End of Game!</p>
        ) : null}
        <button
          className="self-center px-4 mt-2 font-bold border rounded-lg border-blue-300 text-blue-800 bg-blue-100 hover:bg-blue-200 transition-colors"
          onClick={() => handler.reset()}
        >
          Reset Game
        </button>
      </div>

      <div className="flex w-11/12 md:w-2/3 max-w-md items-center justify-center gap-3 flex-wrap p-4 bg-white rounded-xl shadow-lg">
        {state.cards.map((item, i) => (
          <Card
            item={item}
            key={`key-item-${item}-${i}`}
            onClick={() => handler.revealCard(i)}
            found={state.found.includes(item)}
            revealed={state.revealedIndexes.includes(i)}
          />
        ))}
      </div>
    </div>
  );
}