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

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data: AuthResponse = await response.json();
        if (data.token) {
          Cookies.set('token', data.token, { expires: 7 }); // Store token for 7 days
          setToken(data.token);
          console.log('Login successful! Token stored.');
          router.push('/pulsa'); // Redirect to /pulsa
        } else {
          const errorMessage = 'Login successful, but no token received.';
          console.error(errorMessage);
          setError(errorMessage);
        }
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Unknown error';
        console.error('Login failed:', errorMessage);
        setError('Login failed: ' + errorMessage);
      }
    } catch (err) {
      const errorMessage = (err instanceof Error) ? err.message : 'An unexpected error occurred.';
      console.error('Network error or unexpected issue:', err);
      setError('An error occurred during login: ' + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setToken(null);
    router.push('/login'); // Redirect to login page after logout
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