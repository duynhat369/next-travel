export interface CartItem {
  _id?: string;
  productId: string | any;
  quantity: number;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  addedAt: Date;
  thumbnail: string;
  name: string;
  description: string;
  freeShip: boolean;
  status: 'pending' | 'done' | 'cancelled';
}

export interface Cart {
  _id?: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartResponse {
  success: boolean;
  cart: Cart;
  message?: string;
  error?: string;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
  userId: string;
}

export interface UpdateCartItemRequest {
  quantity: number;
}
