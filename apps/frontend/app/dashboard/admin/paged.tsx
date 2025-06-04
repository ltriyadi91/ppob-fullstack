"use client";

import { 
  Grid, 
  Text, 
  Group, 
  RingProgress, 
  SimpleGrid,
  Paper,
  Title,
  Table,
  ThemeIcon,
  rem
} from '@mantine/core';
import { 
  IconArrowUpRight, 
  IconArrowDownRight,
  IconCurrency,
  IconDiscount2,
  IconReceipt2,
  IconUserPlus
} from '@tabler/icons-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'Jan', value: 2400 },
  { name: 'Feb', value: 1398 },
  { name: 'Mar', value: 9800 },
  { name: 'Apr', value: 3908 },
  { name: 'May', value: 4800 },
  { name: 'Jun', value: 3800 },
];

const mockStats = [
  { title: 'Revenue', value: '$13,456', diff: 34, icon: IconCurrency },
  { title: 'Orders', value: '145', diff: -13, icon: IconReceipt2 },
  { title: 'New Customers', value: '45', diff: 18, icon: IconUserPlus },
  { title: 'Active Discounts', value: '8', diff: 4, icon: IconDiscount2 },
];

const mockTransactions = [
  { id: '1', customer: 'John Doe', amount: '$234.50', status: 'Completed', date: '2025-05-28' },
  { id: '2', customer: 'Jane Smith', amount: '$129.99', status: 'Pending', date: '2025-05-28' },
  { id: '3', customer: 'Bob Johnson', amount: '$549.00', status: 'Completed', date: '2025-05-27' },
  { id: '4', customer: 'Alice Brown', amount: '$89.99', status: 'Failed', date: '2025-05-27' },
];

export default function DashboardPage() {
  return (
    <div style={{ padding: rem(24) }}>
      <Title order={2} mb="lg">Dashboard Overview</Title>
      
      {/* Stats Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" mb="lg">
        {mockStats.map((stat) => (
          <Paper key={stat.title} p="md" radius="md" withBorder>
            <Group justify="space-between">
              <ThemeIcon
                size="xl"
                radius="md"
                variant="light"
              >
                <stat.icon style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
              </ThemeIcon>
              {stat.diff && (
                <Text
                  c={stat.diff > 0 ? 'teal' : 'red'}
                  fw={700}
                  fz="sm"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  {stat.diff > 0 ? <IconArrowUpRight size={16} /> : <IconArrowDownRight size={16} />}
                  {Math.abs(stat.diff)}%
                </Text>
              )}
            </Group>

            <Text fz="xl" fw={700} mt="md">
              {stat.value}
            </Text>
            <Text fz="sm" c="dimmed" mt={4}>
              {stat.title}
            </Text>
          </Paper>
        ))}
      </SimpleGrid>

      <Grid gutter="lg" mb="lg">
        {/* Chart */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper p="md" radius="md" withBorder>
            <Title order={3} mb="md">Revenue Overview</Title>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#339af0" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid.Col>

        {/* Progress Ring */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper p="md" radius="md" withBorder h="100%">
            <Title order={3} mb="md">Goal Progress</Title>
            <Group justify="center" align="center" h="80%">
              <RingProgress
                size={180}
                thickness={16}
                sections={[{ value: 84, color: 'blue' }]}
                label={
                  <Text ta="center" fz="lg" fw={700}>
                    84%
                  </Text>
                }
              />
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Recent Transactions */}
      <Paper p="md" radius="md" withBorder>
        <Title order={3} mb="md">Recent Transactions</Title>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Customer</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {mockTransactions.map((transaction) => (
              <Table.Tr key={transaction.id}>
                <Table.Td>{transaction.customer}</Table.Td>
                <Table.Td>{transaction.amount}</Table.Td>
                <Table.Td>
                  <Text
                    c={{
                      Completed: 'green',
                      Pending: 'yellow',
                      Failed: 'red',
                    }[transaction.status]}
                    fw={500}
                  >
                    {transaction.status}
                  </Text>
                </Table.Td>
                <Table.Td>{transaction.date}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </div>
  );
}
