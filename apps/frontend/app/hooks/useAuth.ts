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

type UserProfile = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
}

export function useAuth({
  redirectPath = '/pulsa',
  redirectAfterLogout = '/pulsa',
  isDashboard = false,
}: AuthInput) {
  const storedToken = Cookies.get(isDashboard ? 'dashboard_token' : 'token') || null;
  console.log({ storedToken })

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userProfileCalled, setUserProfileCalled] = useState<boolean>(false);

  const [token, setToken] = useState<string | null>(storedToken || null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (storedToken) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_V1}/auth/validate`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: UserProfile = await response.json();
        setUserProfile(data);
      }
    } catch (err) {
      console.warn('Error fetching user profile:', err);
      logout();
    } finally {
      setUserProfileCalled(true);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    const pathUrl = isDashboard ? '/auth/admin/login' : '/auth/login';
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_V1}${pathUrl}`, {
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
    token: token || storedToken,
    userProfile,
    userProfileCalled,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: !!token,
  };
}
