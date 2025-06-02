"use client";

import { useForm } from '@mantine/form';
import {
  Modal,
  TextInput,
  Stack,
  Button,
  Group,
  Select,
} from '@mantine/core';

interface OperatorModalProps {
  opened: boolean;
  onClose: () => void;
  initialData?: {
    operatorId?: number;
    operatorName: string;
    operatorDescription: string;
    isActive: boolean;
    slug: string;
    imageUrl: string;
  };
  onSubmit: (values: OperatorFormValues) => void;
}

interface OperatorFormValues {
  operatorId?: number;
  operatorName: string;
  operatorDescription: string;
  isActive: boolean;
  slug: string;
  imageUrl: string;
}

export function OperatorModal({ 
  opened, 
  onClose, 
  initialData,
  onSubmit,
}: OperatorModalProps) {
  const form = useForm<OperatorFormValues>({
    initialValues: {
      operatorId: initialData?.operatorId,
      operatorName: initialData?.operatorName || '',
      operatorDescription: initialData?.operatorDescription || '',
      isActive: initialData?.isActive ?? true,
      slug: initialData?.slug || '',
      imageUrl: initialData?.imageUrl || '',
    },
    validate: {
      operatorName: (value: string) => !value.trim() ? 'Operator name is required' : null,
      operatorDescription: (value: string) => !value.trim() ? 'Description is required' : null,
      slug: (value: string) => !value.trim() ? 'Slug is required' : null,
      imageUrl: (value: string) => !value.trim() ? 'Image URL is required' : null,
    },
  });

  const handleSubmit = (values: OperatorFormValues) => {
    onSubmit(values);
    form.reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialData ? 'Edit Operator' : 'Create Operator'}
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
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
          <Select
            label="Status"
            required
            data={[
              { value: 'true', label: 'Active' },
              { value: 'false', label: 'Inactive' },
            ]}
            value={form.values.isActive ? 'true' : 'false'}
            onChange={(value) => form.setFieldValue('isActive', value === 'true')}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="subtle" onClick={onClose}>Cancel</Button>
            <Button type="submit">{initialData ? 'Update' : 'Create'}</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
