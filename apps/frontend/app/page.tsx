'use client';
import Header from '@/components/Header/Header';
import ServiceGrid from '@/components/ServiceGrid/ServiceGrid';
import WelcomeSection from '@/components/WelcomeSection/WelcomeSection';
import BottomNavbar from '@/components/BottomNavbar/BottomNavbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './hooks/useAuth';

export default function HomePage() {
  const { isAuthenticated } = useAuth({
    redirectPath: '/pulsa',
    redirectAfterLogout: '/login',
  });

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-800 flex flex-col">
        <Header />
        <main className="flex-grow p-4 md:p-6 lg:p-8">
          {!isAuthenticated && <WelcomeSection />}
          <ServiceGrid />
        </main>
      </div>
      <BottomNavbar />
    </QueryClientProvider>
  );
}
