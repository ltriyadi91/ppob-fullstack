"use client";

import { Modal, TextInput, Stack, Button, Group, NumberInput, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";

export interface ProductFormValues {
  id?: number;
  operatorId: number;
  categoryId: number;
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

interface ProductModalProps {
  opened: boolean;
  onClose: () => void;
  initialData?: ProductFormValues;
  onSubmit: (values: ProductFormValues) => void;
}

export function ProductModal({ opened, onClose, initialData, onSubmit }: ProductModalProps) {
  const form = useForm<ProductFormValues>({
    initialValues: initialData || {
      operatorId: 1,
      categoryId: 1,
      productName: '',
      productDescription: '',
      priceNumeric: 0,
      priceLabel: '',
      newPriceNumeric: 0,
      newPriceLabel: '',
      discountPercentage: 0,
      isDiscount: false,
      isAvailable: true,
    },
    validate: {
      productName: (v) => !v.trim() ? 'Product name is required' : null,
      productDescription: (v) => !v.trim() ? 'Description is required' : null,
      priceNumeric: (v) => v <= 0 ? 'Price must be positive' : null,
      priceLabel: (v) => !v.trim() ? 'Price label is required' : null,
      newPriceNumeric: (v, values) => values.isDiscount && v <= 0 ? 'New price required for discount' : null,
      newPriceLabel: (v, values) => values.isDiscount && !v.trim() ? 'New price label required for discount' : null,
    },
  });

  const handleSubmit = (values: ProductFormValues) => {
    onSubmit(values);
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title={initialData ? 'Edit Product' : 'Add Product'} size="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Product Name" required {...form.getInputProps('productName')} />
          <TextInput label="Description" required {...form.getInputProps('productDescription')} />
          <NumberInput label="Price" required {...form.getInputProps('priceNumeric')} min={0} prefix="Rp " thousandSeparator />
          <TextInput label="Price Label" required {...form.getInputProps('priceLabel')} />
          <Switch label="Discount?" checked={form.values.isDiscount} onChange={(e) => form.setFieldValue('isDiscount', e.currentTarget.checked)} />
          {form.values.isDiscount && (
            <>
              <NumberInput label="New Price" {...form.getInputProps('newPriceNumeric')} min={0} prefix="Rp " thousandSeparator />
              <TextInput label="New Price Label" {...form.getInputProps('newPriceLabel')} />
              <NumberInput label="Discount %" {...form.getInputProps('discountPercentage')} min={0} max={100} />
            </>
          )}
          <Switch label="Available?" checked={form.values.isAvailable} onChange={(e) => form.setFieldValue('isAvailable', e.currentTarget.checked)} />
          <Group justify="flex-end" mt="md">
            <Button variant="subtle" onClick={onClose}>Cancel</Button>
            <Button type="submit">{initialData ? 'Update' : 'Create'}</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
