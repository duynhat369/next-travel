import { Product } from '@/types/product.types';
import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
interface CartItem {
  product: Product;
  quantity: number;
  addedAt: Date;
  [key: string]: any; // for additional options
}

interface CartState {
  // State
  items: CartItem[];
  isLoading: boolean;
  totalItems: number;
  totalPrice: number;

  // Actions
  addItem: (product: Product, quantity?: number, options?: Record<string, any>) => Promise<void>;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Helper functions
  calculateTotalItems: (items: CartItem[]) => number;
  calculateTotalPrice: (items: CartItem[]) => number;

  // Getters
  getItemQuantity: (productId: string) => number;
  isInCart: (productId: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // State
      items: [],
      isLoading: false,
      totalItems: 0,
      totalPrice: 0,

      // Actions
      addItem: async (product: Product, quantity = 1, options = {}) => {
        set({ isLoading: true });

        try {
          const { items } = get();
          const existingItem = items.find((item) => item.product._id === product._id);

          let newItems: CartItem[];
          if (existingItem) {
            // Update quantity if item exists
            newItems = items.map((item) =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            // Add new item
            newItems = [
              ...items,
              {
                product,
                quantity,
                addedAt: new Date(),
                ...options,
              },
            ];
          }

          // Update state
          set({
            items: newItems,
            totalItems: get().calculateTotalItems(newItems),
            totalPrice: get().calculateTotalPrice(newItems),
          });

          // API call (optional - có thể sync với server)
          await fetch('/api/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              productId: product._id,
              quantity,
              ...options,
            }),
          });

          toast.success('Thành công', {
            description: `Đã thêm ${product.name} vào giỏ hàng`,
          });
        } catch (error) {
          console.error('Add to cart error:', error);
          toast.error('Lỗi', {
            description: 'Không thể thêm sản phẩm vào giỏ hàng',
          });
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: (productId: string) => {
        const { items } = get();
        const newItems = items.filter((item) => item.product._id !== productId);

        set({
          items: newItems,
          totalItems: get().calculateTotalItems(newItems),
          totalPrice: get().calculateTotalPrice(newItems),
        });

        toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const { items } = get();
        const newItems = items.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        );

        set({
          items: newItems,
          totalItems: get().calculateTotalItems(newItems),
          totalPrice: get().calculateTotalPrice(newItems),
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
        toast.success('Đã xóa toàn bộ giỏ hàng');
      },

      // Helper functions
      calculateTotalItems: (items: CartItem[]) => {
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      calculateTotalPrice: (items: CartItem[]) => {
        return items.reduce((total, item) => {
          const price = item.product.price || 0;
          return total + price * item.quantity;
        }, 0);
      },

      // Getters
      getItemQuantity: (productId: string) => {
        const { items } = get();
        const item = items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },

      isInCart: (productId: string) => {
        const { items } = get();
        return items.some((item) => item.product._id === productId);
      },
    }),
    {
      name: 'cart-storage', // localStorage key
      // Chỉ persist những field cần thiết
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }),
    }
  )
);
