"use client";

import { useState } from "react";
import { fetchRecipes, Recipe } from "./lib/api";
import Image from "next/image";

export default function Home() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const results = await fetchRecipes(query);
      setRecipes(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch recipes");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Recipe Finder</h1>

      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes (e.g., pizza, pasta)..."
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading || !query.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">{error}</div>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <p>Loading recipes...</p>
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {query
            ? "No recipes found. Try a different search."
            : "Enter a search term to find recipes"}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
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
                  {recipe.servings && <span>🍽️ Serves {recipe.servings}</span>}
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
