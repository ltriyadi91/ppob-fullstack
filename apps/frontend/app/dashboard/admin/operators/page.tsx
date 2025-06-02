"use client";

import { useState } from 'react';
import { OperatorModal } from '@/components/Modals/OperatorModal';
import {
  Table,
  Group,
  Button,
  Text,
  Paper,
  Title,
  Menu,
  ActionIcon,
  rem,
  TextInput,
  Stack,
  Pagination,
  Select,
  Badge,
} from '@mantine/core';
import { 
  IconDots, 
  IconPencil, 
  IconTrash, 
  IconPlus,
  IconSearch,
  IconSortAscending,
  IconSortDescending,
} from '@tabler/icons-react';

interface OperatorDTO {
  operatorId: number;
  operatorName: string;
  operatorDescription: string;
  isActive: boolean;
  slug: string;
  imageUrl: string;
}

// Mock data
const mockOperators: OperatorDTO[] = [
  {
    operatorId: 1,
    operatorName: 'Telkomsel',
    operatorDescription: 'Telkomsel mobile operator',
    isActive: true,
    slug: 'telkomsel',
    imageUrl: 'https://via.placeholder.com/40x40?text=TSEL',
  },
  {
    operatorId: 2,
    operatorName: 'Indosat',
    operatorDescription: 'Indosat Ooredoo mobile operator',
    isActive: true,
    slug: 'indosat',
    imageUrl: 'https://via.placeholder.com/40x40?text=ISAT',
  },
  {
    operatorId: 3,
    operatorName: 'XL Axiata',
    operatorDescription: 'XL Axiata mobile operator',
    isActive: false,
    slug: 'xl-axiata',
    imageUrl: 'https://via.placeholder.com/40x40?text=XL',
  },
  {
    operatorId: 4,
    operatorName: 'Smartfren',
    operatorDescription: 'Smartfren mobile operator',
    isActive: true,
    slug: 'smartfren',
    imageUrl: 'https://via.placeholder.com/40x40?text=SF',
  },
  {
    operatorId: 5,
    operatorName: 'Tri',
    operatorDescription: 'Tri mobile operator',
    isActive: false,
    slug: 'tri',
    imageUrl: 'https://via.placeholder.com/40x40?text=3',
  },
];

export default function OperatorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string | null>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState('10');
  const [modalOpened, setModalOpened] = useState(false);
  const [editingOperator, setEditingOperator] = useState<OperatorDTO | null>(null);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? (
      <IconSortAscending size={16} />
    ) : (
      <IconSortDescending size={16} />
    );
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'admin' ? 'blue' : 'gray';
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center">
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

      <Paper p="md" withBorder>
        <Stack gap="md">
          <Group>
            <TextInput
              placeholder="Search operators..."
              leftSection={<IconSearch size={16} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              style={{ flexGrow: 1 }}
            />
          </Group>

          <Table highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Logo</Table.Th>
                <Table.Th
                  onClick={() => handleSort('operatorName')}
                  style={{ cursor: 'pointer' }}
                >
                  <Group gap={4}>
                    Name
                    <SortIcon field="operatorName" />
                  </Group>
                </Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Slug</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {mockOperators.map((operator) => (
                <Table.Tr key={operator.operatorId}>
                  <Table.Td>
                    <img src={operator.imageUrl} alt={operator.operatorName} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8 }} />
                  </Table.Td>
                  <Table.Td>
                    <Text fw={500}>{operator.operatorName}</Text>
                  </Table.Td>
                  <Table.Td>{operator.operatorDescription}</Table.Td>
                  <Table.Td>{operator.slug}</Table.Td>
                  <Table.Td>
                    <Badge color={operator.isActive ? 'green' : 'red'} variant={operator.isActive ? 'light' : 'outline'}>
                      {operator.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={0} justify="flex-end">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        size="sm"
                        onClick={() => {
                          setEditingOperator(operator);
                          setModalOpened(true);
                        }}
                      >
                        <IconPencil style={{ width: rem(16) }} stroke={1.5} />
                      </ActionIcon>
                      <Menu shadow="md" width={200} position="bottom-end">
                        <Menu.Target>
                          <ActionIcon
                            variant="subtle"
                            color="gray"
                            size="sm"
                          >
                            <IconDots style={{ width: rem(16) }} stroke={1.5} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item
                            leftSection={<IconTrash size={14} />}
                            color="red"
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

          <Group justify="space-between">
            <Select
              value={perPage}
              onChange={(value) => setPerPage(value || '10')}
              data={[
                { value: '5', label: '5 per page' },
                { value: '10', label: '10 per page' },
                { value: '25', label: '25 per page' },
                { value: '50', label: '50 per page' },
              ]}
              style={{ width: 130 }}
            />
            <Pagination
              value={page}
              onChange={setPage}
              total={10}
              size="sm"
            />
          </Group>
        </Stack>
      </Paper>

      {/* Operator Modal */}
      <OperatorModal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setEditingOperator(null);
        }}
        initialData={editingOperator || undefined}
        onSubmit={(values) => {
          // Handle form submission
          console.log('Form values:', values);
          if (editingOperator) {
            // Update existing operator
          } else {
            // Create new operator
            console.log('Creating new operator:', values);
          }
        }}
      />
    </Stack>
  );
}