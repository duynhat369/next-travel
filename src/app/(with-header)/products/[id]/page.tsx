'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { PRODUCTS_PAGE } from '@/constants';
import { productApi } from '@/lib/api/product';
import { useQuery } from '@tanstack/react-query';
import { notFound, useParams } from 'next/navigation';
import { ProductDetail } from './components/product-detail';

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;

  const {
    data: productResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['productById', id],
    queryFn: async () => productApi.getProductById(id as string),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id && id !== 'undefined',
  });

  const { product } = productResponse || {};

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (id === 'undefined' || error || !product) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20 md:mt-28">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${PRODUCTS_PAGE}`}>Sản phẩm</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProductDetail product={product} />
    </div>
  );
}
