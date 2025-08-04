"use client"

import { useState } from "react";
import { fetchRecipes, Recipe } from "./lib/api";
import Image from "next/image";

export default function Home() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [maxReadyTime, setMaxReadyTime] = useState<number | null>(null);

  const timeFilters = [
    { label: "Any time", value: null },
    { label: "Quick (<=10 mins)", value: 10 },
    { label: "Fast (<=20 mins)", value: 20 },
    { label: "Medium (<=30 mins)", value: 30 },
    { label: "Long (<=45 mins)", value: 45 },
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const results = await fetchRecipes(query);
      setRecipes(results);
      applyTimeFilter(results, maxReadyTime);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recipes');
    } finally {
      setIsLoading(false);
    }
  };

  const applyTimeFilter = (recipesToFilter: Recipe[], time: number | null) => {
    if (!time) {
      setFilteredRecipes(recipesToFilter);
    } else {
      const filtered = recipesToFilter.filter(
        recipe => recipe.readyInMinutes && recipe.readyInMinutes <= time
      );
      setFilteredRecipes(filtered);
    }
  };

  const handleTimeFilterChange = (time: number | null) => {
    setMaxReadyTime(time);
    applyTimeFilter(recipes, time);
  };

  const displayedRecipes = maxReadyTime !== null ? filteredRecipes : recipes;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Recipe Finder</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes (e.g., pizza, pasta, chicken, paneer)..."
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleSearch} 
          disabled={isLoading || !query.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {timeFilters.map((filter) => (
          <button
            key={filter.value || "any"}
            onClick={() => handleTimeFilterChange(filter.value)}
            className={`px-3 py-1 rounded-full text-sm ${
              maxReadyTime === filter.value
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <p>Loading recipes...</p>
        </div>
      ) : displayedRecipes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {recipes.length === 0
            ? query
              ? 'No recipes found. Try a different search.'
              : 'Enter a search term to find recipes'
            : 'No recipes match your time filter. Try a different time range.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedRecipes.map((recipe) => (
            <div key={recipe.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {recipe.image && (
                <Image 
                  src={recipe.image} 
                  alt={recipe.title}
                  width={312}
                  height={231} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="font-bold text-lg mb-2">{recipe.title}</h2>
                <div className="flex gap-4 text-sm text-gray-600">
                  {recipe.readyInMinutes && (
                    <span>⏱️ {recipe.readyInMinutes} mins</span>
                  )}
                  {recipe.servings && (
                    <span>🍽️ Serves {recipe.servings}</span>
                  )}
                </div>
                {recipe.sourceUrl && (
                  <a 
                    href={recipe.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-blue-600 hover:underline"
                  >
                    View Recipe
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}