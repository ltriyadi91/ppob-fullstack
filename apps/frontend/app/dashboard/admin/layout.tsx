'use client'
import { Sidebar } from '@/components/DashboardSidebar/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { userProfile, userProfileCalled } = useAuth({
    isDashboard: true,
  });

  useEffect(() => {;
    if (!userProfile && userProfileCalled) {
      router.push('/dashboard/login');
    }
  }, [userProfileCalled, userProfile]);

  return <Sidebar>{children}</Sidebar>;
}
