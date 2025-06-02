'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import PhoneNumberInput from '@/components/PhoneNumberInput/PhoneNumberInput'; // Import the new component
import useDebounceInput from '@/hooks/useDebounceInput';
import DetailHeader from '@/components/DetailHeader/DetailHeader'; // Import the new DetailHeader component
import OperatorDisplay from '@/components/OperatorDisplay/OperatorDisplay';
import Ticker from '@/components/Ticker/Ticker';
import ProductItem from '@/components/ProductItem/ProductItem'; // Import the new ProductItem component
import { useQuery } from '@tanstack/react-query';

type Category = {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  isActive: boolean;
  isInputNumberRequired: boolean;
  slug: string;
  imageUrl: string;
};

type TickerItem = {
  message: string;
  category: Category;
};

type OperatorItem = {
  operatorId: number;
  operatorName: string;
  operatorDescription: string;
  isActive: boolean;
  slug: string;
  imageUrl: string;
};

type ProductItem = {
  id: number;
  operatorId: number;
  categoryId: number;
  productName: string;
  productDescription: string;
  priceNumeric: number;
  priceLabel: string;
  newPriceNumeric: number;
  newPriceLabel: string;
  discountPercentage: number;
  isDiscount: boolean;
  isAvailable: boolean;
};

type CategoryDetail = {
  category: Category;
  operators: OperatorItem[];
  products: ProductItem[];
  tickers: TickerItem[];
};

const MAXIMUM_INPUT_NUMBER = 4;
const MINIMUM_INPUT_NUMBER = 3;

export default function DetailPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [categoryDetail, setCategory] = useState<CategoryDetail['category']>({
    categoryId: 0,
    categoryName: '',
    categoryDescription: '',
    isActive: false,
    isInputNumberRequired: false,
    slug: '',
    imageUrl: '',
  });
  const [showUnavailableMessage, setShowUnavailableMessage] = useState(true);
  const [tickers, setTickers] = useState<TickerItem[]>([]);
  const [operators, setOperators] = useState<OperatorItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);

  const params = useParams();
  const { slug } = params;

  const {
    data: categoryData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['categoriesData'],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_V1}/ppob-detail/${slug}?inputNumber=${phoneNumber}`
      ).then((res) => res.json()),
  });

  const { handleChangeForm } = useDebounceInput({
    callback: async () => {
      await refetch();
    },
    delay: 500,
  });

  useEffect(() => {
    if (categoryData) {
      setCategory(categoryData?.data?.category);
      setTickers(categoryData?.data?.tickers);
      setOperators(categoryData?.data?.operators);
      setProducts(categoryData?.data?.products);
    }
  }, [categoryData]);

  const resetProducts = () => {
    setProducts([]);
    setOperators([]);
    setTickers([]);
  };

  const handleChangeInput = (input: string) => {
    setPhoneNumber(input);

    if (
      input.length >= MINIMUM_INPUT_NUMBER &&
      input.length <= MAXIMUM_INPUT_NUMBER
    ) {
      handleChangeForm();
    }

    if (input.length === 0) {
      resetProducts();
    }
  };

  const tickerMessage = tickers.length > 0 ? tickers[0].message : '';
  const operatorName = operators.length > 0 ? operators[0].operatorName : '';
  const operatorImageUrl = operators.length > 0 ? operators[0].imageUrl : '';

  return (
    <div className="flex flex-col flex-grow bg-white min-h-screen">
      <DetailHeader categoryName={categoryDetail.categoryName} />
      <Ticker
        tickerMessage={tickerMessage}
        showUnavailableMessage={showUnavailableMessage}
        setShowUnavailableMessage={setShowUnavailableMessage}
      />
      <PhoneNumberInput
        initialPhoneNumber={phoneNumber}
        onPhoneNumberChange={handleChangeInput}
        isLoading={isLoading}
      />
      <section className="flex-grow p-4 mx-4 mt-4 rounded-lg shadow-sm bg-white">
        <OperatorDisplay
          categoryName={categoryDetail.categoryName}
          operatorImageUrl={operatorImageUrl}
          operatorName={operatorName}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.length > 0 ? (
            products.map((pkg) => (
              <ProductItem
                key={pkg.id}
                pkg={pkg}
                showUnavailableMessage={showUnavailableMessage}
              />
            ))
          ) : (
            <p className="text-gray-500">
              No products available for this number.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
