'use client';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import type { Product } from '@/types/product.types';
import { formatCurrency } from '@/utils/currency';
import { mapValueToLabel } from '@/utils/mapping';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import { Minus, Package, Plus, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { categories } from '../../components/product-sidebar';

interface Props {
  product: Product;
}

export function ProductDetail({ product }: Props) {
  const { user } = useSession().data || {};
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!user?.id) {
      toast('Không thành công', {
        description: 'Vui lòng đăng nhập để thêm giỏ hàng',
      });
      return;
    } else addToCart(user.id, product?._id || '', quantity);
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-2xl overflow-hidden">
            <Image
              src={product.gallery[selectedImage] || '/placeholder.png'}
              alt={product.name}
              fill
              className={`object-cover ${isOutOfStock ? 'grayscale' : ''}`}
              priority
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

          {/* Thumbnail Images */}
          {product.gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image || '/placeholder.png'}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
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
          <div className="mb-6">
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
                {product.productCode ? product.productCode : 'Chưa có mã sản phẩm'}
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

      {/* Full Description */}
      {product.content && (
        <div className="mt-12">
          <h2 className="mb-6 text-2xl text-center font-bold text-foreground">Mô tả chi tiết</h2>
          <div
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.content) }}
          />
        </div>
      )}
    </div>
  );
}
