'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { BottomNavbar } from '@/components/BottomNavbar/BottomNavbar';
import { IoArrowBack, IoLogOutOutline } from 'react-icons/io5';
import { FaUser, FaEnvelope, FaIdCard } from 'react-icons/fa';

export default function ProfilePage() {
  const router = useRouter();
  const { userProfile, isLoading, userProfileCalled, logout } = useAuth({
    redirectAfterLogout: '/',
  });

  useEffect(() => {
    // Redirect if not authenticated and not loading
    if (!userProfile && userProfileCalled) {
      router.push('/login');
    }
  }, [userProfileCalled, userProfile]);

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <header className="bg-red-500 text-white p-4 flex items-center shadow-md">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
          >
            <IoArrowBack size={24} />
          </button>
          <h1 className="text-xl font-bold">Profile</h1>
        </header>
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 pb-16">
      <header className="bg-red-500 text-white p-4 flex items-center shadow-md">
        <button
          onClick={() => router.back()}
          className="mr-4 p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
        >
          <IoArrowBack size={24} />
        </button>
        <h1 className="text-xl font-bold">Profile</h1>
      </header>

      <main className="flex-grow p-4">
        {userProfile ? (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-red-500 text-white rounded-full w-24 h-24 flex items-center justify-center text-4xl">
                  {userProfile.firstName.charAt(0)}
                  {userProfile.lastName.charAt(0)}
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-6">
                {userProfile.firstName} {userProfile.lastName}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FaUser className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium">{userProfile.username}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FaIdCard className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="font-medium">{userProfile.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <FaEnvelope className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium">{userProfile.role}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full bg-white text-red-500 border border-red-500 rounded-lg p-3 flex items-center justify-center font-medium shadow-sm hover:bg-red-50 transition-colors"
            >
              <IoLogOutOutline size={20} className="mr-2" />
              Logout
            </button>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">User profile not available.</p>
            <button
              onClick={() => router.push('/login')}
              className="mt-4 bg-red-500 text-white rounded-lg px-4 py-2"
            >
              Login
            </button>
          </div>
        )}
      </main>

      <BottomNavbar />
    </div>
  );
}
