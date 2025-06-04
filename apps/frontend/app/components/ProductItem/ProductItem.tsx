import React from 'react';
import { IconAlertCircle } from '@tabler/icons-react';
import { Button } from '@mantine/core';

interface ProductItemProps {
  pkg: {
    id: string | number;
    isAvailable: boolean;
    productName: string;
    productDescription: string;
    priceLabel: string;
    isDiscount?: boolean;
    newPriceLabel?: string;
    discountPercentage?: number;
  };
  showUnavailableMessage: boolean;
  isSelected?: boolean;
  onSelect?: (id: string | number) => void;
  onOrderDirect?: (id: string | number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  pkg,
  showUnavailableMessage,
  onSelect,
  isSelected,
  onOrderDirect,
}) => {
  const handleClick = () => {
    if (pkg.isAvailable) {
      if (onSelect) {
        onSelect(pkg.id);
      }
    }
  };
  return (
    <div
      key={pkg.id}
      className={`border rounded-lg p-4 shadow-sm cursor-pointer ${
        !pkg.isAvailable
          ? 'bg-gray-50 border-gray-200 text-gray-400'
          : isSelected
          ? 'bg-red-50 border-red-500'
          : 'bg-white border-gray-300 hover:border-gray-400'
      }`}
      onClick={handleClick}
    >
      {!pkg.isAvailable && showUnavailableMessage && (
        <div className="flex items-center text-red-500 mb-2">
          <IconAlertCircle className="h-5 w-5 mr-1" />
          <span className="text-xs font-medium">
            Maaf, lagi nggak tersedia.
          </span>
        </div>
      )}
      <h3 className="font-semibold text-base mb-1">{pkg.productName}</h3>
      <p className="text-xs text-gray-500 mb-2">
        {pkg.productDescription || 'Masa aktif 7 hari'}
      </p>

      {pkg.isDiscount ? (
        <div className="mb-3">
          <p className="text-xl font-bold text-red-500">{pkg.newPriceLabel}</p>
          <div className="flex items-center gap-2">
            <span className="line-through text-sm text-gray-400">
              {pkg.priceLabel}
            </span>
            <span className="bg-red-100 text-red-500 text-xs px-2 py-0.5 rounded-md">
              {pkg.discountPercentage}%
            </span>
          </div>
        </div>
      ) : (
        <p className="text-xl font-bold text-red-500 mb-3">{pkg.priceLabel}</p>
      )}

      {isSelected && (
        <Button
          fullWidth
          className="!bg-red-500 hover:!bg-red-600 mt-2"
          size="sm"
          onClick={() => onOrderDirect?.(pkg.id)}
        >
          Beli Sekarang
        </Button>
      )}
    </div>
  );
};

export default ProductItem;
