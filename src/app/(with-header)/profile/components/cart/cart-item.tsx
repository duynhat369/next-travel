'use client';

import { Button } from '@/components/ui/button';
import { cartApi } from '@/lib/api/cart';
import type { CartItem } from '@/types/cart.types';
import { formatCurrency } from '@/utils/currency';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { CreditCard, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

interface Props {
  item: CartItem;
  userId: string;
}

export const CartItemComponent = ({ item, userId }: Props) => {
  const queryClient = useQueryClient();

  // Update cart item quantity
  const { mutate: updateQuantity, isPending: isUpdating } = useMutation({
    mutationFn: async ({ quantity }: { quantity: number }) => {
      return cartApi.updateCartItem(item._id as string, { quantity, userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
    },
    onError: () => {
      toast.error('Không thể cập nhật số lượng');
    },
  });

  // Remove cart item
  const { mutate: removeItem, isPending: isRemoving } = useMutation({
    mutationFn: async () => {
      return cartApi.removeCartItem(item._id as string, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
    },
    onError: () => {
      toast.error('Không thể xóa sản phẩm');
    },
  });

  // Checkout single item
  const { mutate: checkoutItem, isPending: isCheckingOut } = useMutation({
    mutationFn: async () => {
      return cartApi.checkoutSingleItem(item._id as string, userId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
      toast.success(`Thanh toán thành công! Mã đơn hàng: ${data.orderId}`);
    },
    onError: (error: any) => {
      if (error.error?.includes('hết hàng')) {
        toast.error('Sản phẩm đã hết hàng');
      } else if (error.error?.includes('không đủ')) {
        toast.error('Số lượng trong kho không đủ');
      } else {
        toast.error('Thanh toán thất bại');
      }
    },
  });

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem();
    } else {
      updateQuantity({ quantity: newQuantity });
    }
  };

  const handleCheckout = () => {
    checkoutItem();
  };

  const isOutOfStock = false;
  const isInsufficientStock = false;
  const totalPrice = item.price * item.quantity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg ${
        isOutOfStock || isInsufficientStock
          ? 'border-red-200 bg-red-50'
          : 'border-gray-200 bg-white hover:border-primary/30'
      }`}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-6">
        <div className="flex gap-6">
          {/* Product Image */}
          <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
            <Image
              src={item.thumbnail || '/placeholder.svg'}
              alt={item.name}
              fill
              className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                isOutOfStock ? 'grayscale' : ''
              }`}
            />
            {item.discountPercentage > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{item.discountPercentage}%
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg text-foreground truncate pr-4 group-hover:text-primary transition-colors">
                {item.name}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem()}
                disabled={isUpdating || isRemoving}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                {item.discountPercentage > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatCurrency(item.originalPrice)} VNĐ
                  </span>
                )}
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(item.price)} VNĐ
                </span>
              </div>
            </div>

            {/* Quantity and Total */}
            <div className="flex items-center justify-between">
              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600">Số lượng:</span>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    disabled={isUpdating || isRemoving}
                    className="w-8 h-8 p-0 hover:bg-white rounded-md"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>

                  <span className="w-12 text-center font-semibold bg-white rounded px-3 py-1">
                    {item.quantity}
                  </span>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    disabled={isUpdating || isRemoving}
                    className="w-8 h-8 p-0 hover:bg-white rounded-md"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Total Price */}
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Thành tiền</p>
                <p className="text-2xl font-bold text-primary">{formatCurrency(totalPrice)} VNĐ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Section */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>💳</span>
              <span>Thanh toán ngay sản phẩm này</span>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut || isUpdating || isRemoving}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {isCheckingOut ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang xử lý...
                  </span>
                ) : (
                  `Thanh toán ${formatCurrency(totalPrice)} VNĐ`
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      {(isUpdating || isRemoving || isCheckingOut) && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-xl">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}
    </motion.div>
  );
};
