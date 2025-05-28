"use client";
import { useRouter } from 'next/navigation';

export function WelcomeSection() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <section className="bg-white p-4 mb-4 rounded-lg shadow-sm text-center">
      <p className="text-sm text-gray-600 mb-2">
        Saat ini kamu masih Guest loh, masuk ke akun kamu yuk
      </p>
      <button
        className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-red-600 transition-colors duration-200"
        onClick={handleLoginClick}
      >
        Masuk
      </button>
    </section>
  );
}

export default WelcomeSection;
