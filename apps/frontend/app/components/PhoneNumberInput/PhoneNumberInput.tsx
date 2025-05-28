"use client";
import React, { useState, useEffect } from 'react';

interface PhoneNumberInputProps {
  initialPhoneNumber: string;
  onPhoneNumberChange: (number: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ initialPhoneNumber, onPhoneNumberChange }) => {
  const [localPhoneNumber, setLocalPhoneNumber] = useState(initialPhoneNumber);

  // Sync initialPhoneNumber prop with local state if it changes from parent
  useEffect(() => {
    setLocalPhoneNumber(initialPhoneNumber);
  }, [initialPhoneNumber]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value;
    setLocalPhoneNumber(newNumber);
    onPhoneNumberChange(newNumber); // Communicate change to parent
  };

  const handleClear = () => {
    setLocalPhoneNumber('');
    onPhoneNumberChange(''); // Communicate clear to parent
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
        {localPhoneNumber && (
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
        )}
      </div>
    </section>
  );
};

export default PhoneNumberInput;