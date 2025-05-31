'use client';
import { Product } from '@/types/product.types';
import { useState } from 'react';
import { ProductItem } from './product-item';
import { ProductQuickView } from './product-quickview';

interface Props {
  products: Product[];
}

export function ProductPlaceholder({ products }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="relative">
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

      {/* Pagination Placeholder */}
      <div className="flex items-center justify-center mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
            <span className="sr-only">Previous</span>←
          </button>
          <button className="px-3 py-2 rounded-lg bg-primary text-white font-medium">1</button>
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
            <span className="sr-only">Next</span>→
          </button>
        </div>
      </div>

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
