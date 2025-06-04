"use client";

import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Group,
  Paper,
  Title,
  Alert,
} from '@mantine/core';
import { useState } from 'react';
import { IconCheck, IconAlertCircle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface RegisterFormValues {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    initialValues: {
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      username: (value) =>
        value.length < 3 ? 'Username must be at least 3 characters' : null,
      firstName: (value) =>
        value.length === 0 ? 'First name is required' : null,
      lastName: (value) =>
        value.length === 0 ? 'Last name is required' : null,
      password: (value) =>
        value.length < 8 ? 'Password must be at least 8 characters' : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  const handleSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_V1}/auth/customer/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || 'Registration failed');
      }
      setSuccess('Registration successful! You can now log in.');
      form.reset();
      router.push('/login');
    } catch (error: any) {
      setError(error?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Group justify="center" align="center" style={{ minHeight: '100vh' }}>
      <Paper shadow="md" p="xl" radius="md" w={400}>
        <Title order={2} mb="md">
          Register as Customer
        </Title>
        {error && (
          <Alert color="red" icon={<IconAlertCircle size={16} />} mb="md">
            {error}
          </Alert>
        )}
        {success && (
          <Alert color="green" icon={<IconCheck size={16} />} mb="md">
            {success}
          </Alert>
        )}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="sm">
            <TextInput
              disabled={loading}
              label="Username"
              placeholder="Enter your username"
              {...form.getInputProps('username')}
              required
            />
            <TextInput
              disabled={loading}
              label="First Name"
              placeholder="Enter your first name"
              {...form.getInputProps('firstName')}
              required
            />
            <TextInput
              disabled={loading}
              label="Last Name"
              placeholder="Enter your last name"
              {...form.getInputProps('lastName')}
              required
            />
            <PasswordInput
              disabled={loading}
              label="Password"
              placeholder="Create a password"
              {...form.getInputProps('password')}
              required
            />
            <PasswordInput
              disabled={loading}
              label="Confirm Password"
              placeholder="Confirm your password"
              {...form.getInputProps('confirmPassword')}
              required
            />
            <Button type="submit" loading={loading} fullWidth mt="md">
              Register
            </Button>
          </Stack>
        </form>
      </Paper>
    </Group>
  );
}
