'use client';

import { useState } from 'react';
import { OperatorModal } from '@/components/Modals/OperatorModal';
import {
  Group,
  Button,
  Paper,
  Title,
  Menu,
  ActionIcon,
  rem,
  TextInput,
  Stack,
  Badge,
  Alert,
  Image,
} from '@mantine/core';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import {
  IconDots,
  IconTrash,
  IconPlus,
  IconSearch,
  IconEdit,
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import useDebounceInput from '@/hooks/useDebounceInput';

export interface OperatorDTO {
  operatorId: number | null | undefined;
  operatorName: string;
  operatorDescription: string;
  isActive: boolean;
  slug: string;
  imageUrl: string;
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

export default function OperatorsPage() {
  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingOperator, setEditingOperator] = useState<OperatorDTO | null>(
    null
  );

  const { token } = useAuth({
    isDashboard: true,
  });

  // React Query for fetching operators with pagination
  const {
    data: operatorsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['operators', page, pageSize, searchTerm],
    queryFn: async (): Promise<ApiResponse<PaginatedResponse<OperatorDTO>>> => {
      // Build the query parameters for the API request
      const params = new URLSearchParams();
      if (searchTerm) params.append('searchTerm', searchTerm);

      // API uses 0-based indexing
      params.append('page', (page - 1).toString());
      params.append('size', pageSize.toString());
      params.append('sortBy', 'operatorName');
      params.append('sortDir', 'asc');

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_V1
        }/operators/paginated?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch operators');

      const apiResponse = await response.json();

      if (apiResponse.statusCode !== '00') {
        throw new Error(
          apiResponse.statusDescription || 'Failed to fetch operators'
        );
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

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchTerm(value);
    handleChangeForm();
  };

  // Mutation for creating/updating operators
  const operatorMutation = useMutation({
    mutationFn: async (values: OperatorDTO) => {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_V1}/operators`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${editingOperator ? 'update' : 'create'} operator: ${
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
      console.error('Error saving operator:', error);
    },
  });

  const deleteOperatorMutation = useMutation({
    mutationFn: async (id: number) => {
      console.log(id);
      const apiUrl = `${process.env.NEXT_PUBLIC_API_V1}/operators/${id}`;

      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete operator: ${response.statusText}`);
      }
    },
    onSuccess: () => {
      refetch();
      notifications.show({
        title: 'Success',
        message: 'Operator deleted successfully',
        color: 'green',
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: 'Error',
        message: error.message || 'Failed to delete operator',
        color: 'red',
      });
    },
  });

  // Handle form submission
  const handleSubmit = (values: OperatorDTO) => {
    operatorMutation.mutate(values);
  };

  // Handle delete
  const handleDelete = (operatorId: number) => {
    if (confirm('Are you sure you want to delete this operator?')) {
      deleteOperatorMutation.mutate(operatorId);
    }
  };

  // Define columns for the DataTable
  const columns: DataTableColumn<OperatorDTO>[] = [
    {
      accessor: 'imageUrl',
      title: 'Image',
      render: (operator: OperatorDTO) => (
        <Image
          src={operator.imageUrl}
          alt={operator.operatorName}
          width={40}
          height={40}
          radius="sm"
          fit="contain"
        />
      ),
      width: 80,
    },
    {
      accessor: 'operatorName',
      title: 'Name',
      sortable: true,
    },
    {
      accessor: 'operatorDescription',
      title: 'Description',
      ellipsis: true,
    },
    {
      accessor: 'slug',
      title: 'Slug',
    },
    {
      accessor: 'isActive',
      title: 'Status',
      render: (operator: OperatorDTO) => (
        <Badge color={operator.isActive ? 'green' : 'red'}>
          {operator.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
      width: 100,
    },
    {
      accessor: 'actions',
      title: 'Actions',
      render: (operator) => (
        <Group gap="xs">
          <ActionIcon
            variant="filled"
            color="blue"
            onClick={() => {
              setEditingOperator(operator);
              setModalOpened(true);
            }}
          >
            <IconEdit size={16} />
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
                onClick={() => handleDelete(operator.operatorId as number)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      ),
      width: 100,
      textAlign: 'center',
    },
  ];

  return (
    <>
      <Stack gap="lg">
        <Paper shadow="xs" p="md">
          <Stack gap="md">
            <Group justify="space-between">
              <Title order={2}>Operators</Title>
              <Button
                leftSection={<IconPlus size={16} />}
                onClick={() => {
                  setEditingOperator(null);
                  setModalOpened(true);
                }}
              >
                Add Operator
              </Button>
            </Group>

            <TextInput
              placeholder="Search operators..."
              leftSection={<IconSearch size={16} />}
              value={searchTerm}
              onChange={handleSearch}
            />

            {isError && (
              <Alert title="Error" color="red">
                {(error as Error)?.message ||
                  'An error occurred while fetching data'}
              </Alert>
            )}

            <DataTable
              withTableBorder
              borderRadius="sm"
              striped
              highlightOnHover
              records={operatorsData?.data?.content || []}
              columns={columns}
              totalRecords={operatorsData?.data?.totalElements || 0}
              recordsPerPage={pageSize}
              page={page}
              onPageChange={setPage}
              onRecordsPerPageChange={setPageSize}
              recordsPerPageOptions={[10, 25, 50]}
              paginationText={({ from, to, totalRecords }) =>
                `${from}-${to} of ${totalRecords}`
              }
              fetching={isLoading}
            />
          </Stack>
        </Paper>
      </Stack>

      <OperatorModal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setEditingOperator(null);
        }}
        operatorId={editingOperator?.operatorId || null}
        onSubmit={handleSubmit}
      />
    </>
  );
}
