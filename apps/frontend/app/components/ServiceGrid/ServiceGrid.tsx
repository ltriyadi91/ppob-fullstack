"use client";
import { useRouter } from "next/navigation";

export function ServiceGrid() {
  const router = useRouter();

  const services = [
    { name: 'Pulsa', icon: '📱', page: 'pulsa' },
    { name: 'Voucher Game', icon: '🎮', page: 'voucher-game' },
    { name: 'Listrik PLN', icon: '💡', page: 'listrik-pln' },
    { name: 'Paket Data', icon: '�', page: 'paket-data' },
    { name: 'Telkom & Indihome', icon: '☎️', page: 'telkom-indihome' },
    { name: 'PDAM', icon: '💧', page: 'pdam' },
    { name: 'Uang Elektronik', icon: '💰', page: 'uang-elektronik' },
    { name: 'Lainnya', icon: '➕', page: 'lainnya' },
  ];

  return (
    <section className="bg-white p-4 mb-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-4 gap-4 text-center">
        {services.map((service, index) => (
          <button
            key={index}
            className="flex flex-col items-center p-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg"
            onClick={() => router.push(`/detail`)}
          >
            <div className="bg-red-100 rounded-full p-3 mb-2 flex items-center justify-center w-12 h-12 text-2xl">
              {service.icon}
            </div>
            <span className="text-xs font-medium">{service.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default ServiceGrid;
