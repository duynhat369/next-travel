'use client';

import type React from 'react';

import { PRODUCTS_PAGE } from '@/constants';
import { useCartStore } from '@/store/cart-store';
import type { Product } from '@/types/product.types';
import { formatCurrency } from '@/utils/currency';
import { motion } from 'framer-motion';
import { Eye, Package, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

interface Props {
  product: Product;
  index: number;
  onQuickview: (product: Product) => void;
}

export const ProductItem = ({ product, index, onQuickview }: Props) => {
  const { addToCart } = useCartStore();
  const { data } = useSession();
  const userId = data?.user?.id;
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickview(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userId) {
      toast('Không thành công', {
        description: 'Vui lòng đăng nhập để thêm giỏ hàng',
      });
      return;
    } else addToCart(userId, product._id || '', 1);
  };

  return (
    <motion.div
      key={product._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 flex flex-col h-full ${
        isOutOfStock ? 'opacity-75' : ''
      }`}
    >
      <Link href={`/${PRODUCTS_PAGE}/${product._id}`} className="flex flex-col h-full">
        {/* Product Image */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:from-gray-300 group-hover:to-gray-400 transition-all duration-300 overflow-hidden">
          <Image
            src={product.thumbnail || '/placeholder.png'}
            alt={product.name}
            fill
            className={`object-cover group-hover:scale-110 transition-transform duration-300 ${
              isOutOfStock ? 'grayscale' : ''
            }`}
          />

          {/* Discount Badge */}
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{product.discountPercentage}%
            </div>
          )}

          {/* Stock Status Badge */}
          <div className="absolute top-2 right-2">
            {isOutOfStock ? (
              <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                Hết hàng
              </div>
            ) : (
              isLowStock && (
                <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  Sắp hết
                </div>
              )
            )}
          </div>

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <div className="bg-white/90 px-4 py-2 rounded-lg">
                <span className="text-foreground font-semibold text-sm">Tạm hết hàng</span>
              </div>
            </div>
          )}

          {/* Quick View Overlay - Appears on Hover */}
          <div
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent pt-8 pb-3 px-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 cursor-pointer"
            onClick={handleQuickView}
          >
            <div className="flex items-center justify-between">
              <span className="text-white font-medium text-sm">Xem nhanh</span>
              <div className="bg-white rounded-full p-1 shadow-md">
                <Eye className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Stock Information */}
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-4 h-4 text-foreground-secondary" />
            <span
              className={`text-sm ${
                isOutOfStock
                  ? 'text-red-600 font-medium'
                  : isLowStock
                  ? 'text-primary font-medium'
                  : 'text-foreground-secondary'
              }`}
            >
              {isOutOfStock ? 'Hết hàng' : `Còn ${product.stock} sản phẩm`}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div>
              {product.discountPercentage > 0 && (
                <span className="text-xs text-foreground-secondary line-through block">
                  {formatCurrency(product.originalPrice)} VNĐ
                </span>
              )}
              <span className="text-lg font-bold text-primary">
                {formatCurrency(product.price)} VNĐ
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button - Outside Link to prevent nested interactive elements */}
      <div className="p-4 pt-0">
        <motion.button
          whileHover={!isOutOfStock ? { scale: 1.02 } : {}}
          whileTap={!isOutOfStock ? { scale: 0.98 } : {}}
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className={`w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            isOutOfStock
              ? 'bg-gray-300 text-foreground-secondary cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90 cursor-pointer'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {isOutOfStock ? 'Hết hàng' : 'Thêm vào giỏ'}
        </motion.button>
      </div>
    </motion.div>
  );
};
