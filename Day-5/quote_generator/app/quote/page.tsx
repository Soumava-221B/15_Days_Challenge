"use client";

import { useQuote } from "../hooks/useQuote";
import QuoteCard from "../components/QuoteCard";

export default function QuotePage() {
  const { quote, loading, error, fetchRandomQuote } = useQuote();

  if (loading && !quote) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Loading quote...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
          <button
            onClick={fetchRandomQuote}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6 md:p-8">
        {quote && <QuoteCard quote={quote} onNewQuote={fetchRandomQuote} />}
      </div>
    </div>
  );
}
