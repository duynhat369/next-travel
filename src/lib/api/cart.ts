import type { CartResponse, UpdateCartItemRequest } from '@/types/cart.types';

export const cartApi = {
  // Lấy giỏ hàng của user theo status
  getCart: async (userId: string, status = 'pending'): Promise<CartResponse> => {
    const response = await fetch(`/api/cart?userId=${userId}&status=${status}&single=true`);
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    return response.json();
  },

  // Thêm sản phẩm vào giỏ hàng
  addToCart: async (data: { productId: string; quantity: number; userId: string }) => {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }

    return response.json();
  },

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItem: async (itemId: string, data: UpdateCartItemRequest & { userId: string }) => {
    const response = await fetch(`/api/cart/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update cart item');
    }

    return response.json();
  },

  // Xóa sản phẩm khỏi giỏ hàng
  removeCartItem: async (itemId: string, userId: string) => {
    const response = await fetch(`/api/cart/${itemId}?userId=${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove cart item');
    }

    return response.json();
  },

  // Thanh toán một sản phẩm
  checkoutSingleItem: async (itemId: string, userId: string) => {
    const response = await fetch('/api/cart/checkout-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itemId, userId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  },

  // Cập nhật status giỏ hàng
  updateCartStatus: async (userId: string, status: 'pending' | 'done' | 'cancelled') => {
    const response = await fetch('/api/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update cart status');
    }

    return response.json();
  },

  // Thanh toán toàn bộ giỏ hàng
  checkout: async (userId: string) => {
    const response = await fetch('/api/cart/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  },
};
