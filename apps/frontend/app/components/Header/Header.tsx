'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth'; // Import the useAuth hook

export function Header() {
  const router = useRouter();
  const { isAuthenticated } = useAuth({
    redirectPath: '/pulsa',
    redirectAfterLogout: '/pulsa',
  });

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <header className="bg-red-500 text-white p-2 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold">PPOB</span>
      </div>
      {!isAuthenticated && (
        <button
          className="bg-white text-red-500 px-4 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition-colors duration-200"
          onClick={handleLoginClick}
        >
          Masuk
        </button>
      )}
    </header>
  );
}

export default Header;
