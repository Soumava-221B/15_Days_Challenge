import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY || "YOUR_API_KEY";

const BASE_URL = "https://api.spoonacular.com/recipes";

export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
  sourceUrl?: string;
}

export const fetchRecipes = async (query: string): Promise<Recipe[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query: query,
        addRecipeInformation: true,
        number: 10,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data.results || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
      throw new Error(
        error.response?.data?.message || "Failed to fetch recipes"
      );
    }
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred");
  }
};
