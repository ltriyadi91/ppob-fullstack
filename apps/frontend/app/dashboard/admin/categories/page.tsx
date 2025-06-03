'use client';
import React, { useState } from 'react';
import {
  Paper,
  Title,
  Stack,
  Group,
  Image,
  Alert,
  Button,
  TextInput,
  Badge,
  ActionIcon,
} from '@mantine/core';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { IconSearch, IconEdit, IconDotsVertical } from '@tabler/icons-react';
import { CategoryModal } from '@/components/Modals/CategoryModal';
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useMutation } from '@tanstack/react-query';
import useDebounceInput from '@/hooks/useDebounceInput';

export interface CategoryDTO {
  categoryId: string | number | null | undefined;
  categoryName: string;
  slug: string;
  imageUrl: string;
  createdDate?: string;
  updatedDate?: string;
  description?: string;
  categoryDescription?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  isActive?: boolean;
  isInputNumberRequired?: boolean;
}

export interface ApiResponse<T> {
  timestamp: string;
  statusCode: string;
  statusDescription: string;
  statusTitle: string;
  data: T;
}

interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  empty: boolean;
}

export default function CategoriesPage() {
  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryDTO | null>(null);

  const { token } = useAuth({
    isDashboard: true,
  });

  // React Query for fetching categories with pagination
  const {
    data: categoriesData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['categories', page, pageSize],
    queryFn: async (): Promise<ApiResponse<PaginatedResponse<CategoryDTO>>> => {
      // Build the query parameters for the API request
      const params = new URLSearchParams();
      if (searchTerm) params.append('searchTerm', searchTerm);
      
      // API uses 0-based indexing
      params.append('page', (page - 1).toString());

      params.append('size', pageSize.toString());
      params.append('sortBy', 'categoryName');
      params.append('sortDir', 'asc');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_V1}/categories/paginated?${params.toString()}`);
      
      if (!response.ok) throw new Error('Failed to fetch categories');
      
      const apiResponse = await response.json();
      
      if (apiResponse.statusCode !== '00') {
        throw new Error(apiResponse.statusDescription || 'Failed to fetch categories');
      }
      
      return apiResponse;
    },
  });

  const { handleChangeForm } = useDebounceInput({
    callback: () => {
      setPage(1);
      refetch();
    },
    delay: 1000,
  });

  // Define columns for the DataTable
  const columns: DataTableColumn<CategoryDTO>[] = [
    {
      accessor: 'imageUrl',
      title: 'Image',
      render: (category) => (
        <Image
          src={category.imageUrl}
          alt={category.categoryName}
          width={40}
          height={40}
          radius="sm"
          fit="contain"
        />
      ),
      width: 80,
    },
    {
      accessor: 'categoryName',
      title: 'Name',
      sortable: true,
    },
    {
      accessor: 'slug',
      title: 'Slug',
    },
    {
      accessor: 'categoryDescription',
      title: 'Description',
    },
    {
      accessor: 'isActive',
      title: 'Status',
      render: (category) => (
        <Badge color={category.isActive ? 'green' : 'red'}>
          {category.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
      width: 100,
    },
    {
      accessor: 'isInputNumberRequired',
      title: 'Input Number Required',
      render: (category) => (
        <Badge color={category.isInputNumberRequired ? 'blue' : 'gray'}>
          {category.isInputNumberRequired ? 'Yes' : 'No'}
        </Badge>
      ),
      width: 200,
    },
    {
      accessor: 'actions',
      title: 'Actions',
      render: (category) => (
        <Group gap="xs">
          <ActionIcon
            variant="filled"
            color="blue"
            onClick={() => {
              setEditingCategory(category);
              setModalOpened(true);
            }}
          >
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon variant="subtle">
            <IconDotsVertical size={16} />
          </ActionIcon>
        </Group>
      ),
      width: 100,
      textAlign: 'center',
    },
  ];

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchTerm(value);
    handleChangeForm();
  };

  // Mutation for creating/updating categories
  const categoryMutation = useMutation({
    mutationFn: async (values: CategoryDTO) => {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_V1}/categories`;

      // Prepare request body according to the API requirements
      const requestBody: CategoryDTO = {
        categoryId: values.categoryId,
        categoryName: values.categoryName,
        slug: values.slug,
        imageUrl: values.imageUrl,
        isActive: values.isActive,
        isInputNumberRequired: values.isInputNumberRequired,
      };
      
      // Add description if provided
      if (values.categoryDescription) {
        requestBody.categoryDescription = values.categoryDescription;
      }

      // Add category ID if we're updating
      if (editingCategory) {
        requestBody.categoryId = editingCategory.categoryId;
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${editingCategory ? 'update' : 'create'} category: ${
            response.status
          }`
        );
      }
      
      const apiResponse = await response.json();

      return apiResponse.data;
    },
    onSuccess: () => {
      // Close modal and refresh data
      setModalOpened(false);
      refetch();
    },
    onError: (error) => {
      console.error('Error saving category:', error);
    }
  });

  // Handle form submission
  const handleSubmit = (values: CategoryDTO) => {
    categoryMutation.mutate(values);
  };

  return (
    <>
      <Stack gap="lg">
        <Paper shadow="xs" p="md">
          <Stack gap="md">
            <Group justify="space-between">
              <Title order={2}>Categories</Title>
              <Button
                onClick={() => {
                  setEditingCategory(null);
                  setModalOpened(true);
                }}
              >
                Add Category
              </Button>
            </Group>

            <TextInput
              placeholder="Search categories..."
              leftSection={<IconSearch size={16} />}
              value={searchTerm}
              onChange={handleSearch}
            />

            {isError && (
              <Alert title="Error" color="red">
                {(error as Error)?.message || 'An error occurred while fetching data'}
              </Alert>
            )}

            <DataTable
              withTableBorder
              borderRadius="sm"
              striped
              highlightOnHover
              minHeight={180}
              columns={columns}
              records={categoriesData?.data.content || []}
              totalRecords={categoriesData?.data.totalElements || 0}
              recordsPerPage={pageSize}
              page={page}
              onPageChange={setPage}
              onRecordsPerPageChange={setPageSize}
              paginationText={({ from, to, totalRecords }) => `${from}-${to} of ${totalRecords}`}
              fetching={isLoading}
              recordsPerPageOptions={[10, 25, 50]}
              noRecordsText="No categories found"
            />
          </Stack>
        </Paper>
      </Stack>

      <CategoryModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        categoryId={editingCategory?.categoryId}
        onSubmit={handleSubmit}
      />
    </>
  );
}
