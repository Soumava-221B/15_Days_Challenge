"use client";

import useTimer from "../hooks/useTimer";

export default function Timer() {
  const { mode, timeLeft, toggleTimer, isActive } = useTimer();

  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="max-w-sm bg-white shadow-xl w-full p-6 rounded-xl ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium capitalize">Focus time</h2>
        <div className="text-sm text-gray-500">Sessions: 1</div>
      </div>

      <div className="text-center text-6xl font-bold mb-6 text-red-500">
        {formattedTime}
      </div>

      <div className="flex justify-center space-x-4 mb-4">
        <button 
        onClick={toggleTimer}
        className="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-lg text-white">
          {isActive ? "Pause" : "Start"}
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg">
          Reset
        </button>
      </div>

      <button className="py-2 w-full bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">
        Switch to Break
      </button>
    </div>
  );
}
