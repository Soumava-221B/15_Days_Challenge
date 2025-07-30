"use client";

import { Quote } from "../types/quote";
import TweetButton from "./TweetButton";

interface QuoteCardProps {
  quote: Quote;
  onNewQuote: () => void;
  className?: string;
}

export default function QuoteCard({
  quote,
  onNewQuote,
  className = "",
}: QuoteCardProps) {
  if (!quote) {
    return (
      <div className={`quote-card ${className}`}>
        <p>No quote available</p>
        <button
          onClick={onNewQuote}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={`quote-card animate-fade-in ${className}`}>
      <div className="quote-content">
        <blockquote className="text-xl md:text-2xl font-medium italic mb-4">
          &quot;{quote.quote}&quot;
        </blockquote>
        <p className="text-right text-lg font-semibold">— {quote.author}</p>
        {quote.category && (
          <div className="mt-4">
            <span
              className="px-2 py-1 bg-gray-200 rounded-full text-xs text-gray-700"
              aria-label="Quote category"
            >
              {quote.category.toLowerCase()}
            </span>
          </div>
        )}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={onNewQuote}
          className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors cursor-pointer"
          aria-label="Get new quote"
        >
          New Quote
        </button>
        <TweetButton quote={quote} />
      </div>
    </div>
  );
}
