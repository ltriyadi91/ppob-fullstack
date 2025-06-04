"use client";

import { useState } from 'react';
import {
  AppShell,
  UnstyledButton,
  Stack,
  rem,
  Text,
  Avatar,
  Group,
  Box,
  Burger,
} from '@mantine/core';
import {
  IconCategory,
  IconUsers,
  IconBox,
  IconShoppingCart,

} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface NavLinkProps {
  icon: typeof IconCategory;
  label: string;
  href: string;
  active?: boolean;
}

function NavLink({ icon: Icon, label, href, active }: NavLinkProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <UnstyledButton
        w="100%"
        px="md"
        py="xs"
        style={(theme) => ({
          borderRadius: theme.radius.sm,
          backgroundColor: active ? theme.colors.blue[0] : 'transparent',
          color: active ? theme.colors.blue[9] : theme.colors.gray[7],
          '&:hover': {
            backgroundColor: theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <Icon style={{ width: rem(20), height: rem(20) }} />
          <Text fw={500}>{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
}

const navItems = [
  { icon: IconCategory, label: 'Categories', href: '/dashboard/admin/categories' },
  { icon: IconUsers, label: 'Operators', href: '/dashboard/admin/operators' },
  { icon: IconBox, label: 'Products', href: '/dashboard/admin/products' },
  { icon: IconShoppingCart, label: 'Orders', href: '/dashboard/admin/orders' },
];

export function Sidebar({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);
  const pathname = usePathname();
  const { userProfile } = useAuth({ isDashboard: true });

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header p="md">
        <Group justify="space-between">
          <Text size="lg" fw={700}>PPOB Admin</Text>
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            hiddenFrom="sm"
            size="sm"
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack justify="space-between" h="100%">
          <Stack>
            {/* User Profile Section */}
            <Box py="md">
              <Group>
                <Avatar
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                  size="md"
                  radius="xl"
                />
                <Box>
                  <Text fw={500} size="sm">
                    {userProfile?.firstName} {userProfile?.lastName}
                  </Text>
                  <Text c="dimmed" size="xs">
                    {userProfile?.role}
                  </Text>
                </Box>
              </Group>
            </Box>

            {/* Navigation Links */}
            <Stack gap={4}>
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  {...item}
                  active={pathname === item.href}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
