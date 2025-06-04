'use client';

import React from 'react';
import { Card, Text, Badge } from '@mantine/core';
import Image from 'next/image';

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
  categoryImage?: string;
  operatorName: string;
}

interface OrderItemProps {
  orderItemId: number;
  productId: number;
  quantity: number;
  inputNumber: string | null;
  price: number;
  product: Product;
}

export default function OrderItem({ orderItemId, product, price, inputNumber, quantity }: OrderItemProps) {
  return (
    <Card shadow="sm" p="md" radius="md" withBorder className="mb-3">
      <div className="flex justify-between items-start">
        <div className="flex">
          {/* Category Image */}
          {product.categoryImage && (
            <div className="mr-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Image 
                  src={product.categoryImage} 
                  alt={product.categoryName}
                  width={32}
                  height={32}
                  className="object-contain"
                  onError={() => {
                    // Next.js Image handles errors differently
                    console.error('Failed to load image');
                  }}
                />
              </div>
            </div>
          )}
          
          <div>
            <div className="flex items-center mb-1">
              <Text fw={500} className="mr-2">{product.productName}</Text>
              {product.isDiscount && (
                <Badge color="red" variant="light" size="sm">
                  {product.discountPercentage}% OFF
                </Badge>
              )}
            </div>
          
          <Text size="sm" color="dimmed" className="mb-1">
            {product.operatorName} - {product.categoryName}
          </Text>
          
          {inputNumber && (
            <div className="flex items-center mb-4">
              <Text size="sm" color="dimmed" className="flex items-center">
                {inputNumber}
              </Text>
            </div>
          )}
          
          {product.productDescription && (
            <Text size="xs" color="dimmed" className="mt-1">
              {product.productDescription}
            </Text>
          )}
          </div>
        </div>
        
        <div className="text-right">
          {quantity > 1 && (
            <Text size="sm" className="mb-1">
              {quantity}x
            </Text>
          )}
          
          <Text fw={600} className="text-red-500">
            Rp{price.toLocaleString('id-ID')}
          </Text>
          
          {product.isDiscount && (
            <Text size="xs" className="line-through text-gray-400">
              {product.priceLabel}
            </Text>
          )}
        </div>
      </div>
    </Card>
  );
}
