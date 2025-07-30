import { useState, useEffect, useCallback } from "react";
import { Quote } from "../types/quote";

export const useQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY || "",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        throw new Error(
          `Failed to fetch quote: ${response.status} ${errorText}`
        );
      }
      const data = await response.json();
      const [firstQuote] = data;
      setQuote(firstQuote);
    } catch (err) {
      console.error("Error in fetchRandomQuote:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setQuote(null);
    } finally {
      console.log("Fetch completed, loading set to false");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomQuote();
  }, [fetchRandomQuote]);

  return { quote, loading, error, fetchRandomQuote };
};
