'use client';
import Header from '@/components/Header/Header';
import ServiceGrid from '@/components/ServiceGrid/ServiceGrid';
import WelcomeSection from '@/components/WelcomeSection/WelcomeSection';
import { useAuth } from './hooks/useAuth'; // Import the new hook

export default function HomePage() {
  const { isAuthenticated } = useAuth({
    redirectPath: '/pulsa',
    redirectAfterLogout: '/login',
  });

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 flex flex-col">
      <Header />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        {!isAuthenticated && <WelcomeSection />}
        <ServiceGrid />
      </main>
    </div>
  );
}
