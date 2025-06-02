import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface AuthResponse {
  token: string;
  expiresIn: number;
}

interface LoginCredentials {
  username: string;
  password: string;
}

type AuthInput = {
  redirectPath?: string;
  redirectAfterLogout?: string;
  isDashboard?: boolean;
}

export function useAuth({
  redirectPath = '/pulsa',
  redirectAfterLogout = '/pulsa',
  isDashboard = false,
}: AuthInput) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = Cookies.get(isDashboard ? 'dashboard_token' : 'token');
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_V1}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data: AuthResponse = await response.json();
        if (data.token) {
          Cookies.set(isDashboard ? 'dashboard_token' : 'token', data.token, { expires: 1 });
          setToken(data.token);
          router.push(redirectPath);
        } else {
          const errorMessage = 'Login successful, but no token received.';
          setError(errorMessage);
        }
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Unknown error';
        setError('Login failed: ' + errorMessage);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError('An error occurred during login: ' + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove(isDashboard ? 'dashboard_token' : 'token');
    setToken(null);
    router.push(redirectAfterLogout);
  };

  return {
    token,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: !!token,
  };
}
