"use client";

import { useState } from "react";
import {
  Table,
  Paper,
  Title,
  Stack,
  Group,
  Text,
  Button,
  Collapse,
  rem,
  Badge,
} from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

// TypeScript interfaces matching backend DTOs
interface OrderItemDTO {
  orderItemId: number;
  productId: number;
  quantity: number;
  price: number;
  product: {
    name: string;
    description?: string;
  };
}

interface OrderDTO {
  orderId: string;
  userLastName: string;
  totalAmount: number;
  orderItems: OrderItemDTO[];
}

// Mock data
const mockOrders: OrderDTO[] = [
  {
    orderId: "1",
    userLastName: "Smith",
    totalAmount: 150000,
    orderItems: [
      {
        orderItemId: 101,
        productId: 1,
        quantity: 2,
        price: 50000,
        product: { name: "Pulsa Telkomsel 50K" },
      },
      {
        orderItemId: 102,
        productId: 2,
        quantity: 1,
        price: 50000,
        product: { name: "Pulsa Indosat 50K" },
      },
    ],
  },
  {
    orderId: "2",
    userLastName: "Anderson",
    totalAmount: 100000,
    orderItems: [
      {
        orderItemId: 201,
        productId: 3,
        quantity: 1,
        price: 100000,
        product: { name: "Data XL 100GB" },
      },
    ],
  },
];

export default function OrdersPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
        <Title order={2}>Orders</Title>
      </Group>
      <Paper p="md" withBorder>
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th />
              <Table.Th>Order ID</Table.Th>
              <Table.Th>User</Table.Th>
              <Table.Th>Total Amount</Table.Th>
              <Table.Th>Items</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {mockOrders.map((order) => (
              <>
                <Table.Tr key={order.orderId}>
                  <Table.Td>
                    <Button
                      variant="subtle"
                      size="xs"
                      onClick={() =>
                        setExpanded(expanded === order.orderId ? null : order.orderId)
                      }
                      leftSection={
                        expanded === order.orderId ? (
                          <IconChevronUp size={16} />
                        ) : (
                          <IconChevronDown size={16} />
                        )
                      }
                    >
                      {expanded === order.orderId ? "Hide" : "Show"}
                    </Button>
                  </Table.Td>
                  <Table.Td>{order.orderId}</Table.Td>
                  <Table.Td>{order.userLastName}</Table.Td>
                  <Table.Td>
                    <Text fw={500}>
                      Rp {order.totalAmount.toLocaleString("id-ID")}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge color="blue">{order.orderItems.length} items</Badge>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td colSpan={5} style={{ padding: 0, border: 0 }}>
                    <Collapse in={expanded === order.orderId}>
                      <Paper p="md" radius="md" withBorder shadow="xs" mt="xs">
                        <Table>
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th>Product</Table.Th>
                              <Table.Th>Quantity</Table.Th>
                              <Table.Th>Price</Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            {order.orderItems.map((item) => (
                              <Table.Tr key={item.orderItemId}>
                                <Table.Td>{item.product.name}</Table.Td>
                                <Table.Td>{item.quantity}</Table.Td>
                                <Table.Td>
                                  Rp {item.price.toLocaleString("id-ID")}
                                </Table.Td>
                              </Table.Tr>
                            ))}
                          </Table.Tbody>
                        </Table>
                      </Paper>
                    </Collapse>
                  </Table.Td>
                </Table.Tr>
              </>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
