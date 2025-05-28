import React from 'react';

interface ProductItemProps {
  pkg: {
    id: string | number;
    isAvailable: boolean;
    productName: string;
    productDescription: string;
    priceLabel: string;
  };
  showUnavailableMessage: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({ pkg, showUnavailableMessage }) => {
  return (
    <div
      key={pkg.id}
      className={`border rounded-lg p-4 shadow-sm ${
        !pkg.isAvailable
          ? 'bg-gray-50 border-gray-200 text-gray-400'
          : 'bg-white border-gray-300'
      }`}
    >
      {!pkg.isAvailable && showUnavailableMessage && (
        <div className="flex items-center text-red-500 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs font-medium">
            Maaf, lagi nggak tersedia.
          </span>
        </div>
      )}
      <h3 className="font-semibold text-base mb-1">
        {pkg.productName}
      </h3>
      <p className="text-xs text-gray-500 mb-2">
        {pkg.productDescription}
      </p>
      <p className="text-xl font-bold text-red-500 mb-3">
        {pkg.priceLabel}
      </p>
      <a
        href="#"
        className="text-red-500 text-sm font-medium hover:underline"
      >
        Lihat Selengkapnya
      </a>
    </div>
  );
};

export default ProductItem;