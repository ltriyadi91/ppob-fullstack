'use client';

import React, { useState } from 'react';
import InputClientNumber from '@/components/PhoneNumberInput/PhoneNumberInput';
import Ticker from '@/components/Ticker/Ticker';
import ProductItemComponent from '@/components/ProductItem/ProductItem';
import { OperatorItem, ProductItem, TickerItem } from '@/[slug]/page';
import { Group, Select, SelectProps } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

interface PPOBTemplateTwoProps {
  operators: OperatorItem[];
  products: ProductItem[];
  tickers: TickerItem[];
  isLoading?: boolean;
  isFetching?: boolean;
  isFetched?: boolean;
  initialInputNumber: string;
  onInputChange: (newNumber: string) => void;
  selectLabel?: string;
  selectPlaceholder?: string;
  onSelectedOperator: (operatorId: string | null) => void;
}

const PPOBTemplateTwo: React.FC<PPOBTemplateTwoProps> = ({
  operators,
  products,
  tickers,
  isLoading = false,
  isFetching = false,
  isFetched = false,
  initialInputNumber,
  onInputChange,
  selectLabel = 'Pilih Operator',
  selectPlaceholder = 'Pilih operator',
  onSelectedOperator
}) => {
  const [showProductList, setShowProductList] = useState(false);
  const [showUnavailableMessage, setShowUnavailableMessage] = useState(true);
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | number | null>(null);  
  
  // Prepare data for Select dropdown
  const operatorSelectData = operators.map(op => ({
    value: op.operatorId.toString(),
    label: op.operatorName,
    image: op.imageUrl || ''
  }));

  const handleInputChange = (newNumber: string) => {
    // Make sure update first at parent component
    onInputChange(newNumber);
  };
  
  const handleOperatorChange = (operatorId: string | null) => {
    onSelectedOperator(operatorId);
    setSelectedOperator(operatorId);
    setShowProductList(true);
  };

  const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }) => (
    <Group flex="1" gap="xs">
      {option.label}
      {checked && <IconCheck style={{ marginInlineStart: 'auto' }} />}
    </Group>
  );

  const handleProductSelect = (productId: string | number) => {
    console.log(productId);
    setSelectedProduct(productId);
  };

  const tickerMessage = tickers.length > 0 ? tickers[0].message : '';
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
      {/* Render Operators Dropdown On Top Input Client */}
      <div className="mb-4 bg-white p-4 rounded-lg shadow-sm">
        {operators.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {selectLabel}
            </label>
            <Select
              placeholder={selectPlaceholder}
              data={operatorSelectData}
              value={selectedOperator?.toString()}
              onChange={handleOperatorChange}
              maxDropdownHeight={280}
              clearable
              className="mb-4"
              renderOption={renderSelectOption}
            />
          </div>
        )}
        
        <InputClientNumber
          initialNumber={initialInputNumber}
          onNumberChange={handleInputChange}
          isLoading={isLoading}
          label="Nomor Registrasi"
        />
  
      </div>
      {isProductListShow ? (
        <section className="flex-grow p-4 bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {products.length > 1 ? (
              products.map((pkg) => (
                <ProductItemComponent
                  key={pkg.id}
                  pkg={pkg}
                  showUnavailableMessage={showUnavailableMessage}
                  onSelect={handleProductSelect}
                  isSelected={selectedProduct === pkg.id}
                />
              ))
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default PPOBTemplateTwo;
