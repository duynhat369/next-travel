'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useCartStore } from '@/store/cart-store';
import type { Product } from '@/types/product.types';
import { formatCurrency } from '@/utils/currency';
import { mapValueToLabel } from '@/utils/mapping';
import { motion } from 'framer-motion';
import { Minus, Package, Plus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { categories } from './product-sidebar';

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addItem(product, quantity);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-white rounded-2xl">
        <DialogTitle className="sr-only">Chi tiết sản phẩm {product.name}</DialogTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <Image
              src={product.thumbnail || '/placeholder.svg'}
              alt={product.name}
              fill
              className={`object-cover ${isOutOfStock ? 'grayscale' : ''}`}
            />

            {/* Discount Badge */}
            {product.discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                -{product.discountPercentage}%
              </div>
            )}

            {/* Stock Status Badge */}
            <div className="absolute top-4 right-4">
              {isOutOfStock ? (
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Hết hàng
                </div>
              ) : (
                isLowStock && (
                  <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Sắp hết
                  </div>
                )
              )}
            </div>

            {/* Out of Stock Overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="bg-white/90 px-6 py-3 rounded-lg">
                  <span className="text-foreground font-semibold">Tạm hết hàng</span>
                </div>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 flex flex-col">
            {/* Product Title */}
            <h2 className="text-2xl font-bold text-foreground mb-4">{product.name}</h2>

            {/* Stock Information */}
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-4 h-4 text-foreground-secondary" />
              <span
                className={`text-sm ${
                  isOutOfStock
                    ? 'text-red-600 font-medium'
                    : isLowStock
                    ? 'text-orange-600 font-medium'
                    : 'text-foreground-secondary'
                }`}
              >
                {isOutOfStock ? 'Hết hàng' : `Còn ${product.stock} sản phẩm`}
              </span>
            </div>

            {/* Price */}
            <div className="mb-4">
              {product.discountPercentage > 0 && (
                <span className="text-sm text-foreground-secondary line-through block mb-2">
                  {formatCurrency(product.originalPrice)} VNĐ
                </span>
              )}
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(product.price)} VNĐ
              </span>
            </div>

            {/* Description */}
            <div className="mb-6 flex-grow">
              <p className="text-foreground-secondary text-sm leading-relaxed">
                {product.description || 'Chưa có mô tả'}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            {!isOutOfStock && (
              <div className="space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-foreground">Số lượng:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="h-10 w-10 p-0 hover:bg-primary/10 disabled:opacity-50 rounded-none rounded-tl-lg rounded-bl-lg cursor-pointer"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="h-10 w-16 flex items-center justify-center text-sm font-medium border-x border-gray-300 select-none">
                      {quantity}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={incrementQuantity}
                      className="h-10 w-10 p-0 hover:bg-primary/10 disabled:opacity-50 rounded-none rounded-tr-lg rounded-br-lg cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isOutOfStock}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Thêm vào giỏ hàng
                </motion.button>
              </div>
            )}

            {/* Out of Stock Message */}
            {isOutOfStock && (
              <div className="text-center py-4">
                <p className="text-red-600 font-medium mb-2">Sản phẩm tạm thời hết hàng</p>
                <p className="text-sm text-foreground-secondary">
                  Vui lòng liên hệ để được thông báo khi có hàng trở lại
                </p>
              </div>
            )}

            {/* Product Info */}
            <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
              <div className="text-sm">
                <span className="text-foreground-secondary">Mã SP: </span>
                <span className="font-medium">
                  {product._id ? `KDW-${product._id.substring(0, 5).toUpperCase()}` : 'KDW-02020'}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-foreground-secondary">Danh mục: </span>
                <span className="font-medium">
                  {product.categoryType.map((cat) => mapValueToLabel(cat, categories)).join(', ') ||
                    'Chưa có danh mục'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
