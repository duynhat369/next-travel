import type { Cart, CartItem } from '@/types/cart.types';
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema<CartItem>({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  addedAt: { type: Date, default: Date.now },
  thumbnail: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  freeShip: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['pending', 'done', 'cancelled'],
    default: 'pending',
    required: true,
  },
});

const cartSchema = new mongoose.Schema<Cart>(
  {
    userId: { type: String, ref: 'User', required: true },
    items: [cartItemSchema],
    totalItems: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Index for better performance
cartSchema.index({ userId: 1 });
cartSchema.index({ 'items.productId': 1 });
cartSchema.index({ status: 1 });
cartSchema.index({ userId: 1, status: 1 });
cartSchema.index({ userId: 1, createdAt: -1 });

export function getCartModel() {
  return mongoose.models.Cart || mongoose.model<Cart>('Cart', cartSchema);
}

// Helper function to calculate cart totals
export function calculateCartTotals(items: CartItem[]) {
  const totalItems = items.length;
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalAmount };
}
