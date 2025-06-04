"use client";

import { Modal, TextInput, Stack, Button, Group, NumberInput, Switch, Select, Loader, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { OperatorDTO } from "@/dashboard/admin/operators/page";
import { CategoryDTO } from "@/dashboard/admin/categories/page";
import { ProductDTO } from "@/dashboard/admin/products/page";

interface ProductModalProps {
  opened: boolean;
  productId?: number | null;
  onClose: () => void;
  onSubmit: (values: ProductDTO) => void;
}

// API functions for fetching categories, operators, and product details
const api = {
  getCategories: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_V1}/categories`);
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
  getProductById: async (id: number) => {
    if (!id) return null;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_V1}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  },
};

export function ProductModal({ opened, onClose, productId, onSubmit }: ProductModalProps) {
  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: api.getCategories,
  });
  
  // Fetch operators
  const { data: operators = [], isLoading: operatorsLoading } = useQuery({
    queryKey: ["operators"],
    queryFn: api.getOperators,
  });
  
  // Fetch product details if editing
  const { data: productData, isLoading: productLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => api.getProductById(Number(productId)),
    enabled: !!productId, // Only run this query if productId exists
  });
  
  // Default form values
  const defaultValues = {
    id: productId || null,
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
    categoryName: '',
    operatorName: '',
  };

  const form = useForm<ProductDTO>({
    initialValues: productData || defaultValues,
    validate: {
      operatorId: (v) => !v ? 'Operator is required' : null,
      categoryId: (v) => !v ? 'Category is required' : null,
      productName: (v) => !v.trim() ? 'Product name is required' : null,
      productDescription: (v) => !v.trim() ? 'Description is required' : null,
      priceNumeric: (v) => v <= 0 ? 'Price must be positive' : null,
      priceLabel: (v) => !v.trim() ? 'Price label is required' : null,
      newPriceNumeric: (v, values) => values.isDiscount && v <= 0 ? 'New price required for discount' : null,
      newPriceLabel: (v, values) => values.isDiscount && !v.trim() ? 'New price label required for discount' : null,
    },
  });

  const handleSubmit = (values: ProductDTO) => {
    onSubmit(values);
    form.reset();
    onClose();
  };

  // Prepare data for select inputs
  const categoryOptions = categories.map((category: CategoryDTO) => ({
    value: category.categoryId?.toString() || '',
    label: category.categoryName,
  }));

  const operatorOptions = operators.map((operator: OperatorDTO) => ({
    value: operator.operatorId?.toString() || '',
    label: operator.operatorName,
  }));

  // Update form values when product data is loaded
  useEffect(() => {
    if (productData) {
      form.setValues(productData);
    }
  }, [productData]);

  const handleClose = () => {
    form.setValues(defaultValues);
    onClose();
  }

  return (
    <Modal opened={opened} onClose={handleClose} title={productId ? 'Edit Product' : 'Add Product'} size="md">
      {productLoading ? (
        <Stack align="center" py="xl">
          <Loader size="md" />
          <Text size="sm" c="dimmed">Loading product data...</Text>
        </Stack>
      ) : (
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Product Name" required {...form.getInputProps('productName')} />
          <TextInput label="Description" required {...form.getInputProps('productDescription')} />
          
          <Select
            label="Category"
            placeholder={categoriesLoading ? "Loading categories..." : "Select category"}
            data={categoryOptions}
            required
            rightSection={categoriesLoading ? <Loader size="xs" /> : null}
            value={form.values.categoryId?.toString()}
            onChange={(value) => form.setFieldValue('categoryId', value ? parseInt(value) : 0)}
            error={form.errors.categoryId}
            disabled={categoriesLoading}
          />
          
          <Select
            label="Operator"
            placeholder={operatorsLoading ? "Loading operators..." : "Select operator"}
            data={operatorOptions}
            required
            rightSection={operatorsLoading ? <Loader size="xs" /> : null}
            value={form.values.operatorId?.toString()}
            onChange={(value) => form.setFieldValue('operatorId', value ? parseInt(value) : 0)}
            error={form.errors.operatorId}
            disabled={operatorsLoading}
          />
          
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
            <Button type="submit">{productId ? 'Update' : 'Create'}</Button>
          </Group>
        </Stack>
      </form>
      )}
    </Modal>
  );
}
