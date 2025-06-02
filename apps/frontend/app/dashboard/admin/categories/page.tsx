'use client';
import React, { useEffect, useState, useCallback } from 'react';
import {
  Table,
  Paper,
  Title,
  Stack,
  Group,
  Text,
  Image,
  Loader,
  Alert,
  Button,
  TextInput,
  Badge,
  ActionIcon,
  Pagination,
  Select,
  Box,
} from '@mantine/core';
import { IconSearch, IconEdit, IconDotsVertical } from '@tabler/icons-react';
import { CategoryModal } from '@/components/Modals/CategoryModal';
import { useAuth } from '@/hooks/useAuth';

interface CategoryDTO {
  categoryId: number;
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

interface ApiResponse<T> {
  timestamp: string;
  statusCode: string;
  statusDescription: string;
  statusTitle: string;
  data: T;
}

export default function CategoriesPage() {
  // API state
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state (search, sort, etc)
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryDTO | undefined>(
    undefined
  );

  const { token } = useAuth({});

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
    setPage(1); // Reset to first page when searching
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePerPageChange = (
    value: string | null,
    option: { value: string; label: string }
  ) => {
    if (value) {
      setPerPage(Number(value));
      setPage(1); // Reset to first page when changing items per page
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      // Build the query parameters for the API request
      const params = new URLSearchParams();
      if (searchTerm) params.append('searchTerm', searchTerm);
      params.append('page', (page - 1).toString()); // API uses 0-based indexing
      params.append('size', perPage.toString());
      params.append('sortBy', 'categoryName');
      params.append('sortDir', 'asc');
      
      const response = await fetch(`http://localhost:8080/api/v1/categories?${params.toString()}`);
      
      if (!response.ok) throw new Error('Failed to fetch categories');
      
      const apiResponse: ApiResponse<PaginatedResponse<CategoryDTO>> = await response.json();
      
      if (apiResponse.statusCode !== '00') {
        throw new Error(apiResponse.statusDescription || 'Failed to fetch categories');
      }
      
      // Update state with the paginated data
      setCategories(apiResponse.data.content);
      
      // Update pagination information
      setTotalPages(apiResponse.data.totalPages);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoriesRef = useCallback(fetchCategories, [page, perPage, searchTerm]);

  useEffect(() => {
    fetchCategoriesRef();
  }, [fetchCategoriesRef]);

  const paginatedCategories = categories;

  return (
    <>
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Title order={2}>Categories</Title>
          <Button
            leftSection={<span>+</span>}
            onClick={() => {
              setEditingCategory(undefined);
              setModalOpened(true);
            }}
          >
            Add Category
          </Button>
        </Group>
        <Paper p="md" withBorder>
          <Stack gap="md">
            <TextInput
              placeholder="Search categories..."
              leftSection={<IconSearch size={16} />}
              value={searchTerm}
              onChange={handleSearch}
            />

            {loading ? (
              <Group justify="center" p="xl">
                <Loader />
              </Group>
            ) : error ? (
              <Alert color="red">{error}</Alert>
            ) : (
              <>
                <Box style={{ overflowX: 'auto' }}>
                  <Table highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Logo</Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Description</Table.Th>
                        <Table.Th>Slug</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th style={{ textAlign: 'right' }}>
                          Actions
                        </Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {paginatedCategories.length === 0 ? (
                        <Table.Tr>
                          <Table.Td colSpan={6} style={{ textAlign: 'center' }}>
                            <Text c="dimmed">No categories found</Text>
                          </Table.Td>
                        </Table.Tr>
                      ) : (
                        paginatedCategories.map((cat) => (
                          <Table.Tr key={cat.categoryId}>
                            <Table.Td>
                              <div
                                style={{
                                  width: 48,
                                  height: 48,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Image
                                  src={cat.imageUrl}
                                  alt={cat.categoryName}
                                  width={48}
                                  height={48}
                                  radius="md"
                                  fit="contain"
                                  style={{
                                    objectFit: 'contain',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                  }}
                                />
                              </div>
                            </Table.Td>
                            <Table.Td>
                              <Text fw={500}>{cat.categoryName}</Text>
                            </Table.Td>
                            <Table.Td>
                              <Text truncate>{cat.categoryDescription || '-'}</Text>
                            </Table.Td>
                            <Table.Td>{cat.slug}</Table.Td>
                            <Table.Td>
                              <Badge
                                color={
                                  cat.isActive ? 'green' : 'red'
                                }
                                variant="light"
                              >
                                {cat.isActive ? 'ACTIVE' : 'INACTIVE'}
                              </Badge>
                            </Table.Td>
                            <Table.Td style={{ textAlign: 'right' }}>
                              <Group gap="xs" justify="flex-end">
                                <ActionIcon
                                  variant="subtle"
                                  color="blue"
                                  onClick={() => {
                                    setEditingCategory(cat);
                                    setModalOpened(true);
                                  }}
                                >
                                  <IconEdit size={16} />
                                </ActionIcon>
                                <ActionIcon variant="subtle">
                                  <IconDotsVertical size={16} />
                                </ActionIcon>
                              </Group>
                            </Table.Td>
                          </Table.Tr>
                        ))
                      )}
                    </Table.Tbody>
                  </Table>
                </Box>

                <Group justify="space-between" align="center">
                  <Select
                    value={perPage.toString()}
                    onChange={handlePerPageChange}
                    data={[
                      { value: '10', label: '10 per page' },
                      { value: '25', label: '25 per page' },
                      { value: '50', label: '50 per page' },
                    ]}
                    style={{ width: 130 }}
                  />

                  <Pagination
                    value={page}
                    onChange={handlePageChange}
                    total={totalPages}
                  />
                </Group>
              </>
            )}
          </Stack>
        </Paper>
      </Stack>

      <CategoryModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        categoryId={editingCategory?.categoryId}
        onSubmit={async (values) => {
          setLoading(true);
          const apiUrl = 'http://localhost:8080/api/v1/admin/categories';

          // Prepare request body according to the API requirements
          const requestBody: {
            categoryName: string;
            slug: string;
            imageUrl: string;
            categoryId?: number;
            categoryDescription?: string;
            isActive?: boolean;
            isInputNumberRequired?: boolean;
          } = {
            categoryName: values.name,
            slug: values.slug || '',
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

          try {
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

            const savedCategory: CategoryDTO = await response.json();

            // Update local state based on response
            if (editingCategory) {
              setCategories(
                categories.map((cat: CategoryDTO) =>
                  cat.categoryId === editingCategory.categoryId
                    ? savedCategory
                    : cat
                )
              );
            } else {
              setCategories([...categories, savedCategory]);
            }

            setModalOpened(false);

            // Refresh categories list with the updated API
            fetchCategories();
          } catch (error) {
            console.error('Error saving category:', error);
            setError(
              error instanceof Error ? error.message : 'Unknown error occurred'
            );
            setLoading(false);
          }
        }}
      />
    </>
  );
}
