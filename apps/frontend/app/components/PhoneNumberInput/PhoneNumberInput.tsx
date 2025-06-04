'use client';
import React, { useState, useEffect } from 'react';
import { IconLoader, IconX } from '@tabler/icons-react';
import { TextInput, ActionIcon, Box, Image } from '@mantine/core';

interface InputNumberInputProps {
  initialNumber: string;
  onNumberChange: (number: string) => void;
  isLoading?: boolean;
  isFetching?: boolean;
  isFetched?: boolean;
  placeholder?: string;
  label?: string;
  elementId?: string;
  operatorImage?: string;
}

const InputClientNumber: React.FC<InputNumberInputProps> = ({
  initialNumber,
  onNumberChange,
  isLoading = false,
  isFetching = false,
  isFetched = false,
  placeholder = 'Contoh: 081234567890',
  label = 'Nomor Registrasi',
  elementId = 'inputNumber',
  operatorImage
}) => {
  const [localNumber, setLocalNumber] = useState(initialNumber);

  // Sync initialNumber prop with local state if it changes from parent
  useEffect(() => {
    setLocalNumber(initialNumber);
  }, [initialNumber]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value;
    setLocalNumber(newNumber);
    onNumberChange(newNumber);
  };

  const handleClear = () => {
    setLocalNumber('');
    onNumberChange('');
  };

  return (
    <section className="bg-white mt-4 rounded-lg shadow-sm">
      <TextInput
        id={elementId}
        label={label}
        type="tel"
        value={localNumber}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full"
        leftSection={
          operatorImage && isFetched && !isFetching && localNumber.length >= 3 ? (
            <Box className="w-8 h-6 mx-2 py-2">
              <Image src={operatorImage} alt="Operator" className="w-full h-full" />
            </Box>
          ) : null
        }
        rightSection={
          isLoading ? (
            <IconLoader size={20} className="text-red-500" />
          ) : (
            localNumber && (
              <ActionIcon onClick={handleClear} variant="subtle" color="gray">
                <IconX size={16} />
              </ActionIcon>
            )
          )
        }
      />
    </section>
  );
};

export default InputClientNumber;
