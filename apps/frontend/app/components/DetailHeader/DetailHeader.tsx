"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

interface DetailHeaderProps {
  categoryName: string;
}

export function DetailHeader({ categoryName }: DetailHeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-white p-4 flex items-center justify-between shadow-sm rounded-b-lg">
      {/* Back button - now with onClick to navigate back */}
      <button
        className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
        onClick={() => router.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
      <h1 className="text-lg font-semibold capitalize">{categoryName}</h1>
      <span className="w-4"></span>
    </header>
  );
}

export default DetailHeader;