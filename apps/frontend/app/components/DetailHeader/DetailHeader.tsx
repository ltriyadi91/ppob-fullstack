"use client";
import { useRouter } from 'next/navigation';
import { IconArrowLeft } from '@tabler/icons-react';
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
        <IconArrowLeft className="h-6 w-6" />
      </button>
      <h1 className="text-lg font-semibold capitalize">{categoryName}</h1>
      <span className="w-4"></span>
    </header>
  );
}

export default DetailHeader;