"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Category {
  categoryId: number;
  categoryName: string;
  imageUrl: string;
}

export function ServiceGrid() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  console.log({ categories })

  if (loading) {
    return <div className="text-center p-4">Loading services...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <section className="bg-white p-4 mb-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-4 gap-4 text-center">
        {/* {categories.map((service) => (
          <button
            key={service.categoryId}
            className="flex flex-col items-center p-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg"
            onClick={() => router.push(`/${service.categoryName.toLowerCase().replace(/\s+/g, '-')}`)}
          >
            <div className="bg-red-100 rounded-full p-3 mb-2 flex items-center justify-center w-12 h-12">
              <img src={service.imageUrl} alt={service.categoryName} className="w-full h-full object-contain" />
            </div>
            <span className="text-xs font-medium">{service.categoryName}</span>
          </button>
        ))} */}
      </div>
    </section>
  );
}

export default ServiceGrid;
