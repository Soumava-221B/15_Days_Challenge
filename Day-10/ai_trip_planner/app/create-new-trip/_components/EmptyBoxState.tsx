import { suggestions } from "@/app/_components/Hero";
import React from "react";

function EmptyBoxState({ onSelectOption }: any) {
  return (
    <div className="mt-7">
      <h2 className="font-bold text-3xl text-center">
        Start Planning new <strong className="text-primary">Trip</strong> using
        AI
      </h2>
      <p className="text-center text-gray-400 mt-2">
        Discover tailor-made travel itineraries and explore the finest
        destinations curated just for you. Let our intelligent assistant handle
        the planning, so you can focus on enjoying every moment of your journey.
      </p>

      <div className="flex flex-col gap-5">
        {suggestions.map((suggestions, index) => (
          <div
            key={index}
            onClick={() => onSelectOption(suggestions.title)}
            className="flex items-center gap-2 rounded-xl p-5 cursor-pointer border hover:border-primary hover:text-primary"
          >
            {suggestions.icon}
            <h2 className="text-lg">{suggestions.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmptyBoxState;
