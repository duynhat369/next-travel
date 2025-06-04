'use client';

import type { CartResponse } from '@/types/cart.types';
import { motion } from 'framer-motion';
import { CartItemComponent } from './cart-item';

interface Props {
  cartData: CartResponse | undefined;
  isLoading: boolean;
  userId: string;
}

export const CartContent = ({ cartData, isLoading, userId }: Props) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!cartData || cartData.cart?.items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-4">🛒</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Giỏ hàng trống</h3>
        <p className="text-foreground-secondary">
          Hãy thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm
        </p>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Giỏ hàng của bạn <small> ({cartData.cart?.totalItems} sản phẩm)</small>
          </h2>
          <p className="text-foreground-secondary">Thanh toán từng sản phẩm một cách dễ dàng</p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartData.cart?.items.map((item, index) => (
          <motion.div
            key={`${item._id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <CartItemComponent item={item} userId={userId} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
