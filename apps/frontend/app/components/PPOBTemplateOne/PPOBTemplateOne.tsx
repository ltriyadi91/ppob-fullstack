'use client';

import React, { useState } from 'react';
import InputClientNumber from '@/components/PhoneNumberInput/PhoneNumberInput';
import useDebounceInput from '@/hooks/useDebounceInput';
import Ticker from '@/components/Ticker/Ticker';
import ProductItemComponent from '@/components/ProductItem/ProductItem';
import { OperatorItem, ProductItem, TickerItem } from '@/[slug]/page';

interface PPOBTemplateOneProps {
  operators: OperatorItem[];
  products: ProductItem[];
  tickers: TickerItem[];
  isLoading?: boolean;
  isFetching?: boolean;
  isFetched?: boolean;
  initialInputNumber: string;
  onInputChange: (newNumber: string) => void;
  refetch: () => void;
}

const MINIMUM_INPUT_NUMBER_LENGTH = 3;
const MAXIMUM_INPUT_NUMBER_LENGTH = 4;

const PPOBTemplateOne: React.FC<PPOBTemplateOneProps> = ({
  operators,
  products,
  tickers,
  isLoading = false,
  isFetching = false,
  isFetched = false,
  initialInputNumber,
  onInputChange,
  refetch,
}) => {
  const [showProductList, setShowProductList] = useState(false);
  const [showUnavailableMessage, setShowUnavailableMessage] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState<string | number | null>(null);

  const { handleChangeForm: debouncedPhoneNumberChange } = useDebounceInput({
    callback: () => {
      refetch();
      setShowProductList(true);
    },
    delay: 1000,
  });

  const handleInputChange = (newNumber: string) => {
    // Make sure update first at parent component
    onInputChange(newNumber);

    if (
      newNumber.length > MINIMUM_INPUT_NUMBER_LENGTH &&
      newNumber.length <= MAXIMUM_INPUT_NUMBER_LENGTH
    ) {
      debouncedPhoneNumberChange();
    }

    if (newNumber.length === 0) {
      setShowProductList(false);
    }
  };

  const handleProductSelect = (productId: string | number) => {
    setSelectedProductId(productId);
  };

  const tickerMessage = tickers.length > 0 ? tickers[0].message : '';
  const operatorImageUrl = operators.length > 0 ? operators[0].imageUrl : '';

  const isProductListShow = showProductList && !isLoading && !isFetching && isFetched;

  return (
    <div className="flex flex-col flex-grow bg-gray-50 min-h-screen p-4">
      {tickers.length > 0 && (
        <div className="mb-4">
          <Ticker
            tickerMessage={tickerMessage}
            showUnavailableMessage={showUnavailableMessage}
            setShowUnavailableMessage={setShowUnavailableMessage}
          />
        </div>
      )}
      <div className="mb-4 bg-white p-4 rounded-lg shadow-sm">
        <InputClientNumber
          initialNumber={initialInputNumber}
          onNumberChange={handleInputChange}
          isLoading={isLoading}
          label="Nomor Handphone"
          operatorImage={operatorImageUrl}
          isFetching={isFetching}
          isFetched={isFetched}
        />
      </div>
      {isProductListShow ? (
        <section className="flex-grow p-4 bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {products.length > 0 ? (
              products.map((pkg) => (
                <ProductItemComponent
                  key={pkg.id}
                  pkg={pkg}
                  showUnavailableMessage={showUnavailableMessage}
                  onSelect={handleProductSelect}
                  isSelected={selectedProductId === pkg.id}
                />
              ))
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default PPOBTemplateOne;
