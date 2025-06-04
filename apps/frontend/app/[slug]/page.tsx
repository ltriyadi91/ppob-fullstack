'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import DetailHeader from '@/components/DetailHeader/DetailHeader';
import PPOBTemplateOne from '@/components/PPOBTemplateOne/PPOBTemplateOne';
import PPOBTemplateTwo from '@/components/PPOBTemplateTwo/PPOBTemplateTwo';
import PPOBTemplateThree from '@/components/PPOBTemplateThree/PPOBTemplateThree';

export type Category = {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  isActive: boolean;
  isInputNumberRequired: boolean;
  isPrefixNumberRequired: boolean;
  slug: string;
  imageUrl: string;
};

export type TickerItem = {
  message: string;
  category: Category;
};

export type OperatorItem = {
  operatorId: number;
  operatorName: string;
  operatorDescription: string;
  isActive: boolean;
  slug: string;
  imageUrl: string;
};

export type ProductItem = {
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

export type CategoryDetail = {
  category: Category;
  operators: OperatorItem[];
  products: ProductItem[];
  tickers: TickerItem[];
};

export default function DetailPage() {
  const [inputNumber, setInputNumber] = useState('');
  const [inputNumberQuery, setInputNumberQuery] = useState('');
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);

  const [categoryDetail, setCategory] = useState<CategoryDetail['category']>({
    categoryId: 0,
    categoryName: '',
    categoryDescription: '',
    isActive: false,
    isInputNumberRequired: false,
    isPrefixNumberRequired: false,
    slug: '',
    imageUrl: '',
  });
  const [tickers, setTickers] = useState<TickerItem[]>([]);
  const [operators, setOperators] = useState<OperatorItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);

  const params = useParams();
  const { slug } = params;

  const {
    data: categoryData,
    isLoading,
    refetch,
    isFetched,
    isFetching,
  } = useQuery({
    queryKey: ['categoriesData', slug, selectedOperator],
    queryFn: () => {
      let apiUrl = `${process.env.NEXT_PUBLIC_API_V1}/ppob-detail/${slug as string}`;
      
      if (inputNumberQuery) {
        apiUrl += `?inputNumber=${inputNumberQuery}`;
      } else if (selectedOperator) {
        apiUrl += `?operatorId=${selectedOperator}`;
      }

      return fetch(apiUrl).then((res) => res.json());
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (categoryData?.data?.category) {
      setCategory(categoryData.data.category);
    }
    setTickers(categoryData?.data?.tickers || []);
    setOperators(categoryData?.data?.operators || []);
    setProducts(categoryData?.data?.products || []);
  }, [categoryData]);

  const handleInputChange = (newNumber: string) => {
    setInputNumber(newNumber);
    
  };

  const handleInputQueryChange = (newNumber: string) => {
    setInputNumberQuery(newNumber);
  };

  const handleSelectOperator = (operatorId: string | null) => {
    setSelectedOperator(operatorId);
  }

  const templateProps = {
    operators,
    products,
    tickers,
    isLoading,
    isFetching,
    isFetched,
    refetch
  }

  return (
    <>
      <DetailHeader categoryName={categoryDetail.categoryName} />
      {categoryDetail.isPrefixNumberRequired && categoryDetail.isInputNumberRequired ? (
        <PPOBTemplateOne
          {...templateProps}
          initialInputNumber={inputNumberQuery}
          onInputChange={handleInputQueryChange}
        />
      ) : null}
      {!categoryDetail.isPrefixNumberRequired && categoryDetail.isInputNumberRequired ? (
        <PPOBTemplateTwo
          {...templateProps}
          initialInputNumber={inputNumber}
          onInputChange={handleInputChange}
          onSelectedOperator={handleSelectOperator}
        />
      ) : null}
      {!categoryDetail.isPrefixNumberRequired && !categoryDetail.isInputNumberRequired ? (
        <PPOBTemplateThree
          {...templateProps}
          onSelectOperator={handleSelectOperator}
        />
      ) : null}
    </>
  );
}
