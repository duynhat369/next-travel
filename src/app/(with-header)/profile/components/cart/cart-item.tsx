'use client';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import type { CartItem } from '@/types/cart.types';
import { formatCurrency } from '@/utils/currency';
import { motion } from 'framer-motion';
import { CheckCircle, CreditCard, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useOptimistic, useTransition } from 'react';

interface Props {
  item: CartItem;
  userId: string;
}

export const CartItemComponent = ({ item, userId }: Props) => {
  const { updateCartItem, removeCartItem, checkoutItem } = useCartStore();
  const [isPending, startTransition] = useTransition();

  // Optimistic updates cho quantity
  const [optimisticItem, updateOptimisticItem] = useOptimistic(
    item,
    (currentItem, newQuantity: number) => ({
      ...currentItem,
      quantity: newQuantity,
    })
  );

  // Optimistic updates cho status
  const [optimisticStatus, updateOptimisticStatus] = useOptimistic(
    item.status,
    (currentStatus, newStatus: 'pending' | 'done' | 'cancelled') => newStatus
  );

  const isPaid = optimisticStatus === 'done';

  const handleQuantityChange = (newQuantity: number) => {
    if (isPaid) return;

    if (newQuantity <= 0) {
      // Optimistic remove
      startTransition(async () => {
        updateOptimisticItem(0); // Set quantity to 0 immediately
        await removeCartItem(userId, item._id as string);
      });
    } else {
      // Optimistic update quantity
      startTransition(async () => {
        updateOptimisticItem(newQuantity); // Update UI immediately
        await updateCartItem(userId, item._id as string, newQuantity);
      });
    }
  };

  const handleRemoveItem = () => {
    if (isPaid) return;

    startTransition(async () => {
      updateOptimisticItem(0); // Hide item immediately
      await removeCartItem(userId, item._id as string);
    });
  };

  const handleCheckout = () => {
    if (isPaid) return;

    startTransition(async () => {
      updateOptimisticStatus('done'); // Update status immediately
      await checkoutItem(userId, item._id as string);
    });
  };

  const totalPrice = optimisticItem.price * optimisticItem.quantity;

  // Don't render if optimistically removed
  if (optimisticItem.quantity === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
        isPaid
          ? 'border-green-200 bg-green-50'
          : 'border-gray-200 bg-white hover:shadow-lg hover:border-primary/30'
      }`}
    >
      {/* Gradient overlay on hover - only for unpaid items */}
      {!isPaid && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      {/* Paid badge */}
      {isPaid && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm z-20">
          <CheckCircle className="w-3 h-3" />
          Đã thanh toán
        </div>
      )}

      <div className="relative p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="relative w-full md:w-24 h-40 md:h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
            <Image
              src={optimisticItem.thumbnail || '/placeholder.svg'}
              alt={optimisticItem.name}
              fill
              className={`object-cover transition-transform duration-300 ${
                isPaid ? '' : 'group-hover:scale-105'
              } ${isPaid ? 'opacity-90' : ''}`}
            />
            {optimisticItem.discountPercentage > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{optimisticItem.discountPercentage}%
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-3">
              <h3
                className={`font-semibold text-lg truncate pr-4 ${
                  isPaid
                    ? 'text-gray-700'
                    : 'text-foreground group-hover:text-primary transition-colors'
                }`}
              >
                {optimisticItem.name}
              </h3>
              {!isPaid && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveItem}
                  disabled={isPending || isPaid}
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors cursor-pointer"
                >
                  {isPending ? (
                    <div className="w-4 h-4 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              )}
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                {optimisticItem.discountPercentage > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatCurrency(optimisticItem.originalPrice)} VNĐ
                  </span>
                )}
                <span className={`text-xl font-bold ${isPaid ? 'text-gray-700' : 'text-primary'}`}>
                  {formatCurrency(optimisticItem.price)} VNĐ
                </span>
              </div>
            </div>

            {/* Quantity and Total */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600">Số lượng:</span>
                {isPaid ? (
                  <span className="px-3 py-1 bg-gray-100 rounded font-semibold">
                    {optimisticItem.quantity}
                  </span>
                ) : (
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(optimisticItem.quantity - 1)}
                      disabled={isPending || isPaid}
                      className="w-8 h-8 p-0 hover:bg-primary/10 rounded-md cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>

                    <span className="w-12 text-center font-semibold bg-white rounded px-3 py-1">
                      {optimisticItem.quantity}
                    </span>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(optimisticItem.quantity + 1)}
                      disabled={isPending || isPaid}
                      className="w-8 h-8 p-0 hover:bg-primary/10 rounded-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Total Price */}
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Thành tiền</p>
                <p className={`text-2xl font-bold ${isPaid ? 'text-gray-700' : 'text-primary'}`}>
                  {formatCurrency(totalPrice)} VNĐ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Section */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          {isPaid ? (
            <div className="bg-green-100 border border-green-200 rounded-lg p-4 text-green-800 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium">Sản phẩm đã được thanh toán thành công</p>
                <p className="text-sm text-green-700 mt-1">
                  Cảm ơn bạn đã mua hàng! Sản phẩm sẽ được xử lý trong thời gian sớm nhất.
                </p>
              </div>
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleCheckout}
                disabled={isPending || isPaid}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang xử lý...
                  </span>
                ) : (
                  'Thanh toán'
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Loading overlay - chỉ hiển thị khi có transition pending */}
      {isPending && (
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center rounded-xl">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        </div>
      )}
    </motion.div>
  );
};
