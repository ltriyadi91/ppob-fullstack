'use client';
import React, { useState, useEffect } from 'react';

interface PhoneNumberInputProps {
  initialPhoneNumber: string;
  onPhoneNumberChange: (number: string) => void;
  isLoading?: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  initialPhoneNumber,
  onPhoneNumberChange,
  isLoading = false,
}) => {
  const [localPhoneNumber, setLocalPhoneNumber] = useState(initialPhoneNumber);

  // Sync initialPhoneNumber prop with local state if it changes from parent
  useEffect(() => {
    setLocalPhoneNumber(initialPhoneNumber);
  }, [initialPhoneNumber]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value;
    setLocalPhoneNumber(newNumber);
    onPhoneNumberChange(newNumber);
  };

  const handleClear = () => {
    setLocalPhoneNumber('');
    onPhoneNumberChange('');
  };

  return (
    <section className="bg-white p-4 mx-4 mt-4 rounded-lg shadow-sm">
      <label
        htmlFor="phoneNumber"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Nomor Handphone
      </label>
      <div className="relative">
        <input
          type="tel"
          id="phoneNumber"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm pr-10"
          value={localPhoneNumber}
          onChange={handleChange}
          placeholder="e.g., 081234567890"
        />
        {isLoading ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          localPhoneNumber && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={handleClear}
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
          )
        )}
      </div>
    </section>
  );
};

export default PhoneNumberInput;
