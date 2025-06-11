// lib/cart.ts - Cập nhật đầy đủ các phương thức

import type { CartResponse } from '@/types/cart.types';
import axiosClient from '../axios';

export interface AddToCartResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cart: any;
  success: boolean;
  message: string;
}

export interface UpdateCartItemResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cart: any;
  success: boolean;
  message: string;
}

export interface RemoveCartItemResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cart: any;
  success: boolean;
  message: string;
}

export interface CheckoutItemResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cart: any;
  paidItem: any;
  success: boolean;
  message: string;
}

export const cartApi = {
  // Lấy giỏ hàng của user theo status
  getCart: async (userId: string): Promise<CartResponse> => {
    return axiosClient.get(`/cart?userId=${userId}`);
  },

  // Thêm sản phẩm vào giỏ hàng
  addToCart: async (data: {
    productId: string;
    quantity: number;
    userId: string;
  }): Promise<AddToCartResponse> => {
    return await axiosClient.post('/cart', data);
  },

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItem: async (data: {
    itemId: string;
    quantity: number;
    userId: string;
  }): Promise<UpdateCartItemResponse> => {
    return await axiosClient.put('/cart', data);
  },

  // Xóa sản phẩm khỏi giỏ hàng
  removeCartItem: async (itemId: string, userId: string): Promise<RemoveCartItemResponse> => {
    return await axiosClient.delete('/cart', {
      data: { itemId, userId },
    });
  },

  // Thanh toán theo sản phẩm -> Đổi trạng thái từ pending sang done
  checkoutSingleItem: async (itemId: string, userId: string): Promise<CheckoutItemResponse> => {
    return axiosClient.post('/cart/checkout-item', { itemId, userId });
  },
};

// Các utility functions để xử lý cart data
export const cartUtils = {
  // Tính tổng tiền cho những item có status cụ thể
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  calculateTotalByStatus: (items: any[], status: string) => {
    return items
      .filter((item) => item.status === status)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  },

  // Đếm số lượng item theo status
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  countItemsByStatus: (items: any[], status: string) => {
    return items
      .filter((item) => item.status === status)
      .reduce((count, item) => count + item.quantity, 0);
  },

  // Lấy danh sách item theo status
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItemsByStatus: (items: any[], status: string) => {
    return items.filter((item) => item.status === status);
  },

  // Format giá tiền VND
  formatPrice: (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  },

  // Tính phần trăm giảm giá
  calculateDiscountAmount: (originalPrice: number, discountPercentage: number) => {
    return originalPrice * (discountPercentage / 100);
  },

  // Tính giá sau khi giảm
  calculateFinalPrice: (originalPrice: number, discountPercentage: number) => {
    return originalPrice - originalPrice * (discountPercentage / 100);
  },
};
