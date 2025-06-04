'use client';
import { Sidebar } from '@/components/DashboardSidebar/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'mantine-datatable/styles.layer.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const router = useRouter();
  const { userProfile, userProfileCalled } = useAuth({
    isDashboard: true,
  });

  useEffect(() => {
    if (!userProfile && userProfileCalled) {
      router.push('/dashboard/login');
    }
  }, [userProfile, userProfileCalled]);

  return (
    <QueryClientProvider client={queryClient}>
      <Sidebar>{children}</Sidebar>
    </QueryClientProvider>
  );
}
