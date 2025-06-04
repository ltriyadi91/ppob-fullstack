'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Loader } from '@mantine/core';
import { useAuth } from '@/hooks/useAuth';
import OrderItem from '@/components/OrderItem/OrderItem';
import DetailHeader from '@/components/DetailHeader/DetailHeader';

interface Product {
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
  categoryName: string;
  operatorName: string;
}

interface OrderItem {
  orderItemId: number;
  productId: number;
  quantity: number;
  inputNumber: string | null;
  price: number;
  product: Product;
}

interface Order {
  orderId: string;
  userLastName: string;
  totalAmount: number;
  orderItems: OrderItem[];
}

export default function OrderPage() {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth({});

  // Fetch order data from API
  useEffect(() => {
    async function fetchOrder() {
      console.log(token);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_V1}/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    if (token) {
      fetchOrder();
    }
  }, [token]);

  const handlePaymentSelection = () => {
    // This would navigate to payment method selection or process payment
    console.log('Proceeding to payment selection');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 justify-center items-center">
        <Loader size="lg" />
        <p className="mt-4 text-gray-600">Loading order details...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 justify-center items-center p-4">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md text-center">
          <p className="font-semibold mb-2">Error Loading Order</p>
          <p>{error}</p>
          <Button
            onClick={() => router.push('/')}
            className="mt-4 !bg-red-500 hover:!bg-red-600"
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <DetailHeader categoryName="Order" />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="container mx-auto p-4 flex-grow">
          {/* Product Information */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            {/* Order Items */}
            {order && order.orderItems.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium mb-3">
                  {order.orderItems.length} item
                  {order.orderItems.length > 1 ? 's' : ''} in this order
                </h3>

                {/* Map through order items */}
                <div className="space-y-3">
                  {order.orderItems.map((item) => (
                    <OrderItem
                      key={item.orderItemId}
                      orderItemId={item.orderItemId}
                      productId={item.productId}
                      quantity={item.quantity}
                      inputNumber={item.inputNumber}
                      price={item.price}
                      product={item.product}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Bottom Bar */}
        <div className="bg-white p-4 border-t border-gray-200 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Tagihan</p>
              <p className="text-xl font-bold">
                {order ? `Rp${order.totalAmount.toLocaleString('id-ID')}` : '-'}
              </p>
            </div>
            <Button
              onClick={handlePaymentSelection}
              size="md"
              className="!bg-red-500 hover:!bg-red-600"
            >
              Pilih Pembayaran
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
