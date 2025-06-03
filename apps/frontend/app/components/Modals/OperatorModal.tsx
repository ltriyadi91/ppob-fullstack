'use client';

import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import {
  Modal,
  TextInput,
  Stack,
  Button,
  Group,
  Loader,
  Alert,
  Switch,
} from '@mantine/core';

import { ApiResponse, OperatorDTO } from '@/dashboard/admin/operators/page';

interface OperatorModalProps {
  opened: boolean;
  onClose: () => void;
  operatorId?: number | null;
  onSubmit: (values: OperatorDTO) => void;
}

const initialData: OperatorDTO = {
  operatorId: undefined,
  operatorName: '',
  operatorDescription: '',
  isActive: true,
  slug: '',
  imageUrl: '',
}

export function OperatorModal({
  opened,
  onClose,
  operatorId,
  onSubmit,
}: OperatorModalProps) {
  const form = useForm<OperatorDTO>({
    initialValues: {
      ...initialData,
      operatorId,
    },
    validate: {
      operatorName: (value: string) =>
        !value.trim() ? 'Operator name is required' : null,
      operatorDescription: (value: string) =>
        !value.trim() ? 'Description is required' : null,
      slug: (value: string) => (!value.trim() ? 'Slug is required' : null),
      imageUrl: (value: string) =>
        !value.trim() ? 'Image URL is required' : null,
    },
  });

  // Fetch operator details using React Query
  const {
    data: operatorData,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ['operator', operatorId],
    queryFn: () => fetchOperatorById(operatorId),
    enabled: !!operatorId && opened,
  });

  // Update form when data is fetched
  useEffect(() => {
    if (operatorData && opened) {
      const data = {
        operatorId: operatorData.data.operatorId,
        operatorName: operatorData.data.operatorName,
        operatorDescription: operatorData.data.operatorDescription,
        isActive: operatorData.data.isActive,
        slug: operatorData.data.slug,
        imageUrl: operatorData.data.imageUrl,
      };
      form.initialize(data);
      form.setValues(data);
    }
  }, [operatorData, opened]);

  // Fetch operator by ID from API - used by React Query
  const fetchOperatorById = async (
    id?: number | null
  ): Promise<ApiResponse<OperatorDTO>> => {
    if (!id) {
      return {} as ApiResponse<OperatorDTO>;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_V1}/operators/${id}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch operator: ${response.status}`);
    }

    const apiResponse = await response.json();

    if (apiResponse.statusCode !== '00') {
      throw new Error(
        apiResponse.statusDescription || 'Failed to fetch operator'
      );
    }

    return apiResponse;
  };

  const handleResetForm = () => {
    form.setValues(initialData);
  }

  const handleSubmit = (values: OperatorDTO) => {
    onSubmit(values);
    handleResetForm();
    onClose();
  };

  const handleClose = () => {
    handleResetForm();
    onClose();
  }

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={operatorId ? 'Edit Operator' : 'Create Operator'}
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          {isLoading && (
            <Group justify="center" p="md">
              <Loader size="sm" />
            </Group>
          )}

          {queryError && (
            <Alert color="red" title="Error" withCloseButton>
              {queryError instanceof Error
                ? queryError.message
                : 'Failed to load operator'}
            </Alert>
          )}
          <TextInput
            label="Operator Name"
            placeholder="Enter operator name"
            required
            {...form.getInputProps('operatorName')}
          />
          <TextInput
            label="Description"
            placeholder="Enter operator description"
            required
            {...form.getInputProps('operatorDescription')}
          />
          <TextInput
            label="Slug"
            placeholder="operator-slug"
            required
            {...form.getInputProps('slug')}
          />
          <TextInput
            label="Image URL"
            placeholder="https://..."
            required
            {...form.getInputProps('imageUrl')}
          />
          <Switch
            label="Active"
            description="Is this operator active?"
            {...form.getInputProps('isActive', { type: 'checkbox' })}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="subtle" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{operatorId ? 'Update' : 'Create'}</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
