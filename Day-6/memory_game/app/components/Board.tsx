"use client";

import { MATCHING_CARDS } from "../lib/Constants";
import { useGame } from "./UseGame";
import { isGameOver } from "../lib/Utils";
import { Card } from "./Card";
import { useEffect } from "react";
import confetti from 'canvas-confetti';


export function Board() {
  const { state, handler } = useGame();

  const fireConfetti = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { 
    startVelocity: 30, 
    spread: 360, 
    ticks: 60, 
    zIndex: 0 
  };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { 
        x: Math.random(),
        y: Math.random() - 0.2 
      }
    });
  }, 250);
};

useEffect(() => {
  if (isGameOver(state.found)) {
    fireConfetti();
  }
}, [state.found]);

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
          <p className="font-bold text-center text-green-600">You Won🏆</p>
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