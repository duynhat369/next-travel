'use client';

import { Pagination, PaginationInfo } from '@/components/Pagination';
import type { Product } from '@/types/product.types';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { useState } from 'react';
import { ProductItem } from './product-item';
import { ProductQuickView } from './product-quickview';

interface Props {
  products: Product[];
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}

export function ProductPlaceholder({ products, pagination, onPageChange, isLoading }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-8 bg-gray-200 rounded w-full mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Không tìm thấy sản phẩm</h3>
        <p className="text-foreground-secondary">Vui lòng thử lại</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductItem
            key={product._id}
            product={product}
            index={index}
            onQuickview={handleQuickView}
          />
        ))}
      </div>
      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && onPageChange && (
        <Pagination pagination={pagination} onPageChange={onPageChange} />
      )}
      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={closeQuickView}
        />
      )}
    </div>
  );
}
