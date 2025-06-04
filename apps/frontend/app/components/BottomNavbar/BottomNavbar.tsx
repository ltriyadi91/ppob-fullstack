import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function BottomNavbar() {
  const router = useRouter();
  const { userProfile } = useAuth({});

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg rounded-t-lg p-3 flex justify-around items-center text-xs text-gray-600">
      <div className="flex flex-col items-center" onClick={() => router.push('/')}>
        <span className="text-xl">🏠</span>
        <span>Beranda</span>
      </div>
      <div className="flex flex-col items-center" onClick={() => router.push('/orders')}>
        <span className="text-xl">📜</span>
        <span>Riwayat</span>
      </div>
      <div className="flex flex-col items-center" onClick={() => {
        if (userProfile) {
          router.push('/profile');
        } else {
          router.push('/login');
        }
      }}>
        <span className="text-xl">👤</span>
        <span>Akun</span>
      </div>
    </nav>
  );
}

export default BottomNavbar;
