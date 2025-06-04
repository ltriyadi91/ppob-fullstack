'use client';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Anchor,
  Divider,
  Stack,
  Center,
} from '@mantine/core';
import { useForm, isEmail, hasLength } from '@mantine/form';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, userProfile, userProfileCalled } = useAuth({
    redirectPath: '/dashboard/admin/categories',
    redirectAfterLogout: '/dashboard/login',
    isDashboard: true,
  });

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: {
      email: isEmail('Invalid email'),
      password: hasLength({ min: 6 }, 'Password must be at least 6 characters'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await login({ username: values.email, password: values.password });
  };

  useEffect(() => {
    if (userProfile && userProfileCalled) {
      router.push('/dashboard/admin/categories');
    }
  }, [userProfile, userProfileCalled]);

  return (
    <Center mih="100vh" bg="var(--mantine-color-gray-0)">
        <Container size={420} my={40}>
          <Title ta="center" fw={900}>
            Welcome back!
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Don&apos;t have an account yet?{' '}
            <Anchor size="sm" component="button" style={{ color: 'red' }}>
              Create account
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack>
                <TextInput
                  required
                  label="Email"
                  placeholder="hello@example.com"
                  {...form.getInputProps('email')}
                  radius="md"
                />

                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  {...form.getInputProps('password')}
                  radius="md"
                />

                <Group justify="space-between">
                  <Checkbox
                    label="Remember me"
                    {...form.getInputProps('rememberMe', { type: 'checkbox' })}
                  />
                  <Anchor component="button" size="sm" style={{ color: 'red' }}>
                    Forgot password?
                  </Anchor>
                </Group>

                <Button
                  fullWidth
                  mt="xl"
                  type="submit"
                  radius="md"
                  loading={isLoading}
                  color="red"
                >
                  Sign in
                </Button>
              </Stack>
            </form>

            <Divider label="Or continue with" labelPosition="center" my="lg" />

            <Group grow mb="md" mt="md">
              <Button variant="default" radius="md">
                Google
              </Button>
              <Button variant="default" radius="md">
                Facebook
              </Button>
            </Group>
          </Paper>
        </Container>
      </Center>
  );
}
