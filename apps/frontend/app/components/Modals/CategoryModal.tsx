'use client';

import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
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

interface CategoryModalProps {
  opened: boolean;
  onClose: () => void;
  categoryId?: string | number;
  initialData?: CategoryApiResponse;
  onSubmit: (values: CategoryFormValues) => void;
}

interface CategoryApiResponse {
  categoryId?: string | number;
  categoryName?: string;
  slug?: string;
  categoryDescription?: string;
  imageUrl?: string;
  isActive?: boolean;
  isInputNumberRequired?: boolean;
}

type CategoryFormValues = CategoryApiResponse;

export function CategoryModal({
  opened,
  onClose,
  categoryId,
  initialData,
  onSubmit,
}: CategoryModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log('initialData', initialData);

  const form = useForm<CategoryFormValues>({
    initialValues: {
      categoryName: initialData?.categoryName || '',
      imageUrl: initialData?.imageUrl || '',
      slug: initialData?.slug || '',
      categoryDescription: initialData?.categoryDescription || '',
      isActive: initialData?.isActive ?? true,
      isInputNumberRequired: initialData?.isInputNumberRequired ?? false,
    },
    validate: {
      categoryName: (value: string | undefined) => (!value?.trim() ? 'Name is required' : null),
      slug: (value: string | undefined) => (!value?.trim() ? 'Slug is required' : null),
    },
    transformValues: (values: CategoryFormValues) => ({
      ...values,
      slug: values.slug ? values.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '',
    }),
  });

  // Fetch category details when modal opens with a categoryId
  useEffect(() => {
    if (opened && categoryId) {
      fetchCategoryById(categoryId).then((data) => {
        console.log('category data', data);
        setTimeout(() => {
          form.setValues({
            categoryName: data.categoryName || '',
            imageUrl: data.imageUrl || '',
            slug: data.slug || '',
            categoryDescription: data.categoryDescription || '',
            isActive: data.isActive ?? true,
            isInputNumberRequired: data.isInputNumberRequired ?? false,
          });
        }, 100);
      });
    }
  }, [opened, categoryId]);


  // Fetch category by ID from API
  const fetchCategoryById = async (id: string | number): Promise<CategoryApiResponse> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:8080/api/v1/categories/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch category: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.error('Error fetching category details:', error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      return {} as CategoryApiResponse;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (values: CategoryFormValues) => {
    console.log('values', values);
    onSubmit(values);
    form.reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={categoryId ? 'Edit Category' : 'Create Category'}
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          {loading && (
            <Group justify="center" p="md">
              <Loader size="sm" />
            </Group>
          )}
          
          {error && (
            <Alert color="red" title="Error" withCloseButton onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          <TextInput
            label="Name"
            placeholder="Enter category name"
            required
            {...form.getInputProps('categoryName')}
            onChange={(event) => {
              form.setFieldValue('categoryName', event.currentTarget.value);
              if (!initialData) {
                form.setFieldValue(
                  'slug',
                  event.currentTarget.value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                );
              }
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
            <Button type="submit">{initialData ? 'Update' : 'Create'}</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
