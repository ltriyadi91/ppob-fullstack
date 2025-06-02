"use client";

import {
  Table,
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
} from "@mantine/core";
import { IconPlus, IconPencil, IconTrash, IconDots } from "@tabler/icons-react";
import { useState } from "react";
import { ProductModal, ProductFormValues } from "./ProductModal";

// TypeScript interface matching ProductDTO
interface ProductDTO {
  id: number;
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

// Initial mock data
const initialProducts: ProductDTO[] = [
  {
    id: 1,
    operatorId: 1,
    categoryId: 1,
    productName: "Pulsa Telkomsel 50K",
    productDescription: "Pulsa reguler Telkomsel senilai 50.000",
    priceNumeric: 50000,
    priceLabel: "Rp 50.000",
    newPriceNumeric: 48000,
    newPriceLabel: "Rp 48.000",
    discountPercentage: 4,
    isDiscount: true,
    isAvailable: true,
  },
  {
    id: 2,
    operatorId: 2,
    categoryId: 1,
    productName: "Pulsa Indosat 25K",
    productDescription: "Pulsa reguler Indosat senilai 25.000",
    priceNumeric: 25000,
    priceLabel: "Rp 25.000",
    newPriceNumeric: 25000,
    newPriceLabel: "Rp 25.000",
    discountPercentage: 0,
    isDiscount: false,
    isAvailable: true,
  },
  {
    id: 3,
    operatorId: 3,
    categoryId: 2,
    productName: "Data XL 100GB",
    productDescription: "Paket data XL 100GB 30 hari",
    priceNumeric: 120000,
    priceLabel: "Rp 120.000",
    newPriceNumeric: 100000,
    newPriceLabel: "Rp 100.000",
    discountPercentage: 16.7,
    isDiscount: true,
    isAvailable: false,
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductDTO[]>(initialProducts);
  const [modalOpened, setModalOpened] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductDTO | null>(null);

  // CREATE or UPDATE
  const handleSubmit = (values: ProductFormValues) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...values, id: editingProduct.id } : p))
      );
    } else {
      const nextId = Math.max(0, ...products.map((p) => p.id)) + 1;
      setProducts((prev) => [
        ...prev,
        { ...values, id: nextId },
      ]);
    }
    setModalOpened(false);
    setEditingProduct(null);
  };

  // DELETE
  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
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
      <Paper p="md" withBorder>
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Discount</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {products.map((product) => (
              <Table.Tr key={product.id}>
                <Table.Td>
                  <Text fw={500}>{product.productName}</Text>
                </Table.Td>
                <Table.Td>{product.productDescription}</Table.Td>
                <Table.Td>
                  {product.isDiscount ? (
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
                  )}
                </Table.Td>
                <Table.Td>
                  {product.isDiscount ? (
                    <Badge color="green">{product.discountPercentage}%</Badge>
                  ) : (
                    <Badge color="gray">-</Badge>
                  )}
                </Table.Td>
                <Table.Td>
                  <Badge color={product.isAvailable ? "blue" : "red"}>
                    {product.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={0} justify="flex-end">
                    <ActionIcon
                      variant="subtle"
                      color="blue"
                      size="sm"
                      onClick={() => {
                        setEditingProduct(product);
                        setModalOpened(true);
                      }}
                    >
                      <IconPencil style={{ width: rem(16) }} stroke={1.5} />
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
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
      {/* Product Modal */}
      <ProductModal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setEditingProduct(null);
        }}
        initialData={editingProduct || undefined}
        onSubmit={handleSubmit}
      />
    </Stack>
  );
}
