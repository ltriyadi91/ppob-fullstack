'use client';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

interface Category {
  categoryId: number;
  categoryName: string;
  imageUrl: string;
}

export function ServiceGrid() {
  const router = useRouter();

  const { error, data, isLoading } = useQuery({
    queryKey: ['categoriesData'],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_V1}/categories`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) {
    return <div className="text-center p-4">Loading services...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <section className="bg-white p-4 mb-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-4 gap-4 text-center">
        {data?.data.map((category: Category) => (
          <button
            key={category.categoryId}
            className="flex flex-col items-center p-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg"
            onClick={() =>
              router.push(
                `/${category.categoryName.toLowerCase().replace(/\s+/g, '-')}`
              )
            }
          >
            <div className="bg-red-100 rounded-full p-3 mb-2 flex items-center justify-center w-12 h-12">
              <img
                src={category.imageUrl}
                alt={category.categoryName}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xs font-medium">{category.categoryName}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default ServiceGrid;
