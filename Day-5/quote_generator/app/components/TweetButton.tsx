"use client";

import { Quote } from "../types/quote";
import { FaTwitter } from "react-icons/fa";

interface TweetButtonProps {
  quote: Quote;
}

export default function TweetButton({ quote }: TweetButtonProps) {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${quote.quote}" - ${quote.author}`
  )}`;

  return (
    <a
      href={tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="px-6 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition-colors flex items-center gap-2"
    >
      <FaTwitter />
      Tweet
    </a>
  );
}
