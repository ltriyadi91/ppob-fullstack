'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  UnstyledButton,
  rem,
} from '@mantine/core';
import Link from 'next/link';

// Icons for the bottom navigation and info section
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HistoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AccountIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HelpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="17" r="0.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TermsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PrivacyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Placeholder for the illustration
const PersonIllustration = () => (
  <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="150" height="150" rx="75" fill="#F0F0F0" fillOpacity="0.5" />
    <text x="75" y="80" textAnchor="middle" fill="#666">Illustration Placeholder</text>
  </svg>
);

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box 
        style={{
          backgroundColor: '#FF5252',
          height: rem(120),
          borderBottomLeftRadius: rem(20),
          borderBottomRightRadius: rem(20),
          position: 'relative',
        }}
      />

      <Container size="sm" px="md" style={{ flex: 1 }}>
        <Paper 
          radius="md" 
          withBorder={false} 
          shadow="md" 
          p="xl"
          mt={-60}
          style={{ backgroundColor: 'white' }}
        >
          <Stack align="center">
            <PersonIllustration />
            
            <Title order={3} ta="center" mt="md">
              Kamu belum masuk ke akun
            </Title>
            
            <Text color="dimmed" size="sm" px="lg">
              Masuk ke akun kamu dulu yuk biar bisa lihat profilmu dan
              mengakses semua fitur menarik dari Sepulsa
            </Text>
            
            <Group grow w="100%" mt="md">
              <Button 
                component={Link} 
                href="/register"
                variant="outline" 
                color="red"
                radius="md"
                size="md"
              >
                Daftar
              </Button>
              
              <Button 
                component={Link} 
                href="/login"
                color="red" 
                radius="md"
                size="md"
              >
                Masuk
              </Button>
            </Group>
          </Stack>
        </Paper>
        
        {/* Info section */}
        <Box mt="xl">
          <Text fw={600} mb="md">Info</Text>
          
          <Stack>
            <UnstyledButton 
              component={Link} 
              href="/help"
              styles={(theme) => ({
                root: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: theme.spacing.md,
                  borderRadius: theme.radius.md,
                  color: theme.colors.gray[7],
                  '&:hover': {
                    backgroundColor: theme.colors.gray[0],
                  },
                }
              })}
            >
              <Group>
                <Box style={{ color: '#666' }}>
                  <HelpIcon />
                </Box>
                <Text>Bantuan</Text>
              </Group>
              <ChevronRightIcon />
            </UnstyledButton>
            
            <UnstyledButton 
              component={Link} 
              href="/terms"
              styles={(theme) => ({
                root: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: theme.spacing.md,
                  borderRadius: theme.radius.md,
                  color: theme.colors.gray[7],
                  '&:hover': {
                    backgroundColor: theme.colors.gray[0],
                  },
                }
              })}
            >
              <Group>
                <Box style={{ color: '#666' }}>
                  <TermsIcon />
                </Box>
                <Text>Syarat dan Ketentuan</Text>
              </Group>
              <ChevronRightIcon />
            </UnstyledButton>
            
            <UnstyledButton 
              component={Link} 
              href="/privacy"
              styles={(theme) => ({
                root: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: theme.spacing.md,
                  borderRadius: theme.radius.md,
                  color: theme.colors.gray[7],
                  '&:hover': {
                    backgroundColor: theme.colors.gray[0],
                  },
                }
              })}
            >
              <Group>
                <Box style={{ color: '#666' }}>
                  <PrivacyIcon />
                </Box>
                <Text>Kebijakan Privasi</Text>
              </Group>
              <ChevronRightIcon />
            </UnstyledButton>
          </Stack>
        </Box>
      </Container>

      {/* Bottom Navigation */}
      <Paper 
        withBorder 
        shadow="md"
        p="md"
        style={{ 
          position: 'sticky', 
          bottom: 0, 
          width: '100%',
          zIndex: 100,
        }}
      >
        <Group>
          <UnstyledButton 
            onClick={() => setActiveTab('home')}
            styles={(theme) => ({
              root: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: activeTab === 'home' ? theme.colors.red[6] : theme.colors.gray[6],
              }
            })}
          >
            <HomeIcon />
            <Text size="xs" mt={4}>Beranda</Text>
          </UnstyledButton>
          
          <UnstyledButton 
            onClick={() => setActiveTab('history')}
            styles={(theme) => ({
              root: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: activeTab === 'history' ? theme.colors.red[6] : theme.colors.gray[6],
              }
            })}
          >
            <HistoryIcon />
            <Text size="xs" mt={4}>Riwayat</Text>
          </UnstyledButton>
          
          <UnstyledButton 
            onClick={() => setActiveTab('account')}
            styles={(theme) => ({
              root: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: activeTab === 'account' ? theme.colors.red[6] : theme.colors.gray[6],
              }
            })}
          >
            <AccountIcon />
            <Text size="xs" mt={4}>Akun</Text>
          </UnstyledButton>
        </Group>
      </Paper>
    </Box>
  );
}