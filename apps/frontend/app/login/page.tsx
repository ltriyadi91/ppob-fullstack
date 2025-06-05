'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login, isLoading, error, userProfile, userProfileCalled } = useAuth({
    redirectPath: '/',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ username, password });
  };

  useEffect(() => {
    if (userProfile && userProfileCalled) {
      router.push('/');
    }
  }, [userProfile, userProfileCalled]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
        <header className="bg-red-500 text-white p-4 flex items-center shadow-md">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
          >
            <IoArrowBack size={24} />
          </button>
          <h1 className="text-xl font-bold">Login</h1>
        </header>
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Login
            </h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  disabled={isLoading} // Disable button during loading
                >
                  {isLoading ? 'Logging in...' : 'Sign In'}
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-center mt-4">{error}</p>
              )}{' '}
              {/* Display error message */}
            </form>
            <p className="text-center text-gray-600 text-sm mt-4">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="text-red-500 hover:text-red-700 font-bold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </main>
      </div>
  );
}
