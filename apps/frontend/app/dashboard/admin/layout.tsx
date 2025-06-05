'use client';
import { Sidebar } from '@/components/DashboardSidebar/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import 'mantine-datatable/styles.layer.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const router = useRouter();
  const { userProfile, userProfileCalled, token } = useAuth({
    isDashboard: true,
    redirectAfterLogout: '/dashboard/login',
  });

  const isAdminUserUnloggedIn = !userProfileCalled && !token;
  const isAdminUserSessionExpired = (!userProfile && userProfileCalled)


  useEffect(() => {
    if (isAdminUserSessionExpired || isAdminUserUnloggedIn) {
      router.push('/dashboard/login');
    }
  }, [isAdminUserSessionExpired, isAdminUserUnloggedIn]);

  return (
    <QueryClientProvider client={queryClient}>
      <Sidebar>{children}</Sidebar>
    </QueryClientProvider>
  );
}
