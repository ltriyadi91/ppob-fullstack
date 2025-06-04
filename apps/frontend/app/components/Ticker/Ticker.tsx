'use client';
import React from 'react';

interface TickerProps {
  tickerMessage: string;
  showUnavailableMessage: boolean;
  setShowUnavailableMessage: (show: boolean) => void;
}

const Ticker: React.FC<TickerProps> = ({
  tickerMessage,
  showUnavailableMessage,
  setShowUnavailableMessage,
}) => {
  if (!tickerMessage || !showUnavailableMessage) {
    return null;
  }

  return (
    <div className="bg-red-100 text-red-700 p-4 mt-4 rounded-lg flex items-start justify-between text-sm shadow-sm">
      <p>{tickerMessage}</p>
      <button
        className="ml-4 text-red-700 hover:text-red-900"
        onClick={() => setShowUnavailableMessage(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Ticker;