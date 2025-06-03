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
  Textarea,
  Switch,
  Loader,
  Alert,
} from '@mantine/core';
import { ApiResponse, CategoryDTO } from '@/dashboard/admin/categories/page';

interface CategoryModalProps {
  opened: boolean;
  onClose: () => void;
  categoryId?: string | number | null | undefined;
  onSubmit: (values: CategoryDTO) => void;
}

const initialData: CategoryDTO = {
  categoryId: null,
  categoryName: '',
  imageUrl: '',
  slug: '',
  categoryDescription: '',
  isActive: false,
  isInputNumberRequired: false,
};

export function CategoryModal({
  opened,
  onClose,
  categoryId,
  onSubmit,
}: CategoryModalProps) {
  const form = useForm<CategoryDTO>({
    initialValues: {
      ...initialData,
      categoryId
    },
    validate: {
      categoryName: (value: string | undefined) => (!value?.trim() ? 'Name is required' : null),
      slug: (value: string | undefined) => (!value?.trim() ? 'Slug is required' : null),
    },
    transformValues: (values: CategoryDTO) => ({
      ...values,
      slug: values.slug ? values.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '',
    }),
  });

  // Fetch category details using React Query
  const { data: categoryData, isLoading, error: queryError } = useQuery({
    queryKey: ['category', categoryId, opened],
    queryFn: () => fetchCategoryById(categoryId),
    enabled: !!categoryId && opened,
  });

  // Update form when data is fetched
  useEffect(() => {
    if (categoryData && opened) {
      const data = {
        categoryId: categoryData.data.categoryId,
        categoryName: categoryData.data.categoryName,
        imageUrl: categoryData.data.imageUrl,
        slug: categoryData.data.slug,
        categoryDescription: categoryData.data.categoryDescription,
        isActive: categoryData.data.isActive,
        isInputNumberRequired: categoryData.data.isInputNumberRequired,
      }
      form.setValues(data);
    }
  }, [categoryData, opened]);


  // Fetch category by ID from API - used by React Query
  const fetchCategoryById = async (id?: string | number | null | undefined): Promise<ApiResponse<CategoryDTO>> => {
    if (!id) {
      return {} as ApiResponse<CategoryDTO>;
    }
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_V1}/categories/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch category: ${response.status}`);
    }
    
    const apiResponse = await response.json();
    
    if (apiResponse.statusCode !== '00') {
      throw new Error(apiResponse.statusDescription || 'Failed to fetch category');
    }
    
    return apiResponse;
  };

  const handleResetForm = () => {
    form.setValues(initialData);
  }

  const handleSubmit = (values: CategoryDTO) => {
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
      title={categoryId ? 'Edit Category' : 'Create Category'}
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
              {queryError instanceof Error ? queryError.message : 'Failed to load category'}
            </Alert>
          )}
          <TextInput
            label="Name"
            placeholder="Enter category name"
            required
            {...form.getInputProps('categoryName')}
            onChange={(event) => {
              form.setFieldValue('categoryName', event.currentTarget.value);
            }}
          />

          <TextInput
            label="Slug"
            placeholder="enter-slug-here"
            required
            {...form.getInputProps('slug')}
          />

          <Textarea
            label="Description"
            placeholder="Enter category description"
            autosize
            minRows={3}
            maxRows={5}
            {...form.getInputProps('categoryDescription')}
          />

          <TextInput
            label="Image URL"
            placeholder="Enter image URL"
            required
            {...form.getInputProps('imageUrl')}
          />

          <Group gap="xl">
            <Switch
              label="Active"
              description="Is this category active?"
              {...form.getInputProps('isActive', { type: 'checkbox' })}
            />
            <Switch
              label="Requires Input Number"
              description="Does this category require an input number?"
              {...form.getInputProps('isInputNumberRequired', {
                type: 'checkbox',
              })}
            />
          </Group>

          <Group justify="flex-end" mt="md">
            <Button variant="subtle" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
