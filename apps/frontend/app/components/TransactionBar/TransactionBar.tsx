'use client';

import React from 'react';
import { Button } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { ProductItem } from '@/[slug]/page';

interface TransactionBarProps {
  selectedProduct: ProductItem | null;
  inputNumber?: string;
  onOrderDirect: (productId: string | number, inputNumber?: string) => void;
  isOrderPending?: boolean;
}

const TransactionBar: React.FC<TransactionBarProps> = ({
  selectedProduct,
  inputNumber,
  onOrderDirect,
  isOrderPending = false,
}) => {
  if (!selectedProduct) return null;

  const handleBuyNow = () => {
    onOrderDirect(selectedProduct.id, inputNumber);
  };

  // Determine price to display (handle discount case)
  const displayPrice = selectedProduct.isDiscount
    ? selectedProduct.newPriceLabel
    : selectedProduct.priceLabel;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-lg font-semibold truncate">{selectedProduct.productName}</h3>
          <p className="text-xl font-bold text-red-600">{displayPrice}</p>
          {selectedProduct.isDiscount && (
            <p className="text-sm text-gray-500 line-through">{selectedProduct.priceLabel}</p>
          )}
        </div>
        <Button
          onClick={handleBuyNow}
          loading={isOrderPending}
          disabled={!selectedProduct.isAvailable || isOrderPending}
          color="red"
          leftSection={<IconShoppingCart size={16} />}
          className="px-6"
        >
          Beli Sekarang
        </Button>
      </div>
    </div>
  );
};

export default TransactionBar;