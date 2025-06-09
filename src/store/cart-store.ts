// store/cart-store.ts - Đơn giản hóa với React 19

import { cartApi } from '@/lib/api/cart';
import type { Cart } from '@/types/cart.types';
import { toast } from 'sonner';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CartState {
  carts: Cart[];
  isLoading: boolean;

  // Actions - React 19 sẽ handle optimistic updates
  fetchCart: (userId: string) => Promise<void>;
  addToCart: (userId: string, productId: string, quantity?: number) => Promise<void>;
  updateCartItem: (userId: string, itemId: string, quantity: number) => Promise<void>;
  removeCartItem: (userId: string, itemId: string) => Promise<void>;
  checkoutItem: (userId: string, itemId: string) => Promise<void>;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        carts: [],
        isLoading: false,

        fetchCart: async (userId: string) => {
          try {
            set({ isLoading: true });
            const response = await cartApi.getCart(userId);

            if (response.cart) {
              set({ carts: [response.cart] });
            } else {
              set({ carts: [] });
            }
          } catch (error: any) {
            console.error('Error fetching cart:', error);
            toast.error('Không thể tải giỏ hàng');
          } finally {
            set({ isLoading: false });
          }
        },

        addToCart: async (userId: string, productId: string, quantity = 1) => {
          // React 19 optimistic updates sẽ handle UI updates
          const response = await cartApi.addToCart({ userId, productId, quantity });

          // Chỉ cần update store sau khi API thành công
          if (response.cart) {
            set({ carts: [response.cart] });
          }

          toast.success('Đã thêm sản phẩm vào giỏ hàng');
        },

        updateCartItem: async (userId: string, itemId: string, quantity: number) => {
          // Optimistic updates đã được handle ở component level
          const response = await cartApi.updateCartItem({ itemId, quantity, userId });

          if (response.cart) {
            set({ carts: [response.cart] });
          }

          toast.success('Đã cập nhật giỏ hàng');
        },

        removeCartItem: async (userId: string, itemId: string) => {
          // Optimistic updates đã được handle ở component level
          await cartApi.removeCartItem(itemId, userId);

          // Fetch lại để đảm bảo consistency
          const response = await cartApi.getCart(userId);
          if (response.cart) {
            set({ carts: [response.cart] });
          } else {
            set({ carts: [] });
          }

          toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
        },

        checkoutItem: async (userId: string, itemId: string) => {
          // Optimistic updates đã được handle ở component level
          const response = await cartApi.checkoutSingleItem(itemId, userId);

          // Fetch lại để đảm bảo consistency
          const cartResponse = await cartApi.getCart(userId);
          if (cartResponse.cart) {
            set({ carts: [cartResponse.cart] });
          }

          toast.success('Thanh toán thành công!', {
            description: `Tên đơn hàng: ${response.paidItem.name}`,
          });
        },
      }),
      {
        name: 'cart-storage',
        partialize: (state) => ({ carts: state.carts }),
      }
    ),
    { name: 'cart-store' }
  )
);
