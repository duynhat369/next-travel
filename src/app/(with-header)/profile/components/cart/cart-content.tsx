'use client';

import { useCartStore } from '@/store/cart-store';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useMemo } from 'react';
import { CartItemComponent } from './cart-item';

interface Props {
  userId: string;
}

export const CartContent = ({ userId }: Props) => {
  const { carts, isLoading } = useCartStore();

  // Sử dụng React 19's use() hook để fetch data
  const cartData = useMemo(() => {
    if (!carts.length) return null;
    return carts[0];
  }, [carts]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Nếu không có giỏ hàng hoặc giỏ hàng trống
  if (!cartData?.items?.length) {
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

  const pendingItems = cartData.items.filter((item) => item.status === 'pending');
  const doneItems = cartData.items.filter((item) => item.status === 'done');

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/20 rounded-lg">
          <ShoppingCart className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Giỏ hàng của bạn</h2>
          <p className="text-foreground-secondary">
            {pendingItems.length} sản phẩm chờ thanh toán • {doneItems.length} sản phẩm đã thanh
            toán
          </p>
        </div>
      </div>

      {/* All Items - React 19 sẽ tự động handle optimistic updates */}
      <div className="space-y-6">
        {cartData.items.map((item, index) => (
          <motion.div
            key={item._id}
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
