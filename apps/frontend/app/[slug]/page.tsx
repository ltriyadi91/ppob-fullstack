'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import DetailHeader from '@/components/DetailHeader/DetailHeader';
import PPOBTemplateOne from '@/components/PPOBTemplateOne/PPOBTemplateOne';
import PPOBTemplateTwo from '@/components/PPOBTemplateTwo/PPOBTemplateTwo';
import PPOBTemplateThree from '@/components/PPOBTemplateThree/PPOBTemplateThree';
import { notifications } from '@mantine/notifications';
import { useAuth } from '@/hooks/useAuth';

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

export interface ProductItem {
  id: string | number;
  productName: string;
  productDescription: string;
  priceLabel: string;
  isAvailable: boolean;
  isDiscount?: boolean;
  newPriceLabel?: string;
  discountPercentage?: number;
}

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
  const { token } = useAuth({});

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
      let apiUrl = `${process.env.NEXT_PUBLIC_API_V1}/ppob-detail/${
        slug as string
      }`;

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
  };

  // Direct order mutation
  const router = useRouter();
  
  const { mutate: placeDirectOrder, isPending: isOrderPending } = useMutation({
    mutationFn: async ({ productId, inputNumber }: { productId: string | number, inputNumber?: string }) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_V1}/orders/direct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, inputNumber }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.data || 'Failed to place order');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      notifications.show({
        title: 'Order Placed Successfully',
        message: `Your order #${data.orderId} has been placed successfully`,
        color: 'green',
      });
      
      // Redirect to order details or success page
      router.push('/orders');
    },
    onError: (error: Error) => {
      console.log({error});
      notifications.show({
        title: 'Order Failed',
        message: error.message || 'Failed to place your order. Please try again.',
        color: 'red',
      });
    },
  });
  
  const handleDirectOrder = (productId: string | number, inputNumber?: string) => {
    // Use the input number from state if not provided
    const numberToUse = inputNumber || inputNumberQuery || '';
    placeDirectOrder({ productId, inputNumber: numberToUse });
  };

  const templateProps = {
    operators,
    products,
    tickers,
    isLoading,
    isFetching,
    isFetched,
    refetch,
    onDirectOrder: handleDirectOrder,
    isOrderPending,
  };

  return (
    <>
      <DetailHeader categoryName={categoryDetail.categoryName} />
      {categoryDetail.isPrefixNumberRequired &&
      categoryDetail.isInputNumberRequired ? (
        <PPOBTemplateOne
          {...templateProps}
          initialInputNumber={inputNumberQuery}
          onInputChange={handleInputQueryChange}
        />
      ) : null}
      {!categoryDetail.isPrefixNumberRequired &&
      categoryDetail.isInputNumberRequired ? (
        <PPOBTemplateTwo
          {...templateProps}
          initialInputNumber={inputNumber}
          onInputChange={handleInputChange}
          onSelectedOperator={handleSelectOperator}
        />
      ) : null}
      {!categoryDetail.isPrefixNumberRequired &&
      !categoryDetail.isInputNumberRequired ? (
        <PPOBTemplateThree
          {...templateProps}
          onSelectOperator={handleSelectOperator}
        />
      ) : null}
    </>
  );
}
