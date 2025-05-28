'use client';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import PhoneNumberInput from '@/components/PhoneNumberInput/PhoneNumberInput'; // Import the new component
import useDebounceInput from '@/hooks/useDebounceInput';
import DetailHeader from '@/components/DetailHeader/DetailHeader'; // Import the new DetailHeader component
import OperatorDisplay from '@/components/OperatorDisplay/OperatorDisplay';
import Ticker from '@/components/Ticker/Ticker';
import ProductItem from '@/components/ProductItem/ProductItem'; // Import the new ProductItem component

export default function DetailPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [categoryDetail, setCategory] = useState({
    categoryName: '',
    imageUrl: '',
  });
  const [showUnavailableMessage, setShowUnavailableMessage] = useState(true);
  const [tickers, setTickers] = useState<any[]>([]);
  const [operators, setOperators] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const params = useParams(); // Get params from the URL
  const { slug } = params; // Extract the slug
  const { handleChangeForm } = useDebounceInput({
    callback: () =>
      fetchData({ slugInput: String(slug), inputNumber: phoneNumber }),
    delay: 500,
  });

  const resetProducts = () => {
    setProducts([]); // Clear products if conditions are not met
    setOperators([]); // Clear operators
    setTickers([]); // Clear tickers
  };

  async function fetchData({
    slugInput,
    inputNumber,
  }: {
    slugInput: string;
    inputNumber: string;
  }) {
    console.log(
      'fetchData called with slugInput:',
      slugInput,
      'and inputNumber:',
      inputNumber
    );

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/ppob-detail/${slugInput}?inputNumber=${inputNumber}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log({ data });
      setTickers(data.tickers || []);
      setOperators(data.operators || []);
      setProducts(data.products || []);
      setCategory(data.category);
    } catch (e: any) {
      console.error('Failed to fetch detail data:', e);
    }
  }

  useEffect(() => {
    fetchData({ slugInput: String(slug), inputNumber: '' });
  }, [slug]);

  const handleChangeInput = (input: string) => {
    setPhoneNumber(input);

    if (input.length >= 4 && input.length <= 5) {
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
    // Added bg-white to ensure the page has a distinct background
    <div className="flex flex-col flex-grow bg-white min-h-screen">
      {/* Header for PaketDataPage */}
      <DetailHeader categoryName={categoryDetail.categoryName} />

      {/* Info Banner */}
      <Ticker
        tickerMessage={tickerMessage}
        showUnavailableMessage={showUnavailableMessage}
        setShowUnavailableMessage={setShowUnavailableMessage}
      />

      {/* Phone Number Input Section - now a component */}
      <PhoneNumberInput
        initialPhoneNumber={phoneNumber}
        onPhoneNumberChange={handleChangeInput}
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
