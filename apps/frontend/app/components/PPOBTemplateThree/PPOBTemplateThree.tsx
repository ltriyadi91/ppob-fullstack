'use client';

import React, { useState, useEffect } from 'react';
import Ticker from '@/components/Ticker/Ticker';
import { OperatorItem, ProductItem, TickerItem } from '@/[slug]/page';
import { Card, Image, Text, Container, SimpleGrid, Select, Button, Group, Box, Divider, Loader, ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

interface PPOBTemplateThreeProps {
  operators: OperatorItem[];
  products: ProductItem[];
  tickers: TickerItem[];
  isLoading: boolean;
  title?: string;
  subtitle?: string;
  onSelectOperator: (operatorId: string) => void;
}

const PPOBTemplateThree: React.FC<PPOBTemplateThreeProps> = ({
  operators,
  products,
  tickers,
  isLoading,
  onSelectOperator
}) => {
  const [showUnavailableMessage, setShowUnavailableMessage] = useState(true);
  const [selectedOperator, setSelectedOperator] = useState<OperatorItem | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  
  // Reset selected product when products change
  useEffect(() => {
    if (products.length > 0) {
      setSelectedProduct(products[0].id.toString());
    }
  }, [products]);
  
  const handleOperatorSelect = (operatorId: string) => {
    const operator = operators.find(op => op.operatorId.toString() === operatorId);
    if (operator) {
      setSelectedOperator(operator);
      onSelectOperator(operatorId);
    }
  };
  
  const handleBackToOperators = () => {
    setSelectedOperator(null);
  };
  
  // Find the currently selected product
  const currentProduct = products.find(p => p.id.toString() === selectedProduct);
  
  // Create product options for the select dropdown
  const productOptions = products.map(product => ({
    value: product.id.toString(),
    label: product.productName
  }));


  const tickerMessage = tickers.length > 0 ? tickers[0].message : '';

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

      <Container className="py-4 !m-0">
        {!selectedOperator ? (
          <>
            <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4 }} spacing="lg">
              {operators.map((operator) => (
                <Card 
                  key={operator.operatorId} 
                  shadow="sm" 
                  padding="lg" 
                  radius="md"
                  withBorder
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleOperatorSelect(operator.operatorId.toString())}
                >
                  <Card.Section className="flex justify-center items-center p-4 h-[140px]">
                    <Image 
                      src={operator.imageUrl}
                      alt={operator.operatorName}
                      className="h-full w-full !object-contain"
                    />
                  </Card.Section>
                  
                  <Text ta="center" fw={500} size="lg" mt="md">
                    {operator.operatorName}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          </>
        ) : (
          <>
            <Card shadow="sm" radius="md" withBorder className="relative !p-0">
              <ActionIcon 
                variant="light" 
                color="gray" 
                radius="xl" 
                size="lg"
                className="!absolute top-2 right-2 z-10"
                onClick={handleBackToOperators}
              >
                <IconX size={18} />
              </ActionIcon>
              {/* Yellow header section */}
              <Card.Section className="p-6 border-b">
                <Group justify="center">
                  <Image 
                    src={selectedOperator.imageUrl}
                    alt={selectedOperator.operatorName}
                    className="h-32 !object-contain"
                  />
                </Group>
                <Text ta="center" fw={700} size="xl" mt="md">
                  {selectedOperator.operatorName}
                </Text>
              </Card.Section>
              
              {/* Product description */}
              <Box className="p-6">
                {isLoading ? (
                  <Group justify="center">
                    <Loader size="md" />
                  </Group>
                ) : (
                  <>
                    {products.length > 0 && currentProduct ? (
                      <>
                        <Text className="text-gray-700 !mb-4">
                          {currentProduct.productDescription || 
                           `Dengan mengisi ${selectedOperator.operatorName} wallet kamu, kamu dapat dengan mudah mengakses & memainkan berbagai game online lokal maupun internasional.`}
                        </Text>
                        
                        <Text fw={500} className="!mb-2">Select Product</Text>
                        <Select
                          data={productOptions}
                          value={selectedProduct}
                          onChange={(value) => value && setSelectedProduct(value)}
                          className="mb-6"
                        />
                        
                        <Divider className="mb-6" />
                        
                        <Text fw={500} color="gray" size="sm" className="mb-2">Harga</Text>
                        {currentProduct.isDiscount ? (
                          <div className="mb-6">
                            <Text fw={700} size="xl" className="text-red-500">
                              {currentProduct.newPriceLabel}
                            </Text>
                            <Group gap="xs" align="center">
                              <Text td="line-through" c="dimmed" size="md">
                                {currentProduct.priceLabel}
                              </Text>
                              <Text className="text-red-500 font-semibold">
                                {currentProduct.discountPercentage}% OFF
                              </Text>
                            </Group>
                          </div>
                        ) : (
                          <Text fw={700} size="xl" className="mb-6">
                            {currentProduct.priceLabel}
                          </Text>
                        )}
                        
                        <Button fullWidth className='!bg-red-500 hover:!bg-red-600' size="md" mt="sm">
                          Beli Sekarang
                        </Button>
                      </>
                    ) : (
                      <Text>Tidak ada produk tersedia</Text>
                    )}
                  </>
                )}
              </Box>
            </Card>
          </>
        )}
      </Container>
    </div>
  );
};

export default PPOBTemplateThree;
