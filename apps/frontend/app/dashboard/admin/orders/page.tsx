'use client';

import { useState } from 'react';
import { TextInput, Stack, Group, Box, Badge } from '@mantine/core';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';

interface Product {
  id: number;
  productName: string;
  operatorName: string;
  categoryName: string;
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
  userId: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  orderItems: OrderItem[];
}

interface PaginatedResponse {
  data: {
    content: Order[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  };
}

export default function OrderPage() {
  const { token } = useAuth({ isDashboard: true });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<{ field: string; direction: 'asc' | 'desc' }>({ 
    field: 'orderId', 
    direction: 'asc' 
  });

  const { data, isLoading, error } = useQuery<PaginatedResponse>({
    queryKey: ['orders', page, pageSize, searchTerm, sortBy, token],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_V1}/orders/paginated?` +
        `page=${page - 1}&` +
        `size=${pageSize}&` +
        `sortBy=${sortBy.field}&` +
        `sortDir=${sortBy.direction}` +
        (searchTerm ? `&searchTerm=${searchTerm}` : ''),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      return response.json();
    },
    enabled: !!token,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleSortStatusChange = ({ columnAccessor, direction }: DataTableSortStatus<Order>) => {
    setSortBy({ 
      field: columnAccessor as string, 
      direction: direction as 'asc' | 'desc' 
    });
  };

  return (
    <div className="mx-auto p-4">
      <div className="mb-4">
        <TextInput
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.currentTarget.value)}
          style={{ width: '300px' }}
        />
      </div>

      <DataTable
        withTableBorder
        borderRadius="sm"
        striped
        highlightOnHover
        records={data?.data.content || []}
        columns={[
          {
            accessor: 'orderId',
            title: 'Order ID',
            sortable: true,
          },
          {
            accessor: 'totalAmount',
            title: 'Total Amount',
            render: ({ totalAmount }) => 
              `Rp${totalAmount.toLocaleString('id-ID')}`,
            sortable: true,
          },
          {
            accessor: 'status',
            title: 'Status',
            sortable: true,
            render: ({ status }) => {
              const statusConfig = {
                PENDING: { color: 'gray', label: 'Pending' },
                PAID: { color: 'green', label: 'Paid' },
                CANCELLED: { color: 'red', label: 'Cancelled' },
              };
              const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
              
              return (
                <Badge color={config.color} variant="light">
                  {config.label}
                </Badge>
              );
            },
          },
          {
            accessor: 'createdAt',
            title: 'Created At',
            render: ({ createdAt }) => createdAt,
            sortable: true,
          },

        ]}
        totalRecords={data?.data.totalElements || 0}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={setPage}
        sortStatus={{
          columnAccessor: sortBy.field,
          direction: sortBy.direction,
        }}
        onSortStatusChange={handleSortStatusChange}
        fetching={isLoading}
        loaderBackgroundBlur={2}
        rowExpansion={{
          content: ({ record }) => (
            <Stack p="xs" gap="xs">
              <Group gap="xs">
                <Box fw={500}>Order Items:</Box>
              </Group>
              {record.orderItems?.map((item) => (
                <Group key={item.orderItemId} gap="xs">
                  <Box className="text-sm">
                    <span className="font-medium">{item.product.operatorName}</span> -{' '}
                    <span>{item.product.productName}</span>
                    <span className="text-gray-600"> ({item.quantity}x)</span>
                    <span className="ml-2 text-gray-600">
                      Rp{item.price.toLocaleString('id-ID')}
                    </span>
                  </Box>
                </Group>
              ))}
            </Stack>
          ),
        }}
      />

      {error instanceof Error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error.message}
        </div>
      )}
    </div>
  );
}
