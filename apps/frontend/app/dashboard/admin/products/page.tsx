'use client';

import {
  Paper,
  Title,
  Stack,
  Group,
  Text,
  Badge,
  Button,
  ActionIcon,
  rem,
  Menu,
  TextInput,
  Select,
  Alert,
  Flex,
} from '@mantine/core';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import {
  IconPlus,
  IconPencil,
  IconTrash,
  IconDots,
  IconSearch,
  IconX,
} from '@tabler/icons-react';
import { useState } from 'react';
import { ProductModal } from '@/components/Modals/ProductModal';
import { useQuery, useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useAuth } from '@/hooks/useAuth';
import { CategoryDTO } from '../categories/page';

// TypeScript interface matching ProductDTO
export interface ProductDTO {
  id: number | null;
  operatorId: number;
  categoryId: number;
  categoryName: string;
  operatorName: string;
  productName: string;
  productDescription: string;
  priceNumeric: number;
  priceLabel: string;
  newPriceNumeric: number;
  newPriceLabel: string;
  discountPercentage: number;
  isDiscount: boolean;
  isAvailable: boolean;
}

// Product data type returned from the API
export interface PaginatedProductResponse {
  content: ProductDTO[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

export interface OperatorDTO {
  operatorId: number;
  operatorName: string;
  operatorDescription: string;
  isActive: boolean;
  slug: string;
  imageUrl: string;
}

// API functions
export const api = {
  getProducts: async (
    page = 0,
    size = 10,
    searchTerm = '',
    sortBy = 'productName',
    sortDir = 'asc',
    categoryId?: string | null,
    operatorId?: string | null
  ): Promise<PaginatedProductResponse> => {
    let url = `${process.env.NEXT_PUBLIC_API_V1}/products/paginated?page=${page}&size=${size}&searchTerm=${searchTerm}&sortBy=${sortBy}&sortDir=${sortDir}`;

    // Add category filter if provided - convert string ID to number for backend
    if (categoryId) {
      url += `&categoryId=${parseInt(categoryId)}`;
    }

    // Add operator filter if provided - convert string ID to number for backend
    if (operatorId) {
      url += `&operatorId=${parseInt(operatorId)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  },
  getProductById: async (id: number): Promise<ProductDTO> => {
    if (!id) throw new Error('Product ID is required');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_V1}/products/${id}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  },
  getCategories: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_V1}/categories`
    );
    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  },
  getOperators: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_V1}/operators`);
    if (!response.ok) {
      throw new Error(`Error fetching operators: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  },
  saveProduct: async (product: ProductDTO, token: string | null) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_V1}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error(`Error saving product: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  },
  deleteProduct: async (id: number, token: string | null) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_V1}/products/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error deleting product: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  },
};

export default function ProductsPage() {
  const pageSize = 10; // Fixed page size

  const [modalOpened, setModalOpened] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductDTO | null>(null);

  // Pagination and filtering state
  const [page, setPage] = useState(1); // 1-indexed for UI, 0-indexed for API
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('productName');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [operatorFilter, setOperatorFilter] = useState<string | null>(null);
  const { token } = useAuth({ isDashboard: true });

  // Fetch categories for filter
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories,
  });

  // Fetch operators for filter
  const { data: operators = [] } = useQuery({
    queryKey: ['operators'],
    queryFn: api.getOperators,
  });

  // Products query with pagination and search
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: [
      'products',
      page - 1,
      pageSize,
      searchTerm,
      sortBy,
      sortDir,
      categoryFilter,
      operatorFilter,
    ],
    queryFn: () =>
      api.getProducts(
        page - 1,
        pageSize,
        searchTerm,
        sortBy,
        sortDir,
        categoryFilter,
        operatorFilter
      ),
  });

  // Save product mutation (handles both create and update)
  const saveProductMutation = useMutation({
    mutationFn: (product: ProductDTO) => api.saveProduct(product, token),
    onSuccess: (_, variables) => {
      refetchProducts();

      const isUpdate = variables.id !== undefined;
      notifications.show({
        title: 'Success',
        message: isUpdate
          ? 'Product updated successfully'
          : 'Product created successfully',
        color: 'green',
      });
      setModalOpened(false);
      setEditingProduct(null);
    },
    onError: (error: Error) => {
      notifications.show({
        title: 'Error',
        message: error.message || 'Failed to save product',
        color: 'red',
      });
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: (id: number) => api.deleteProduct(id, token),
    onSuccess: () => {
      refetchProducts();
      notifications.show({
        title: 'Success',
        message: 'Product deleted successfully',
        color: 'green',
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: 'Error',
        message: error.message || 'Failed to delete product',
        color: 'red',
      });
    },
  });

  // Handle form submission
  const handleSubmit = (values: ProductDTO) => {
    if (editingProduct) {
      saveProductMutation.mutate({ ...values, id: editingProduct.id });
    } else {
      saveProductMutation.mutate(values);
    }
  };

  // Handle product deletion
  const handleDelete = (id: number | null) => {
    if (!id) return;
    deleteProductMutation.mutate(id);
  };

  // Define columns for the DataTable
  const columns: DataTableColumn<ProductDTO>[] = [
    {
      accessor: 'productName',
      title: 'Name',
      sortable: true,
    },
    {
      accessor: 'categoryName',
      title: 'Category',
      sortable: true,
    },
    {
      accessor: 'operatorName',
      title: 'Operator',
      sortable: true,
    },
    {
      accessor: 'productDescription',
      title: 'Description',
      sortable: true,
      ellipsis: true,
    },
    {
      accessor: 'priceNumeric',
      title: 'Price',
      render: (product) =>
        product.isDiscount ? (
          <>
            <Text span td="line-through" c="dimmed" mr={8}>
              {product.priceLabel}
            </Text>
            <Text span fw={600} c="green">
              {product.newPriceLabel}
            </Text>
          </>
        ) : (
          <Text fw={600}>{product.priceLabel}</Text>
        ),
      sortable: true,
    },
    {
      accessor: 'discountPercentage',
      title: 'Discount',
      render: (product) =>
        product.isDiscount ? (
          <Badge color="green">{product.discountPercentage}%</Badge>
        ) : (
          <Badge color="gray">-</Badge>
        ),
      sortable: true,
    },
    {
      accessor: 'isAvailable',
      title: 'Status',
      render: (product) => (
        <Badge color={product.isAvailable ? 'blue' : 'red'}>
          {product.isAvailable ? 'Available' : 'Unavailable'}
        </Badge>
      ),
      sortable: true,
    },
    {
      accessor: 'actions',
      title: 'Actions',
      textAlign: 'center',
      width: 100,
      render: (product) => (
        <Group gap="xs">
          <ActionIcon
            variant="filled"
            color="blue"
            onClick={() => {
              setEditingProduct(product);
              setModalOpened(true);
            }}
          >
            <IconPencil size={16} />
          </ActionIcon>
          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray" size="sm">
                <IconDots style={{ width: rem(16) }} stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconTrash size={14} />}
                color="red"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      ),
    },
  ];

  return (
    <>
      <Stack gap="lg">
        <Paper shadow="xs" p="md">
          <Stack gap="md">
            <Group justify="space-between">
              <Title order={2}>Products</Title>
              <Button
                leftSection={<IconPlus size={16} />}
                onClick={() => {
                  setEditingProduct(null);
                  setModalOpened(true);
                }}
              >
                Add Product
              </Button>
            </Group>

            {/* Search and filters */}
            <Flex justify="space-between" align="center">
              <TextInput
                mt="28px"
                w="60%"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
                leftSection={<IconSearch size={16} />}
                rightSection={
                  searchTerm ? (
                    <ActionIcon onClick={() => setSearchTerm('')}>
                      <IconX size={16} />
                    </ActionIcon>
                  ) : null
                }
              />
              <Flex gap="md">
                <Select
                  label="Filter by Category"
                  placeholder="All Categories"
                  clearable
                  value={categoryFilter}
                  onChange={(value) => {
                    setCategoryFilter(value);
                    setPage(1); // Reset to first page when filter changes
                  }}
                  data={categories.map((category: CategoryDTO) => ({
                    value: category.categoryId?.toString() || '',
                    label: category.categoryName,
                  }))}
                  style={{ width: 180 }}
                />
                <Select
                  label="Filter by Operator"
                  placeholder="All Operators"
                  clearable
                  value={operatorFilter}
                  onChange={(value) => {
                    setOperatorFilter(value);
                    setPage(1); // Reset to first page when filter changes
                  }}
                  data={operators.map((operator: OperatorDTO) => ({
                    value: operator.operatorId?.toString() || '',
                    label: operator.operatorName,
                  }))}
                  style={{ width: 180 }}
                />
              </Flex>
            </Flex>

            {isError ? (
              <Alert title="Error" color="red">
                {(error as Error)?.message ||
                  'An error occurred while fetching data'}
              </Alert>
            ) : null}

            <DataTable
              withTableBorder
              borderRadius="sm"
              striped
              highlightOnHover
              columns={columns}
              records={data?.content || []}
              minHeight={300}
              noRecordsText="No products found"
              sortStatus={{
                columnAccessor: sortBy as string,
                direction: sortDir,
              }}
              onSortStatusChange={(status) => {
                setSortBy(status.columnAccessor as string);
                setSortDir(status.direction as 'asc' | 'desc');
              }}
              totalRecords={data?.totalElements || 0}
              recordsPerPage={pageSize}
              page={page}
              onPageChange={setPage}
              paginationText={({ from, to, totalRecords }) =>
                `${from}-${to} of ${totalRecords}`
              }
              fetching={isLoading}
            />
          </Stack>
        </Paper>
      </Stack>

      <ProductModal
        opened={modalOpened}
        productId={editingProduct?.id}
        onClose={() => {
          setModalOpened(false);
          setEditingProduct(null);
        }}
        onSubmit={handleSubmit}
      />
    </>
  );
}
