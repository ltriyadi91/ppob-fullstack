"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DetailPage() {
  const [phoneNumber, setPhoneNumber] = useState('0877');
  const [showUnavailableMessage, setShowUnavailableMessage] = useState(true);
  const router = useRouter();

  const dataPackages = [
    {
      id: 1,
      name: 'Xtra Edukasi 2GB, 1hr',
      price: 'Rp2.000',
      isAvailable: false,
    },
    {
      id: 2,
      name: 'Bebas Puas 2rb/hr, 1hr',
      price: 'Rp2.000',
      isAvailable: true,
    },
    {
      id: 3,
      name: 'Xtra Conference 2GB, 1hr',
      price: 'Rp3.000',
      isAvailable: true,
    },
    {
      id: 4,
      name: 'Bebas Puas 3rb/hr, 1hr',
      price: 'Rp3.000',
      isAvailable: true,
    },
  ];

  return (
    // Added bg-white to ensure the page has a distinct background
    <div className="flex flex-col flex-grow bg-white min-h-screen">
      {/* Header for PaketDataPage */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm rounded-b-lg">
        {/* Back button - now with onClick to navigate back */}
        <button
          className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          onClick={() => router.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">Paket Data</h1>
        <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </header>

      {/* Info Banner */}
      <div className="bg-red-100 text-red-700 p-4 mx-4 mt-4 rounded-lg flex items-start justify-between text-sm shadow-sm">
        <p>
          Sobat Sepulsa, pembelian dan pembayaran Paket Data untuk produk
          Telkomsel tidak dapat dilakukan di jam{' '}
          <span className="font-bold">23:00-00:30 WIB</span> setiap harinya
          sesuai dengan ketentuan dari Telkomsel.
        </p>
        <button
          className="ml-4 text-red-700 hover:text-red-900"
          onClick={() => setShowUnavailableMessage(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Phone Number Input Section */}
      <section className="bg-white p-4 mx-4 mt-4 rounded-lg shadow-sm">
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nomor Handphone
        </label>
        <div className="relative">
          <input
            type="tel"
            id="phoneNumber"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm pr-10"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g., 081234567890"
          />
          {phoneNumber && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              onClick={() => setPhoneNumber('')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </section>

      {/* Data Package Selection Section */}
      <section className="flex-grow p-4 mx-4 mt-4 rounded-lg shadow-sm bg-white">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          Pilih Paket Data :{/* Placeholder for Telkomsel icon */}
          <span className="ml-2 text-red-500 text-2xl">X</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dataPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`border rounded-lg p-4 shadow-sm ${
                !pkg.isAvailable
                  ? 'bg-gray-50 border-gray-200 text-gray-400'
                  : 'bg-white border-gray-300'
              }`}
            >
              {!pkg.isAvailable && showUnavailableMessage && (
                <div className="flex items-center text-red-500 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-xs font-medium">
                    Maaf, lagi nggak tersedia.
                  </span>
                </div>
              )}
              <h3 className="font-semibold text-base mb-1">{pkg.name}</h3>
              <p className="text-xs text-gray-500 mb-2">Harga</p>
              <p className="text-xl font-bold text-red-500 mb-3">{pkg.price}</p>
              <a
                href="#"
                className="text-red-500 text-sm font-medium hover:underline"
              >
                Lihat Selengkapnya
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
