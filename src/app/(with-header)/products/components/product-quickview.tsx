'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Product } from '@/types/product.types';
import { formatCurrency } from '@/utils/currency';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white rounded-2xl">
        <DialogTitle className="font-bold text-2xl mb-4 sr-only">Thông tin chi tiết</DialogTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Image
              src={product.thumbnail || '/placeholder.svg'}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="p-6 flex flex-col">
            {/* Product Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h2>

            {/* Price */}
            <div className="mb-4">
              <span className="text-lg font-semibold text-gray-800 border border-gray-300 px-3 py-1 rounded">
                {formatCurrency(product.price)} VNĐ
              </span>
            </div>

            {/* Description */}
            <div className="mb-6 flex-grow">
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description ||
                  'Với thiết kế hiện đại và chất lượng cao, sản phẩm này sẽ đáp ứng mọi nhu cầu của bạn trong những chuyến đi khám phá thiên nhiên. Được làm từ vật liệu bền bỉ, an toàn và tiện lợi, đây là lựa chọn hoàn hảo cho những người yêu thích hoạt động ngoài trời. Sản phẩm có thiết kế nhỏ gọn, dễ mang theo và sử dụng trong mọi điều kiện thời tiết.'}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={decrementQuantity}
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="h-8 w-12 flex items-center justify-center text-sm font-medium">
                    {quantity}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={incrementQuantity}
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-medium transition-colors"
                >
                  Thêm vào giỏ hàng
                </motion.button>
              </div>
            </div>

            {/* Product Info */}
            <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
              <div className="text-sm">
                <span className="text-gray-600">Mã SP: </span>
                <span className="font-medium">
                  {product._id ? `KDW-${product._id.substring(0, 5).toUpperCase()}` : 'KDW-02020'}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Mã Danh mục: </span>
                <span className="font-medium">Cắm trại, Đồ lưu niệm</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
