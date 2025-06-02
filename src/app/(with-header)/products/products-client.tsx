'use client';
import { productApi } from '@/lib/api/product';
import { ProductFilters } from '@/types/product.types';
import { useQuery } from '@tanstack/react-query';
import { parseAsBoolean, parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { useMemo } from 'react';
import { ProductHeader } from './components/product-header';
import { ProductPlaceholder } from './components/product-placeholder';
import ProductSearch from './components/product-search';
import { ProductSidebar } from './components/product-sidebar';

export default function ProductsClient() {
  const [filters, setFilters] = useQueryStates({
    search: parseAsString.withDefault(''),
    sort: parseAsString.withDefault(''),
    category: parseAsString.withDefault(''),
    minPrice: parseAsString.withDefault(''),
    maxPrice: parseAsString.withDefault(''),
    hasDiscount: parseAsBoolean.withDefault(false),
    freeShip: parseAsBoolean.withDefault(false),
    limited: parseAsBoolean.withDefault(false),
    inStock: parseAsBoolean.withDefault(false),
    page: parseAsInteger.withDefault(1),
  });

  // Chuyển đổi filters từ nuqs sang ProductFilters
  const queryFilters: ProductFilters = useMemo(
    () => ({
      page: filters.page,
      limit: 12,
      search: filters.search || undefined,
      sort: filters.sort || undefined,
      category: filters.category || undefined,
      minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
      hasDiscount: filters.hasDiscount || undefined,
      freeShip: filters.freeShip || undefined,
      inStock: filters.inStock || undefined,
      limited: filters.limited || undefined,
    }),
    [filters]
  );

  const { data, isLoading } = useQuery({
    queryKey: ['products-paginated', queryFilters],
    queryFn: () => productApi.getProducts(queryFilters),
    staleTime: 5 * 60 * 1000, // Cache 5 phút
  });

  const products = data?.products || [];
  const pagination = data?.pagination;

  const handlePageChange = (page: number) => {
    setFilters({ page });
  };

  return (
    <main className="container mx-auto px-4 py-8 mt-20 md:mt-28">
      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="lg:sticky lg:top-8">
            <ProductSidebar />
          </div>
        </div>

        {/* Main Content - Placeholder */}
        <div className="lg:w-3/4">
          <div className="rounded-2xl shadow-lg border border-gray-100 p-6">
            <ProductSearch />
            <ProductHeader lengthResult={pagination?.total} isLoading={isLoading} />
            <ProductPlaceholder
              products={products}
              pagination={pagination}
              isLoading={isLoading}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
