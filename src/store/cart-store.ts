import { cartApi } from '@/lib/api/cart';
import { Cart, CartItem } from '@/types/cart.types';
import { toast } from 'sonner';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  isUpdating: boolean;

  // Actions
  addToCart: (userId: string, productId: string, quantity?: number) => Promise<void>;
  updateCartItem: (userId: string, itemId: string, quantity: number) => Promise<void>;
  removeCartItem: (userId: string, itemId: string) => Promise<void>;
  clearCart: () => void;

  // Selectors (computed values)
  isProductInCart: (productId: string) => boolean;
  getProductQuantityInCart: (productId: string) => number;
  getCartItemByProductId: (productId: string) => CartItem | undefined;
  getTotalItems: () => number;
  getTotalAmount: () => number;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        cart: null,
        isLoading: false,
        isUpdating: false,

        addToCart: async (userId: string, productId: string, quantity = 1) => {
          try {
            set({ isUpdating: true });
            const response = await cartApi.addToCart({ userId, productId, quantity });
            set({ cart: response.cart, isUpdating: false });
            toast.success('Đã thêm sản phẩm vào giỏ hàng');
          } catch (error: any) {
            set({ isUpdating: false });
            toast.error(error.response?.data?.error || 'Có lỗi xảy ra');
          }
        },

        updateCartItem: async (userId: string, itemId: string, quantity: number) => {
          try {
            set({ isUpdating: true });
            const response = await cartApi.updateCartItem(itemId, { userId, quantity });
            set({ cart: response.cart, isUpdating: false });
            toast.success('Đã cập nhật giỏ hàng');
          } catch (error: any) {
            set({ isUpdating: false });
            toast.error(error.response?.data?.error || 'Có lỗi xảy ra');
          }
        },

        removeCartItem: async (userId: string, itemId: string) => {
          try {
            set({ isUpdating: true });
            const response = await cartApi.removeCartItem(itemId, userId);
            set({ cart: response.cart, isUpdating: false });
            toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
          } catch (error: any) {
            set({ isUpdating: false });
            toast.error(error.response?.data?.error || 'Có lỗi xảy ra');
          }
        },

        clearCart: () => {
          set({ cart: null });
        },

        // Selectors
        isProductInCart: (productId: string) => {
          const { cart } = get();
          return cart?.items.some((item) => item.productId.toString() === productId) || false;
        },

        getProductQuantityInCart: (productId: string) => {
          const { cart } = get();
          const item = cart?.items.find((item) => item.productId.toString() === productId);
          return item?.quantity || 0;
        },

        getCartItemByProductId: (productId: string) => {
          const { cart } = get();
          return cart?.items.find((item) => item.productId.toString() === productId);
        },

        getTotalItems: () => {
          const { cart } = get();
          return cart?.totalItems || 0;
        },

        getTotalAmount: () => {
          const { cart } = get();
          return cart?.totalAmount || 0;
        },
      }),
      {
        name: 'cart-storage',
        partialize: (state) => ({ cart: state.cart }), // Chỉ persist cart data
      }
    ),
    { name: 'cart-store' }
  )
);
